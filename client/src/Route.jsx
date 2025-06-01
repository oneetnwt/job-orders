import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobOrders from "./pages/JobOrders";
import Dashboard from "./pages/Dashboard";

function Route() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "job-orders",
          element: <JobOrders />,
        },
      ],
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default Route;
