import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Create axios instance with base URL from env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },
  register: async (data: any) => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  }
};

// Dashboard and audit endpoints
export const api = {
  getDashboardStats: async () => {
    // For MVP, derive stats from latest audits
    const res = await apiClient.get('/audits', { params: { limit: 20 } });
    const audits = res.data.audits || [];
    const totalAudits = audits.length;
    const averageScore = audits.length ? Math.round(audits.reduce((sum: number, a: any) => sum + (a.qualityAnalysis?.overallScore || 0), 0) / audits.length) : 0;
    return { totalAudits, averageScore };
  },
  getRecentAudits: async (limit: number = 5) => {
    const res = await apiClient.get('/audits', { params: { limit } });
    return res.data.audits;
  },
  createAudit: async (data: { platform: string; username: string }) => {
    const res = await apiClient.post('/audits', data);
    return res.data;
  }
};
