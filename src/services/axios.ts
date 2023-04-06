import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "maha-token": token } = parseCookies(ctx);
  // console.log(token);
  const api = axios.create({
    baseURL: "http://127.0.0.1:3333/api",
  });

  api.interceptors.request.use(async (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // if (token) {
  //   api.defaults.headers["Authorization"] = `Bearer ${token}`;
  // }

  return api;
}
