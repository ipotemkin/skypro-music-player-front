import { FC, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { FieldNames, setFilterField } from "./FilterSlice"
import { IFilterItem } from "../../models"
import { FilterButton } from "../FilterButton/FilterButton"
import { FilterPopup } from "../FilterPopup/FilterPopup"
import { useFilterData } from "../Tracks/hooks"

import { cnFilter } from "./Filter.classname"
import './Filter.css'


export type FilterStates = 1 | 2 | 3

type FilterProps = {
  state?: FilterStates
}

const fieldList: FieldNames[] = [ 'author', 'release_date', 'genre' ]
const labelList = [ 'исполнителю', 'году выпуска', 'жанру' ]

export const Filter: FC<FilterProps> = ({ state = 1 }) => {
  const [ chosenButton, setChosenButton ] = useState<FilterStates>(state)
  const [ showFilterPopup, setShowFilterPopup ] = useState<boolean>(false)
  const filterData = useFilterData()  
  const dispatch = useAppDispatch()
  const fieldName = fieldList[chosenButton - 1]

  const handleClick = (buttonNumber: FilterStates) => {
    setChosenButton(buttonNumber)
    dispatch(setFilterField(fieldList[buttonNumber - 1]))
    setShowFilterPopup(chosenButton === buttonNumber ? !showFilterPopup : true)
  }

  const getButtonState = (buttonNumber: FilterStates = 1) => chosenButton === buttonNumber ? 'active' : 'primary'

  const getSelectedCount = (data: IFilterItem[]) => data.filter((el: IFilterItem) => el.selected).length

  return (
    <div className={cnFilter()}>
      <span className={cnFilter('label')}>Искать по:</span>
      { fieldList.map((el: FieldNames, index) => {
        const schemaIndex = index + 1 as FilterStates;
        return <FilterButton
          state={getButtonState(schemaIndex)}
          stickerCount={getSelectedCount(filterData.filter[el])}
          onClick={() => handleClick(schemaIndex)}
          key={schemaIndex}
        >{labelList[schemaIndex - 1]}</FilterButton>
      }
    )}
      <FilterPopup
        data={filterData.filter[fieldName]}
        shown={showFilterPopup}
        field={fieldName}
      />
    </div>
  )
}
