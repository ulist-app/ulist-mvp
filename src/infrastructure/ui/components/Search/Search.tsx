import React, {ChangeEventHandler, FC, useState} from "react";
import './Search.scss'
import {buttonSize} from "../../../../domain";
import {BiArrowBack} from "react-icons/bi";
import {BsFillBackspaceFill} from "react-icons/bs";

export interface SearchProps {
  onChange: (search: string) => void;
  onClose: () => void;
}

export const messages = {
  searchInput: '🔍 Search',
  resetCTA: 'Reset your search',
  closeCTA: 'Close search'
}

export const Search: FC<SearchProps> = ({onChange, onClose}) => {
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
        aria-label={messages.searchInput}
        type="text"
        value={search}
        onChange={onInputChange}
        placeholder={messages.searchInput}
      />
      <button aria-label={search ? messages.resetCTA : messages.closeCTA} onClick={handleClick}>
        {search && <BsFillBackspaceFill size={buttonSize}/>}
        {!search && <BiArrowBack size={buttonSize}/>}
      </button>
    </div>
  )
}
