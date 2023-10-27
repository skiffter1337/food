import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {authApi} from "../components/auth/auth.api";
import {authActions} from "../components/auth/auth.slice";
import {toast} from "react-toastify";
import {toastError} from "../helpers/toastVariants/error/error";

export type AppInitialStateType = {
    role: RoleType
    isInitialized: boolean
    isLoading: boolean
}
export type RoleType = 'admin' | 'kitchen' | 'cashier' | null

let meData: AppInitialStateType;
export const initializeApp = createAppAsyncThunk('app/me', async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    try {
        const res = await authApi.me()
        meData = res.data
        if (res.data.isInitialized) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
        } else  {
            toast.error('Вы не авторизованы!', toastError)
        }
    } finally {
        dispatch(appActions.setInitialized())
        dispatch(appActions.setRole(meData.role))
    }
})

const slice = createSlice({
    name: 'app',
    initialState: {
        role: '',
        isInitialized: false,
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        },
        setInitialized: (state) => {
            state.isInitialized = true
        },
        setRole: (state, action) => {
           state.role = action.payload
        }
    }
})

export const appSlice = slice.reducer;
export const appActions = slice.actions
export const appThunks = {initializeApp}