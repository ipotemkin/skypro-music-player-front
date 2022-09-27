import { FC, useState } from 'react'

import logo from './assets/logo.png'

import './SideMenu.css'

import { cnSideMenu } from './SideMenu.classname'
import { Link } from 'react-router-dom'

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
          <li className={cnSideMenu('menu__item')}><Link to="/tracks" className={cnSideMenu('menu__link')}>Главное</Link></li>
          <li className={cnSideMenu('menu__item')}><Link to="/playlist" className={cnSideMenu('menu__link')}>Мой плейлист</Link></li>
          <li className={cnSideMenu('menu__item')}><Link to="/login" className={cnSideMenu('menu__link')}>Выйти</Link></li>
        </ul>
      </div>
    </nav>
  )
}
