import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'


import s from './modal.module.scss'
import {Typography} from "../typography/typography";
import {CloseModal} from "../../../images/icons/closeModal/closeModal";

type ModalPropsType = {
  title?: string
  trigger?: ReactNode
  isOpen?: boolean
  onOpenChange?: () => void
  width?: 'narrow' | 'wide'
  children?: ReactNode
  isSeparator?: boolean
}
const Root: FC<ModalPropsType> = ({
  title,
  trigger,
  children,
  isOpen,
  onOpenChange,
  width,
  isSeparator = true,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={`${s.content} ${width === 'narrow' && s.narrow}`}>
          {title && <ModalTitle title={title} isSeparator={isSeparator} />}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type ModalTitlePropsType = {
  title: string
  isSeparator?: boolean
}
const ModalTitle: FC<ModalTitlePropsType> = ({ title, isSeparator }) => {
  return (
    <Dialog.Title className={`${s.title_block} ${isSeparator && s.separator}`}>
      <Typography variant={'h2'} className={s.title_text}>
        {title}
      </Typography>
      <Dialog.Close className={s.close_button}>
        <div className={s.wrapper}>
          <CloseModal />
        </div>
      </Dialog.Close>
    </Dialog.Title>
  )
}

type ModalElementsPropsType = {
  className?: string
  children: ReactNode
}
const Body: FC<ModalElementsPropsType> = ({ children, className }) => {
  const classNames = `${className} ${s.body}`

  return <div className={classNames}>{children}</div>
}

const Footer: FC<ModalElementsPropsType> = ({ children, className }) => {
  const classNames = `${className} ${s.footer}`

  return <div className={classNames}>{children}</div>
}

export const Modal = { Root, Body, Footer }
