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

  async findById(id: Id): Promise<Item> {
    const document = await this.pouch.db.get<PouchDBItem>(id.value)
    return this.mapItemToDomain(document)
  }

  findAll(): Promise<ItemList> {
    return Promise.resolve(undefined);
  }

  save(item: Item): Promise<Item> {
    return Promise.resolve(undefined);
  }

  private async mapItemToDomain(document: PouchDBItem): Promise<Item> {
    const category = await this.pouch.db.get<PouchDBCategory>(document.category)
    return new Item({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      category: ItemRepositoryPouchDB.mapCategoryToDomain(category),
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

}
