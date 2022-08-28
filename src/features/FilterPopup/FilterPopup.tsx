import { FC, useState } from 'react'

import { IFilterItem } from '../../models'

import './FilterPopup.css'

import { cnFilterPopup } from './FilterPopup.classname'
import { useAppDispatch } from '../../app/hooks'
import { toggleFilter, FieldNames } from '../../app/slices/FilterAuthorsSlice'


type FilterPopupProps = {
  data: IFilterItem[];
  shown?: boolean;
  field: FieldNames;
  onClick?: () => void;
}

export const FilterPopup: FC<FilterPopupProps> = ({ data, shown = false, field, onClick }) => {
  // чтобы принудительно обновлять компонент 
  // const [ flag, setFlag ] = useState(false)
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
            // item.selected = !item.selected
            // setFlag(prev => !prev)
            if (onClick) onClick()
          }}
        >
          {item.value}
        </span>
      ))}
    </div>
  )
}