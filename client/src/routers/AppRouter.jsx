// src/routers/AppRouter.js
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import Check from "../pages/Check";
import ResultLayout from "@/pages/layouts/ResultLayout";
import ResultTable from "@/pages/ResultTable";
import ResultChart from "@/pages/ResultChart";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import { useAuth } from "../context/AuthContext"; // Impor useAuth
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
    },
    {
        path: "/check",
        element: (
            <PrivateRoute>
                <Check />
            </PrivateRoute>
        ),
    },
    {
        path: "/result",
        element: (
            <PrivateRoute>
                <ResultLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "health-table", // hapus '/'
                element: (
                    <PrivateRoute>
                        <ResultTable />
                    </PrivateRoute>
                ),
            },
            {
                path: "health-charts", // hapus '/'
                element: (
                    <PrivateRoute>
                        <ResultChart />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
