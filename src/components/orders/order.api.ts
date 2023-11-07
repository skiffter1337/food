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
    changeOrder(order: OrdersResponseType) {
        return instance.put(`orders/${order.id}`, order)
    },
    deleteOrder(id: number) {
        return instance.delete(`orders/${id}`)
    }
}

export type OrdersResponseType = {
    id: number
    name: string
    status: StatusType
    createdAt?: Date
    updatedAt?: string
    items: MenuType[]
    comment: string
    total_price?: number
    isEdit: boolean
}
export type StatusType = 'created' | 'preparing' | 'readyForPickup'  | 'finished'