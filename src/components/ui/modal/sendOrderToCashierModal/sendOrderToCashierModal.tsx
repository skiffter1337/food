import React, {FC, ReactNode, useState} from 'react';
import {Modal} from "../modal";
import {Button} from "../../button/button";
import {Typography} from "../../typography/typography";
import s from './sendOrderToCashierModal.module.scss'
import {useActions} from "../../../../hooks/useActions";
import {orderThunks} from "../../../orders/orders.slice";
import {OrdersResponseType} from "../../../orders/order.api";

type SendOrderToCashierModalType = {
    width: 'wide' | 'narrow'
    trigger: ReactNode
    order: OrdersResponseType

}
export const SendOrderToCashierModal: FC<SendOrderToCashierModalType> = ({width, trigger, order}) => {

    const [isOpen, setIsOpen] = useState(false)
    const {changeOrderStatus} = useActions(orderThunks)

    const onOpenChange = () => setIsOpen(!isOpen)

    const sendOrderToCashierHandler = () => {
        changeOrderStatus({...order, status: 'readyForPickup'})
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
                    Заказ полностью готов?
                </Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'primary'} type={'submit'} onClick={sendOrderToCashierHandler}>
                    <Typography variant={'subtitle2'}>
                        Да
                    </Typography>
                </Button>
                <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                    <Typography variant={'subtitle2'}>
                        Нет
                    </Typography>
                </Button>
            </Modal.Footer>
        </Modal.Root>
    );
};
