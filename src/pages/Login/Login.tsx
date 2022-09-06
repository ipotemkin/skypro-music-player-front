import { LoginForm } from "../../features/LoginForm/LoginForm"
import { useLogout } from "../../features/Tracks/hooks"

import { cnLogin } from './Login.classname'
import './Login.css'

export const Login = () => {
  useLogout()

  return (
    <div className={cnLogin()}>
      <LoginForm />
    </div>
  )
}
