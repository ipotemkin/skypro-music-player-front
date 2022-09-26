import { FC } from 'react'

import { ITrack } from '../../models'
import { secondsToMinSec } from '../../utils'

import note from './assets/note.svg'
import { useFavorite } from '../Tracks/hooks'
import { useAppDispatch } from '../../app/hooks'
import { setActiveTrackId } from './TrackSlice'

import { cnTrack } from './Track.classname'
import './Track.css'
import { HeartIcon } from '../icons'

type TrackProps = {
  track?: ITrack,
  skeleton?: boolean
}

export const Track: FC<TrackProps> = ({ track, skeleton = false }) => {
  const { favorite, toggleFavoriteTrack } = useFavorite(track)
  const dispatch = useAppDispatch()

  const handleSelectTrack = (trackId: number) => dispatch(setActiveTrackId(trackId))
  
  if (skeleton) {
    return <div className={cnTrack()}>
      <div className={cnTrack('title')} style={{ width: '40%' }}>
        <div className={cnTrack('title-image', 'skeleton')}></div>
        <div className={cnTrack('title-text', 'skeleton-line')}></div>
      </div>
      <div className={cnTrack('author')} style={{ width: '28%' }}>
        <div className={cnTrack('author', 'skeleton-line')}></div>
      </div>
      <div className={cnTrack('album')} style={{ width: '31%' }}>
        <div className={cnTrack('album', 'skeleton-line')}></div>
      </div>
    </div>
  }
  
  return <div className={cnTrack()} onClick={() => handleSelectTrack(track?.id || 0)}>
    <div className={cnTrack('title')}>
      <div className={cnTrack('title-image')}>
        <img src={note} className={cnTrack('title-svg')} alt="Иконка альбома" />
      </div>
      <div className={cnTrack('title-text')}>{track?.name}</div>
    </div>
    <div className={cnTrack('author')}>{track?.author}</div>
    <div className={cnTrack('album')}>{track?.album}</div>
    <div className={cnTrack('time')}>
      <div className={cnTrack('time-svg', { favorite })}
        onClick={(e) => {
          e.stopPropagation()
          toggleFavoriteTrack(track?.id || 0)
        }}
      >
        <HeartIcon/>
      </div>      
      <span className={cnTrack('time-text')}>{secondsToMinSec(+(track?.duration_in_seconds || 0))}</span>
    </div>
  </div>
}
