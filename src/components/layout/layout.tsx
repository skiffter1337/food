import {Outlet} from 'react-router-dom'
import s from './laytout.module.scss'
import {Header} from "./header/header";
import {ToastContainer} from "react-toastify";
import React from "react";

export const Layout = () => {

    return (
        <>
            <Header />
            <div className={s.outlet}>
                <Outlet />
            </div>
            <ToastContainer/>
        </>
    )
}