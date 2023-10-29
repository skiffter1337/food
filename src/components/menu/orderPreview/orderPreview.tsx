import React, {FC, useState} from 'react'
import s from './orderPreview.module.scss'
import {Typography} from "../../ui/typography/typography";
import {Dropdown, DropDownItem} from "../../ui/dropdown/dropdown";
import {Cart} from "../../../images/icons/cart/cart";
import {Button} from "../../ui/button/button";
import {Input} from "../../ui/input/input";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectOrder} from "../../orders/orders.selector";
import {selectMenu} from "../menu.selectors";
import {IconButton} from "../../ui/IconButton/IconButton";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {orderActions, orderThunks} from "../../orders/orders.slice";
import {useActions} from "../../../hooks/useActions";
import {TrashOutlined} from "../../../images/icons/trashOutlined/trashOutlined";

type OrderPreviewPropsType = {}

export const OrderPreview: FC<OrderPreviewPropsType> = () => {
    const dispatch = useAppDispatch()
    const {sendOrderToKitchen} = useActions(orderThunks)

    const menu = useAppSelector(selectMenu)
    const order = useAppSelector(selectOrder)
    const [comment, setComment] = useState('')
    const sendOrderToKitchenHandler = () => {
        setComment('')
        sendOrderToKitchen({items: order, comment, status: 'created'})
    }

    const mappedOrder = order.map(item => {
        return (
            <div className={s.good} key={item.id}>
                <Typography variant={'subtitle2'}>
                    {`- ${menu.filter(el => el.id === item.id)[0].name} ${item.count}шт.`}
                </Typography>
                <IconButton callback={() => dispatch(orderActions.removeItemFromOrder(item.id))}>
                    <TrashOutlined/>
                </IconButton>
            </div>
        )
    })

    const getTotalPrice = () => {
        let totalPrice = 0
        order.forEach(item => {
            const menuItem = menu.find(menuItem => menuItem.id === item.id)
            if (menuItem) {
                totalPrice += menuItem.price * item.count
            }
        })
        return totalPrice
    }

    return (
        <Dropdown
            isDisabled={order.length === 0}
            trigger={
                <Button variant={'secondary'} fullWidth disabled={order.length === 0}>
                    <Cart color={'var(--color-light-100)'}/>
                    <Typography variant={'subtitle2'}>
                        Заказ
                    </Typography>
                </Button>
            }
        >
            <div className={s.order_title}>
                <Typography variant={'h2'}>
                    {'Заказ'}
                </Typography>
            </div>
            <div className={s.goods}>
                {mappedOrder}
            </div>
            <Input value={comment} onChange={(value) => setComment(value as string)} placeholder={'Комментарий'}/>
            <div>
                <Typography variant={'h3'}>
                    {`Итого: ${getTotalPrice()} руб.`}
                </Typography>
            </div>
            <DropDownItem className={s.button} onSelect={sendOrderToKitchenHandler}>
                <Button variant={'primary'} fullWidth as={'div'}>
                    <Typography variant={'subtitle2'}>
                        Отправить на кухню
                    </Typography>
                </Button>
            </DropDownItem>
        </Dropdown>
    )
}
