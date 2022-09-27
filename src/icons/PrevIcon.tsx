import { SVGProps } from "react"

export const PrevIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable="false"
    width="16"
    height="14"
    viewBox="0 0 16 14"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M1 2V12.5" stroke="white"/>
      <path d="M3 7L12.75 0.937823L12.75 13.0622L3 7Z" fill="#D9D9D9"/>
    </g>
  </svg>
)

export default PrevIcon
