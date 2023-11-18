import {ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef} from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
    as?: T
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
    fullWidth?: boolean
    className?: string
} & ComponentPropsWithoutRef<T>


const ButtonPolymorph = <T extends  ElementType = 'button'>(props: ButtonProps<T>, ref: any) => {
    const {
        variant = 'primary',
        fullWidth,
        disabled,
        className,
        children,
        as: Component= 'button',
        ...restProps
    } = props

    return (
        <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...restProps} ref={ref}>
            {children}
        </Component>
    )
}
export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType>(
    props: ButtonProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof  ButtonProps<T>> & {
        ref?: ForwardedRef<ElementType<T>>
    }
) => ReturnType<typeof ButtonPolymorph>

