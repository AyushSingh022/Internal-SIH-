import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('sih_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  const lang = localStorage.getItem('sih_language') || 'en';
  config.headers['Accept-Language'] = lang;
  return config;
});

// Handle errors
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sih_token');
      localStorage.removeItem('sih_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || { message: 'Network error' });
  }
);

export default api;
