import React, { useEffect, useState } from 'react'

import { cnLoginForm } from './LoginForm.classname'
import '../../index.css'

import logo from './assets/logo-black.png'
import { Button } from '../Button/Button'

import './LoginForm.css'
import { InputField } from '../InputField/InputField'
import { useNavigate } from 'react-router-dom'
import { ISignupUser, useUserSignupMutation, useUserTokenMutation } from '../../api/music-player.api'
import { useCookies } from 'react-cookie'
import { useAppDispatch } from '../../hooks/appHooks'
import { useLogout } from '../../hooks/userHooks'
import { setToken } from '../../slices/tokenSlice'
import {
  getErrorMessage,
  getPasswordErrorMessage,
  isPasswordsIdentical,
  isPasswordValid,
  isUsernameValid
} from './validators'
import { ILoginFormState } from '../../models'

const errorInitialState = {
  errorUsername: false,
  errorPassword: false,
  errorPasswordsDiffer: false,
}

const initialState: ILoginFormState = {
  username: '',
  password: '',
  passwordRepeat: '',
  register: false,
  enableSubmit: true,
  ...errorInitialState
}

export const LoginForm = () => {
  // eslint-disable-next-line
  const [ cookies, setCookies ] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()
  const [ loginError, setLoginError ] = useState(false)
  const [ getUserTokens, { data, error } ] = useUserTokenMutation()
  const [ postUserSignup ] = useUserSignupMutation()
  const logout = useLogout()
  const [form, setForm] = useState(initialState)
  let navigate = useNavigate()

  useEffect(() => {
    logout()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => { 
    if (data) {
      setCookies('access', data.access)    
      setCookies('refresh', data.refresh)
      dispatch(setToken({ access: data.access, refresh: data.refresh }))
      navigate('/tracks')
    }
  // eslint-disable-next-line
  }, [data])
  
  const handleRegister = () => {
    if (!form.register) setForm({ ...initialState, register: true, enableSubmit: false })
  }

  const handleGetInputField = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: e.target.value,
      ...errorInitialState
    }))
    setLoginError(false)
  }
  
  const isFormValid = () => {
    
    const usernameValid = isUsernameValid(form.username)
    if (!usernameValid) setForm(prev => ({ ...prev, errorUsername: true }))
    
    if (form.register && (form.password.length || form.passwordRepeat.length)) {
      
      // ???????? ???????????? ???? ??????????????????
      if (!isPasswordsIdentical(form.password, form.passwordRepeat)) {
        setForm(prev => ({ ...prev, errorPasswordsDiffer: true }))
        return false
      }
      
      if (usernameValid) return true
      
      return false
    }
    
    const passwordValid = isPasswordValid(form.password)
    if (!passwordValid) setForm(prev => ({ ...prev, errorPassword: true }))

    if (usernameValid && passwordValid) return true
    
    return false
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.enableSubmit) {
      setForm(prev => ({ ...prev, enableSubmit: true }))
      return
    }

    if (isFormValid()) {

      if (form.register) {
        handleUserSignup({
          username: form.username,
          email: form.username,
          password: form.password
        })
        
        setForm(initialState)
        return
      }

      // ?????????? ???????????? ???????? ?????????? ???? ??????????
      handleLoginUser()
    }

  }

  const handleLoginUser = async () => {
    try {
      await getUserTokens({ email: form.username, password: form.password }).unwrap()
    } catch {
      setLoginError(true)
    }    
  }

  const handleUserSignup = async (payload: ISignupUser) => {
    try {
      await postUserSignup(payload).unwrap()
    } catch (err) {
      console.log(`user signup error: ${JSON.stringify(err)}`)
    }
  }
  
  return (
    <form className={cnLoginForm()} onSubmit={onSubmitHandler}>
      <img className={cnLoginForm('logo')} src={logo} alt="logo" />
      
      <InputField
        placeholder="??????????"
        value={form.username}
        onChange={handleGetInputField('username')}
        error={form.errorUsername ? "?????????????? ?????? ????????????????????????" : ""}
      />
      <InputField
        type="password"
        placeholder="????????????"
        value={form.password}
        onChange={handleGetInputField('password')}
        error={getPasswordErrorMessage(form)}
      />
      
      {form.register && <InputField
        type="password"
        placeholder="?????????????????? ????????????"
        value={form.passwordRepeat}
        onChange={handleGetInputField('passwordRepeat')}
        error={getPasswordErrorMessage(form)}
      />}
      
      {
        loginError
        ? <p className={cnLoginForm('login-error')}><small>{ error && getErrorMessage(error) }</small></p>
        : <div className={cnLoginForm('no-login-error')} />
      }
      
      {!form.register && <Button type="submit">??????????</Button>}
      <Button
        buttonStyle={form.register ? "primary" : "secondary"}
        type={ form.register ? "submit" : "button"}
        // type="button"
        onClick={handleRegister}
      >
        ????????????????????????????????????
      </Button>
    </form>
  )
}
