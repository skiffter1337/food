import {AppRootStateType} from "../../store/store";

export const selectOrder = (state: AppRootStateType) => state.orders.orderPreview;
export const selectOrders = (state: AppRootStateType) => state.orders.orders;
