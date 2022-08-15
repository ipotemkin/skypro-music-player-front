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
  return (
    <div className={cnTracks()}>
      <SideMenu />
      <div className={cnTracks('centerblock')}>
        <Search />
        <h2 className={cnTracks('centerblock__title')}>Треки</h2>
        <Filter />
        <TrackList tracks={dataTracks.results} />
      </div>
      <Sidebar />
    </div>
  ) 
}
