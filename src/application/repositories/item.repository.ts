import {Id, Item, ItemList} from '../../core'

export interface ItemRepository {
  findById(id: Id): Promise<Item>
  findAll(): Promise<ItemList>
  save(item: Item): Promise<void>
}
