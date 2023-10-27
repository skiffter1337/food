import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {authApi, LoginParamsType} from "./auth.api";
import {appActions, appThunks} from "../../app/app.slice";


export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
    'auth/login',
    async (arg, {rejectWithValue, dispatch}) => {
        const res = await authApi.login(arg);
        localStorage.setItem('token', res.data.token)
        dispatch(appThunks.initializeApp())
        return {isLoggedIn: true}
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