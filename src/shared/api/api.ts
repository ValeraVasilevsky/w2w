import axios from "axios";

import { VITE_BASE_API_URL } from "../constants";

export const apiClient = axios.create({
  baseURL: VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (req) => req,
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);
