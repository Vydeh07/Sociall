import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance as api } from "../utils/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("userId");

    if (token && name && id) {
      setUser({ token, name, id });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, name, id } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", id);

      setUser({ token, name, id });

      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  const signup = async (name, email, password) => {
    try {
      await api.post("/auth/signup", { name, email, password });

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      alert("Signup failed. User may already exist.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");

    setUser(null);

    navigate("/login");
  };

  const value = {
    user,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

