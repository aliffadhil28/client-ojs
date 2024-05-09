/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaExclamationCircle, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

export const ErrorPage = ({ status, count }) => {
  const [time, setTime] = useState(count);
  let message;
  switch (status) {
    case 401:
      message = "Access Unauthorized";
      break;
    case 404:
      message = "Page Not Found";
      break;

    default:
      message = "Unknown error";
      break;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 ">
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
              <FaExclamationCircle />
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              {status} | {message}
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              You'll be redirect back to home in <strong>{time}</strong> seconds
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                <FaArrowAltCircleLeft />

                <span>Go back</span>
              </button>

              <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Take me home
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
