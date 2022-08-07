import { FC, useState } from 'react'

import logo from './assets/logo.png'

import './SideMenu.css'

import { cnSideMenu } from './SideMenu.classname'

type SideMenuProps = {

}

export const SideMenu: FC<SideMenuProps> = () => {
  const [menuShown, setMenuShown] = useState(true)
  
  const burgerClickHandler = () => {
    console.log('burger menu')
    setMenuShown(!menuShown)
  }

  return (
    <nav className={cnSideMenu()}>
      <div className={cnSideMenu('logo')}>
        <img className={cnSideMenu('logo__image')} src={logo} alt="logo"/>
      </div>
      <div className={cnSideMenu('burger')} onClick={burgerClickHandler}>
        <span className={cnSideMenu('burger__line')}></span>
        <span className={cnSideMenu('burger__line')}></span>
        <span className={cnSideMenu('burger__line')}></span>
      </div>
      <div className={cnSideMenu('menu')} style={{ display: menuShown ? 'block' : 'none' } }>
        <ul className={cnSideMenu('menu__list')}>
          <li className={cnSideMenu('menu__item')}><a href="http://" className={cnSideMenu('menu__link')}>Главное</a></li>
          <li className={cnSideMenu('menu__item')}><a href="http://" className={cnSideMenu('menu__link')}>Мой плейлист</a></li>
          <li className={cnSideMenu('menu__item')}><a href="http://" className={cnSideMenu('menu__link')}>Войти</a></li>
        </ul>
      </div>
    </nav>
  )
}
