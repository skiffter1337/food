import React, {FC} from 'react';
import s from './order.module.scss'
import {Typography} from "../../../ui/typography/typography";
import {Button} from "../../../ui/button/button";
import {MenuType} from "../../../menu/menu.slice";
import {formatDateTime} from "../../../../common/utils/formatDateTime";
import {useActions} from "../../../../hooks/useActions";
import {orderThunks} from "../../orders.slice";
import {OrdersResponseType, StatusType} from "../../order.api";
import {SendOrderToCashierModal} from "../../../ui/modal/sendOrderToCashierModal/sendOrderToCashierModal";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {selectIsKitchen} from "../../../../app/app.selector";


type OrderPropsType = {
    name: string
    createdAt: string | undefined
    items: MenuType[]
    comment: string
    order: OrdersResponseType
    status: StatusType
}
export const Order: FC<OrderPropsType> = ({name, createdAt, items, comment, order, status}) => {

    const isKitchen = useAppSelector(selectIsKitchen)
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
                {items.map(item => <Typography variant={'subtitle2'} key={item.id}>- {item.name} {item.count} шт.</Typography>)}
                {comment && <Typography variant={'h3'}>Комментарий: {comment}</Typography>}
                {!isKitchen && <Typography variant={'h3'}>Итого: {order.total_price} руб.</Typography>}
            </div>
            {status !== 'finished' ?
                <div className={s.buttons}>
                    {status === 'created' ?
                        <SendOrderToCashierModal
                            width={'narrow'}
                            trigger={
                                <Button variant={'primary'}>
                                    <Typography variant={'subtitle2'}>
                                        Заказ готов
                                    </Typography>
                                </Button>
                            }
                            order={order}
                        />
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
