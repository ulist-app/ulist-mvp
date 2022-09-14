import React, {FC} from "react";
import './Menu.scss'
import {Views} from "../App/App";
import {BsCart} from "react-icons/bs";
import {FcHighPriority} from "react-icons/fc";
import {FiList} from "react-icons/fi";
import {palette} from "../../../core";


export const Menu: FC<{ setView: (view: Views) => void, activeView: Views }> = ({setView, activeView}) => {
  const isActive = (view: Views) => view === activeView
  const getBackgroundColor = (view: Views) => isActive(view) ? palette.yellow : 'transparent'
  return (
    <nav className="Menu">
      <ul style={{backgroundColor: palette.purple}}>
        <li
          style={{backgroundColor: getBackgroundColor(Views.All)}}
          onClick={() => setView(Views.All)}
        >
          <FiList/>
        </li>
        <li
          style={{backgroundColor: getBackgroundColor(Views.Required)}}
          onClick={() => setView(Views.Required)}
        >
          <BsCart/>
        </li>
        <li
          style={{backgroundColor: getBackgroundColor(Views.Mandatory)}}
          onClick={() => setView(Views.Mandatory)}
        >
          <FcHighPriority/>
        </li>
      </ul>
    </nav>
  )
}
