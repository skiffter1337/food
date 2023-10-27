import {AppRootStateType} from "../store/store";


export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectIsLoading = (state: AppRootStateType) => state.app.isLoading
export const selectRole = (state: AppRootStateType) => state.app.role
export const selectIsAdmin = (state: AppRootStateType) => state.app.role === 'admin'
export const selectIsKitchen = (state: AppRootStateType) => state.app.role === 'kitchen'
export const selectIsCashier = (state: AppRootStateType) => state.app.role === 'cashier'

