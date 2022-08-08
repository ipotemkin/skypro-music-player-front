import React, { FC, ReactNode } from 'react'

import { cnFilterButton } from './FilterButton.classname'
import './FilterButton.css'

type FilterButtonProps = {
  children: ReactNode,
  onClick?: (e: React.MouseEvent) => void
}

export const FilterButton: FC<FilterButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className={cnFilterButton()}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
