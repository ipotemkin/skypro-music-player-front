import React, { FC, useEffect, useRef, useState } from 'react'
import { IPlayerState, ITrack } from '../../models'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { useFavorite } from '../Tracks/hooks'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setActiveTrackId } from '../Track/TrackSlice'
import { selectVolume, setVolume as setPlayerVolume } from './PlayerSlice'

import { cnPlayer, cnBar, cnTrackPlay } from './Player.classname'
import './Player.css'

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
              <div className={cnPlayer('btn-prev', '_btn')} onClick={handlePrevTrack}>
                <svg className={cnPlayer('btn-prev-svg')} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2V12.5" stroke="white"/>
                  <path d="M3 7L12.75 0.937823L12.75 13.0622L3 7Z" fill="#D9D9D9"/>
                </svg>

              </div>
              
              <div className={cnPlayer('btn-play', '_btn')} onClick={handlePlay} >
                <audio ref={audioRef} src={currentTrack?.track_file}>
                </audio>
                {!playerState.isPlaying && <svg className={cnPlayer('btn-play-svg')} width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10L-1.01012e-06 0.47372L-1.84293e-06 19.5263L15 10Z" fill="#D9D9D9"/>
                </svg>}
                {playerState.isPlaying && <svg className={cnPlayer('btn-play-svg')} width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <g>
                      <path fill="#D9D9D9" d="M0 0h24v24H0z"></path>
                      <path d="M8 8v8h8V8H8zM6 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7z" fill="#D9D9D9"></path>
                    </g> */}
                    <path d="M5 3V17 M10 3V17" stroke="#D9D9D9"/>                    
                </svg>}
              </div>
              
              <div ref={nextRef} className={cnPlayer('btn-next', '_btn')} onClick={handleNextTrack}>
                <svg className={cnPlayer('btn-next-svg')} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 2V12.5" stroke="white"/>
                  <path d="M13 7L3.25 0.937823L3.25 13.0622L13 7Z" fill="#D9D9D9"/>
                </svg>

              </div>
              <div className={cnPlayer('btn-repeat', playerState.loop ? '_btn-icon checked' : '_btn-icon')} onClick={handleLoop}>
              <svg className={cnPlayer('btn-repeat-svg')} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L5 0.113249V5.88675L10 3ZM7 14.5C3.96243 14.5 1.5 12.0376 1.5 9H0.5C0.5 12.5899 3.41015 15.5 7 15.5V14.5ZM1.5 9C1.5 5.96243 3.96243 3.5 7 3.5V2.5C3.41015 2.5 0.5 5.41015 0.5 9H1.5Z"
                fill="#696969"
                />
                <path d="M10 15L15 17.8868V12.1132L10 15ZM13 3.5C16.0376 3.5 18.5 5.96243 18.5 9H19.5C19.5 5.41015 16.5899 2.5 13 2.5V3.5ZM18.5 9C18.5 12.0376 16.0376 14.5 13 14.5V15.5C16.5899 15.5 19.5 12.5899 19.5 9H18.5Z"
                fill="#696969"
                />
              </svg>

              </div>
              <div className={cnPlayer('btn-shuffle', playerState.shuffle ? '_btn-icon checked' : '_btn-icon')} onClick={handleShuffle}>
              <svg className={cnPlayer('btn-shuffle-svg')} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 15L14.5 12.1132V17.8868L19.5 15ZM10.1632 12.0833L9.70863 12.2916L10.1632 12.0833ZM7.33683 5.91673L6.8823 6.12505L7.33683 5.91673ZM0.5 3.5H2.79151V2.5H0.5V3.5ZM6.8823 6.12505L9.70863 12.2916L10.6177 11.8749L7.79137 5.7084L6.8823 6.12505ZM14.7085 15.5H15V14.5H14.7085V15.5ZM9.70863 12.2916C10.6047 14.2466 12.5579 15.5 14.7085 15.5V14.5C12.949 14.5 11.3508 13.4745 10.6177 11.8749L9.70863 12.2916ZM2.79151 3.5C4.55105 3.5 6.14918 4.52552 6.8823 6.12505L7.79137 5.7084C6.89533 3.75341 4.94205 2.5 2.79151 2.5V3.5Z" fill="#696969"/>
                <path d="M19.5 3L14.5 5.88675V0.113249L19.5 3ZM10.1632 5.91673L9.70863 5.7084L10.1632 5.91673ZM7.33683 12.0833L6.8823 11.8749L7.33683 12.0833ZM0.5 14.5H2.79151V15.5H0.5V14.5ZM6.8823 11.8749L9.70863 5.7084L10.6177 6.12505L7.79137 12.2916L6.8823 11.8749ZM14.7085 2.5H15V3.5H14.7085V2.5ZM9.70863 5.7084C10.6047 3.75341 12.5579 2.5 14.7085 2.5V3.5C12.949 3.5 11.3508 4.52552 10.6177 6.12505L9.70863 5.7084ZM2.79151 14.5C4.55105 14.5 6.14918 13.4745 6.8823 11.8749L7.79137 12.2916C6.89533 14.2466 4.94205 15.5 2.79151 15.5V14.5Z" fill="#696969"/>
              </svg>

              </div>
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
