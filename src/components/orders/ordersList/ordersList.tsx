import React, {FC, useEffect, useState} from 'react';
import s from './orderList.module.scss'
import {Order} from "./order/order";
import {useActions} from "../../../hooks/useActions";
import {orderThunks} from "../orders.slice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectFilter, selectIsTodayOrdersOnly, selectOrders} from "../orders.selector";
import {NoItems} from "../../ui/noItems/noItems";
import {selectIsCashier, selectIsKitchen} from "../../../app/app.selector";
import NEWORDER from './../../../audio/icq.mp3'
import {toast} from "react-toastify";
import {toastSuccess} from "../../../helpers/toastVariants/success/success";

type OrdersListPropsType = {

}
export const OrdersList: FC<OrdersListPropsType> = () => {
    const orders = useAppSelector(selectOrders)
    const isKitchen = useAppSelector(selectIsKitchen)
    const isCashier = useAppSelector(selectIsCashier)
    const isTodayOrdersOnly = useAppSelector(selectIsTodayOrdersOnly)
    const {getOrders, stopFetchingOrders} = useActions(orderThunks)
    const [uniqueOrderIds, setUniqueOrderIds] = useState<number[]>([])
    const [previousOrders, setPreviousOrders] = useState(orders)
    const filter = useAppSelector(selectFilter)

    useEffect(() => {
        getOrders({})
        return () => {
            stopFetchingOrders({})
        }
    }, [])

    useEffect(() => {
        if (orders.length === 0) return

        const newUniqueIds = orders
            .filter((order) => !previousOrders.some((prevOrder) => prevOrder.id === order.id))
            .map((order) => order.id)

        if (newUniqueIds.length > 0 && isKitchen) {
            const audioElement = document.getElementById('notificationSound') as HTMLAudioElement

            if (audioElement) {
                audioElement.play().then(() => {
                }).catch((error) => {
                    console.error('Ошибка воспроизведения звука: ', error)
                })

                setUniqueOrderIds((prevUniqueOrderIds) => [...prevUniqueOrderIds, ...newUniqueIds])
            }
        }

        setPreviousOrders(orders)

        if (orders.filter(el => el.status === 'readyForPickup') > previousOrders.filter(el => el.status === 'readyForPickup') && !isKitchen) {
            toast.success('Новый заказ готов к выдаче', toastSuccess)
        }
    }, [orders]);


    const filteredOrders = () => {
        switch (filter) {
            case 'all':
                return orders
            case 'created':
                return orders.filter(order => order.status === 'created')
            case 'preparing':
                return orders.filter(order => order.status === 'preparing')
            case 'readyForPickup':
                return orders.filter(order => order.status === 'readyForPickup')
            case 'finished':
                return orders.filter(order => order.status === 'finished')
            default:
                return orders
        }
    }
    const today = new Date()
    const mappedOrders = filteredOrders()
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
            isKitchen ? el.status === 'created' || el.status === 'preparing' : isCashier ? el.status === 'readyForPickup' || el.status === 'created' : el
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
            {mappedOrders.length !== 0 ?
                <div className={s.orders_list}>
                    {mappedOrders}
                </div>
                :
                <NoItems>
                    Нет заказов
                </NoItems>
            }
        </>
    );
};
