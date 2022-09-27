import React, { FC } from 'react'
import SearchIcon from '../../icons/SearchIcon'

import { cnSearch } from './Search.classname'
import './Search.css'

type SearchProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search: FC<SearchProps> = ({ value='', onChange }) => {
  return <div className={cnSearch()}>
    <SearchIcon/>
    <input className={cnSearch('text')}
      type="search"
      placeholder="Поиск"
      name="search"
      value={value}
      onChange={onChange}/>
  </div>
}
