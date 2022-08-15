import { TrackList } from '../../features/TrackList/TrackList'
// import { TrackType } from '../../features/Track/Track';
import { Search } from '../../features/Search/Search';
import { SideMenu } from '../../features/SideMenu/SideMenu';

// import { ITracks } from '../../models';
import { dataTracks } from '../../data';


import { cnPlaylist } from './Playlist.classname';
import './Playlist.css'
    
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
  
export const Playlist = () => {
  return (
    <div className={cnPlaylist()}>
      <SideMenu />
      <div className={cnPlaylist('centerblock')}>
        <Search />
        <h2 className={cnPlaylist('centerblock__title')}>Плейлист</h2>
        <TrackList tracks={dataTracks.results} />
      </div>
    </div>
  ) 
}
