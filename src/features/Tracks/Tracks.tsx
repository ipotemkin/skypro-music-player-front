import { FC, useState } from 'react'

import { Filter } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search'
import { SideMenu } from '../../features/SideMenu/SideMenu'
import { Sidebar } from '../../features/Sidebar/Sidebar'
import { useFilteredTracks } from './hooks'
import { cnTracks } from './Tracks.classname'
import './Tracks.css'
// import { getUserIdFromJWT, parseJWT } from '../../utils'

type TracksProps = {
  title: string
  showFilter?: boolean
  showSidebar?: boolean
  hook: Function
}

export const Tracks: FC<TracksProps> = ({ title, showFilter = false, showSidebar = false, hook }) => {
  const [ searchString, setSearchString ] = useState('')
  const { isLoading, isError, data } = hook(searchString)  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)
    
  return (
    <div className={cnTracks()}>
      <SideMenu />
      {/* <button onClick={() => {
        console.log('cookies in tracks -->', cookies)
        console.log(parseJWT(cookies.access))
        console.log(getUserIdFromJWT(cookies.access))
      }}>tokens</button> */}
      <div className={cnTracks('centerblock')}>
        <Search onChange={handleChange} value={searchString}/>
        <h2 className={cnTracks('centerblock__title')}>{title}</h2>
        {showFilter && <Filter />}
        { isLoading && <p>Loading...</p>}
        { isError && <p>Error</p>}
        { data && <TrackList tracks={data} />}
      </div>
      {showSidebar && <Sidebar />}
    </div>
  ) 
}
