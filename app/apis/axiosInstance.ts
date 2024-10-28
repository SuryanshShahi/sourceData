import axios from "axios";
import { getCookie } from "../utils/Cookies";

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: "",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getCookie("token");

      if (token && token.accessToken) {
        config.headers["Authorization"] = `Bearer ${token.accessToken}`;
      } else {
        console.warn("Access token not found");
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  return instance;
};

export default axiosInstance;
