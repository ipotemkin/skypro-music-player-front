import React, { FC, useEffect, useRef, useState } from 'react'

import { IPlayerState, ITrack } from '../../models'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { useFavoriteTrack } from '../../hooks/trackHooks'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { setActiveTrackId } from '../../slices/trackSlice'
import { selectVolume, setVolume as setPlayerVolume } from '../../slices/playerSlice'
import { 
  PauseIcon,
  PlayIcon,
  PrevIcon,
  NextIcon,
  LoopIcon,
  ShuffleIcon,
  TrackIcon,
  HeartIcon,
  VolumeIcon
} from '../../icons'

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
  const { favorite, toggleFavoriteTrack } = useFavoriteTrack(currentTrack)
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
              >
                <LoopIcon/>
              </div>
              
              <div className={cnPlayer('btn-shuffle', '_btn-icon' + (playerState.shuffle ? ' checked' : ''))}
                onClick={handleShuffle}
              >
                <ShuffleIcon/>
              </div>

            </div>
            
            <div className={cnPlayer('track-play', 'track-play')}>
              <div className={cnTrackPlay('contain')}>
                <div className={cnTrackPlay('image')}>
                  <TrackIcon/>
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
                  <HeartIcon/>
                </div>
              </div>
            
            </div>
          </div>
          <div className={cnBar('volume-block', 'volume')}>
            <div className={cnBar('volume__content')}>
              <div className={cnBar('volume__image')} onClick={handleMute}>
                <VolumeIcon stroke={ playerState.mute ? "black" : "white" }/>
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
