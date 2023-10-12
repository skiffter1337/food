import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../components/auth/auth.slice";

export const rootReducer = combineReducers({
    auth: authSlice
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),

})







// @ts-ignore
window.store = store