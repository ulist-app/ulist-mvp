import React, {ChangeEventHandler, FC} from "react";
import './Search.scss'

export const Search: FC<{onChange: (search: string) => void}> = ({onChange}) => {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({currentTarget}) => {
    onChange(currentTarget.value.trim())
  }

  return (
    <div className="Search">
      <input
        type="search"
        onChange={onInputChange}
        placeholder="🔍 Search"
      />
    </div>
  )
}
