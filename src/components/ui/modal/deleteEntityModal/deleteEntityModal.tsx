import React, {FC, ReactNode, useState} from 'react';
import {Modal} from "../modal";
import {Typography} from "../../typography/typography";
import s from './deleteEntityModal.module.scss'
import {Button} from "../../button/button";


type DeleteEntityModalPropsType = {
    width: 'wide' | 'narrow'
    trigger: ReactNode
    entityId: number
    text: string
    action: (id: number) => void
}
export const DeleteEntityModal: FC<DeleteEntityModalPropsType> = ({width, trigger, entityId, text, action}) => {

    const [isOpen, setIsOpen] = useState(false)

    const onOpenChange = () => setIsOpen(!isOpen)

    const deleteEntityHandler = () => {
        action(entityId)
        setIsOpen(false)
    }
    return (
        <Modal.Root
            width={width}
            trigger={trigger}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isSeparator={false}
        >
            <Modal.Body>
                <Typography variant={'h2'} className={s.modal_text}>
                    {text}
                </Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'primary'} type={'submit'} onClick={deleteEntityHandler}>
                    <Typography variant={'subtitle2'}>
                        Удалить
                    </Typography>
                </Button>
                <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                    <Typography variant={'subtitle2'}>
                        Отмена
                    </Typography>
                </Button>
            </Modal.Footer>
        </Modal.Root>
    );
};
