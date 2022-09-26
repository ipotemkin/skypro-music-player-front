import { SVGProps } from "react"

export const PauseIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable="false"
    width="15"
    height="20"
    viewBox="0 0 15 20"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M5 3V17 M10 3V17" stroke="#D9D9D9"/>                    
    </g>
  </svg>
)

export default PauseIcon
