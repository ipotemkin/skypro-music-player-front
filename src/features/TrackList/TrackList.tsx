import { FC } from 'react'

import { cnTrackList, cnContent } from './TrackList.classname'

import './TrackList.css'

import { Track, TrackType } from '../Track/Track'

import iconWatch from './assets/watch.svg'

type TrackListProps = {
  tracks: TrackType[]
}

export const TrackList: FC<TrackListProps> = ({ tracks }) => {
  return (
    <div style={{ backgroundColor: 'black', width: 700 }}>
      <div className={cnContent('title')}>
        <div className={cnTrackList('title', 'col01')}>ТРЕК</div>
        <div className={cnTrackList('title', 'col02')}>ИСПОЛНИТЕЛЬ</div>
        <div className={cnTrackList('title', 'col03')}>АЛЬБОМ</div>
        <div className={cnTrackList('title', 'col04')}>
          <img className={cnTrackList('title__svg')} src={iconWatch} alt="time" />
        </div>
      </div>
      <div className={cnContent('playlist')}>
        {tracks.map(track => <Track track={track} key={track.title}/>)}
      </div>                        
    </div>
  ) 
}
