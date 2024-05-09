import React, { useRef, useContext } from "react";
import um from "../../assets/images/um.png";
import axios from 'axios'
import "../../assets/styles/login.css";
import { TextInput, FloatingLabel } from "flowbite-react";
import { floatLabelThemes } from "../../assets/themes/floatLabel.js";
import AuthContext from "../../assets/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  document.title = "Login";
  const email = useRef();
  const password = useRef();
  const { login } = useContext(AuthContext);

  const loginSubmit = async () => {
    let payload = {
      email: email.current.value,
      password: password.current.value,
    };
    await login(payload)
  };
  return (
    <div className="bg-um py-16">
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="form-glass drop-shadow-lg w-1/3 mx-auto flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <div className=" relative ">
                <label className="text-gray-700">Email</label>
                <input
                  ref={email}
                  type="text"
                  id="name-with-label"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="email"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <div className=" relative ">
                <label className="text-gray-700">
                  Password
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="password"
                  id="with-indications"
                  ref={password}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex justify-end text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={loginSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-black-500 font-semibold">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
