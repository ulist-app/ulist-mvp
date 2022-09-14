import {ItemList} from './item-list'
import {Item} from '../item'

describe('ListItem List should', () => {
  const items = [
    new Item({isRequired: true}),
    new Item({isRequired: true, isMandatory: true}),
    new Item({isMandatory: true}),
    new Item()
  ]

  it('return all items', () => {
    expect(new ItemList(items).getAll()).toStrictEqual(items)
  })
  it('return all required items', () => {
    expect(new ItemList(items).getAllRequired()).toStrictEqual([items.at(0), items.at(1)])
  })
  it('return all required and mandatory items', () => {
    expect(new ItemList(items).getAllMandatory()).toStrictEqual([items.at(1)])
  })
})
