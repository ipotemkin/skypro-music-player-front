import { FC } from 'react'

import { ITrack } from '../../models'
import { SecondsToMinSec } from '../../utils'

import { cnTrack } from './Track.classname'

import './Track.css'

import note from './assets/note.svg'
import { useFavorite } from '../Tracks/hooks'

type TrackProps = {
  track: ITrack,
}

export const Track: FC<TrackProps> = ({ track }) => {
  const { favorite, toggleFavoriteTrack } = useFavorite(track)
  
  return (
      <div className={cnTrack()}>
        <div className={cnTrack('title')}>
          <div className={cnTrack('title-image')}>
            <img src={note} className={cnTrack('title-svg')} alt="" />
          </div>
          <div className={cnTrack('title-text')}>
            <a className="track__title-link" href="http://">{track.name}
              {/* следующая стрчка непонятно, зачем - пока закомментировал */}
              {/* <span className={cnTrack('title-span')}></span> */}
            </a>
          </div>
        </div>
        <div className={cnTrack('author')}>
          <a className={cnTrack('author-link')} href="http://">{track.author}</a>
        </div>
        <div className={cnTrack('album')}>
          <a className={cnTrack('album-link')} href="http://">{track.album}</a>
        </div>
        <div className={cnTrack('time')}>
          <svg
            className={cnTrack('time-svg', { favorite })}
            onClick={() => toggleFavoriteTrack(track.id)}
            width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.34372 2.25572H8.36529C9.29718 1.44175 11.7563 0.165765 13.9565 1.76734C17.3111 4.20921 14.2458 9.5 8.36529 13H8.34372M8.34378 2.25572H8.32221C7.39032 1.44175 4.93121 0.165765 2.73102 1.76734C-0.623552 4.20921 2.44172 9.5 8.32221 13H8.34378"/>
          </svg>        
          <span className={cnTrack('time-text')}>{SecondsToMinSec(+track.duration_in_seconds)}</span>
        </div>
    </div>
  )
}
