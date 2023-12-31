import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../components/auth/auth.slice";
import {menuSlice} from "../components/menu/menu.slice";
import {categoriesSlice} from "../components/menu/menuList/categories/categories.slice";
import {appSlice} from "../app/app.slice";
import {ordersSlice} from "../components/orders/orders.slice";

export const rootReducer = combineReducers({
    app: appSlice,
    auth: authSlice,
    menu: menuSlice,
    categories: categoriesSlice,
    orders: ordersSlice
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),

})







// @ts-ignore
window.store = store