import { SVGProps, Ref, forwardRef, memo } from 'react'

type PropsType = {
  color?: string
}
const SvgComponent = (props: SVGProps<SVGSVGElement> & PropsType, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path fill={props.color} d="m5.7 11 3-3-3-3 1-1 4 4-4 4-1-1Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const KeyBoardArrowRight = memo(ForwardRef)
