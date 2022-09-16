import {ItemRepositoryLocalStorage, LocalStorageItem, LocalStorageItemRecord} from "./item-repository.local-storage";
import {LocalStorageDouble} from "../../../tests/doubles/LocalStorageDouble";
import {items} from "../../../tests/fixtures/items";
import {Category, Id, Item, ItemList} from "../../../core";


describe('Item repository should', () => {
  let localStorage: LocalStorageDouble<LocalStorageItemRecord>

  beforeEach(() => {
    localStorage = new LocalStorageDouble({onGet: items})
  })

  it('find item by id', async () => {
    const expectedItem = mapToItem(Object.values(items)[0])

    const item = await new ItemRepositoryLocalStorage(localStorage).findById(expectedItem.id)

    expect(item).toStrictEqual(expectedItem)
    localStorage.assertGetHasBeenCalled()
  })

  it('retrieve all items', async () => {
    const expectedItems = new ItemList(Object.values(items).map(mapToItem))

    const result = await new ItemRepositoryLocalStorage(localStorage).findAll()

    expect(result).toStrictEqual(expectedItems)
    localStorage.assertGetHasBeenCalled()
  })

  it('retrieve all items from fixture if there is no data', async () => {
    const localStorage = new LocalStorageDouble<LocalStorageItemRecord>({onGet: null})
    const expectedItems = new ItemList(Object.values(items).map(mapToItem))

    const result = await new ItemRepositoryLocalStorage(localStorage).findAll()

    expect(result).toStrictEqual(expectedItems)
  })

  it('save an item', async () => {
    const itemName = 'Something dummy and irrelevant'
    const item = mapToItem({...Object.values(items)[0], name: itemName})
    const expectedItems = {
      ...items,
      [item.id.value]: {
        ...items[item.id.value],
        name: itemName
      }
    }

    await new ItemRepositoryLocalStorage(localStorage).save(item)

    localStorage.assertSetHasBeenCalledWith(expectedItems)
  })
})


function mapToItem(item: LocalStorageItem): Item {
  return {
    ...item,
    id: new Id(item.id),
    category: new Category({...item.category, id: new Id(item.category.id)})
  };
}
