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
import {EditOutlined} from "../../../../images/icons/editOutlined/editOutlined";
import {EditOrderModal} from "../../../ui/modal/editOrderModal/editOrderModal";


type OrderPropsType = {
    name: string
    createdAt: Date
    items: MenuType[]
    comment: string
    order: OrdersResponseType
    status: StatusType
}
export const Order: FC<OrderPropsType> = ({name, createdAt, items, comment, order, status}) => {

    const isKitchen = useAppSelector(selectIsKitchen)
    const {changeOrderStatus} = useActions(orderThunks)
    return (
        <div className={`${s.order} ${order.isEdit ? s.edited : ''} ${order.status === 'readyForPickup' ? s.readyForPickup : ''}`}>
            <div className={s.header}>
                <div className={s.info}>
                    <div className={s.top}>
                        <Typography variant={'h3'}>
                            Заказ {`${name}`}
                        </Typography>
                        {order.isEdit && <Typography variant={'h3'} className={s.edited}>Изменен</Typography>}
                    </div>
                    <Typography variant={'h3'}>
                        {formatDateTime(createdAt!)}
                    </Typography>
                </div>
                {(order.status === 'created' || order.status === 'preparing') &&
                <div className={s.edit}>
                    <EditOrderModal
                        width={'wide'}
                        trigger={<div className={s.btnWrapper}><EditOutlined/></div>}
                        order={order}
                    />
                </div>
                }
            </div>
            <div className={s.body}>
                {items.map(item => <Typography variant={'subtitle2'}
                                               key={item.id}>- {item.name} {item.count} шт.</Typography>)}
                {comment && <Typography variant={'h3'}>Комментарий: {comment}</Typography>}
                {!isKitchen && <Typography variant={'h3'}>Итого: {order.total_price} руб.</Typography>}
            </div>

                <div className={s.footer}>
                    {status !== 'finished' ?
                        <>
                    {status === 'created' && isKitchen ?
                        <Button variant={'primary'} onClick={() => changeOrderStatus({...order, status: 'preparing'})}>
                            <Typography variant={'subtitle2'}>
                                В работу
                            </Typography>
                        </Button>
                        : status === 'preparing' && isKitchen ?
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
                            <Button variant={'primary'}
                                    onClick={() => changeOrderStatus({...order, status: 'finished'})}>
                                <Typography variant={'subtitle2'}>
                                    Выдать
                                </Typography>
                            </Button>
                    }
                        </>
                        : <Typography variant={'h2'} className={s.finished}>Завершен</Typography>}
                </div>

        </div>
    );
};
