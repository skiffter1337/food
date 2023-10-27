import {createSlice} from "@reduxjs/toolkit";
import {categoriesApi} from "./categories.api";
import {createAppAsyncThunk} from "../../../../common/utils/create-app-async-thunk";
import {appActions} from "../../../../app/app.slice";
import {menuApi} from "../../menu.api";
import {menuThunks, MenuType} from "../../menu.slice";
import {toastError} from "../../../../helpers/toastVariants/error/error";

const initialState: CategoryType[] = []

export type CategoryType = {
    id: number,
    categoryName: string
    menuItems: MenuType[]
}

const getCategories = createAppAsyncThunk('categories/getCategories',
    async (arg, thunkAPI) => {
        const res = await categoriesApi.getCategories()
        return {categories: res.data}
    }
)
const addCategory = createAppAsyncThunk<{ category: CategoryType }, string>('categories/addCategory',
    async (categoryName) => {
        const res = await categoriesApi.addCategory({categoryName})
        return {category: res.data}
    })

const deleteCategory = createAppAsyncThunk<{ id: number }, number>('categories/deleteCategory',
    async (id) => {
        const res = await categoriesApi.deleteCategory(id)
        return {id: res.data.id}
    })
const slice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                return action.payload.categories
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.push(action.payload.category)
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const index = state.findIndex(cat => cat.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
    }
})

export const categoriesSlice = slice.reducer
export const categoriesThunks = {getCategories, addCategory, deleteCategory}