//This file wraps axios api calls with joining the base url and token header
import axios from "axios";
import { getToken, removeToken, setToken } from "./token";

const api = axios.create({
  baseURL: "http://localhost:3000", // base url which will be used for all api calls
});

api.interceptors.request.use((call) => {
  const token = getToken();
  if (token) {
    call.headers.Authorization = `Bearer ${token}`;
  }
  return call;
});

export const login = async (email: string, password: string) => {
  console.log("Attempting to log in with email:", email); // Debug log
  const { data } = await api.post("/login", { email, password }); // login route will be put here in the future
  if (data.success) {
    console.log("Login successful, received data:", data);
    setToken(data.token); // set the token in local storage
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/me"); // me route will be put here in the future
  return data.user;
};

export const logout = () => {
  removeToken(); // remove the token from local storage
};
