import { FC, useState } from "react"
import { FilterButton } from "../FilterButton/FilterButton"

import { cnFilter } from "./Filter.classname"
import './Filter.css'


export type FilterStates = 1 | 2 | 3

type FilterProps = {
  state?: FilterStates
  onFilterChange?: (buttoNumber: FilterStates) => void
  stickers?: number[] 
}


export const Filter: FC<FilterProps> = ({ state = 1, onFilterChange, stickers = [] }) => {
  const [chosenButton, setChosenButton] = useState(state)

  const handleClick = (buttonNumber: FilterStates) => {
    setChosenButton(buttonNumber)
    if (onFilterChange) onFilterChange(buttonNumber)
  }

  const getButtonState = (buttonNumber: FilterStates = 1) => chosenButton === buttonNumber ? 'active' : 'primary'
  
  return (
    <div className={cnFilter()}>
      <span className={cnFilter('label')}>Искать по:</span>
      <FilterButton
        state={getButtonState(1)}
        stickerCount={stickers[0]}
        onClick={() => handleClick(1)}
      >исполнителю</FilterButton>
      <FilterButton
        state={getButtonState(2)}
        stickerCount={stickers[1]}
        onClick={() => handleClick(2)}
      >году выпуска</FilterButton>
      <FilterButton
        state={getButtonState(3)}
        stickerCount={stickers[2]}
        onClick={() => handleClick(3)}
      >жанру</FilterButton>
    </div>
  )
}
