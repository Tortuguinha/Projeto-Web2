
import { createBrowserRouter, Navigate } from "react-router-dom";

import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";

import AuthLayout from "../pages/auth/layout";
import PublicLayout from "../pages/_layout/PublicLayout"
import ProtectedLayout from "../pages/_layout/ProtectedtLayout"
import SignInPage from "../pages/auth/sign-in";
import SignUpPage from "../pages/auth/sign-up";

import DashboardLayout from "../pages/dashboard/layout";
import DashboardPage from "../pages/dashboard/main";
import DashboardClients from "../pages/dashboard/clients/main"
import DashboardComputers from "../pages/dashboard/computers/main"
import DashboardSettings from "../pages/dashboard/settings/main"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/auth",
    element: <PublicLayout><AuthLayout /></PublicLayout>,
    children: [
      { index: true, element: <Navigate to="/auth/sign-in" replace /> }, // redireciona /auth
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> }
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectedLayout><DashboardLayout /></ProtectedLayout>,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "clients",
        element: <DashboardClients />
      },
      {
        path: "computers",
        element: <DashboardComputers />
      },
      {
        path: "settings",
        element: <DashboardSettings />
      }
    ]
  },
  {
	  path: "*",
    element: <NotFoundPage />
  }
]);

export default router;
