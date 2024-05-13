/* eslint-disable react/prop-types */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "flowbite-react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { AuthContextProvider } from "./assets/context/AuthContext";
import HomeLayout from "./assets/layouts/HomeLayout";
import DashboardLayout from "./assets/layouts/DashboardLayout";
import Home from "../home/Home";
import Code from "../code/Code";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import Problems from "../dashboard/problems/Problems";
import AddProblem from "../dashboard/problems/AddProblem";
import ProblemDetails from "../dashboard/problems/ProblemDetails";
import Solutions from "../dashboard/solutions/Solutions";
import Users from "../dashboard/users/Users";
import { loaderGet } from "./loaders/loaderGet";
import { loaderParams } from "./loaders/loaderParams";

const App = ({ children }) => {
  const navigate = useNavigate();

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

  function AdminLayout() {
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
            const data = await loaderGet(
              "https://ojs-gateway.localgems.my.id/problems"
            );
            if (data == undefined) {
              navigate("/login");
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
          element: <Problems />,
          loader: async () => {
            let data = await loaderGet(
              "https://ojs-gateway.localgems.my.id/problems"
            );
            return data;
          },
        },
        {
          path: "/dashboard/problems/:id",
          element: <ProblemDetails />,
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
            let data = await loaderGet(
              "https://ojs-gateway.localgems.my.id/users"
            );
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
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
