import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"

type PropsType = {
    color?: string
}
const SvgComponent = (props: SVGProps<SVGSVGElement> & PropsType, ref: Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        ref={ref}
        {...props}
    >
        <path
            d="M2.668 10.668v-8H1.332V1.332h2c.371 0 .668.3.668.668v8h8.293l1.332-5.332H5.332V3.332h9.149a.67.67 0 0 1 .644.828l-1.664 6.668a.665.665 0 0 1-.648.504H3.332a.663.663 0 0 1-.664-.664ZM4 15.332A1.329 1.329 0 0 1 2.668 14a1.331 1.331 0 1 1 2.664 0c0 .738-.594 1.332-1.332 1.332Zm8 0A1.329 1.329 0 0 1 10.668 14c0-.738.594-1.332 1.332-1.332.738 0 1.332.594 1.332 1.332 0 .738-.594 1.332-1.332 1.332Zm0 0"
            style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: props.color,
                fillOpacity: 1,
            }}
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export const Cart = memo(ForwardRef)

