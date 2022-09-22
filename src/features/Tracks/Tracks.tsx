import { FC, useState } from 'react'

import { Filter } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search'
import { SideMenu } from '../../features/SideMenu/SideMenu'
import { Sidebar } from '../../features/Sidebar/Sidebar'
import { Player } from '../Player/Player'
import { useAppSelector } from '../../app/hooks'
import { selectActiveTrackId } from '../Track/TrackSlice'
import { ITrack } from '../../models'

import { cnTracks } from './Tracks.classname'
import './Tracks.css'

type TracksProps = {
  title: string
  showFilter?: boolean
  // showSidebar?: boolean  // I left this variable till the final project submit
  hook: Function  // set a hook to show playlists or collections
  collectionId?: number
}

export const Tracks: FC<TracksProps> = ({
  title, showFilter = false, hook, collectionId
}) => {
  const [ searchString, setSearchString ] = useState('')
  const { isLoading, isError, data } = collectionId ? hook(searchString, collectionId) : hook(searchString)  
  const activeTrackId = useAppSelector(selectActiveTrackId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  const isTrackIdInList = (trackIdArg: number) => data.find((el: ITrack) => el.id === trackIdArg)
    
  return <div className={cnTracks()}>
    <SideMenu />
    <div className={cnTracks('centerblock')}>
      <Search onChange={handleChange} value={searchString}/>
      <h2 className={cnTracks('centerblock__title')}>{title}</h2>
      {showFilter && <Filter />}
      { isError && <p>Error</p>}
      <TrackList tracks={data} isLoading={isLoading}/>
    </div>
    <Sidebar />
    {/* {showSidebar && <Sidebar />} */}
    {activeTrackId !== undefined && isTrackIdInList(activeTrackId.value || 0)
      && <Player data={data} trackId={activeTrackId.value || 0}/>}
  </div>
}
