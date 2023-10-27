import React, {FC} from 'react';
import {Typography} from "../../../ui/typography/typography";
import {Button} from "../../../ui/button/button";
import s from './menuItem.module.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {orderActions} from "../../../orders/orders.slice";
import {DeleteButton} from "../../../ui/deleteButton/deleteButton";
import {menuThunks, MenuType} from "../../menu.slice";
import {useActions} from "../../../../hooks/useActions";
import {selectIsAdmin} from "../../../../app/app.selector";
import {useAppSelector} from "../../../../hooks/useAppSelector";

type MenuItemPropsType = {
    good: MenuType
    id: number
    name: string
    price: number
    weight: number
    description: string | null
    isEmpty: boolean
    deleteItem: (id: number) => void
}
export const MenuItem: FC<MenuItemPropsType> = ({good, id, name, price, weight, description, isEmpty, deleteItem}) => {
    const dispatch = useAppDispatch()
    const {changeItemsStatus} = useActions(menuThunks)
    const isAdmin = useAppSelector(selectIsAdmin)

    return (
        <div className={s.good}>
            <div className={s.header}>
                <div>
                    <Typography variant={'h3'}>
                        {name}
                    </Typography>
                </div>
                {isAdmin && <DeleteButton callback={() => deleteItem(id)}/>}
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
                {isAdmin ? (isEmpty ?
                        <Button variant={'secondary'} onClick={() => changeItemsStatus(good)}>
                            <Typography variant={'subtitle2'}>
                                Активировать
                            </Typography>
                        </Button> :
                        <Button variant={'secondary'} onClick={() => changeItemsStatus(good)}>
                            <Typography variant={'subtitle2'}>
                                В стоп лист
                            </Typography>
                        </Button>)
                    : null
                }
                <Button variant={'primary'} disabled={good.isEmpty}
                        onClick={() => dispatch(orderActions.addItemToOrder({id, count: 1}))}
                >
                    <Typography variant={'subtitle2'}>
                        В заказ
                    </Typography>
                </Button>
            </div>
        </div>
    );
};
