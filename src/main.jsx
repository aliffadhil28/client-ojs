import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import $ from "jquery";
import { navbarTheme } from "./assets/themes/navbarTheme.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Code from "./pages/Code.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Problem from "./pages/Problems.jsx";
import ProblemDetail from "./pages/ProblemDetails.jsx";
import AddProblem from "./pages/AddProblem.jsx";
import { loaderGet } from "./loaders/loaderGet.js";
import { loaderParams } from "./loaders/loaderParams.js";
import "./index.css";
import { AuthContextProvider } from "./assets/context/AuthContext.jsx";
import HomeLayout from "./assets/layouts/HomeLayout.jsx";
import DashboardLayout from "./assets/layouts/DashboardLayout.jsx";
import Solutions from "./pages/Solutions.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/Users.jsx";
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
          const data = await loaderGet("https://ojs-gateway.localgems.my.id/problems");
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
            "https://ojs-gateway.localgems.my.id/problems",
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
            "https://ojs-gateway.localgems.my.id/submition/user",
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
          let data = await loaderGet("https://ojs-gateway.localgems.my.id/problems");
          return data;
        },
      },
      {
        path: "/dashboard/problems/:id",
        element: <ProblemDetail />,
        loader: async ({ params }) => {
          let data = await loaderParams(
            "https://ojs-gateway.localgems.my.id/problems",
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
            "https://ojs-gateway.localgems.my.id/submition/solutions",
            params.id
          );
          return data;
        },
      },
      {
        path: "/dashboard/users",
        element: <Users />,
        loader: async () => {
          let data = await loaderGet("https://ojs-gateway.localgems.my.id/users");
          return data;
        },
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login/",
        element: <Login />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
