import axios from 'axios';
import { logout } from './commonApi'; // You'll need to implement this function in commonApi.js
import { config } from '../env/env.tsx';
const instance = axios.create({
  baseURL:config?.baseUrl, // Replace with your API base URL
});

instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('_u'));

    if (userData && userData.token) {
      config.headers['x-access-user'] = userData.accountId; // Assuming _id is the user identifier
      config.headers['x-access-token'] = userData.token;
      config.headers['authorization'] = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Do something with the response if needed
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default instance;
