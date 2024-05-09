import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import $ from "jquery";
import { navbarTheme } from "./assets/themes/navbarTheme.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Code from "./pages/code/Code.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/Register.jsx";
import Problem from "./pages/admin/problems/problem/Problems.jsx";
import ProblemDetail from "./pages/admin/problems/detail/ProblemDetails.jsx";
import AddProblem from "./pages/admin/problems/addProblem/AddProblem.jsx";
import { loaderGet } from "./loaders/loaderGet.js";
import { loaderParams } from "./loaders/loaderParams.js";
import "./index.css";
import { AuthContextProvider } from "./assets/context/AuthContext.jsx";
import HomeLayout from "./assets/layouts/HomeLayout.jsx";
import DashboardLayout from "./assets/layouts/DashboardLayout.jsx";
import Solutions from "./pages/admin/solutions/Solutions.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Users from "./pages/admin/users/Users.jsx";
import App from "./App.jsx";

function AuthLayout() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}

function DefaultLayout() {
  return (
    <AuthContextProvider>
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    </AuthContextProvider>
  );
}

export function AdminLayout() {
  return (
    <AuthContextProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AuthContextProvider>
  );
}
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const data = await loaderGet("http://localhost:8001/problems");
          if (data == undefined) {
            window.location.href = "/login";
          }
          return data;
        },
      },
      {
        path: "/solve/:id",
        element: <Code />,
        loader: async ({ params }) => {
          let data = await loaderParams(
            "http://localhost:8001/problems",
            params.id
          );
          return data;
        },
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          let userProfile = JSON.parse(localStorage.getItem("userProfile"));
          const id = userProfile.id;
          let data = await loaderParams(
            "http://localhost:8001/submition/user",
            id
          );
          return data;
        },
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard/problems",
        element: <Problem />,
        loader: async () => {
          let data = await loaderGet("http://localhost:8001/problems");
          return data;
        },
      },
      {
        path: "/dashboard/problems/:id",
        element: <ProblemDetail />,
        loader: async ({ params }) => {
          let data = await loaderParams(
            "http://localhost:8001/problems",
            params.id
          );
          return data;
        },
      },
      {
        path: "/dashboard/problems/add",
        element: <AddProblem />,
      },
      {
        path: "/dashboard/solutions/:id",
        element: <Solutions />,
        loader: async ({ params }) => {
          let data = await loaderParams(
            "http://localhost:8001/submition/solutions",
            params.id
          );
          return data;
        },
      },
      {
        path: "/dashboard/users",
        element: <Users />,
        loader: async () => {
          let data = await loaderGet("http://localhost:8001/users");
          return data;
        },
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
