import React from 'react';
import s from './orderList.module.scss'
import {Order} from "./order/order";

export const OrdersList = () => {
    return (
        <div className={s.orders_list}>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
        </div>
    );
};
