import React, { FC, useEffect, useRef, useState } from 'react'
import { IPlayerState, ITrack } from '../../models'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { useFavorite } from '../Tracks/hooks'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setActiveTrackId } from '../Track/TrackSlice'
import { selectVolume, setVolume as setPlayerVolume } from './PlayerSlice'

import { cnPlayer, cnBar, cnTrackPlay } from './Player.classname'
import './Player.css'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'
import PrevIcon from '../icons/PrevIcon'
import NextIcon from '../icons/NextIcon'
import LoopIcon from '../icons/LoopIcon'
import ShuffleIcon from '../icons/ShuffleIcon'

type PlayerProps = {
  data: ITrack[]
  trackId: number
}

const initialPLayerState: IPlayerState = {
  isPlaying: false,
  mute: false,
  progress: 0,
  loop: false,
  shuffle: false
}

export const Player: FC<PlayerProps> = ({ data, trackId }) => {
  const [ playerState, setPlayerState ] = useState<IPlayerState>(initialPLayerState)
  const [ currentTrack, setCurrentTrack ] = useState<ITrack>()
  const [ volume, setVolume ] = useState(useAppSelector(selectVolume))
  const { favorite, toggleFavoriteTrack } = useFavorite(currentTrack)
  const dispatch = useAppDispatch()
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)  // без ref не работает
  
  const getTrackById = (trackIdArg: number) => data.find(el => el.id === trackIdArg)

  // setting the current track
  useEffect(() => {
    if(data) setCurrentTrack(getTrackById(trackId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, trackId])
    
  const handlePlay = () => {
    if (playerState.isPlaying) audioRef.current!.pause()
    else audioRef.current!.play()
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  const handleLoop = () => {
    audioRef.current!.loop = !audioRef.current!.loop
    setPlayerState(prev => ({ ...prev, loop: !prev.loop }))
  }

  const handleShuffle = () => setPlayerState(prev => ({ ...prev, shuffle: !prev.shuffle }))

  const handleLike = () => {
    if (currentTrack) toggleFavoriteTrack(currentTrack.id)
  }

  const handleSetCurrentTrack = (currentTrackArg: ITrack) => {
    setCurrentTrack(currentTrackArg)
    dispatch(setActiveTrackId(currentTrackArg.id))
  }

  const handlePrevTrack = () => {
    const currentTrackIndex = getTrackIndex(currentTrack!.id)
    if (currentTrackIndex > 0) handleSetCurrentTrack(data[currentTrackIndex - 1])
  }  
  
  const handleNextTrack = () => {
    if (playerState.shuffle) {
      const nextTrackIndex = Math.floor(Math.random() * data.length)
      handleSetCurrentTrack(data[nextTrackIndex])
      return
    }

    const currentTrackIndex = getTrackIndex(currentTrack!.id)
    if (currentTrackIndex < data.length - 1) handleSetCurrentTrack(data[currentTrackIndex + 1])
  }

  const handleMute = () => {
    setPlayerState(prev => ({ ...prev, mute: !prev.mute }))
    if (audioRef.current) audioRef.current.muted = !audioRef.current.muted
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    audioRef.current!.volume = value/100
    setVolume(value)
    dispatch(setPlayerVolume(value))
  }

  const getTrackIndex = (trackIdArg: number) => {
    for(let idx = 0; idx < data.length; idx++) {
      if (data[idx].id === trackIdArg) return idx
    }
    return -1
  }

  useEffect(() => {
    audioRef.current!.onended = () => {
      if (!playerState.loop) nextRef.current?.click()
      else setPlayerState(prev => ({ ...prev, isPLaying: false }))
    }  
    audioRef.current!.ontimeupdate = () => {
      setPlayerState(prev => ({ ...prev, progress: audioRef.current!.currentTime/audioRef.current!.duration*100 }))
    }
    audioRef.current!.volume = volume/100

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (playerState.isPlaying) audioRef.current.play()
      setPlayerState(prev => ({ ...prev, progress: 0 }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack])

  return (
    <div className={cnBar()}>
      <div className={cnBar('content')}>
        <ProgressBar value={playerState.progress} />
        <div className={cnBar('player-block')}>
          <div className={cnBar('player', 'player')}>
            <div className={cnPlayer('controls')}>
              
              <div className={cnPlayer('btn-prev', '_btn')}
                onClick={handlePrevTrack}
              ><PrevIcon/></div>
              
              <div className={cnPlayer('btn-play', '_btn')} onClick={handlePlay} >
                <audio ref={audioRef} src={currentTrack?.track_file}/>
                {playerState.isPlaying ? <PauseIcon/> : <PlayIcon/>}
              </div>
              
              <div ref={nextRef} className={cnPlayer('btn-next', '_btn')}
                onClick={handleNextTrack}
              ><NextIcon/></div>
              
              <div className={cnPlayer('btn-repeat', '_btn-icon' + (playerState.loop ? ' checked' : ''))}
                onClick={handleLoop}
              ><LoopIcon/></div>
              
              <div className={cnPlayer('btn-shuffle', '_btn-icon' + (playerState.shuffle ? ' checked' : ''))}
                onClick={handleShuffle}><ShuffleIcon/></div>
            
            </div>
            
            <div className={cnPlayer('track-play', 'track-play')}>
              <div className={cnTrackPlay('contain')}>
                <div className={cnTrackPlay('image')}>
                  <svg className={cnTrackPlay('svg')} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16V1.9697L19 1V13" stroke="#4E4E4E"/>
                    <ellipse cx="4.5" cy="16" rx="3.5" ry="2" stroke="#4E4E4E"/>
                    <ellipse cx="15.5" cy="13" rx="3.5" ry="2" stroke="#4E4E4E"/>
                  </svg>

                </div>
                <div className={cnTrackPlay('author')}>
                  <p className={cnTrackPlay('author-link')}>{ currentTrack?.name }</p>
                </div>
                <div className={cnTrackPlay('album')}>
                  <p className={cnTrackPlay('album-link')}>{ currentTrack?.author }</p>
                </div>
              </div>

              <div className={cnTrackPlay('like-dis')}>
                <div className={cnTrackPlay('like', favorite ? '_btn-icon checked' : '_btn-icon')} onClick={handleLike}>
                  <svg className={cnTrackPlay('like-svg')} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#696969">
                    <path d="M8.34372 2.25572H8.36529C9.29718 1.44175 11.7563 0.165765 13.9565 1.76734C17.3111 4.20921 14.2458 9.5 8.36529 13H8.34372M8.34378 2.25572H8.32221C7.39032 1.44175 4.93121 0.165765 2.73102 1.76734C-0.623552 4.20921 2.44172 9.5 8.32221 13H8.34378"/>
                  </svg>

                </div>
              </div>
            </div>
          </div>
          <div className={cnBar('volume-block', 'volume')}>
            <div className={cnBar('volume__content')}>
              <div className={cnBar('volume__image')} onClick={handleMute}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_2985_507" fill="white">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 0L3 5H0V13H3L8 18V0Z"/>
                </mask>
                <path d="M3 5V6H3.41421L3.70711 5.70711L3 5ZM8 0H9V-2.41421L7.29289 -0.707107L8 0ZM0 5V4H-1V5H0ZM0 13H-1V14H0V13ZM3 13L3.70711 12.2929L3.41421 12H3V13ZM8 18L7.29289 18.7071L9 20.4142V18H8ZM3.70711 5.70711L8.70711 0.707107L7.29289 -0.707107L2.29289 4.29289L3.70711 5.70711ZM0 6H3V4H0V6ZM1 13V5H-1V13H1ZM3 12H0V14H3V12ZM8.70711 17.2929L3.70711 12.2929L2.29289 13.7071L7.29289 18.7071L8.70711 17.2929ZM7 0V18H9V0H7Z" fill="white" mask="url(#path-1-inside-1_2985_507)"/>
                <path d="M11 13C12.1046 13 13 11.2091 13 9C13 6.79086 12.1046 5 11 5" stroke={ playerState.mute ? "black" : "white" }/>
              </svg>

              </div>
              <div className={cnBar('volume__progress', '_btn')}>
                <input
                  className={cnBar('volume__progress-line', '_btn')}
                  type="range"
                  name="range"
                  value={volume}
                  onChange={handleVolume}/>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
