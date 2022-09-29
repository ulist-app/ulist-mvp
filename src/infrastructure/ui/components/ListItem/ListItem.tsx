import {FC} from "react";
import {Id, Item, palette} from "../../../../core";
import './ListItem.scss'
import {BsFillStarFill} from "react-icons/bs";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";

type SetItemFunction = (id: Id) => void

export const messages = {
  setItemAsRequired: 'Set item to buy',
  setItemAsNotRequired: 'Remove item from buy list',
  setItemAsMandatory: 'Set item as mandatory to buy',
  setItemAsNotMandatory: 'Remove item from mandatory to buy list',
}

export interface ListItemProps {
  item: Item
  setItemAsRequired: SetItemFunction,
  setItemAsNotRequired: SetItemFunction,
  setItemAsMandatory: SetItemFunction,
  setItemAsNotMandatory: SetItemFunction,
}

export const ListItem: FC<ListItemProps> = ({item, ...useCases}) => {
  return <div className="ListItem">
    <span className="quantity">{item.quantity}</span>
    <span className="item">{item.name}</span>
    <span className="is-required">
      {item.isRequired
        ? <AiFillMinusCircle aria-label={messages.setItemAsNotRequired} size={32} color={palette.red}
                             onClick={() => useCases.setItemAsNotRequired(item.id)}/>
        : <AiFillPlusCircle aria-label={messages.setItemAsRequired} size={32} color={palette.green}
                            onClick={() => useCases.setItemAsRequired(item.id)}/>
      }
    </span>
    <span className="is-mandatory">
      {item.isMandatory
        ? <BsFillStarFill aria-label={messages.setItemAsNotMandatory} size={32} color={palette.yellow}
                          onClick={() => useCases.setItemAsNotMandatory(item.id)}/>
        : <BsFillStarFill aria-label={messages.setItemAsMandatory} size={32} color={palette.gray}
                          onClick={() => useCases.setItemAsMandatory(item.id)}/>
      }
    </span>
  </div>
}

