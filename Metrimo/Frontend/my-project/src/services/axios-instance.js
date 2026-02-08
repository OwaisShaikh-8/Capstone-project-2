// redux/api/axiosInstance.js
import axios from "axios";
import { toast } from "react-hot-toast";
import { logout } from "../redux/slice/authSlice";

let store; // injected later to avoid circular dependency

export const injectStore = (_store) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: "https://capstone-project-2-production.up.railway.app/api",
  // baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

/* 🔐 REQUEST INTERCEPTOR */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* 🚨 RESPONSE INTERCEPTOR */
axiosInstance.interceptors.response.use(
  (response) => {
    // If server sends a success message, show toast
    const successMessage = response.data?.message;
    if (successMessage) {
      toast.success(successMessage);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    // Auto logout on 401 / 403
    if (status === 401 || status === 403) {
      store?.dispatch(logout());
      if (serverMessage) toast.error(serverMessage);
    } else if (serverMessage) {
      toast.error(serverMessage); // show server error messages
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
