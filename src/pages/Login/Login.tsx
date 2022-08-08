import { LoginForm } from "../../features/LoginForm/LoginForm"

import { cnLogin } from './Login.classname'
import './Login.css'

export const Login = () => {
  return (
    <div className={cnLogin()}>
      <LoginForm />
    </div>
  )
}
