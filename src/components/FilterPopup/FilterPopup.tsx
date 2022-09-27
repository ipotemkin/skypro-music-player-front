import { FC } from 'react'

import { IFilterItem } from '../../models'

import './FilterPopup.css'

import { cnFilterPopup } from './FilterPopup.classname'
import { useAppDispatch } from '../../hooks'
import { toggleFilter, FieldNames } from '../Filter/FilterSlice'


type FilterPopupProps = {
  data: IFilterItem[];
  shown?: boolean;
  field: FieldNames;
}

export const FilterPopup: FC<FilterPopupProps> = ({ data, shown = false, field }) => {
  const dispatch = useAppDispatch()
  console.group('FilterPopup:')
  console.log('data -->', data)
  console.groupEnd()
  
  return (
    <div className={cnFilterPopup({'shown': shown})}>
      {data.map((item: IFilterItem) => (
        <span
          className={cnFilterPopup('item', {'selected': item.selected})} 
          key={item.value}
          onClick={() => {
            console.log('filter click!')
            console.log(item.value)
            dispatch(toggleFilter({ field, value: item.value }))
          }}
        >
          {item.value}
        </span>
      ))}
    </div>
  )
}