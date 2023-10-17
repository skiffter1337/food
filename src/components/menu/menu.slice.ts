import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {menuApi} from "./menu.api";


const initialState: MenuType[] = []

export type MenuType = {
    id: number,
    name: string,
    price: number,
    weight: number,
    description: string | null,
    isEmpty?: boolean,
    categoryId: number,
    createdAt?: string,
    updatedAt?: string,
    category: CategoryType
}

type CategoryType = {
    id: number
    categoryName: string
    createdAt: string
    updatedAt: string
}

type MenuItemType = {
    categoryId: number
    name: string
    price: number
    weight: number
    description: string
}

const getMenu = createAppAsyncThunk(
    'menu/getMenu',
    async (arg, thunkAPI) => {
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
               debugger
                state.push(action.payload.item)
            })

            .addCase(deleteItem.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (menu) => menu.id === action.payload.id
                )
                if (index !== -1) state.splice(index, 1)
            })
    }
})

export const menuSlice = slice.reducer
export const menuActions = slice.actions
export const menuThunks = {getMenu, addItem, deleteItem}