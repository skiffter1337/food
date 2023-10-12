import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import s from './card.module.scss'

type CardPropsType = {
    className?: string
    children: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Card: FC<CardPropsType> = ({ className, children }) => {
    return <div className={`${s.card} ${className ?? ''}`}>{children}</div>
}