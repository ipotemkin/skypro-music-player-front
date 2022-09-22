import { LoginForm } from "../../features/LoginForm/LoginForm"

import { cnLoginPage } from './LoginPage.classname'
import './LoginPage.css'

export const LoginPage = () => {
  return (
    <div className={cnLoginPage()}>
      <LoginForm />
    </div>
  )
}
