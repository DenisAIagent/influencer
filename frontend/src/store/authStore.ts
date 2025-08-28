import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type définition plus stricte pour l'utilisateur
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user, error: null }),
      setToken: (token) => set({ token, error: null }),
      setError: (error) => set({ error, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ 
        user: null, 
        token: null, 
        error: null, 
        isLoading: false 
      }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      // Éviter de persister les états temporaires
      partialize: (state) => ({
        user: state.user,
        token: state.token
      })
    }
  )
);

// Export du type User pour utilisation dans d'autres composants
export type { User };
