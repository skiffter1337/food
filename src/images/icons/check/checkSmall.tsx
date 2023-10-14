import { memo, SVGProps, Ref, forwardRef } from 'react'

type PropsType = {
  color1?: string
  color2?: string
}
const SvgComponent = (props: SVGProps<SVGSVGElement> & PropsType, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <path fill={props.color1} d="M2.7 4h10.7v8H2.7z" />
    <path
      fill={props.color2}
      d="M12.7 2H3.3C2.6 2 2 2.6 2 3.3v9.4c0 .7.6 1.3 1.3 1.3h9.4c.7 0 1.3-.6 1.3-1.3V3.3c0-.7-.6-1.3-1.3-1.3Zm-6 9.3L3.3 8l1-1 2.4 2.4 5-5 1 1-6 6Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const CheckSmall = memo(ForwardRef)
