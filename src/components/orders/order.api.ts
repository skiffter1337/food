import {instance} from '../../common/api/common.api'
import {OrdersItemType} from "./orders.slice";
import {MenuType} from "../menu/menu.slice";

export const ordersApi = {
    sendOrderToKitchen(data: OrdersItemType) {
        return instance.post('orders', data)
    },
    getOrders() {
        return instance.get<OrdersResponseType>('orders')
    },
    changeOrderStatus(order: OrdersResponseType) {
        return instance.put(`orders/${order.id}`, order)
    }
}

export type OrdersResponseType = {
    id: number
    name: string
    status: StatusType
    createdAt?: string
    updatedAt?: string
    items: MenuType[]
    comment: string
    total_price?: number
}
export type StatusType = 'created' | 'readyForPickup' | 'finished'