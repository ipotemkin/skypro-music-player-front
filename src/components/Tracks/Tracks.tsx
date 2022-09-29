import { FC, useState } from 'react'

import { Filter } from '../Filter/Filter'
import { TrackList } from '../TrackList/TrackList'
import { Search } from '../Search/Search'
import { SideMenu } from '../SideMenu/SideMenu'
import { Sidebar } from '../Sidebar/Sidebar'
import { Player } from '../Player/Player'
import { useAppSelector } from '../../hooks/appHooks'
import { selectActiveTrackId } from '../../slices/trackSlice'
import { ITrack } from '../../models'

import { cnTracks } from './Tracks.classname'
import './Tracks.css'

type TracksProps = {
  title: string
  showFilter?: boolean
  tracksHook: Function
  collectionId?: number
}

export const Tracks: FC<TracksProps> = ({
  title, showFilter = false, tracksHook, collectionId = 1
}) => {
  const [ searchString, setSearchString ] = useState('')
  const { isLoading, isError, data } = tracksHook(searchString, collectionId)
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
    {activeTrackId !== undefined && isTrackIdInList(activeTrackId || 0)
      && <Player data={data} trackId={activeTrackId || 0}/>}
  </div>
}
