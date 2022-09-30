import { Item } from '../item'

type CategoryName = string;

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

  static groupItemsByCategory(items: Item[]): Array<[CategoryName, Array<Item>]> {
    return Object.entries(items.reduce((dictionary, item) => {
      if (dictionary[item.category.name]) {
        dictionary[item.category.name] = dictionary[item.category.name].concat(item)
      } else {
        dictionary[item.category.name] = [item]
      }
      return dictionary
    }, {} as Record<CategoryName, Item[]>));
  }

  private get items() {
    return [...this._items]
  }
}
