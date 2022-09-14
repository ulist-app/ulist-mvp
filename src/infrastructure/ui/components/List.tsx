import {FC} from "react";
import {Id, Item} from "../../../core";
import {ListItem} from "./ListItem";
import './List.scss'

type SetItemFunction = (id: Id) => void

interface ItemListProps {
  items: Item[],
  setItemAsRequired: SetItemFunction,
  setItemAsNotRequired: SetItemFunction,
  setItemAsMandatory: SetItemFunction,
  setItemAsNotMandatory: SetItemFunction,
}

export const List: FC<ItemListProps> = ({items, ...useCases}) => {
  const itemsByCategory = items.reduce((dictionary, item) => {
    if (dictionary[item.category.name]) {
      dictionary[item.category.name] = dictionary[item.category.name].concat(item)
    } else {
      dictionary[item.category.name] = [item]
    }
    return dictionary
  }, {} as Record<string, Item[]>)
  return <div className="List">
    {Object.entries(itemsByCategory).map(([categoryName, items]) => <>
        <h2 className="category-name">{categoryName}</h2>
        {items.map(item => (
          <ul className="ItemList">
            <li key={item.id.value}>
              <ListItem item={item} {...useCases}/>
            </li>
          </ul>

        ))}
      </>
    )}
  </div>
}
