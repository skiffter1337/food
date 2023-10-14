import React from 'react';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {Layout} from "./components/layout/layout";
import {LoginForm} from "./components/auth/loginForm/loginForm";
import {SignUpForm} from "./components/auth/signUpForm/signUpForm";
import {Error404} from "./components/error404/error404";
import {Menu} from "./components/menu/menu";
import {Orders} from "./components/orders/orders";
import {selectIsLoggedIn} from "./components/auth/auth.selector";
import {useAppSelector} from "./hooks/useAppSelector";


export function App() {

    const protectedRoutes = [
        {
            path: '/menu',
            element: <Menu />,
        },
        {
            path: '/orders',
            element: <Orders />,
        },
        {
            path: '/*',
            element: <Error404 />,
        },
    ]

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    element: <ProtectedRoutes />,
                    children: protectedRoutes,
                },
                {
                    path: '/signUp',
                    element: <SignUpForm />,
                },
                {
                    path: '/login',
                    element: <LoginForm />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

const ProtectedRoutes = () => {

    const isLoggedIn= useAppSelector(selectIsLoggedIn)

    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

