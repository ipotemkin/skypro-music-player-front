import { FC, useMemo } from 'react'

import { Track } from '../Track/Track'
import { ITrack } from '../../models'

import { cnTrackList } from './TrackList.classname'
import './TrackList.css'

import iconWatch from './assets/watch.svg'

const getSkeletonArray = () => {
  const resArray = []
  for (let i = 0; i < 20; i++) resArray.push(i)
  return resArray
}

type TrackListProps = {
  tracks: ITrack[],
  isLoading?: boolean
}

export const TrackList: FC<TrackListProps> = ({ tracks, isLoading = false }) => {
  const skeletonArray = useMemo(() => getSkeletonArray(), [])

  return <div className={cnTrackList()}>
    <div className={cnTrackList('title')}>
      <div className={cnTrackList('title', 'col01')}>ТРЕК</div>
      <div className={cnTrackList('title', 'col02')}>ИСПОЛНИТЕЛЬ</div>
      <div className={cnTrackList('title', 'col03')}>АЛЬБОМ</div>
      <div className={cnTrackList('title', 'col04')}>
        <img className={cnTrackList('title__svg')} src={iconWatch} alt="time" />
      </div>
    </div>
    <div className={cnTrackList('playlist')}>
      {isLoading && skeletonArray.map(track => <Track key={track} skeleton={true}/>)}
      {!isLoading && tracks.map(track => <Track track={track} key={track.id}/>)}
    </div>                        
  </div>
}
