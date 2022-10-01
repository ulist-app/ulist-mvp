import {ItemRepository} from "../../../application";
import {Category, Id, Item, ItemList} from "../../../domain";
import {PouchDatasource, PouchDBDocument} from "../../data-sources/pouch-db.data-source";

export type PouchDBItem = PouchDBDocument<Item> & {
  id: string
  category: string
}
export type PouchDBCategory = PouchDBDocument<Category> & {
  id: string
}

export class ItemRepositoryPouchDB implements ItemRepository {
  constructor(private readonly pouch: PouchDatasource) {
  }

  private static mapItemToDomain(document: PouchDBItem, category: Category): Item {
    return new Item({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      category,
      isRequired: document.isRequired,
      isMandatory: document.isMandatory,
    })
  }

  private static mapCategoryToDomain(document: PouchDBCategory): Category {
    return new Category({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      color: document.color
    })
  }

  private static generateCategoryDictionary(categories: Array<PouchDBCategory>): Record<string, Category> {
    return categories.reduce((dictionary, category) => {
      dictionary[category.id.value] = ItemRepositoryPouchDB.mapCategoryToDomain(category)
      return dictionary
    }, {} as Record<string, Category>)
  }

  async findById(id: Id): Promise<Item> {
    // TODO: Test if item is not found
    const document = await this.pouch.db.get<PouchDBItem>(id.value)
    const category = await this.findCategory(document.category)
    return ItemRepositoryPouchDB.mapItemToDomain(document, category)
  }

  async findAll(): Promise<ItemList> {
    const documents = await this.pouch.db.allDocs<PouchDBItem | PouchDBCategory>({include_docs: true})
    const {categories, items} = this.groupDocumentsByType(documents);
    const categoryDictionary = ItemRepositoryPouchDB.generateCategoryDictionary(categories)
    return new ItemList(items.map(item => {
      const category = categoryDictionary[item.id.value]
      return ItemRepositoryPouchDB.mapItemToDomain(item, category)
    }))
  }

  async save(item: Item): Promise<Item> {
    const response = await this.pouch.db.put({...item, id: item.id.value, category: item.category.id.value})
    if (!response.ok) {
      throw new Error(`Error saving item: ${JSON.stringify(item, null, 2)}`)
    }
    return this.findById(item.id)
  }

  private groupDocumentsByType(documents: PouchDB.Core.AllDocsResponse<PouchDBItem | PouchDBCategory>) {
    const {categories, items} = documents.rows.reduce((result, {doc}) => {
      // @ts-ignore
      if (doc.type === PouchDatasource.DocumentTypes.Category) {
        // @ts-ignore
        result.categories = result.categories.concat(doc)
      }
      // @ts-ignore
      if (doc.type === PouchDatasource.DocumentTypes.Item) {
        // @ts-ignore
        result.items = result.items.concat(doc)
      }
      return result
    }, {categories: [] as PouchDBCategory[], items: [] as PouchDBItem[]})
    return {categories, items};
  }

  private async findCategory(id: string): Promise<Category> {
    const category = await this.pouch.db.get<PouchDBCategory>(id)
    return ItemRepositoryPouchDB.mapCategoryToDomain(category)
  }
}
