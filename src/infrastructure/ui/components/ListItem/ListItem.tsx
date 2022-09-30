import {FC} from "react";
import {Id, Item, palette} from "../../../../domain";
import './ListItem.scss'
import {BsFillStarFill} from "react-icons/bs";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {messages} from "../../../../messages";

type SetItemFunction = (id: Id) => void

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
        ? <AiFillMinusCircle aria-label={messages.actions.setItemAsNotRequired} size={32} color={palette.red}
                             onClick={() => useCases.setItemAsNotRequired(item.id)}/>
        : <AiFillPlusCircle aria-label={messages.actions.setItemAsRequired} size={32} color={palette.green}
                            onClick={() => useCases.setItemAsRequired(item.id)}/>
      }
    </span>
    <span className="is-mandatory">
      {item.isMandatory
        ? <BsFillStarFill aria-label={messages.actions.setItemAsNotMandatory} size={32} color={palette.yellow}
                          onClick={() => useCases.setItemAsNotMandatory(item.id)}/>
        : <BsFillStarFill aria-label={messages.actions.setItemAsMandatory} size={32} color={palette.gray}
                          onClick={() => useCases.setItemAsMandatory(item.id)}/>
      }
    </span>
  </div>
}

