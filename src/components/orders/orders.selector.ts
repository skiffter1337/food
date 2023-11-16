import {AppRootStateType} from "../../store/store";

export const selectOrder = (state: AppRootStateType) => state.orders.orderPreview;
export const selectOrders = (state: AppRootStateType) => state.orders.orders;

export const selectFilter = (state: AppRootStateType) => state.orders.filter;
export const selectIsTodayOrdersOnly = (state: AppRootStateType) => state.orders.isTodayOrdersOnly;
