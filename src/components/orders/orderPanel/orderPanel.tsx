import React, {FC} from 'react';
import s from './orderPanel.module.scss'
import {Select, SelectItemsType} from "../../ui/select/select";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectIsTodayOrdersOnly, selectOrders} from "../orders.selector";
import {TabsType, TabSwitcher} from "../../ui/tabSwitcher/tabSwitcher";
import {CheckboxItem} from "../../ui/checkbox/checkbox";
import {selectIsCashier, selectIsKitchen} from "../../../app/app.selector";
import {useActions} from "../../../hooks/useActions";
import {FilterType, orderActions, orderThunks} from "../orders.slice";
import {useAppDispatch} from "../../../hooks/useAppDispatch";


type OrderPanelPropsType = {

}

export const OrderPanel: FC<OrderPanelPropsType> = () => {

    const orders = useAppSelector(selectOrders)
    const isKitchen = useAppSelector(selectIsKitchen)
    const isCashier = useAppSelector(selectIsCashier)
    const isTodayOrdersOnly = useAppSelector(selectIsTodayOrdersOnly)
    const {getOrdersWithSorting} = useActions(orderThunks)
    const {setFilter, setIsTodayOrdersOnly} = orderActions
    const dispatch = useAppDispatch()

    const sortOrderItems: SelectItemsType[] = [
        {
            id: 1,
            value: '?date=desc',
            title: 'Сначала новые',
            disabled: false
        },
        {
            id: 2,
            value: '?date=asc',
            title: 'Сначала старые',
            disabled: false
        },
        {
            id: 3,
            value: '?price=asc',
            title: 'По возрастанию цены',
            disabled: false
        },
        {
            id: 4,
            value: '?price=desc',
            title: 'По убыванию цены',
            disabled: false
        }
    ];

    const tabs: TabsType[] = [
        {
            value: 'all',
            title: 'Все',
            disabled: false
        },
        {
            value: 'created',
            title: 'Созданные',
            disabled: false
        },
        {
            value: 'preparing',
            title: 'Готовятся',
            disabled: false
        },
        {
            value: 'readyForPickup',
            title: 'Готовы к выдаче',
            disabled: false
        },
        {
            value: 'finished',
            title: 'Завершенные',
            disabled: false
        },
    ]


    const tabsByRoles = () => isKitchen ? tabs.filter(tab => tab.value !== 'readyForPickup' && tab.value !== 'finished') : isCashier ? tabs.filter(tab => tab.value !== 'preparing' && tab.value !== 'finished') : tabs

    return (
        <>
            {orders &&
                <>

                    <div className={s.manage_orders_buttons}>
                        <Select
                            placeholder={'Сортировка'}
                            size={'large'}
                            selectItems={sortOrderItems}
                            onSelect={(value) => getOrdersWithSorting(value)}
                        />
                    <CheckboxItem label={'Показать сегодняшние заказы'} onChange={() => dispatch(setIsTodayOrdersOnly(!isTodayOrdersOnly))} checked={isTodayOrdersOnly}/>
                    </div>
                    <TabSwitcher
                        tabs={tabsByRoles()}
                        defaultValue={'all'}
                        callback={(value) => dispatch(setFilter(value as FilterType))}
                    />
                </>
            }
        </>
    );
};

