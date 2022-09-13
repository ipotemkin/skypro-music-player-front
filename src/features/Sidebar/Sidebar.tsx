import { useCookies } from 'react-cookie'
import { selectAccessToken } from '../../app/Auth/tokenSlice'
import { useAppSelector } from '../../app/hooks'
import { useGetCurrentUserQuery } from '../../app/MusicPlayer/music-player.api'
import { useAuthUser } from '../Tracks/hooks'
import playlist1 from './assets/playlist01.png'
import playlist2 from './assets/playlist02.png'
import playlist3 from './assets/playlist03.png'

export const Sidebar = () => {
  const { data: user } = useAuthUser();
  // const token = useAppSelector(selectAccessToken)
  // const [cookies] = useCookies(['access'])
  
  return (
    <>
      <div className="main__sidebar sidebar">
        <div className="sidebar__personal">
          <p className="sidebar__personal-name">{user?.email}</p>
          {/* <p className="sidebar__personal-name">access token = {token}</p>
          <p className="sidebar__personal-name">cokkies.access = {cookies.access}</p> */}
          <div className="sidebar__avatar">         
          </div>
        </div>
        <div className="sidebar__block">
          <div className="sidebar__list">
            <div className="sidebar__item">
              <a className="sidebar__link" href="/collection/1">
                <img className="sidebar__img" src={playlist1} alt="day's playlist" />
              </a>
            </div>
            <div className="sidebar__item">
              <a className="sidebar__link" href="/collection/2">
                <img className="sidebar__img" src={playlist2} alt="day's playlist" />
              </a>
            </div>
            <div className="sidebar__item">
                <a className="sidebar__link" href="/collection/3">
                    <img className="sidebar__img" src={playlist3} alt="day's playlist" />
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
