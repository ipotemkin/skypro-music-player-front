import { useState } from "react"
import { FilterButton } from "../FilterButton/FilterButton"

import { cnFilter } from "./Filter.classname"
import './Filter.css'

export const Filter = () => {
  const [chosenButton, setChosenButton] = useState(1)

  const handleClick = (buttonNumber: number) => setChosenButton(buttonNumber)

  const getButtonState = (buttonNumber: number = 1) => chosenButton === buttonNumber ? 'active' : 'primary'
  
  return (
    <div className={cnFilter()}>
      <span className={cnFilter('label')}>Искать по:</span>
      <FilterButton
        state={getButtonState(1)}
        stickerCount={5}
        onClick={() => handleClick(1)}
      >исполнителю</FilterButton>
      <FilterButton
        state={getButtonState(2)}
        onClick={() => handleClick(2)}
      >году выпуска</FilterButton>
      <FilterButton
        state={getButtonState(3)}
        onClick={() => handleClick(3)}
      >жанру</FilterButton>
    </div>
  )
}
