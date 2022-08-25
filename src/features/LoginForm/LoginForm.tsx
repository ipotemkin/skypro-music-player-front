import React, { FC, useEffect, useReducer, useState } from 'react'

import { cnLoginForm } from './LoginForm.classname'
import '../../index.css'

import logo from './assets/logo-black.png'
import { Button } from '../Button/Button'

import './LoginForm.css'
import { InputField } from '../InputField/InputField'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation, ILoginUser, useUserTokenMutation } from '../../app/MusicPlayer/music-player.api'
// import { forEachChild } from 'typescript'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import { useCookies } from 'react-cookie'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAccessToken, selectTokens, setToken } from '../../app/Auth/tokenSlice'
import { convertCompilerOptionsFromJson } from 'typescript'

interface IUserTokens {
  access: string;
  refresh: string;
}

type LoginFormProps = {
}

export const LoginForm: FC<LoginFormProps> = () => {
  const [ cookies, setCookies ] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()
  const tokens = useAppSelector(selectTokens)

  if (cookies) {
    console.log('cookies set')
    dispatch(setToken({ access: cookies.access, refresh: cookies.refresh }))
  }

  // const [ LoginUser, { isError, data, error } ] = useLoginUserMutation()
  const [ username, setUsername ] = useState('')
  const [ loginError, setLoginError ] = useState(false)

  const [ getUserTokens, { isError, data, error } ] = useUserTokenMutation()

  const errorInitialState = {
    errorUsername: false,
    errorPassword: false,
    errorPasswordsDiffer: false,
  }
  
  const initialState = {
    username: '',
    password: '',
    passwordRepeat: '',
    register: false,
    enableSubmit: true,
    ...errorInitialState
  }
  
  const [form, setForm] = useState(initialState)
  let navigate = useNavigate()

  useEffect(() => { 
    // if (data) setUsername(data.username)
    if (data) {
      console.log('tokens -->', data)
      setCookies('access', data.access)    
      setCookies('refresh', data.refresh)
      dispatch(setToken({ access: data.access, refresh: data.refresh }))
    }
    if (cookies) {
      console.group('Cookies set:')
      console.log('access -->', cookies.access)
      console.log('refresh -->', cookies.refresh)
      console.groupEnd()
    }
    if (tokens) {
      console.group('Tokens in store:')
      console.log('access -->', tokens.access)
      console.log('refresh -->', tokens.refresh)
      console.groupEnd();
    }
  }, [data, cookies, tokens])

  // const enter = () => console.log('enter')
  
  const registerHandler = () => {
    if (!form.register) setForm({ ...initialState, register: true, enableSubmit: false })
  }

  const getInputFieldHandler = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: e.target.value,
      ...errorInitialState
    }))
    setLoginError(false)
  }
  

  const isFormValid = () => {
    
    const usernameValid = isUsernameValid()
    if (!usernameValid) setForm(prev => ({ ...prev, errorUsername: true }))
    
    if (form.register && (form.password.length || form.passwordRepeat.length)) {
      
      // если пароли не идентичны
      if (!isPasswordsIdentical()) {
        setForm(prev => ({ ...prev, errorPasswordsDiffer: true }))
        return false
      }
      
      if (usernameValid) return true
      
      return false
    }
    
    const passwordValid = isPasswordValid()
    if (!passwordValid) setForm(prev => ({ ...prev, errorPassword: true }))

    if (usernameValid && passwordValid) return true
    
    return false
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submit')

    if (!form.enableSubmit) {
      setForm(prev => ({ ...prev, enableSubmit: true }))
      return
    }

    if (isFormValid()) {

      if (form.register) {
        setForm(initialState)
        return
      }

      // здесь должен быть выход из формы
      console.log({ 'username': form.username, 'password': form.password })
      loginUserHandler()
      // navigate('/tracks')
    }

  }

  const isPasswordsIdentical = () => form.password === form.passwordRepeat

  // Здесь может быть валидатор username
  const isUsernameValid = () => form.username.length

  // Здесь может быть валидатор пароля
  const isPasswordValid = () => form.password.length

  const getPasswordErrorMessage = () => {
    if (form.register && form.errorPasswordsDiffer) return "Пароли не совпадают"
    if (form.errorPassword) return "Введите пароль"
    return ""
  }

  const loginUserHandler = async () => {
    try {
      // await LoginUser({ email: form.username, password: form.password }).unwrap()
      const { data: newTokens } = await getUserTokens({ email: form.username, password: form.password }).unwrap()
      console.log('newTokens -->', newTokens)

      console.log(data)
    } catch {
      setLoginError(true)
    }
    
    console.log('data -->', data)
    console.log('isError -->', isError)
  }

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
    if ('status' in error && 'data' in error) {
      const resArray = []
      const tempData = Object(error.data)
      for (let item in tempData) resArray.push(tempData[item])
      return resArray.join(', ')
    }
    return ''
  }
  
  return (
    <form className={cnLoginForm()} onSubmit={onSubmitHandler}>
      {/* { username && <p style={{ color: 'black' }}>{username}</p>} */}
      {/* { data && <p style={{ color: 'black' }}>{JSON.stringify(data)}</p>} */}

      <img src={logo} alt="logo" style={{ marginBottom: 30 }}/>
      
      <InputField
        placeholder="Логин"
        value={form.username}
        onChange={getInputFieldHandler('username')}
        error={form.errorUsername ? "Введите имя пользователя" : ""}
      />
      <InputField
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={getInputFieldHandler('password')}
        error={getPasswordErrorMessage()}
      />
      
      {form.register && <InputField
        type="password"
        placeholder="Повторите пароль"
        value={form.passwordRepeat}
        onChange={getInputFieldHandler('passwordRepeat')}
        error={getPasswordErrorMessage()}
      />}
      
      { loginError && 
        <p style={{ color: 'red' }}><small>{ error && getErrorMessage(error) }</small></p>}
      { !loginError && <div style={{ height: 10 }}></div>}
      
      {!form.register && <Button type="submit">Войти</Button>}
      <Button
        buttonStyle={form.register ? "primary" : "secondary"}
        type={ form.register ? "submit" : "button"}
        // type="button"
        onClick={registerHandler}
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}
