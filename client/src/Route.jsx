import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'

function Route() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />
        },
        {
            path: "/auth/register",
            element: <Register />,
        },
        {
            path: "/auth/login",
            element: <Login />,
        },
    ])
    return <RouterProvider router={routes} />
}

export default Route