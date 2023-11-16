import React, {useEffect} from 'react';
import s from './orders.module.scss'
import {OrderPanel} from "./orderPanel/orderPanel";
import {OrdersList} from "./ordersList/ordersList";
import {useActions} from "../../hooks/useActions";
import {menuThunks} from "../menu/menu.slice";


export const Orders = () => {

    const {getMenu} = useActions(menuThunks)
    useEffect(() => {
        getMenu({})
    }, [])


    return (
        <div className={s.orders}>
            <OrderPanel/>
            <OrdersList/>
        </div>
    );
};

