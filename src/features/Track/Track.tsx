import { FC } from 'react'

import { cnTrack } from './Track.classname'

import './Track.css'

// import icon from './assets/sprite.svg'
import note from './assets/note.svg'
import like from './assets/like.svg'

export type TrackType = {
  title: string
  author: string
  album: string
  time: string
}

type TrackProps = {
  track: TrackType
}

export const Track: FC<TrackProps> = ({ track }) => {
  return (
    // <div className="playlist__item">
      <div className={cnTrack()}>
        <div className={cnTrack('title')}>
          <div className={cnTrack('title-image')}>
            <img src={note} className={cnTrack('title-svg')} alt="" />
          </div>
          <div className={cnTrack('title-text')}>
            <a className="track__title-link" href="http://">{track.title}
              <span className={cnTrack('title-span')}></span>
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
          <img className={cnTrack('time-svg')} alt="time" src={like}/>
          <span className={cnTrack('time-text')}>{track.time}</span>
        </div>
      {/* </div> */}
    </div>
  )
}
