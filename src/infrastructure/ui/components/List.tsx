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

function getItemsByCategory(items: Item[]) {
  return items.reduce((dictionary, item) => {
    if (dictionary[item.category.name]) {
      dictionary[item.category.name] = dictionary[item.category.name].concat(item)
    } else {
      dictionary[item.category.name] = [item]
    }
    return dictionary
  }, {} as Record<string, Item[]>);
}

const EmptyList = () => <div className="List">
  <p>No hay elementos</p>
</div>

export const List: FC<ItemListProps> = ({items, ...useCases}) => {
  if (!items) {
    return <EmptyList />
  }
  return <div className="List">
    {Object.entries(getItemsByCategory(items)).map(([categoryName, items]) => <>
        <h2 className="category-name">{categoryName}</h2>
        <ul className="ItemList">
          {items.map(item => (
            <li key={item.id.value}>
              <ListItem item={item} {...useCases}/>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
}
