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
import Home from "./pages/Home";
import Code from "./pages/Code";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Problems from "./pages/Problems";
import AddProblem from "./pages/AddProblem";
import ProblemDetails from "./pages/ProblemDetails";
import Solutions from "./pages/Solutions";
import Users from "./pages/Users";
import { loaderGet } from "./loaders/loaderGet";
import { loaderParams } from "./loaders/loaderParams";

const App = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default App;
