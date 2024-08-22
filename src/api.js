import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Replace this with your actual API base URL
const API_URL = "https://your-api-url.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const register = (name, email, password, userType) =>
  api.post("/auth/register", { name, email, password, userType });

export const createOrder = (orderData) => api.post("/orders", orderData);
export const getCustomerOrders = () => api.get("/orders/customer");
export const getAvailableOrders = () => api.get("/orders/available");
export const acceptOrder = (orderId) => api.post(`/orders/${orderId}/accept`);

export default api;
