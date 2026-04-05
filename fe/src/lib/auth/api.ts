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
  const { data } = await api.post("/login", { email, password }); // login route will be put here in the future
  if (data.success) {
    setToken(data.token); // set the token in local storage
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.post("/me"); // me route will be put here in the future
  return data.user;
};

export const logout = () => {
  removeToken(); // remove the token from local storage
};
