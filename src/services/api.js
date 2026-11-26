import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: menyisipkan token otentikasi ke header setiap request terproteksi
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dibitech_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth Services
export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data; // { token: "..." }
};

export const registerUser = async (userData) => {
  // FakeStoreAPI POST /users mensimulasikan pembuatan akun baru dan mengembalikan id
  if (!userData.username || !userData.password || !userData.email) {
    throw new Error("Username, email, dan password wajib diisi.");
  }
  if (userData.password.length < 4) {
    throw new Error("Password minimal harus 4 karakter.");
  }
  const response = await api.post("/users", userData);
  return response.data;
};

// Products Services (CRUD)
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Users Services (Protected with Token)
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export default api;
