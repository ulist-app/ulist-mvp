import React, {FC, useState} from "react";
import './Menu.scss'
import {Views} from "../App/App";
import {BsFillCartFill, BsFillStarFill, BsSearch} from "react-icons/bs";
import {FiList} from "react-icons/fi";
import {palette} from "../../../core";
import {Search} from "./Search";


interface MenuProps {
  setView: (view: Views) => void;
  activeView: Views;
  onSearch: (search: string) => void
}
export const Menu: FC<MenuProps> = ({setView, activeView, onSearch}) => {
  const [search, setSearch] = useState(false)
  const isActive = (view: Views) => view === activeView
  const getBackgroundColor = (view: Views) => isActive(view) ? palette.yellow : 'transparent'
  const getTextColor = (view: Views) => isActive(view) ? palette.purple : 'inherit'
  return (
    <nav className="Menu">
      <div className={`flip-container${search ? ' active' : ''}`}>
        <ul
          style={{backgroundColor: palette.purple, color: palette.white}}
          className={`flip-front${!search ? ' active' : ''}`}
        >
          <li style={{backgroundColor: getBackgroundColor(Views.All), color: getTextColor(Views.All)}}>
            <button onClick={() => setView(Views.All)} data-testid="Menu-nav-all">
              <FiList/>
            </button>
          </li>
          <li style={{backgroundColor: getBackgroundColor(Views.Required), color: getTextColor(Views.Required)}}>
            <button onClick={() => setView(Views.Required)} data-testid="Menu-nav-required">
              <BsFillCartFill/>
            </button>
          </li>
          <li style={{backgroundColor: getBackgroundColor(Views.Mandatory), color: getTextColor(Views.Mandatory)}}>
            <button onClick={() => setView(Views.Mandatory)} data-testid="Menu-nav-mandatory">
              <BsFillStarFill/>
            </button>
          </li>
          <li>
            <button onClick={() => setSearch(true)} data-testid="Menu-nav-search">
              <BsSearch/>
            </button>
          </li>
        </ul>
        <div className={`flip-back${search ? ' active' : ''}`} data-testid="Menu-search-bar">
          <Search onChange={onSearch} onClose={() => setSearch(false)}/>
        </div>
      </div>
    </nav>
  )
}
