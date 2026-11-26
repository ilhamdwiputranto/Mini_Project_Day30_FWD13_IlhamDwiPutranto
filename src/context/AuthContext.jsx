import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inisialisasi state dari localStorage agar sesi bertahan saat halaman dimuat ulang
  const [token, setToken] = useState(() => localStorage.getItem("dibitech_token") || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("dibitech_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Sinkronisasi perubahan token dengan localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("dibitech_token", token);
    } else {
      localStorage.removeItem("dibitech_token");
    }
  }, [token]);

  // Sinkronisasi perubahan data user dengan localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("dibitech_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("dibitech_user");
    }
  }, [user]);

  // Autentikasi user ke server dan simpan kredensial sesi.

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (data?.token) {
      setToken(data.token);
      setUser({ username });
      return data;
    }
    throw new Error("Token tidak ditemukan pada respons server.");
  };

  //  Registrasi user baru dengan mapping payload sesuai skema API (FakeStore/backend).

  const register = async (formData) => {
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      // Fallback default untuk field opsional yang diwajibkan endpoint
      address: {
        city: formData.city || "Yogyakarta",
        street: "Jl. Kaliurang",
        number: 10,
        zipcode: "55281",
      },
      phone: formData.phone || "0812-3456-7890",
    };

    return await registerUser(payload);
  };

  //  Hapus state sesi aktif

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
