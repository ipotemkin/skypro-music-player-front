import { FC } from 'react'

import { Track } from '../Track/Track'
import { ITrack } from '../../models'

import { cnTrackList } from './TrackList.classname'
import './TrackList.css'

import iconWatch from './assets/watch.svg'
import { useCurrentUser } from '../Tracks/hooks'

type TrackListProps = {
  tracks: ITrack[]
}

export const TrackList: FC<TrackListProps> = ({ tracks }) => {
  return (
    <div className={cnTrackList()}>
      <div className={cnTrackList('title')}>
        <div className={cnTrackList('title', 'col01')}>ТРЕК</div>
        <div className={cnTrackList('title', 'col02')}>ИСПОЛНИТЕЛЬ</div>
        <div className={cnTrackList('title', 'col03')}>АЛЬБОМ</div>
        <div className={cnTrackList('title', 'col04')}>
          <img className={cnTrackList('title__svg')} src={iconWatch} alt="time" />
        </div>
      </div>
      <div className={cnTrackList('playlist')}>
        {tracks.map(track => <Track track={track} key={track.id}/>)}
      </div>                        
    </div>
  ) 
}
