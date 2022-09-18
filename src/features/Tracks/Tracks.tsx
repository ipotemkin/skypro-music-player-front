import { FC, useState } from 'react'

import { Filter } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search'
import { SideMenu } from '../../features/SideMenu/SideMenu'
import { Sidebar } from '../../features/Sidebar/Sidebar'
import { cnTracks } from './Tracks.classname'
import './Tracks.css'
import { Player } from '../Player/Player'
// import { checkJWTExpTime, getJWTExpTime, getUserIdFromJWT, parseJWT } from '../../utils'
// import { useCookies } from 'react-cookie'
// import { useCurrentUser } from './hooks'
// import { useGetCurrentUserQuery } from '../../app/MusicPlayer/music-player.api'
import { useAppSelector } from '../../app/hooks'
import { selectActiveTrackId } from '../Track/TrackSlice'
import { ITrack } from '../../models'

// const TestButton = () => {
//   const timestampRef = useRef(Date.now()).current;
//   const { data } = useGetCurrentUserQuery(timestampRef);

//   return <button>
//     { JSON.stringify(data) }
//   </button>
// }


type TracksProps = {
  title: string
  showFilter?: boolean
  showSidebar?: boolean
  hook: Function
  collectionId?: number
}

export const Tracks: FC<TracksProps> = ({ title, showFilter = false, showSidebar = false, hook, collectionId }) => {
  const [ searchString, setSearchString ] = useState('')
  const { isLoading, isError, data } = collectionId ? hook(searchString, collectionId) : hook(searchString)  
  // const [ cookies ] = useCookies(['access', 'refresh'])
  // const [ currentTrackId, setCurrentTrackId ] = useState<number>()
  const activeTrackId = useAppSelector(selectActiveTrackId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  const isTrackIdInList = (trackIdArg: number) => data.find((el: ITrack) => el.id === trackIdArg)
    
  return (
    <div className={cnTracks()}>
      <SideMenu />
      {/* <button onClick={() => {
        console.log('cookies in tracks -->', cookies)
        console.log(parseJWT(cookies.access))
        console.log(getUserIdFromJWT(cookies.access))
        console.log(getJWTExpTime(cookies.access))
        console.log(checkJWTExpTime(cookies.access))
        console.log('user -->', user)
        if (newTab) newTab.focus()
      }}>tokens</button> */}
      <div className={cnTracks('centerblock')}>
        <Search onChange={handleChange} value={searchString}/>
        <h2 className={cnTracks('centerblock__title')}>{title}</h2>
        {showFilter && <Filter />}
        {/* { isLoading && <p>Loading...</p>} */}
        { isError && <p>Error</p>}
        {/* { data && <TrackList tracks={data} isLoading={isLoading}/>} */}
        <TrackList tracks={data} isLoading={isLoading}/>
      </div>
      <Sidebar />
      {/* {showSidebar && <Sidebar />} */}
      {activeTrackId !== undefined
        && isTrackIdInList(activeTrackId.value || 0)
        && <Player data={data} trackId={activeTrackId.value || 0}/>}
    </div>
  ) 
}
