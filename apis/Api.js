import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const Api = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
});

Api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = API_KEY;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default Api;
