import React from 'react';
import s from './order.module.scss'
import {Typography} from "../../../ui/typography/typography";
import {Button} from "../../../ui/button/button";

export const Order = () => {

    const order = {
        id: 1,
        number: 2139213,
        items: [
            {
                id: 11,
                name: "Шаурма",
                price: 120,
            },
            {
                id: 11,
                name: "Кола",
                price: 90,
            },
            {
                id: 11,
                name: "Картошка фри",
                price: 100,
            }
        ],
        description: 'Картошка без соли',
        totalPrice: 310,
        createdAt: '2023.10.20 21:54'
    }

    return (
        <div className={s.order}>
            <div className={s.header}>
                <Typography variant={'h3'}>
                    Заказ {`${order.number}`}
                </Typography>
                <Typography variant={'h3'}>
                    {order.createdAt}
                </Typography>
            </div>
            <div className={s.body}>
                {order.items.map(item => <Typography variant={'subtitle2'}>- {item.name}</Typography>)}
                <Typography variant={'subtitle2'}>Комментарий: {order.description}</Typography>
            </div>
            <div className={s.buttons}>
                <Button variant={'primary'}>
                    <Typography variant={'subtitle2'}>
                        Заказ готов
                    </Typography>
                </Button>
            </div>
        </div>
    );
};
