import React, { FC } from 'react'

import iconSearch from './assets/search.svg'

import { cnSearch } from './Search.classname'
import './Search.css'

type SearchProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search: FC<SearchProps> = ({ value='', onChange }) => {
  
  return (
    <div className={cnSearch()}>
      <img className="search__svg" src={iconSearch} alt="search"/>
      <input
        className="search__text"
        type="search"
        placeholder="Поиск"
        name="search"
        value={value}
        onChange={onChange}/>
    </div>
  )
}
