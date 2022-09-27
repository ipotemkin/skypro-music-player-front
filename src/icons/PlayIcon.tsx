import { SVGProps } from "react"

export const PlayIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable="false"
    width="15"
    height="20"
    viewBox="0 0 15 20"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M15 10L-1.01012e-06 0.47372L-1.84293e-06 19.5263L15 10Z" fill="#D9D9D9"/>
    </g>
  </svg>
)

export default PlayIcon
