import { FC, LegacyRef } from "react"
import { IPlayerState } from "../../models"


type PlayerControlsProps = {
  state: IPlayerState
  nextRef: LegacyRef<HTMLDivElement>
}


export const PlayerControls: FC<PlayerControlsProps> = ({ state, nextRef }) => {
  return (<></>
  //   <div className={cnPlayer('controls')}>

  //     <div className={cnPlayer('btn-prev')} onClick={handlePrevTrack}>
  //       <svg className={cnPlayer('btn-prev-svg')} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M1 2V12.5" stroke="white"/>
  //         <path d="M3 7L12.75 0.937823L12.75 13.0622L3 7Z" fill="#D9D9D9"/>
  //       </svg>
  //     </div>

  //     <div className={cnPlayer('btn-play', '_btn')} onClick={handlePlay} >
  //       <audio ref={audioRef} src={currentTrack?.track_file}>
  //       </audio>
  //       {!playerState.isPlaying && <svg className={cnPlayer('btn-play-svg')} width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M15 10L-1.01012e-06 0.47372L-1.84293e-06 19.5263L15 10Z" fill="#D9D9D9"/>
  //       </svg>}
  //       {playerState.isPlaying && <svg className={cnPlayer('btn-play-svg')} width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <g>
  //             <path fill="#D9D9D9" d="M0 0h24v24H0z"></path>
  //             <path d="M8 8v8h8V8H8zM6 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7z" fill="#D9D9D9"></path>
  //           </g>
  //       </svg>}

  //     </div>

  //     <div ref={nextRef} className={cnPlayer('btn-next')} onClick={handleNextTrack}>
  //       <svg className={cnPlayer('btn-next-svg')} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M15 2V12.5" stroke="white"/>
  //         <path d="M13 7L3.25 0.937823L3.25 13.0622L13 7Z" fill="#D9D9D9"/>
  //       </svg>

  //     </div>

  //     <div className={cnPlayer('btn-repeat', state.loop ? '_btn-icon checked' : '_btn-icon')} onClick={handleLoop}>
  //     <svg className={cnPlayer('btn-repeat-svg')} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M10 3L5 0.113249V5.88675L10 3ZM7 14.5C3.96243 14.5 1.5 12.0376 1.5 9H0.5C0.5 12.5899 3.41015 15.5 7 15.5V14.5ZM1.5 9C1.5 5.96243 3.96243 3.5 7 3.5V2.5C3.41015 2.5 0.5 5.41015 0.5 9H1.5Z"
  //       fill="#696969"
  //       />
  //       <path d="M10 15L15 17.8868V12.1132L10 15ZM13 3.5C16.0376 3.5 18.5 5.96243 18.5 9H19.5C19.5 5.41015 16.5899 2.5 13 2.5V3.5ZM18.5 9C18.5 12.0376 16.0376 14.5 13 14.5V15.5C16.5899 15.5 19.5 12.5899 19.5 9H18.5Z"
  //       fill="#696969"
  //       />
  //     </svg>

  //     </div>

  //     <div className={cnPlayer('btn-shuffle', state.shuffle ? '_btn-icon checked' : '_btn-icon')} onClick={handleShuffle}>
  //     <svg className={cnPlayer('btn-shuffle-svg')} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M19.5 15L14.5 12.1132V17.8868L19.5 15ZM10.1632 12.0833L9.70863 12.2916L10.1632 12.0833ZM7.33683 5.91673L6.8823 6.12505L7.33683 5.91673ZM0.5 3.5H2.79151V2.5H0.5V3.5ZM6.8823 6.12505L9.70863 12.2916L10.6177 11.8749L7.79137 5.7084L6.8823 6.12505ZM14.7085 15.5H15V14.5H14.7085V15.5ZM9.70863 12.2916C10.6047 14.2466 12.5579 15.5 14.7085 15.5V14.5C12.949 14.5 11.3508 13.4745 10.6177 11.8749L9.70863 12.2916ZM2.79151 3.5C4.55105 3.5 6.14918 4.52552 6.8823 6.12505L7.79137 5.7084C6.89533 3.75341 4.94205 2.5 2.79151 2.5V3.5Z" fill="#696969"/>
  //       <path d="M19.5 3L14.5 5.88675V0.113249L19.5 3ZM10.1632 5.91673L9.70863 5.7084L10.1632 5.91673ZM7.33683 12.0833L6.8823 11.8749L7.33683 12.0833ZM0.5 14.5H2.79151V15.5H0.5V14.5ZM6.8823 11.8749L9.70863 5.7084L10.6177 6.12505L7.79137 12.2916L6.8823 11.8749ZM14.7085 2.5H15V3.5H14.7085V2.5ZM9.70863 5.7084C10.6047 3.75341 12.5579 2.5 14.7085 2.5V3.5C12.949 3.5 11.3508 4.52552 10.6177 6.12505L9.70863 5.7084ZM2.79151 14.5C4.55105 14.5 6.14918 13.4745 6.8823 11.8749L7.79137 12.2916C6.89533 14.2466 4.94205 15.5 2.79151 15.5V14.5Z" fill="#696969"/>
  //     </svg>

  //     </div>

  //   </div>
  )
}