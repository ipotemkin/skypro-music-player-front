import { SVGProps } from "react"

export const SearchIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg style={{ marginRight: 5 }}
    role="img"
    focusable="false"
    width="17"
    height="18"
    viewBox="0 0 17 18"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M11.9276 12.7748L15.37 17.0644" stroke="white" stroke-linecap="round"/>
      <circle cx="8.48533" cy="8.48526" r="5.5" transform="rotate(-38.7469 8.48533 8.48526)" stroke="white"/>
    </g>
  </svg>
)

export default SearchIcon
