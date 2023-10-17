import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {boolean} from "zod";
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {authApi} from "../components/auth/auth.api";
import {authActions} from "../components/auth/auth.slice";

export type AppInitialStateType = {
    role: 'admin' | 'kitchen' | 'cashier' | null,
    isInitialized: boolean
}


export const initializeApp = createAppAsyncThunk('app/me', async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    try {
        const res = await authApi.me()
        dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
    }
    finally {
        dispatch(appActions.setInitialized({isInitialized: true}))
    }
})

const slice = createSlice({
    name: 'app',
    initialState: {
        role: null,
        isInitialized: false,
    },
    reducers: {
        setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appSlice = slice.reducer;
export const appActions = slice.actions
export const appThunks = {initializeApp}