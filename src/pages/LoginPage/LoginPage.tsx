import { useLogout } from "../../app/hooks"
import { LoginForm } from "../../features/LoginForm/LoginForm"

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
