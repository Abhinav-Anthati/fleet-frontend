import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

export function setAuth(email, password) {
  api.defaults.auth = { username: email, password: password };
}

export function clearAuth() {
  delete api.defaults.auth;
}

export default api;