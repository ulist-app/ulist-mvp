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
  return <div className="ListItem" data-testid={item.id.value}>
    <span className="quantity">{item.quantity}</span>
    <span className="item">{item.name}</span>
    <span className="is-required">
      {item.isRequired
        ? <button aria-label={messages.actions.setItemAsNotRequired}
                  onClick={() => useCases.setItemAsNotRequired(item.id)}>
          <AiFillMinusCircle size={32} color={palette.red}/>
        </button>
        : <button aria-label={messages.actions.setItemAsRequired}
                  onClick={() => useCases.setItemAsRequired(item.id)}>
          <AiFillPlusCircle size={32} color={palette.green}/>
        </button>
      }
    </span>
    <span className="is-mandatory">
      {item.isMandatory
        ? <button aria-label={messages.actions.setItemAsNotMandatory}
                  onClick={() => useCases.setItemAsNotMandatory(item.id)}>
          <BsFillStarFill size={32} color={palette.yellow}/>
        </button>
        : <button aria-label={messages.actions.setItemAsMandatory}
                  onClick={() => useCases.setItemAsMandatory(item.id)}>
          <BsFillStarFill size={32} color={palette.gray}/>
        </button>
      }
    </span>
  </div>
}

