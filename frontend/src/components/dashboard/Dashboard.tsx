import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BarChart as BarChartIcon, TrendingUp, DollarSign, Users, Loader, Search as SearchIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QuickAudit from './QuickAudit';
import RecentAudits from './RecentAudits';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: stats, isLoading: statsLoading } = useQuery('dashboard-stats', () => api.getDashboardStats(), { refetchInterval: 30000 });
  const { data: recentAudits, isLoading: auditsLoading } = useQuery('recent-audits', () => api.getRecentAudits(5), { refetchInterval: 10000 });
  const getPlanLimits = (plan: string) => {
    const limits: Record<string, any> = { free: 50, starter: 500, pro: 2000, enterprise: '∞' };
    return limits[plan] || 50;
  };
  const getPlanName = (plan: string) => {
    const names: Record<string, any> = { free: 'Gratuit', starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };
    return names[plan] || 'Gratuit';
  };
  if (statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bonjour {user?.firstName} 👋</h1>
              <p className="text-gray-600 mt-1">
                Plan {getPlanName(user?.subscription?.plan || 'free')} • {user?.usage?.audits || 0} / {getPlanLimits(user?.subscription?.plan || 'free')} audits ce mois
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un audit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="w-6 h-6" />
                Audits ce mois
              </CardTitle>
              <CardDescription>
                {user?.usage?.audits || 0} / {getPlanLimits(user?.subscription?.plan || 'free')}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Score moyen
              </CardTitle>
              <CardDescription>
                {stats?.averageScore || '—'} - Derniers audits
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                Audits totaux
              </CardTitle>
              <CardDescription>
                {stats?.totalAudits || 0} - Depuis le début
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Économies
              </CardTitle>
              <CardDescription>
                €2,400 - vs HypeAuditor
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <QuickAudit />
          </div>
          <div className="lg:col-span-2">
            <RecentAudits audits={recentAudits || []} isLoading={auditsLoading} searchQuery={searchQuery} />
          </div>
        </div>
        {user?.subscription?.plan === 'free' && (user?.usage?.audits || 0) > 40 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Vous approchez de votre limite mensuelle !</h3>
                <p className="text-blue-100">Passez au plan Starter pour 500 audits/mois à partir de 49€</p>
              </div>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">Upgrader</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
