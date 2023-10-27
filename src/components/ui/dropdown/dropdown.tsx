import {FC, ReactNode} from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './dropdown.module.scss'
import {Typography} from "../typography/typography";

type DropdownType = {
    trigger?: ReactNode
    children: ReactNode
    isDisabled?: boolean
}
export const Dropdown: FC<DropdownType> = ({trigger, children, isDisabled}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={s.trigger} disabled={isDisabled}>{trigger}</DropdownMenu.Trigger>
            {isDisabled ? null : (
                <DropdownMenu.Content className={s.content} sideOffset={10} align={'end'} data-state={"closed"}>
                    <div className={s.block}>{children}</div>
                    <DropdownMenu.Arrow className={s.arrow_box} asChild>
                        <div className={`${s.arrow}`}/>
                    </DropdownMenu.Arrow>
                </DropdownMenu.Content>
            )}
        </DropdownMenu.Root>
    )
}

type DropDownItemPropsType = {
    children: ReactNode
    separator?: boolean
    className?: string
    onSelect?: () => void
}
export const DropDownItem: FC<DropDownItemPropsType> = ({children, separator, className, onSelect}) => {
    return (
        <>
            <DropdownMenu.Item className={`${s.item} ${className}`} onSelect={onSelect}>{children}</DropdownMenu.Item>
            {separator && <DropdownMenu.Separator className={s.separator}/>}
        </>
    )
}
