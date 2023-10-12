import { Outlet, useNavigate } from 'react-router-dom'


import s from './laytout.module.scss'
import {Header} from "./header/header";
export const Layout = () => {

    const navigate = useNavigate()

    const logoutHandler = () => {
        //     logout().then(() => {
        //         navigate('/login')
        //     })
        // }
    }
    return (
        <>
            <Header isLoggedIn={true} logout={logoutHandler} />
            <div className={s.outlet}>
                <Outlet />
            </div>
        </>
    )
}