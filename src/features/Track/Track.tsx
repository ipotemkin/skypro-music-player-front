import { FC } from 'react'

import { ITrack } from '../../models'
import { SecondsToMinSec } from '../../utils'

import { cnTrack } from './Track.classname'

import './Track.css'

// import icon from './assets/sprite.svg'
import note from './assets/note.svg'
import like from './assets/like.svg'
import { useAddTrackToFavoriteMutation } from '../../app/MusicPlayer/music-player.api'
import { useCookies } from 'react-cookie'

// export type TrackType = {
//   title: string
//   author: string
//   album: string
//   time: string
// }

type TrackProps = {
  track: ITrack
}

export const Track: FC<TrackProps> = ({ track }) => {
  const [ cookies ] = useCookies(['access'])

  const [ addTrackToFavorite, { isError, error } ] = useAddTrackToFavoriteMutation()

  const addTrackToFavoriteHandler = async (trackId: number) => {
    await addTrackToFavorite(trackId)
    console.log(isError)
    console.log(JSON.stringify(error))
  }
  
  return (
    // <div className="playlist__item">
      <div className={cnTrack()}>
        <div className={cnTrack('title')}>
          <div className={cnTrack('title-image')}>
            <img src={note} className={cnTrack('title-svg')} alt="" />
          </div>
          <div className={cnTrack('title-text')}>
            <a className="track__title-link" href="http://">{track.name}
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
          <img className={cnTrack('time-svg')} alt="time" src={like} onClick={() => addTrackToFavoriteHandler(track.id)}/>
          <span className={cnTrack('time-text')}>{SecondsToMinSec(+track.duration_in_seconds)}</span>
          {/* <span className={cnTrack('time-text')}>{track.duration_in_seconds}</span> */}
        </div>
      {/* </div> */}
    </div>
  )
}
