import { SVGProps } from "react"

export const NextIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable="false"
    width="16"
    height="14"
    viewBox="0 0 16 14"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M15 2V12.5" stroke="white"/>
      <path d="M13 7L3.25 0.937823L3.25 13.0622L13 7Z" fill="#D9D9D9"/>
    </g>
  </svg>
)

export default NextIcon
