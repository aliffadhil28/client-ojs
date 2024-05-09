/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Sidebar, Button } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { FaFileCode, FaCode , FaDoorOpen ,FaUser} from "react-icons/fa";
import { sidebarTheme } from "../themes/sidebarTheme.js";
import AuthContext from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const curloc = location.pathname;
  // console.log(curloc);
  const time = 5;
  if (user.role != "admin") {
    setInterval(() => {
      navigate("/");
    }, time * 1000);
  }
  function logout() {
    localStorage.removeItem("userProfile");
    window.location.href = "/login";
  }
  return (
    <div>
      {user.role !== "admin" ? (
        <ErrorPage status={401} count={time} />
      ) : (
        <div className="h-screen p-4 grid grid-cols-5">
          <Sidebar
            theme={sidebarTheme}
            aria-label="Sidebar with content separator example"
          >
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {/* <Sidebar.Item
                  href="/dashboard"
                  {...(curloc === "/dashboard" ? { active: true } : {})}
                  icon={HiChartPie}
                >
                  Dashboard
                </Sidebar.Item> */}
                <Sidebar.Item
                  href="/dashboard/problems"
                  {...(curloc === "/dashboard/problems"
                    ? { active: true }
                    : {})}
                  icon={FaCode}
                >
                  Problems
                </Sidebar.Item>
                <Sidebar.Item
                  href="/dashboard/users"
                  {...(curloc === "/dashboard/users"
                    ? { active: true }
                    : {})}
                  icon={FaUser}
                >
                  User
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={FaDoorOpen}>
                  <Button size="xs" className="bg-gray-5 w-full justify-start ms-0 hover:bg-gray-50" onClick={logout} color="white">
                    Logout
                  </Button>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <div className="ms-4 col-span-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
