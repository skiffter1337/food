import React, {useEffect} from 'react';
import s from './orderList.module.scss'
import {Order} from "./order/order";
import {useActions} from "../../../hooks/useActions";
import {orderThunks} from "../orders.slice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectOrders} from "../orders.selector";
import {NoItems} from "../../ui/noItems/noItems";
import {selectIsCashier, selectIsKitchen} from "../../../app/app.selector";

export const OrdersList = () => {
    const orders = useAppSelector(selectOrders)
    const isKitchen = useAppSelector(selectIsKitchen)
    const isCashier = useAppSelector(selectIsCashier)
    const {getOrders, stopFetchingOrders} = useActions(orderThunks)
    useEffect(() => {
        getOrders({})
        return () => {
            stopFetchingOrders({})
        }
    }, []);

    console.log(orders)
    const filteredOrders = orders.filter(el => isKitchen ? el.status === 'created' : isCashier ? el.status === 'readyForPickup' : el).map(order => <Order key={order.id}  order={order} name={order.name} createdAt={order.createdAt}
                                                    items={order.items} comment={order.comment} status={order.status}/>)
    return (
        <>
            {orders.length !== 0 ?
                <div className={s.orders_list}>
                    {filteredOrders}
                </div>
                :
                <NoItems>
                    Нет заказов
                </NoItems>
            }
        </>
    );
};
