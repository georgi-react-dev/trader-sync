// client/src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import httpClient from "../api/httpClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const register = async (email, password) => {
    console.log({ email });
    console.log({ password });
    await httpClient.post("/register", {
      email,
      password,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setToken(token);
    }
    if (user) {
      setUser(user);
    }
  }, [setToken, setUser]);

  const login = async (email, password) => {
    try {
      const response = await httpClient.post("/login", {
        email,
        password,
      });
      console.log({ LOGIN: response });
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setError({ msg: "Login failed!" });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    register,
    login,
    logout,
    setToken,
    setUser,
    error,
    setError,
    refetch,
    setRefetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
