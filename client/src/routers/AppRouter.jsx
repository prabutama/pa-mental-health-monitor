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
import TestSkeleton from "@/pages/TestSkeleton";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/skel",
        element: <TestSkeleton />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/result",
        element: <ResultLayout/>,
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
