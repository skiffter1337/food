import React, {FC} from 'react';
import {Typography} from "../../../ui/typography/typography";
import {Button} from "../../../ui/button/button";
import s from './menuItem.module.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {orderActions} from "../../../orders/orders.slice";
import {menuThunks, MenuType} from "../../menu.slice";
import {useActions} from "../../../../hooks/useActions";
import {selectIsAdmin} from "../../../../app/app.selector";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {EditOutlined} from "../../../../images/icons/editOutlined/editOutlined";
import {TrashOutlined} from "../../../../images/icons/trashOutlined/trashOutlined";
import {EditGoodModal} from "../../../ui/modal/editGoodModal/editGoodModal";
import {DeleteEntityModal} from "../../../ui/modal/deleteEntityModal/deleteEntityModal";
import {selectOrder} from "../../../orders/orders.selector";

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
    const orderPreview = useAppSelector(selectOrder)

    const goodInOrderPreview = orderPreview.find(el => el.id === good.id)

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
                            trigger={<div className={s.btnWrapper}><EditOutlined/></div>}
                            good={good}
                        />
                        <DeleteEntityModal
                            width={'narrow'}
                            entityId={good.id}
                            action={deleteItem}
                            text={`Удалить ${good.name}?`}
                            trigger={<div className={s.btnWrapper}><TrashOutlined/></div>}
                        />
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
            <div className={s.footer}>
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
                {goodInOrderPreview ?
                    <div className={`${s.counter} ${good.isEmpty ? s.disabled : ''}`}>
                        <Button disabled={good.isEmpty} onClick={() => dispatch(orderActions.removeItemFromOrder(good.id))}>
                            <Typography variant={'subtitle2'}>
                                -
                            </Typography>
                        </Button>
                        <div className={s.count}>
                            <Typography variant={'subtitle2'}>
                                {goodInOrderPreview.count} шт.
                            </Typography>
                        </div>
                        <Button disabled={good.isEmpty} onClick={() => dispatch(orderActions.addItemToOrder({id, count: 1}))}>
                            <Typography variant={'subtitle2'}>
                                +
                            </Typography>
                        </Button>
                    </div>
                    :
                    <Button disabled={good.isEmpty}
                            onClick={() => dispatch(orderActions.addItemToOrder({id, count: 1}))}
                    >
                        <Typography variant={'subtitle2'}>
                            В заказ
                        </Typography>
                    </Button>
                }
            </div>
        </div>
    );
};
