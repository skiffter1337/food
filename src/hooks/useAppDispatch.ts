import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AppRootStateType} from "../store/store";


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()