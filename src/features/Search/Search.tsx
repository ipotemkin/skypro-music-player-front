import iconSearch from './assets/search.svg'

import { cnSearch } from './Search.classname'
import './Search.css'

export const Search = () => {
  return (
    <div className={cnSearch()}>
      <img className="search__svg" src={iconSearch} alt="search"/>
      <input className="search__text" type="search" placeholder="Поиск" name="search"/>
    </div>
  )
}
