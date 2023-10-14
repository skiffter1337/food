import { SVGProps, Ref, forwardRef, memo } from 'react'

type PropsType = {
  color1?: string
  color2?: string
}

const SvgComponent = (props: SVGProps<SVGSVGElement> & PropsType, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <path fill={props.color1} d="M4 6h16v12H4z" />
    <path
      fill={props.color2}
      d="M19 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Check = memo(ForwardRef)
