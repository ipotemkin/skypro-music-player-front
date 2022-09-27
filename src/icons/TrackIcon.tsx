import { SVGProps } from "react"

export const TrackIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable="false"
    width="20"
    height="19"
    viewBox="0 0 20 19"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M8 16V1.9697L19 1V13" stroke="#4E4E4E"/>
      <ellipse cx="4.5" cy="16" rx="3.5" ry="2" stroke="#4E4E4E"/>
      <ellipse cx="15.5" cy="13" rx="3.5" ry="2" stroke="#4E4E4E"/>
    </g>
  </svg>
)

export default TrackIcon
