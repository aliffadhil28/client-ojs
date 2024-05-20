/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    let tkn = sessionStorage.getItem("token");
    if (tkn) {
      return tkn;
    } else {
      return navigate("/login");
    }
  });
  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return navigate("/login");
  });
  const login = async (payload) => {
    // axios.defaults.headers.post['Content-Type'] ='application/json';
    let profile = await axios.post(
      "https://ojs-gateway.localgemy.my.id/auth/login",
      payload,
      {
        withCredentials: true,
      }
    );
    // let profile = axios.get("http://localhost:5000/users/", {
    //   withCredentials: true,
    // });
    localStorage.setItem("userProfile", JSON.stringify(profile.data.user));
    sessionStorage.setItem("token", profile.data.token);
    setToken(profile.data.token);
    setUser(profile.data.user);
    navigate("/");
  };
  const refresh = async (payload) => {
    let profile = await axios.post(
      "https://ojs-gateway.localgemy.my.id/auth/refresh-token",
      payload,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("userProfile", JSON.stringify(profile.data.user));
    setUser(profile.data.user);
  };
  return (
    <AuthContext.Provider value={{ user, login, refresh ,token}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
