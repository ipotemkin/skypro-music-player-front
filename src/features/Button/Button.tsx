import React, { FC, ReactNode } from 'react'

import { cnButton } from './Button.classname'

import './Button.css'

type ButtonProps = {
  children: ReactNode
  buttonStyle?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  onClick?: (e: React.MouseEvent) => void
}

// const noop = () => {}

export const Button: FC<ButtonProps> = ({ children, buttonStyle='primary', type='button', onClick }) => {
  return <button
    className={cnButton({'type': buttonStyle})}
    type={type}
    onClick={onClick}
    >
      {children}
  </button>
}
