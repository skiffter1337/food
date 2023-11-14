import { FC, ReactNode, useState } from 'react'

import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'
import {Typography} from "../typography/typography";
import {ArrowUp} from "../../../images/icons/arrowUp/arrowUp";
import {ArrowDown} from "../../../images/icons/arrowDown/arrowDown";

export type SelectItemsType = {
  id: number
  value: number | string
  title: string
  disabled: boolean
}

export type SelectPropsType = {
  id?: string
  placeholder?: string
  label?: string
  selectItems: SelectItemsType[]
  disabled?: boolean
  onSelect: (option: string) => void
  size: 'small' | 'large'
  isFullWidth?: boolean
  defaultValue?: string
}
export const Select: FC<SelectPropsType> = ({
  id,
  placeholder,
  selectItems,
  label,
  disabled,
  onSelect,
  size,
  isFullWidth = false,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const onChangeHandler = () => {
    setIsOpen(!isOpen)
  }
  const placeholderValue = (
    <Typography variant={'body1'} className={`${s.placeholder} ${disabled ? s.disabled : ''}`}>
      {placeholder?.length ? placeholder : selectItems[0].title}
    </Typography>
  )

  return (
    <div>
      {label && (
        <div>
          <Typography
            as={'label'}
            variant={'body2'}
            className={`${s.label} ${disabled ? s.disabled : ''}`}
            htmlFor={id}
          >
            {label}
          </Typography>
        </div>
      )}
      <SelectRadix.Root
        onOpenChange={onChangeHandler}
        disabled={disabled}
        onValueChange={onSelect}
        defaultValue={defaultValue}
      >
        <SelectRadix.Trigger
          id={id}
          className={`${s.trigger}  ${!isOpen && s.opened} ${size && s[size]} ${
            isFullWidth && s.full_width
          }`}
        >
          <SelectRadix.Value
            placeholder={placeholderValue}
            className={disabled ? s.disabled : ''}
          />
          <SelectRadix.Icon className={s.icon}>
            {isOpen ? (
              <ArrowDown color={disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'} />
            ) : (
              <ArrowUp />
            )}
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Content className={s.content} position={'popper'} avoidCollisions={false}>
          <SelectRadix.Viewport>
            <SelectRadix.Group>
              {selectItems.map(item => (
                <SelectItem key={item.id} value={`${item.value}`} disabled={item.disabled} size={size}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Root>
    </div>
  )
}

type SelectItemPropsType = {
  value: string
  children: ReactNode
  disabled: boolean
  size: 'small' | 'large'
}

const SelectItem: FC<SelectItemPropsType> = ({ value, children, disabled, size }) => {
  return (
    <SelectRadix.Item className={`${s.item} ${size && s[size]}`} value={value} disabled={disabled}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
