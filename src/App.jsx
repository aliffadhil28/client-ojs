/* eslint-disable react/prop-types */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "flowbite-react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default App;
