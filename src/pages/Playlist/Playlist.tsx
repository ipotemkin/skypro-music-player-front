import { useState } from 'react'

import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search';
import { SideMenu } from '../../features/SideMenu/SideMenu';

import { cnPlaylist } from './Playlist.classname';
import './Playlist.css'
import { useFilteredTracks } from '../Tracks/hooks';
      
export const Playlist = () => {
  const [searchString, setSearchString] = useState('')
  const { isLoading, isError, data } = useFilteredTracks(searchString)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  return (
    <div className={cnPlaylist()}>
      <SideMenu />
      <div className={cnPlaylist('centerblock')}>
        <Search onChange={onChangeHandler} value={searchString}/>
        <h2 className={cnPlaylist('centerblock__title')}>Плейлист</h2>
        { isLoading && <p>Loading...</p>}
        { isError && <p>Error</p>}
        { data && <TrackList
          tracks={data}
        />}

      </div>
    </div>
  ) 
}
