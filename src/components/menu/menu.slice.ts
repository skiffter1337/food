import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {menuApi} from "./menu.api";
import {authActions, login} from "../auth/auth.slice";
import {authApi} from "../auth/auth.api";
import {toast} from "react-toastify";
import {toastError} from "../../helpers/toastVariants/error/error";
import {appActions} from "../../app/app.slice";


const initialState: MenuType[] = []

export type MenuType = {
    id: number
    name: string
    price: number
    weight: number
    description: string
    isEmpty: boolean
    categoryId: number
    createdAt?: string
    updatedAt?: string
    count?: number
}

type MenuItemType = {
    categoryId: number
    name: string
    price: number
    weight: number
    description: string
}

const getMenu = createAppAsyncThunk(
    'menu/getMenu', async (arg, thunkAPI) => {
            const res = await menuApi.getMenu();
            return {menu: res.data};
    }
);

const addItem = createAppAsyncThunk<{ item: MenuType }, MenuItemType>('menu/addItem',
    async (item) => {
        const res = await menuApi.addItem(item)
        return {item: res.data}

    })
const deleteItem = createAppAsyncThunk<{ id: number }, number>(
    'menu/deleteItem',
    async (id) => {
        const res = await menuApi.deleteItem(id)
        return res.data
    }
)

const editItem = createAppAsyncThunk<MenuType, MenuType>(
    'menu/editItem',
    async (item) => {
        const res = await menuApi.changeItem(item)
        return res.data
    }
)


const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.fulfilled, (state, action) => {
                return action.payload.menu
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.push(action.payload.item)
            })

            .addCase(deleteItem.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (menu) => menu.id === action.payload.id
                )
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(editItem.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.id === action.payload.id)
                if (index !== -1) state[index] = action.payload
            })
    }
})

export const menuSlice = slice.reducer
export const menuActions = slice.actions
export const menuThunks = {getMenu, addItem, deleteItem, editItem}