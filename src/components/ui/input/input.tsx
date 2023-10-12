import { ChangeEvent, ComponentPropsWithoutRef, ReactNode, useState } from 'react'



import s from './input.module.scss'
import {Typography } from '../typography/typography';
import {EyeOffOutlined} from "../../../images/icons/eyeOffOutlined/eyeOffOutlined";
import {EyeOutlined} from "../../../images/icons/eyeOutlined/eyeOutlined";
import {Search} from "../../../images/icons/search/search";
import {Close} from "../../../images/icons/close/close";

export type InputPropsType = {
    label?: string
    errorMessage?: string
    search?: boolean
    iconStart?: ReactNode
    iconEnd?: ReactNode
    type?: 'text' | 'password'
    onClearClick?: () => void
    onChange?: (text: ChangeEvent<HTMLInputElement>) => void
    value?: string
    disabled?: boolean
    placeholder?: string
    error?: boolean
    id?: string
    className?: string
} & ComponentPropsWithoutRef<'input'>

export const Input: React.FC<InputPropsType> = ({
                                                    label,
                                                    errorMessage,
                                                    error,
                                                    search,
                                                    iconStart,
                                                    iconEnd,
                                                    type = 'text',
                                                    onClearClick,
                                                    value,
                                                    onChange,
                                                    disabled,
                                                    placeholder,
                                                    id,
                                                    className,
                                                    ...rest
                                                }) => {
    // test logic
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event)
    }
    // test logic

    const [showPass, setShowPass] = useState<boolean>(false)

    const showError = !!errorMessage && errorMessage.length > 0
    const eyeIconColor = disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'
    const onMouseDownHandler = () => {
        if (type === 'password') {
            setShowPass(true)
        }
    }
    const onMouseUpHandler = () => {
        if (type === 'password') {
            setShowPass(false)
        }
    }
    const onClearClickHandler = () => {
        onClearClick?.()
    }

    if (search) {
        iconStart = <Search color={'var(--color-dark-100)'} />
    }

    if (onClearClick) {
        iconEnd = value && (
            <button className={s.clear_button} onClick={onClearClickHandler}>
                <Close color={'var(--color-light-100)'} />
            </button>
        )
    }
    if (type === 'password') {
        iconEnd = showPass ? (
            <EyeOffOutlined color={eyeIconColor} onMouseUp={onMouseUpHandler} />
        ) : (
            <EyeOutlined color={eyeIconColor} onMouseDown={onMouseDownHandler} />
        )
    }
    const inputType = showPass ? 'text' : type

    return (
        <div className={className}>
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
                <div className={`${s.container}`}>
                    {!!iconStart && <span className={s.icon_start}>{iconStart}</span>}
                    <input
                        value={value}
                        onChange={onChangeHandler}
                        type={inputType}
                        className={` ${s.input}  ${showError ? s.error : ''} ${search ? s.search : ''} `}
                        placeholder={placeholder}
                        disabled={disabled}
                        id={id}
                        {...rest}
                    />
                    {!!iconEnd && <span className={s.icon_end}>{iconEnd}</span>}
                </div>
                {showError && (
                    <Typography variant={'error'} className={s.error_message}>
                        {errorMessage}
                    </Typography>
                )}
            </div>
        </div>
    )
}