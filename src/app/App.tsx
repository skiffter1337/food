import React, {useEffect} from 'react';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {Layout} from "../components/layout/layout";
import {LoginForm} from "../components/auth/loginForm/loginForm";
import {SignUpForm} from "../components/auth/signUpForm/signUpForm";
import {Error404} from "../components/error404/error404";
import {Menu} from "../components/menu/menu";
import {Orders} from "../components/orders/orders";
import {selectIsLoggedIn} from "../components/auth/auth.selector";
import {useAppSelector} from "../hooks/useAppSelector";
import {useActions} from "../hooks/useActions";
import {appThunks} from "./app.slice";
import {useSelector} from "react-redux";
import {selectIsInitialized} from "./app.selector";
import {Main} from "../components/main/main";
import CircularProgress from "@mui/material/CircularProgress";


export function App() {

    const protectedRoutes = [
        {
            path: '/',
            element: <Main/>

        },
        {
            path: '/menu',
            element: <Menu/>,
        },
        {
            path: '/orders',
            element: <Orders/>,
        },
        {
            path: '/*',
            element: <Error404/>,
        },
    ]

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {

                    element: <ProtectedRoutes/>,
                    children: protectedRoutes,
                },
                {
                    path: '/signUp',
                    element: <SignUpForm/>,
                },
                {
                    path: '/login',
                    element: <LoginForm/>,
                },
            ],
        },
    ])

    const isInitialized = useSelector(selectIsInitialized)


    const {initializeApp} = useActions(appThunks)

    useEffect(() => {
        initializeApp({})
    }, []);
    if (!isInitialized) {
        return <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress color="secondary" /></div>
    }

    return <RouterProvider router={router}/>
}


const ProtectedRoutes = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return isLoggedIn ? <Outlet/> : <Navigate to={'/login'}/>
}

