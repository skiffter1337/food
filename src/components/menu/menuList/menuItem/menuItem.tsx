import React, {FC} from 'react';
import {Typography} from "../../../ui/typography/typography";
import {Button} from "../../../ui/button/button";
import s from './menuItem.module.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {orderActions} from "../../../orders/orders.slice";
import {IconButton} from "../../../ui/IconButton/IconButton";
import {menuThunks, MenuType} from "../../menu.slice";
import {useActions} from "../../../../hooks/useActions";
import {selectIsAdmin} from "../../../../app/app.selector";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {EditOutlined} from "../../../../images/icons/editOutlined/editOutlined";
import {TrashOutlined} from "../../../../images/icons/trashOutlined/trashOutlined";
import {EditGoodModal} from "../../../ui/modal/editGoodModal/editGoodModal";

type MenuItemPropsType = {
    good: MenuType
    id: number
    name: string
    price: number
    weight: number
    description: string
    isEmpty: boolean
    deleteItem: (id: number) => void
}
export const MenuItem: FC<MenuItemPropsType> = ({good, id, name, price, weight, description, isEmpty, deleteItem}) => {
    const dispatch = useAppDispatch()
    const {editItem} = useActions(menuThunks)
    const isAdmin = useAppSelector(selectIsAdmin)

    return (
        <div className={s.good}>
            <div className={s.header}>
                <div>
                    <Typography variant={'h3'}>
                        {name}
                    </Typography>
                </div>
                {isAdmin &&
                    <div className={s.manageGood}>
                        <EditGoodModal
                            width={'wide'}
                            trigger={<div className={s.editBtn}><EditOutlined/> </div>}
                            good={good}
                        />
                        <IconButton callback={() => deleteItem(id)}>
                            <TrashOutlined/>
                        </IconButton>

                    </div>}
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
                        <Button variant={'secondary'} onClick={() => editItem({...good, isEmpty: !isEmpty})}>
                            <Typography variant={'subtitle2'}>
                                Активировать
                            </Typography>
                        </Button> :
                        <Button variant={'secondary'} onClick={() => editItem({...good, isEmpty: !isEmpty})}>
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
