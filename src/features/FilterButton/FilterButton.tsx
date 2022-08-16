import React, { FC, ReactNode } from 'react'

import { cnFilterButton } from './FilterButton.classname'
import './FilterButton.css'

type FilterButtonProps = {
  children: ReactNode,
  stickerCount?: number | undefined
  onClick?: (e: React.MouseEvent) => void
  state?: 'primary' | 'active'
}

export const FilterButton: FC<FilterButtonProps> = ({
  children, stickerCount=undefined, onClick, state='primary'
}) => {
  return (
    <button
      className={cnFilterButton({ type: state })}
      onClick={onClick}
    >
      {children}
      {stickerCount && <p className={cnFilterButton('sticker')}>{stickerCount}</p>}
    </button>
  )
}
