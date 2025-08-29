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

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

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

// Audit endpoints with async support
export const auditApi = {
  // Créer un nouvel audit (asynchrone)
  createAudit: async (data: { platform: string; username: string }) => {
    const res = await apiClient.post('/audits', data);
    return res.data;
  },

  // Obtenir la liste des audits avec pagination et filtres
  getAudits: async (params?: {
    page?: number;
    limit?: number;
    platform?: string;
    status?: string;
  }) => {
    const res = await apiClient.get('/audits', { params });
    return res.data;
  },

  // Obtenir un audit spécifique
  getAudit: async (auditId: string) => {
    const res = await apiClient.get(`/audits/${auditId}`);
    return res.data;
  },

  // Obtenir uniquement le statut d'un audit (endpoint léger)
  getAuditStatus: async (auditId: string) => {
    const res = await apiClient.get(`/audits/${auditId}/status`);
    return res.data;
  },

  // Obtenir les statistiques de la file d'attente (admin seulement)
  getQueueStats: async () => {
    const res = await apiClient.get('/audits/stats/queue');
    return res.data;
  }
};

// Dashboard endpoints
export const dashboardApi = {
  getDashboardStats: async () => {
    try {
      // Obtenir les audits récents pour calculer les statistiques
      const res = await auditApi.getAudits({ limit: 50 });
      const audits = res.audits || [];
      
      const totalAudits = res.pagination?.total || audits.length;
      const completedAudits = audits.filter((a: any) => a.status === 'completed');
      const averageScore = completedAudits.length 
        ? Math.round(completedAudits.reduce((sum: number, a: any) => 
            sum + (a.qualityAnalysis?.overallScore || 0), 0) / completedAudits.length)
        : 0;
      
      const pendingAudits = audits.filter((a: any) => 
        ['pending', 'in_progress'].includes(a.status)).length;
      
      return { 
        totalAudits, 
        averageScore, 
        pendingAudits,
        completedAudits: completedAudits.length 
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return { totalAudits: 0, averageScore: 0, pendingAudits: 0, completedAudits: 0 };
    }
  },

  getRecentAudits: async (limit: number = 10) => {
    try {
      const res = await auditApi.getAudits({ limit });
      return res.audits || [];
    } catch (error) {
      console.error('Error fetching recent audits:', error);
      return [];
    }
  }
};

// Legacy API object for backward compatibility
export const api = {
  getDashboardStats: dashboardApi.getDashboardStats,
  getRecentAudits: dashboardApi.getRecentAudits,
  createAudit: auditApi.createAudit,
  getAudits: auditApi.getAudits,
  getAudit: auditApi.getAudit,
};

// Utility functions for polling audit status
export const auditPolling = {
  // Fonction pour surveiller le statut d'un audit jusqu'à completion
  pollAuditStatus: async (
    auditId: string, 
    onUpdate: (status: any) => void,
    options: {
      interval?: number; // Intervalle en ms (défaut: 3000)
      maxAttempts?: number; // Nombre max de tentatives (défaut: 60)
      onComplete?: (audit: any) => void;
      onError?: (error: any) => void;
    } = {}
  ) => {
    const { 
      interval = 3000, 
      maxAttempts = 60,
      onComplete,
      onError 
    } = options;
    
    let attempts = 0;
    
    const poll = async () => {
      try {
        attempts++;
        const status = await auditApi.getAuditStatus(auditId);
        onUpdate(status);
        
        if (status.status === 'completed') {
          // Audit terminé avec succès
          if (onComplete) {
            const fullAudit = await auditApi.getAudit(auditId);
            onComplete(fullAudit.audit);
          }
          return;
        }
        
        if (status.status === 'failed') {
          // Audit échoué
          if (onError) {
            onError(new Error(status.error || 'Audit failed'));
          }
          return;
        }
        
        // Continuer le polling si l'audit est encore en cours
        if (['pending', 'in_progress'].includes(status.status) && attempts < maxAttempts) {
          setTimeout(poll, interval);
        } else if (attempts >= maxAttempts) {
          if (onError) {
            onError(new Error('Polling timeout: audit took too long'));
          }
        }
        
      } catch (error) {
        console.error('Error polling audit status:', error);
        if (onError) {
          onError(error);
        }
      }
    };
    
    // Démarrer le polling
    poll();
  }
};
