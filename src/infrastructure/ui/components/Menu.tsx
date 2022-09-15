import React, {FC, useState} from "react";
import './Menu.scss'
import {Views} from "../App/App";
import {BsFillCartFill, BsFillStarFill, BsSearch} from "react-icons/bs";
import {FiList} from "react-icons/fi";
import {palette} from "../../../core";
import {Search} from "./Search";
import {BiArrowBack} from "react-icons/bi";


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
      {!search &&       <ul style={{backgroundColor: palette.purple, color: palette.white}}>
        <li
          style={{backgroundColor: getBackgroundColor(Views.All), color: getTextColor(Views.All)}}
          onClick={() => setView(Views.All)}
        >
          <FiList/>
        </li>
        <li
          style={{backgroundColor: getBackgroundColor(Views.Required), color: getTextColor(Views.Required)}}
          onClick={() => setView(Views.Required)}
        >
          <BsFillCartFill/>
        </li>
        <li
          style={{backgroundColor: getBackgroundColor(Views.Mandatory), color: getTextColor(Views.Mandatory)}}
          onClick={() => setView(Views.Mandatory)}
        >
          <BsFillStarFill/>
        </li>
        <li
          onClick={() => setSearch(true)}
        >
          <BsSearch/>
        </li>
      </ul>
      }
      {search && <div className="search">
        <button onClick={() => setSearch(false)} className="back"><BiArrowBack/></button>
        <Search onChange={onSearch}/>
      </div>
      }
    </nav>
  )
}
