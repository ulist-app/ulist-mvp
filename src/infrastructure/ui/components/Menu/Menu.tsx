import React, {FC, useState} from "react";
import './Menu.scss'
import {BsFillCartFill, BsFillStarFill, BsSearch} from "react-icons/bs";
import {FiList} from "react-icons/fi";
import {palette} from "../../../../domain";
import {Search} from "../Search";

export enum Views {
  All,
  Required,
  Mandatory
}

export interface MenuProps {
  setView: (view: Views) => void;
  activeView: Views;
  onSearch: (search: string) => void
}

export const messages = {
  requiredListCTA: 'Show items to buy',
  mandatoryListCTA: 'Show mandatory items to buy',
  allItemsListCTA: 'Show all items',
  searchCTA: 'Search items'
}

export const Menu: FC<MenuProps> = ({setView, activeView, onSearch}) => {
  const [search, setSearch] = useState(false)
  const isActive = (view: Views) => view === activeView
  const getBackgroundColor = (view: Views) => isActive(view) ? palette.yellow : 'transparent'
  const getTextColor = (view: Views) => isActive(view) ? palette.purple : 'inherit'
  return (
    <nav className="Menu">
      <div className={`flip-container${search ? ' active' : ''}`}>
        {search
          ? <div className={`flip-back${search ? ' active' : ''}`}>
            <Search onChange={onSearch} onClose={() => setSearch(false)}/>
          </div>
          : <ul
            style={{backgroundColor: palette.purple, color: palette.white}}
            className={`flip-front${!search ? ' active' : ''}`}
          >
            <li style={{backgroundColor: getBackgroundColor(Views.All), color: getTextColor(Views.All)}}>
              <button aria-label={messages.allItemsListCTA} onClick={() => setView(Views.All)}>
                <FiList/>
              </button>
            </li>
            <li style={{backgroundColor: getBackgroundColor(Views.Required), color: getTextColor(Views.Required)}}>
              <button aria-label={messages.requiredListCTA} onClick={() => setView(Views.Required)}>
                <BsFillCartFill/>
              </button>
            </li>
            <li style={{backgroundColor: getBackgroundColor(Views.Mandatory), color: getTextColor(Views.Mandatory)}}>
              <button aria-label={messages.mandatoryListCTA} onClick={() => setView(Views.Mandatory)}>
                <BsFillStarFill/>
              </button>
            </li>
            <li>
              <button aria-label={messages.searchCTA} onClick={() => setSearch(true)}>
                <BsSearch/>
              </button>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}
