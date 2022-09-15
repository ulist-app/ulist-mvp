import React, {FC} from "react";
import './Menu.scss'
import {Views} from "../App/App";
import {BsFillCartFill, BsFillStarFill} from "react-icons/bs";
import {FiList} from "react-icons/fi";
import {palette} from "../../../core";


export const Menu: FC<{ setView: (view: Views) => void, activeView: Views }> = ({setView, activeView}) => {
  const isActive = (view: Views) => view === activeView
  const getBackgroundColor = (view: Views) => isActive(view) ? palette.yellow : 'transparent'
  const getTextColor = (view: Views) => isActive(view) ? palette.purple : 'inherit'
  return (
    <nav className="Menu">
      <ul style={{backgroundColor: palette.purple, color: palette.white}}>
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
      </ul>
    </nav>
  )
}
