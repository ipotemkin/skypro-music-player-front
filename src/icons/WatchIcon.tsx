import { SVGProps } from "react"

export const VolumeIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable="false"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="6" cy="6" r="5.5" stroke="#696969"/>
      <path d="M4 6H6.5V2.5" stroke="#696969"/>
    </g>
  </svg>
)

export default VolumeIcon
