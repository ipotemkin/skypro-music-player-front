import { FilterButton } from "../FilterButton/FilterButton"

import { cnFilter } from "./Filter.classname"
import './Filter.css'

export const Filter = () => {
  return (
    <div className={cnFilter()}>
      <span className={cnFilter('label')}>Искать по:</span>
      <FilterButton stickerCount={5}>исполнителю</FilterButton>
      <FilterButton>году выпуска</FilterButton>
      <FilterButton>жанру</FilterButton>
    </div>
  )
}
