import React, { FC, useState } from 'react'

import { cnLoginForm } from './LoginForm.classname'
import '../../index.css'

import logo from './assets/logo-black.png'
import { Button } from '../Button/Button'

import './LoginForm.css'
import { InputField } from '../InputField/InputField'
import { useNavigate } from 'react-router-dom'

type LoginFormProps = {
}

export const LoginForm: FC<LoginFormProps> = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordRepeat: '',
    register: false,
    errorUsername: false,
    errorPassword: false,
    errorPasswordsDiffer: false,
    enableSubmit: true
  })
  let navigate = useNavigate()
  
  // const enter = () => console.log('enter')
  
  const registerHandler = () => {
    if (!form.register) {
      setForm(prev => ({
        ...prev,
        register: true,
        enableSubmit: false,
        errorUsername: false,
        errorPassword: false,
        errorPasswordsDiffer: false,
      }))
    }
  }

  const getInputFieldHandler = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm(prev => ({
      ...prev,
      [fieldName]: e.target.value,
      errorUsername: false,
      errorPassword: false,
      errorPasswordsDiffer: false,
    }))
  

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
      // здесь должен быть выход из формы
      console.log({ 'username': form.username, 'password': form.password })
      navigate('/tracks')
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

  // const resetErrors = () => setForm(prev => ({
  //    ...prev,
  //    errorUsername: false,
  //    errorPassword: false,
  //    errorPasswordsDiffer: false
  // }))
  
  return (
    <form className={cnLoginForm()} onSubmit={onSubmitHandler}>
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
      
      <div style={{ height: 10 }}></div>
      
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
