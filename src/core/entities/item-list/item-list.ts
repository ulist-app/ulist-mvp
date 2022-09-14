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

  private get items() {
    return [...this._items]
  }
}
