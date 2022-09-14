import {FC} from "react";
import {Item} from "../../../core";
import './ListItem.scss'
import {BsCartPlus, BsCartX, } from "react-icons/bs";
import {FcHighPriority, FcLowPriority} from "react-icons/fc";

interface ListItemProps {
  item: Item
}

export const ListItem: FC<ListItemProps> = ({item}) => {
  return <div className="ListItem">
    <span className="quantity">{item.quantity}</span>
    <span className="item">{item.name}</span>
    <span className="is-required">
      {item.isRequired ? <BsCartX size={32}/> : <BsCartPlus size={32}/>}
    </span>
    <span className="is-mandatory">
      {item.isMandatory ? <FcLowPriority size={32}/> : <FcHighPriority size={32}/>}
    </span>
  </div>
}

