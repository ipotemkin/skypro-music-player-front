import { FC, useState } from 'react'
import { selectUser } from '../../app/Auth/userSlice'
import { useAppSelector } from '../../app/hooks'
import playlist1 from './assets/playlist01.png'
import playlist2 from './assets/playlist02.png'
import playlist3 from './assets/playlist03.png'

import { cnSidebar } from './Sidebar.classname'
import './Sidebar.css'

const playlistPics: string[] = [
  playlist1,
  playlist2,
  playlist3
]

type PictureProps = {
  source: string
}

// a component which waits until the source is loaded
const Picture: FC<PictureProps> = ({ source }) => {
  const [ loaded, setLoaded ] = useState(false)

  const handleLoaded = () => setLoaded(true)

  return (
    <>
      {!loaded && <div className={cnSidebar('img', 'skeleton')} />}
      <img
        className={cnSidebar('img')}
        src={source}
        alt="day's playlist"
        onLoad={handleLoaded}
        style={{ display: loaded ? 'block': 'none'}} 
      />
    </>
  )
}

export const Sidebar = () => {
  const user = useAppSelector(selectUser)

  return (
    <div className="main__sidebar sidebar">
      {/* <div className="sidebar__personal"> */}
      <div className={cnSidebar('personal')}>
        <p className={cnSidebar('personal-name')}>{user.email}</p>
        {/* <p className="sidebar__personal-name">access token = {token}</p>
        <p className="sidebar__personal-name">cokkies.access = {cookies.access}</p> */}
        {/* <div className="sidebar__avatar"></div> */}
      </div>
      <div className={cnSidebar('block')} >
        <div className={cnSidebar('list')} >
          {playlistPics.map((el, idx) => (
            <div className={cnSidebar('item')} key={el}>
              <a className={cnSidebar('link')} href={`/collection/${idx+1}`}>
                <Picture source={el} />
              </a>
            </div>            
          ))}
        </div>
      </div>
    </div>
  )
}
