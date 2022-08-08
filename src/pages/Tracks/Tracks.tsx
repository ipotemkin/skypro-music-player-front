import { Filter } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'

// import '../../index.css'

import { TrackType } from '../../features/Track/Track';

import { Search } from '../../features/Search/Search';
import { SideMenu } from '../../features/SideMenu/SideMenu';

import './Tracks.css'

const sampleTrack: TrackType = {
    title: 'Guilt',
    author: 'Nero',
    album: 'Welcome Reality',
    time: '4:45'
  }
  
  const sampleTrack2: TrackType = {
    title: 'Guilt2',
    author: 'Nero2',
    album: 'Welcome Reality2',
    time: '4:45'
  }
  
  const sampleTrack3: TrackType = {
    title: 'Guilt3',
    author: 'Nero3',
    album: 'Welcome Reality3',
    time: '3:00'
  }
  
  
  const sampleTrackList: TrackType[] = [
    sampleTrack,
    sampleTrack2,
    sampleTrack3
  ]
  
export const Tracks = () => {
  return (
    <div className="canvas">
      <SideMenu />
      <div className="main__centerblock centerblock" style={{ backgroundColor: 'black' }}>
        <Search />
        <h2 className="centerblock__h2" style={{ textAlign: 'left' }}>Треки</h2>
        <div className="centerblock__filter filter">
          <Filter />
        </div>
        <div className="centerblock__content">
          <TrackList tracks={sampleTrackList}/>
        </div>
      </div>
    </div>
  ) 
}
