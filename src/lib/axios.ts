import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if exists in storage
    const token = localStorage.getItem('admin_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Centralized error handling
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Handle token expiration
        localStorage.removeItem('admin_auth_token');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
