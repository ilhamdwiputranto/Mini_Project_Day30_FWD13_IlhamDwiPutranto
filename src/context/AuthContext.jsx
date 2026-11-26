import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("dibitech_token") || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("dibitech_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("dibitech_token", token);
    } else {
      localStorage.removeItem("dibitech_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("dibitech_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("dibitech_user");
    }
  }, [user]);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (data?.token) {
      setToken(data.token);
      setUser({ username });
      return data;
    }
    throw new Error("Token tidak ditemukan pada respons server.");
  };

  const register = async (formData) => {
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      address: {
        city: formData.city || "Yogyakarta",
        street: "Jl. Kaliurang",
        number: 10,
        zipcode: "55281",
      },
      phone: formData.phone || "0812-3456-7890",
    };
    const data = await registerUser(payload);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return <AuthContext.Provider value={{ token, user, isAuthenticated, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
