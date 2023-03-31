import axios, { AxiosRequestConfig } from 'axios';
import { buildMemoryStorage, setupCache } from 'axios-cache-interceptor';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'default key';
const setup = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
});

setup.interceptors.request.use(
  function(config: AxiosRequestConfig) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = API_KEY;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

const Api = setupCache(setup, {
  storage: buildMemoryStorage()
})

export default Api;
