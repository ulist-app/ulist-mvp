import {ItemList} from "../../../domain";
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

    expect(item).toStrictEqual(
      ItemBuilder
        .clone(expectedItem)
        .withRevision(item._rev)
        .withCategory(CategoryBuilder.clone(item.category).withRevision(item.category._rev).build())
        .build()
    )
  })

  xit('retrieve all items', async () => {
    const expectedItems = new ItemList(Array.of(3).map(ItemBuilder.random))

    const result = await new ItemRepositoryPouchDB(pouchDataSource).findAll()

    expect(result).toStrictEqual(expectedItems)
  })

  xit('save an item', async () => {
    const item = ItemBuilder.random()

    const savedItem = await new ItemRepositoryPouchDB(pouchDataSource).save(item)

    expect(savedItem).toStrictEqual(item)
  })
})




