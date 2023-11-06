import React, {useEffect, useState} from 'react';
import s from './orders.module.scss'
import {OrderPanel} from "./orderPanel/orderPanel";
import {OrdersList} from "./ordersList/ordersList";
import {OrdersResponseType} from "./order.api";
import {useActions} from "../../hooks/useActions";
import {menuThunks} from "../menu/menu.slice";

export const Orders = () => {
    const {getMenu} = useActions(menuThunks)
    useEffect(() => {
        getMenu({})
    }, [])

    const [isTodayOrdersOnly, setIsTodayOrderOnly] = useState(true)
    const [sortedOrders, setSortedOrders] = useState([] as OrdersResponseType[])

    return (
        <div className={s.orders}>
            <OrderPanel setSortedOrders={setSortedOrders} sortedOrders={sortedOrders} isTodayOrdersOnly={isTodayOrdersOnly} setIsTodayOrderOnly={setIsTodayOrderOnly}/>
            <OrdersList sortedOrders={sortedOrders} isTodayOrdersOnly={isTodayOrdersOnly}/>
        </div>
    );
};

