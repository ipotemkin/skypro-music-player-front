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
  children, stickerCount=0, onClick, state='primary'
}) => {
  // const isSticker = (stickers: number) => stickers > 0
  
  return (
    <button
      className={cnFilterButton({ type: state })}
      onClick={onClick}
    >
      {children}
      {(stickerCount > 0) && <p className={cnFilterButton('sticker')}>{stickerCount}</p>}
    </button>
  )
}
