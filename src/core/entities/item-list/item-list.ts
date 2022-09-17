import { Item } from '../item'

export class ItemList {
  private readonly _items: Item[]
  constructor (items: Item[]) {
    this._items = items
  }

  getAll() {
    return this.items
  }

  getAllRequired() {
    return this.items.filter(i => i.isRequired)
  }

  getAllMandatory() {
    return this.items.filter(i => i.isMandatory && i.isRequired)
  }

  search(search: string): ItemList {
    return new ItemList(this.items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())))
  }

  private get items() {
    return [...this._items]
  }
}
