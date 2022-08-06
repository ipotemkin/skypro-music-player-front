import React, { FC } from 'react'

import { cnInputField } from './InputField.classname'

import './InputField.css'

type InputFieldProps = {
  placeholder?: string
  type?: 'text' | 'password'
  value?: string,
  error?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// const noop = () => {}

export const InputField: FC<InputFieldProps> = ({ placeholder='', type='text', value='', error='', onChange }) => {
  return (
    <div>
      <input
        className={cnInputField()}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <p className={cnInputField('error')}>{error}</p>}
      <div style={{ marginBottom: 30 }}></div>
    </div>
  )
}
