import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {ordersApi, OrdersResponseType, StatusType} from "./order.api";
import {toast} from "react-toastify";
import {toastSuccess} from "../../helpers/toastVariants/success/success";
import {toastError} from "../../helpers/toastVariants/error/error";

export type FilterType = 'all' | 'created' | 'preparing' | 'readyForPickup' | 'finished'

const initialState: OrdersType = {
    orderPreview: [],
    orders: [],
    filter: 'all',
    isTodayOrdersOnly: true
}

type OrdersType = {
    orderPreview: OrderPreviewItemType[]
    orders: OrdersResponseType[]
    filter: FilterType
    isTodayOrdersOnly: boolean
}

type OrderPreviewItemType = {
    id: number
    count: number
}
export type OrdersItemType = {
    items: OrderPreviewItemType[]
    comment: string
    status: StatusType
}


const sendOrderToKitchen = createAppAsyncThunk<null, OrdersItemType>('orders/sendOrderToKitchen',
    async (order) => {
        const res = await ordersApi.sendOrderToKitchen(order)
        return null
    }
)
const changeOrder = createAppAsyncThunk<OrdersResponseType, OrdersResponseType>('orders/changeOrder',
    async (order) => {
        const res = await ordersApi.changeOrder(order)
        return res.data
    }
)


let intervalId: NodeJS.Timer;

const getOrdersLongPolling = createAppAsyncThunk('orders/getOrdersLongPolling', async (_, {dispatch}) => {
    const interval = 5000
    const fetchOrders = async () => {
        try {
            const res = await ordersApi.getOrders()
            dispatch(orderActions.setOrders(res.data))
        } catch (error) {
            console.error(error);
        }
    }

    intervalId = setInterval(fetchOrders, interval);

})

const stopFetchingOrders = createAppAsyncThunk('orders/stopFetchingOrders', (_, {dispatch}) => {
    clearInterval(intervalId);
})

const getOrders = createAppAsyncThunk('orders/getOrders',
    async (_, {dispatch}) => {
        const res = await ordersApi.getOrders()
        dispatch(orderActions.setOrders(res.data))
        dispatch(getOrdersLongPolling())
    }
)

const getOrdersWithSorting = createAppAsyncThunk('orders/getOrderWithSorting',
    async (sortingParams: string, {dispatch}) => {
    try {
        const res = await ordersApi.getOrderWithSorting(sortingParams)
        dispatch(orderActions.setOrders(res.data));
    } catch (err: any) {
        toast.error(err.data.error, toastError)
    }
    }
)

const deleteOrder = createAppAsyncThunk<number, number>('order/deleteOrder',
    async (id) => {
      try {
          const res = await ordersApi.deleteOrder(id)
          toast.success('Заказ удален', toastSuccess)
          return res.data.id
      } catch (err) {
          toast.error('Что-то пошло не так', toastError)
      }
    })
const slice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addItemToOrder: (state, action) => {
            const newItem = action.payload
            const existingItem = state.orderPreview.find(item => item.id === newItem.id)

            if (existingItem) {
                existingItem.count += newItem.count
            } else {
                state.orderPreview.push(newItem)
            }
        },
        removeItemFromOrder: (state, action) => {
            const itemIdToRemove = action.payload;
            const existingItem = state.orderPreview.find(item => item.id === itemIdToRemove)

            if (existingItem) {
                if (existingItem.count > 1) {
                    existingItem.count -= 1
                } else {
                    state.orderPreview = state.orderPreview.filter(item => item.id !== itemIdToRemove)
                }
            }
        },
        setOrders: (state, action) => {
            state.orders = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setIsTodayOrdersOnly: (state, action) => {
            state.isTodayOrdersOnly = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrderToKitchen.fulfilled, (state, action) => {
                return {...state, orderPreview: []}
            })
            .addCase(changeOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order.id === action.payload.id)
                if (index !== -1) state.orders[index] = action.payload
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order.id === action.payload)
                if (index !== -1) state.orders.splice(index, 1)
            })
    }
})

export const ordersSlice = slice.reducer
export const orderActions = slice.actions

export const orderThunks = {sendOrderToKitchen, getOrdersLongPolling, stopFetchingOrders, getOrders, changeOrder, deleteOrder, getOrdersWithSorting}