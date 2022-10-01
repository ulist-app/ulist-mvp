import {Item, ItemList} from "../../../domain";
import {CategoryBuilder, ItemBuilder} from "../../../tests/builders";
import {PouchDatasource} from "../../data-sources/pouch-db.data-source";
import {ItemRepositoryPouchDB} from "./item.repository.pouch-db";
import {PouchDBTestHelper} from "../../../tests/PouchDBTestHelper";

describe('Pouch DB implementation for item repository should', () => {
  let pouchDataSource: PouchDatasource
  let helper: PouchDBTestHelper

  beforeEach(() => {
    pouchDataSource = PouchDatasource.createPouchDbMemory('test')
    helper = new PouchDBTestHelper(pouchDataSource)
  })

  afterEach(async () => {
    await helper.reset()
  })

  it('find item by id', async () => {
    const expectedItem = ItemBuilder.random()
    await helper.createItem(expectedItem)

    const item = await new ItemRepositoryPouchDB(pouchDataSource).findById(expectedItem.id)

    assertItemsAreEqual(item, expectedItem);
  })

  it('retrieve all items', async () => {
    const expectedItems = new ItemList(Array.of(3).map(ItemBuilder.random))
    await Promise.all(expectedItems.getAll().map(item => helper.createItem(item)))

    const items = await new ItemRepositoryPouchDB(pouchDataSource).findAll()

    for (const [index, item] of Object.entries(items.getAll())) {
      assertItemsAreEqual(item, expectedItems.getAll().at(+index)!)
    }
  })

  it('save an item', async () => {
    const expectedItem = ItemBuilder.random()
    await helper.createCategory(expectedItem.category)
    const itemRepositoryPouchDB = new ItemRepositoryPouchDB(pouchDataSource);

    const item = await itemRepositoryPouchDB.save(expectedItem)

    const savedItem = await itemRepositoryPouchDB.findById(expectedItem.id)
    expect(item).toStrictEqual(savedItem);
  })
})

function assertItemsAreEqual(item: Item, expectedItem: Item) {
  expect(item).toStrictEqual(
    ItemBuilder
      .clone(expectedItem)
      .withRevision(item._rev)
      .withCategory(CategoryBuilder.clone(item.category).withRevision(item.category._rev).build())
      .build()
  )
}


