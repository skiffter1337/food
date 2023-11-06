import React, {FC, useEffect, useState} from 'react';
import s from './orderList.module.scss'
import {Order} from "./order/order";
import {useActions} from "../../../hooks/useActions";
import {orderThunks} from "../orders.slice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectOrders} from "../orders.selector";
import {NoItems} from "../../ui/noItems/noItems";
import {selectIsCashier, selectIsKitchen} from "../../../app/app.selector";
import NEWORDER from './../../../audio/icq.mp3'
import {OrdersResponseType} from "../order.api";

type OrdersListPropsType = {
    sortedOrders: OrdersResponseType[]
    isTodayOrdersOnly: boolean
}
export const OrdersList: FC<OrdersListPropsType> = ({sortedOrders, isTodayOrdersOnly}) => {
    const orders = useAppSelector(selectOrders)
    const isKitchen = useAppSelector(selectIsKitchen)
    const isCashier = useAppSelector(selectIsCashier)
    const {getOrders, stopFetchingOrders} = useActions(orderThunks)
    const [uniqueOrderIds, setUniqueOrderIds] = useState<number[]>([])

    useEffect(() => {
        getOrders({})
        return () => {
            stopFetchingOrders({})
        }
    }, [])

    useEffect(() => {
        if (orders.length === 0) return

        const uniqueIds = orders.map(order => order.id)
        const newUniqueIds = uniqueIds.filter(id => !uniqueOrderIds.includes(id))

        if (newUniqueIds.length > 0 && isKitchen) {
            const audioElement = document.getElementById('notificationSound') as HTMLAudioElement

            if (audioElement) {
                audioElement.play()
                    .then(() => {
                    })
                    .catch(error => {
                        console.error('Ошибка воспроизведения звука: ', error)
                    });

                setUniqueOrderIds([...uniqueOrderIds, ...newUniqueIds])
            }
        }
    }, [orders, uniqueOrderIds])


    const ordersForMap = sortedOrders.length !== 0 ? sortedOrders : orders
    const today = new Date()
    const filteredOrders = ordersForMap
        .filter((order) => {
            if (isTodayOrdersOnly) {
                const orderDate = new Date(order.createdAt!)
                return (
                    orderDate.getDate() === today.getDate() &&
                    orderDate.getMonth() === today.getMonth() &&
                    orderDate.getFullYear() === today.getFullYear()
                );
            }
            return true
        })
        .filter((el) => el.items.length !== 0)
        .filter((el) =>
            isKitchen ? el.status === 'created' : isCashier ? el.status === 'readyForPickup' || el.status === 'preparing' : el
        )
        .map((order) => <Order
                key={order.id}
                order={order}
                name={order.name}
                createdAt={order.createdAt!}
                items={order.items}
                comment={order.comment}
                status={order.status}
            />
        );
    return (
        <>
            <audio id='notificationSound' src={NEWORDER} preload='auto' autoPlay={false}/>
            {filteredOrders.length !== 0 ?
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
