import React, {FC} from 'react';
import s from './order.module.scss'
import {Typography} from "../../../ui/typography/typography";
import {Button} from "../../../ui/button/button";
import {MenuType} from "../../../menu/menu.slice";
import {formatDateTime} from "../../../../common/utils/formatDateTime";
import {useActions} from "../../../../hooks/useActions";
import {orderThunks} from "../../orders.slice";
import {OrdersResponseType, StatusType} from "../../order.api";

type OrderPropsType = {
    name: string
    createdAt: string | undefined
    items: MenuType[]
    comment: string
    order: OrdersResponseType
    status: StatusType
}
export const Order: FC<OrderPropsType> = ({name, createdAt, items, comment, order, status}) => {

    const {changeOrderStatus} = useActions(orderThunks)
    return (
        <div className={s.order}>
            <div className={s.header}>
                <Typography variant={'h3'}>
                    Заказ {`${name}`}
                </Typography>
                <Typography variant={'h3'}>
                    {formatDateTime(createdAt!)}
                </Typography>
            </div>
            <div className={s.body}>
                {items.map(item => <Typography variant={'subtitle2'} key={item.id}>- {item.name}</Typography>)}
                {comment ? <Typography variant={'h3'}>Комментарий: {comment}</Typography> : null}
            </div>
            {status !== 'finished' ?
                <div className={s.buttons}>
                    {status === 'created' ?
                        <Button variant={'primary'}
                                onClick={() => changeOrderStatus({...order, status: 'readyForPickup'})}>
                            <Typography variant={'subtitle2'}>
                                Заказ готов
                            </Typography>
                        </Button>
                        :
                        <Button variant={'primary'} onClick={() => changeOrderStatus({...order, status: 'finished'})}>
                            <Typography variant={'subtitle2'}>
                                Выдать
                            </Typography>
                        </Button>
                    }
                </div>
                : <Typography variant={'h2'} className={s.finished}>Завершен</Typography>}
        </div>
    );
};
