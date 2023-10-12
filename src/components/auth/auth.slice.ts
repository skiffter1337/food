import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {authApi, LoginParamsType} from "./auth.api";


export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
    'auth/login',
    async (arg, { rejectWithValue, dispatch }) => {
        const res = await authApi.login(arg);
        console.log(res)
            return rejectWithValue(res.data);
    }
);



const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
          setIsLoggedIn(state, action: PayloadAction<{isLoggedIn: boolean}>) {
              state.isLoggedIn = action.payload.isLoggedIn
          }
    }
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { login };