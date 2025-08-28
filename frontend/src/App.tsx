import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AuditPage from './pages/AuditPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const { token, setUser, setToken } = useAuthStore();
  const location = useLocation();
  // Optionally restore session from storage on mount
  useEffect(() => {
    // This effect runs only once to ensure Zustand persist rehydrates
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="influencer-audit-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={token ? <Navigate to="/dashboard" /> : <div className="max-w-md mx-auto p-6"><h1 className="text-2xl font-bold mb-4">Se connecter</h1><LoginForm /></div>} />
          <Route path="register" element={token ? <Navigate to="/dashboard" /> : <div className="max-w-md mx-auto p-6"><h1 className="text-2xl font-bold mb-4">Créer un compte</h1><RegisterForm /></div>} />
          <Route path="pricing" element={<PricingPage />} />
          <Route element={<ProtectedRoute />}> {/* Protected routes */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="audits/:id" element={<AuditPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
