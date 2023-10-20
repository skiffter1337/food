import React from 'react';
import s from './orders.module.scss'
import {OrderPanel} from "./orderPanel/orderPanel";
import {OrdersList} from "./ordersList/ordersList";

export const Orders = () => {

    return (
        <div className={s.orders}>
            <OrderPanel/>
            <OrdersList/>
        </div>
    );
};

