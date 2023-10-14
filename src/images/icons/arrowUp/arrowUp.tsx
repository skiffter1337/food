import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#FFFEFE"
        d="M13 9.7a.7.7 0 0 1-1 .5l-3.6-3-3.6 2.9a.7.7 0 0 1-1-.1.7.7 0 0 1 .1-1l4-3.2a.7.7 0 0 1 .9 0l4 3.3a.7.7 0 0 1 .2.6Z"
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

export const ArrowUp = memo(ForwardRef)
