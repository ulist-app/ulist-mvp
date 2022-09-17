import {ItemList} from './item-list'
import {Item} from '../item'

describe('ListItem List should', () => {
  const items = [
    new Item({name: 'Milk', isRequired: true}),
    new Item({name: 'Cookies', isRequired: true, isMandatory: true}),
    new Item({name: 'Milk shake', isMandatory: true}),
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

  describe('search items', () => {
    it('returning items which name includes the search content', () => {
      expect(new ItemList(items).search('milk')).toStrictEqual(new ItemList([items.at(0)!, items.at(2)!]))
    })

    it('return all items if search is empty', () => {
      expect(new ItemList(items).search('')).toStrictEqual(new ItemList(items))
    })
  })

})
