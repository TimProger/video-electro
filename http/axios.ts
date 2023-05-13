import axios, {InternalAxiosRequestConfig} from "axios";
import {Storage} from "@/utils/storage";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const PORT = 3000

export const API_BASE_URL = "http://89.111.136.45:8000";
export const APP_BASE_URL = `http://localhost:${PORT}`

const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    common: {
      accept: 'application/json'
    }
  }
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  if(config.headers){
    config.headers.Authorization = Storage.get("accessToken");
  }
  return config;
};

// const refreshAuthLogic = async (error: any) => {
//   const originalRequest = error.config;
//   if (error.response && error.response.status === 401 && error.config && !error.config._isRetry) {
//     originalRequest._isRetry = true;
//     try {
//       const response = await axios.post(`${API_BASE_URL}/jwt/refresh`, {}, {withCredentials: true})
//       Storage.set('accessToken', 'Bearer ' + response.data.access);
//       window.location.replace('/')
//     } catch (e) {
//       Storage.delete('accessToken');
//       window.location.replace('/')
//     }
//   }
//   throw error;
// }

$api.interceptors.request.use(authInterceptor)
// createAuthRefreshInterceptor($api, refreshAuthLogic);

export { $api };