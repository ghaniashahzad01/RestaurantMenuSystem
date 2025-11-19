import axios from "axios";

// baseURL points to your Django backend
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true, // keep session cookies for Django session auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
