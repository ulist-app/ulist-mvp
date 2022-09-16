import React, {ChangeEventHandler, FC, useState} from "react";
import './Search.scss'
import {buttonSize} from "../../../core";
import {BiArrowBack} from "react-icons/bi";
import {BsFillBackspaceFill} from "react-icons/bs";

export const Search: FC<{ onChange: (search: string) => void, onClose: () => void }> = ({onChange, onClose}) => {
  const [search, setSearch] = useState('')
  function emitChange(value: string) {
    setSearch(value)
    onChange(value)
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({currentTarget}) => {
    const value = currentTarget.value.trim()
    emitChange(value);
  }
  const handleClick = () => {
    if (search) {
      emitChange('')
    } else {
      onClose()
    }
  }

  return (
    <div className="Search">
      <input
        type="text"
        value={search}
        autoFocus={true}
        onChange={onInputChange}
        placeholder="🔍 Search"
      />
      <button onClick={handleClick}>
        {search && <BsFillBackspaceFill size={buttonSize}/>}
        {!search && <BiArrowBack size={buttonSize}/>}
      </button>
    </div>
  )
}
