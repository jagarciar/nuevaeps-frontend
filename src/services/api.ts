import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { clearUserSession } from '@utils/authUtils';

const API_BASE_URL = '/api/v1';

const apiCall: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request para agregar token JWT
apiCall.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response para manejar errores
apiCall.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el servidor retorna 401, limpiar sesión y redirigir al login
    if (error.response?.status === 401) {
      clearUserSession();
      // Redirigir solo si no estamos ya en login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { apiCall };
