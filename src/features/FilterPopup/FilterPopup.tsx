import { FC, useEffect, useState } from 'react'

import { IFilterItem } from '../../models'

import './FilterPopup.css'

import { cnFilterPopup } from './FilterPopup.classname'


type FilterPopupProps = {
  data: IFilterItem[];
  shown?: boolean;
  onClick?: () => void;
}

export const FilterPopup: FC<FilterPopupProps> = ({ data, shown = false, onClick }) => {
  const [flag, setFlag] = useState(false)
  
  return (
    <div className={cnFilterPopup({'shown': shown})}>
      {data.map((item: IFilterItem) => (
          <span
            className={cnFilterPopup('item', {'selected': item.selected})} 
            key={item.value}
            onClick={() => {
              item.selected = !item.selected
              setFlag(prev => !prev)
              if (onClick) onClick()
            }}
          >
            {item.value}
          </span>
      ))}
    </div>
  )
}