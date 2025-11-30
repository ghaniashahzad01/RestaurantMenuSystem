import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach token automatically (ADMIN FIRST, USER SECOND)
api.interceptors.request.use((config) => {

  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));

  const token = admin?.token || user?.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
});

export default api;
