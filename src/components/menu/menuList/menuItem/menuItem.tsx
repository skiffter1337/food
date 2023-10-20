import React, {FC} from 'react';
import {Typography} from "../../../ui/typography/typography";
import {TrashOutlined} from "../../../../images/icons/trashOutlined/trashOutlined";
import {Button} from "../../../ui/button/button";
import s from './menuItem.module.scss'

type MenuItemPropsType = {
    id: number
    name: string
    price: number
    weight: number
    description: string | null
    deleteItem: (id: number) => void
}
export const MenuItem: FC<MenuItemPropsType> = ({id, name, price, weight, description, deleteItem}) => {
    return (
        <div className={s.good}>
            <div className={s.header}>
                <div>
                    <Typography variant={'h3'}>
                        {name}
                    </Typography>
                </div>
                <div onClick={() => deleteItem(id)} className={s.delete_good}>
                    <TrashOutlined/>
                </div>
            </div>
            <div className={s.body}>
                <Typography variant={'subtitle2'}>
                    Цена: {price} руб.
                </Typography>
                <Typography variant={'subtitle2'}>
                    Кол-во: {`${weight} гр.`}
                </Typography>
                <Typography variant={'subtitle2'}>
                    Описание: {description ?? '-'}
                </Typography>
            </div>
            <div className={s.buttons}>
                <Button variant={'secondary'}>
                    <Typography variant={'subtitle2'}>
                        В стоп лист
                    </Typography>
                </Button>
                <Button variant={'primary'}>
                    <Typography variant={'subtitle2'}>
                        В заказ
                    </Typography>
                </Button>
            </div>
        </div>
    );
};
