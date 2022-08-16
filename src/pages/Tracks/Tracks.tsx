import { Filter } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
// import { TrackType } from '../../features/Track/Track';
import { Search } from '../../features/Search/Search';
import { SideMenu } from '../../features/SideMenu/SideMenu';
import { Sidebar } from '../../features/Sidebar/Sidebar';
import { dataTracks } from '../../data';
import { ITracks } from '../../models';


import { cnTracks } from './Tracks.classname';
import './Tracks.css'
import { useGetTracksQuery } from '../../app/MusicPlayer/music-player.api';
import { useEffect } from 'react';
    
// const sampleTrackList: TrackType[] = [
//   {title: 'Guilt', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt2', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt3', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt4', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt5', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt6', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt7', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
//   {title: 'Guilt8', author: 'Nero', album: 'Welcome Reality', time: '4:45'},
// ]
  
export const Tracks = () => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1)
  // useEffect(() => {
  //   fetch('http://51.250.72.80:8090/catalog/track/all/')
  //   .then((result) => result.json())
  //   .then()
  // }, [] )
  
  console.log('error -->', error)
  console.log('data -->', data)
  console.log('isError -->', isError)
  
  return (
    <div className={cnTracks()}>
      <SideMenu />
      <div className={cnTracks('centerblock')}>
        <Search />
        <h2 className={cnTracks('centerblock__title')}>Треки</h2>
        <Filter />
        { isLoading && <p>Loading...</p>}
        { isError && <p>Error</p>}
        { data && <TrackList tracks={data} />}
      </div>
      <Sidebar />
    </div>
  ) 
}
