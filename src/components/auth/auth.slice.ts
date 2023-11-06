import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {authApi, LoginParamsType} from "./auth.api";
import {appActions, appThunks} from "../../app/app.slice";
import {toast} from "react-toastify";
import {toastError} from "../../helpers/toastVariants/error/error";
import {toastSuccess} from "../../helpers/toastVariants/success/success";


export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
    'auth/login',
    async (arg, {rejectWithValue, dispatch}) => {
        try {
            const res = await authApi.login(arg);
            localStorage.setItem('token', res.data.token)
            dispatch(appThunks.initializeApp())
            toast.success('Вы авторизовались!', toastSuccess)
            return {isLoggedIn: true}
        } catch (err: any) {
            if (err.response) {
                toast.error(err.response.data.message, toastError);
            } else {
                toast.error('Произошла неизвестная ошибка', toastError);
            }
            return { isLoggedIn: false };
        }
    }
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>(
    'auth/logout',
     (arg, {dispatch}) => {
        localStorage.removeItem('token')
        dispatch(appActions.setRole(null))
        return {isLoggedIn: false};
    }
);


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logout};