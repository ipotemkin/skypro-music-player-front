import { FC } from 'react'

import { IFilterItem } from '../../models'

import './FilterPopup.css'

import { cnFilterPopup } from './FilterPopup.classname'
import { useAppDispatch } from '../../hooks/appHooks'
import { toggleFilter, FieldNames } from '../Filter/FilterSlice'


type FilterPopupProps = {
  data: IFilterItem[];
  shown?: boolean;
  field: FieldNames;
}

export const FilterPopup: FC<FilterPopupProps> = ({ data, shown = false, field }) => {
  const dispatch = useAppDispatch()
  
  return (
    <div className={cnFilterPopup({'shown': shown})}>
      {data.map((item: IFilterItem) => (
        <span
          className={cnFilterPopup('item', {'selected': item.selected})} 
          key={item.value}
          onClick={() => {
            dispatch(toggleFilter({ field, value: item.value }))
          }}
        >
          {item.value}
        </span>
      ))}
    </div>
  )
}