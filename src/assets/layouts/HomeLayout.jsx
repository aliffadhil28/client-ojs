/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navbar, Button } from "flowbite-react";
import { navbarTheme } from "../themes/navbarTheme.js";
import AuthContext from "../context/AuthContext.jsx";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";

const HomeLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const curloc = location.pathname;
  function logout() {
    localStorage.removeItem("userProfile");
  }
  return (
    <div>
      <Navbar base rounded theme={navbarTheme}>
        <Navbar.Brand href="#">
          {/* <img src="" className="mr-3 h-6 sm:h-9" alt="Book Store Logo" /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <Link to="/">Cakra Online Judge</Link>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* <Navbar.Collapse>
          <div className="link flex flex-col w-full justify-between gap-2 md:flex-row">
            <Navbar.Link href="/" {...(curloc === "/" ? { active: true } : {})}>
              Problems
            </Navbar.Link>
            <Navbar.Link
              href="/discuss"
              {...(curloc === "/discuss" ? { active: true } : {})}
            >
              Discuss
            </Navbar.Link>
          </div>
        </Navbar.Collapse> */}
        <Navbar.Collapse>
          {user && (
            <div className="link ms-auto flex flex-col w-full justify-center gap-2 md:flex-row">
              <Navbar.Link>
                <Link to="/profile">{user?.username}</Link>
              </Navbar.Link>
              {user.role === "admin" && (
                <Navbar.Link>
                  <Link to="/dashboard/problems">Dashboard</Link>
                </Navbar.Link>
              )}
              <Button size="xs" onClick={logout} color="dark">
                <Link to="/login">Logout</Link>
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div className="my-5">{children}</div>
    </div>
  );
};

export default HomeLayout;
