import { FC } from 'react'

import './FilterPopup.css'

import { cnFilterPopup } from './FilterPopup.classname'


type FilterPopupProps = {
    data: string[]
    shown?: boolean
}

export const FilterPopup: FC<FilterPopupProps> = ({ data, shown = false }) => {
    return (
        <div className={cnFilterPopup({'shown': shown})}>
            {data.map(item => <span className={cnFilterPopup('item')} key={item}>{item}</span>)}
        </div>
    )
}