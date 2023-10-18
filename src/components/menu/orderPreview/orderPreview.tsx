import React, {FC} from 'react'
import s from './orderPreview.module.scss'
import {Typography} from "../../ui/typography/typography";
import {Dropdown, DropDownItem} from "../../ui/dropdown/dropdown";
import {Cart} from "../../../images/icons/cart/cart";
import {Button} from "../../ui/button/button";

type OrderPreviewPropsType = {}
export const OrderPreview: FC<OrderPreviewPropsType> = () => {
    return (
        <Dropdown
            trigger={
                <Button variant={'secondary'} fullWidth as={'div'}>
                    <Cart color={'var(--color-light-100)'}/>
                    <Typography variant={'subtitle2'}>
                        Заказ
                    </Typography>
                </Button>
            }
        >
            <DropDownItem separator={true} className={s.order_title}>
                <Typography variant={'h3'}>
                    {'Заказ'}
                </Typography>
            </DropDownItem>
            <DropDownItem separator={true}>
                <Typography variant={'subtitle2'}>
                    {'- Шаурма классчиеская'}
                </Typography>
                <Typography variant={'subtitle2'}>
                    {'- Шаурма неклассчиеская'}
                </Typography>
                <Typography variant={'subtitle2'}>
                    {'- Шаурма классчиеская'}
                </Typography>
            </DropDownItem>
            <DropDownItem>
                <Typography variant={'subtitle2'}>
                    Итого: 1000 руб.
                </Typography>
            </DropDownItem>
            <DropDownItem>
                <Button variant={'primary'}>
                    <Typography variant={'subtitle2'}>
                        Отправить на кухню
                    </Typography>
                </Button>
            </DropDownItem>
        </Dropdown>
    )
}
