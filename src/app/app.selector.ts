import {AppRootStateType} from "../store/store";


export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
