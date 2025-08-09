import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// Attach Authorization header if token exists
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('path2ivy_token');
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      // Clear and redirect to login
      localStorage.removeItem('path2ivy_token');
      localStorage.removeItem('path2ivy_user');
      const currentPath = window.location.pathname;
      const redirect = currentPath && currentPath !== '/login' ? `?next=${encodeURIComponent(currentPath)}` : '';
      window.location.href = `/login${redirect}`;
    }
    return Promise.reject(error);
  }
);

export default api;

