import { lazy } from "react";

import { createBrowserRouter } from "react-router-dom";

const ProtectedLayout = lazy(() => import("./layout/ProtectedLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/authentication/Login"));
const AuthenticationLayout = lazy(() =>
  import("./layout/AuthenticationLayout")
);
const Profile = lazy(() => import("./pages/Profile"));
const CreateProject = lazy(() => import("./pages/CreateProject"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "create-project",
        element: <CreateProject />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);
