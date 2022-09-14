import {FC} from "react";
import {Id, Item} from "../../../core";
import './ListItem.scss'
import {BsCartPlus, BsCartX,} from "react-icons/bs";
import {FcHighPriority, FcLowPriority} from "react-icons/fc";

type SetItemFunction = (id: Id) => void


interface ListItemProps {
  item: Item
  setItemAsRequired: SetItemFunction,
  setItemAsNotRequired: SetItemFunction,
  setItemAsMandatory: SetItemFunction,
  setItemAsNotMandatory: SetItemFunction,
}

export const ListItem: FC<ListItemProps> = ({ item, ...useCases}) => {
  return <div className="ListItem">
    <span className="quantity">{item.quantity}</span>
    <span className="item">{item.name}</span>
    <span className="is-required">
      {item.isRequired
        ? <BsCartX size={32} onClick={() => useCases.setItemAsNotRequired(item.id)}/>
        : <BsCartPlus size={32} onClick={() => useCases.setItemAsRequired(item.id)}/>
      }
    </span>
    <span className="is-mandatory">
      {item.isMandatory
        ? <FcLowPriority size={32} onClick={() => useCases.setItemAsNotMandatory(item.id)}/>
        : <FcHighPriority size={32} onClick={() => useCases.setItemAsMandatory(item.id)}/>
      }
    </span>
  </div>
}

