import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://ec2-15-228-50-13.sa-east-1.compute.amazonaws.com:3000/"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;