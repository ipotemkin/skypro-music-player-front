import { FC } from 'react'

import { ITrack } from '../../models'
import { SecondsToMinSec } from '../../utils'

import { cnTrack } from './Track.classname'

import './Track.css'

import note from './assets/note.svg'
import { useFavorite } from '../Tracks/hooks'
import { useAppDispatch } from '../../app/hooks'
import { setActiveTrackId } from './TrackSlice'

type TrackProps = {
  track?: ITrack,
  skeleton?: boolean
}

export const Track: FC<TrackProps> = ({ track, skeleton = false }) => {
  const { favorite, toggleFavoriteTrack } = useFavorite(track)
  const dispatch = useAppDispatch();

  const handleSelectTrack = (trackId: number) => {
    console.log(`clicked a song with ID=${track?.id}`)
    dispatch(setActiveTrackId(trackId))
  }
  
  if (skeleton) {
    console.log('skeleton')

    return (
      <div className={cnTrack()} onClick={() => handleSelectTrack(track?.id || 0)}>
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
    )
  }
  
  return (
      <div className={cnTrack()} onClick={() => handleSelectTrack(track?.id || 0)}>
        <div className={cnTrack('title')}>
          <div className={cnTrack('title-image')}>
            <img src={note} className={cnTrack('title-svg')} alt="" />
          </div>
          <div className={cnTrack('title-text')}>{track?.name}</div>
        </div>
        <div className={cnTrack('author')}>{track?.author}</div>
        <div className={cnTrack('album')}>{track?.album}</div>
        <div className={cnTrack('time')}>
          <svg
            className={cnTrack('time-svg', { favorite })}
            onClick={() => toggleFavoriteTrack(track?.id || 0)}
            width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.34372 2.25572H8.36529C9.29718 1.44175 11.7563 0.165765 13.9565 1.76734C17.3111 4.20921 14.2458 9.5 8.36529 13H8.34372M8.34378 2.25572H8.32221C7.39032 1.44175 4.93121 0.165765 2.73102 1.76734C-0.623552 4.20921 2.44172 9.5 8.32221 13H8.34378"/>
          </svg>        
          <span className={cnTrack('time-text')}>{SecondsToMinSec(+(track?.duration_in_seconds || 0))}</span>
        </div>
    </div>
  )
}
