import { FC, useState } from 'react'

import { IStaredUser, ITrack } from '../../models'
import { getUserIdFromJWT, SecondsToMinSec } from '../../utils'

import { cnTrack } from './Track.classname'

import './Track.css'

// import icon from './assets/sprite.svg'
import note from './assets/note.svg'
// import like from './assets/like.svg'
import { useAddTrackToFavoriteMutation, useRemoveTrackFromFavoriteMutation } from '../../app/MusicPlayer/music-player.api'
// import { useCookies } from 'react-cookie'
import { useAppSelector } from '../../app/hooks'
import { selectAccessToken, selectRefreshToken } from '../../app/Auth/tokenSlice'
import { useRefreshToken } from '../Tracks/hooks'
import { useNavigate } from 'react-router-dom'

type TrackProps = {
  track: ITrack
}

export const Track: FC<TrackProps> = ({ track }) => {
  // const [ cookies ] = useCookies(['access'])
  const token = useAppSelector(selectAccessToken)
  const refreshToken = useAppSelector(selectRefreshToken)
  const handleRefreshToken = useRefreshToken()
  console.log('Token in Track -->', token)

  let navigate = useNavigate()

  
  const favorite = (
    track.stared_user.filter((el: IStaredUser) => el.id === getUserIdFromJWT(token!)).length > 0
  )

  const [ addTrackToFavorite ] = useAddTrackToFavoriteMutation()
  const [ removeTrackFromFavorite ] = useRemoveTrackFromFavoriteMutation()

  const toggleFaforiteTrack = async (trackId: number) => {
    console.log('toggleFavoriteTrack')
    try {
      favorite ? await removeTrackFromFavorite(trackId).unwrap() : await addTrackToFavorite(trackId).unwrap()
    } catch (err) {
      console.error('toggleFavoriteTrack -> catch err =', err)
      console.log('refreshToken -->', refreshToken)
      if (refreshToken) {
        await handleRefreshToken(refreshToken)
        toggleFaforiteTrack(trackId)
      } else {
        console.error('No refresh token')
        navigate('/login')
      }
    }
  }
  
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
            onClick={() => toggleFaforiteTrack(track.id)}
            width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.34372 2.25572H8.36529C9.29718 1.44175 11.7563 0.165765 13.9565 1.76734C17.3111 4.20921 14.2458 9.5 8.36529 13H8.34372M8.34378 2.25572H8.32221C7.39032 1.44175 4.93121 0.165765 2.73102 1.76734C-0.623552 4.20921 2.44172 9.5 8.32221 13H8.34378"/>
          </svg>        
          <span className={cnTrack('time-text')}>{SecondsToMinSec(+track.duration_in_seconds)}</span>
        </div>
    </div>
  )
}
