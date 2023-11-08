import React, {FC} from 'react';
import s from './orderPanel.module.scss'
import {Select, SelectItemsType} from "../../ui/select/select";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectOrders} from "../orders.selector";
import {TabsType, TabSwitcher} from "../../ui/tabSwitcher/tabSwitcher";
import {CheckboxItem} from "../../ui/checkbox/checkbox";
import {OrdersResponseType} from "../order.api";
import {selectIsCashier, selectIsKitchen} from "../../../app/app.selector";


type OrderPanelPropsType = {
    setSortedOrders: (orders: OrdersResponseType[]) => void
    sortedOrders: OrdersResponseType[]
    isTodayOrdersOnly: boolean
    setIsTodayOrderOnly: (isTodayOrdersOnly: boolean) => void
}

export const OrderPanel: FC<OrderPanelPropsType> = ({setSortedOrders, sortedOrders, isTodayOrdersOnly, setIsTodayOrderOnly}) => {

    const orders = useAppSelector(selectOrders)
    const isKitchen = useAppSelector(selectIsKitchen)
    const isCashier = useAppSelector(selectIsCashier)

    const sortOrderItems: SelectItemsType[] = [
        {
            id: 1,
            value: 1,
            title: 'Сначала новые',
            disabled: false
        },
        {
            id: 2,
            value: 2,
            title: 'Сначала старые',
            disabled: false
        },
        {
            id: 3,
            value: 3,
            title: 'По возрастанию цены',
            disabled: false
        },
        {
            id: 4,
            value: 4,
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
                            onSelect={(value) => {}}
                        />
                    <CheckboxItem label={'Показать сегодняшние заказы'} onChange={() => setIsTodayOrderOnly(!isTodayOrdersOnly)} checked={isTodayOrdersOnly}/>
                    </div>
                    <TabSwitcher
                        tabs={tabsByRoles()}
                        defaultValue={'all'}
                        callback={(value) => setSortedOrders(orders.filter(order => {
                            if(value === 'all') return order
                            return order.status === value
                        }))}
                    />
                </>
            }
        </>
    );
};
