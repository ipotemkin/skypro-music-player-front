import { LoginForm } from "../../features/LoginForm/LoginForm"
import { useLogout } from "../../features/Tracks/hooks"

import { cnLoginPage } from './LoginPage.classname'
import './LoginPage.css'

export const LoginPage = () => {
  useLogout()

  return (
    <div className={cnLoginPage()}>
      <LoginForm />
    </div>
  )
}
