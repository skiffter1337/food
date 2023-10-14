import { SVGProps, Ref, forwardRef, memo } from 'react'

type PropsType = {
  color?: string
}
const SvgComponent = (props: SVGProps<SVGSVGElement> & PropsType, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill={props.color}
        d="M3.7 6.3a.7.7 0 0 1 1-.5l3.6 3L12 5.9a.7.7 0 0 1 1 .1.7.7 0 0 1-.1 1l-4 3.2a.7.7 0 0 1-.9 0L4 6.9a.7.7 0 0 1-.2-.6Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const ArrowDown = memo(ForwardRef)
