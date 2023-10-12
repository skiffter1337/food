import React from 'react';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {Layout} from "./components/layout/layout";
import {LoginForm} from "./components/auth/loginForm/loginForm";
import {SignUpForm} from "./components/auth/signUpForm/signUpForm";
import {Error404} from "./pages/error404/error404";
import {Menu} from "./pages/menu/menu";
import {Orders} from "./pages/orders/orders";


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
                // {
                //     path: '/forgotPassword',
                //     element: <ForgotPasswordForm />,
                // },
                // {
                //     path: '/check-email',
                //     element: <CheckEmail />,
                // },
                // {
                //     path: '/create-new-password/:token',
                //     element: <CreateNewPassword />,
                // },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

const ProtectedRoutes = () => {
    // const { data, isLoading } = useMeQuery()

    // if (isLoading) return <div>Loading...</div>

    return true ? <Outlet /> : <Navigate to={'/login'} />
}

