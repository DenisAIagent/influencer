import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Search as SearchIcon, Loader, Instagram, Music, Youtube } from 'lucide-react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuickAudit: React.FC = () => {
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');
  const [username, setUsername] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const auditMutation = useMutation((data: { platform: string; username: string }) => api.createAudit(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('recent-audits');
      queryClient.invalidateQueries('dashboard-stats');
      setUsername('');
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    const cleanUsername = username.replace('@', '').trim();
    auditMutation.mutate({ platform, username: cleanUsername });
  };
  const getPlatformIcon = (p: string) => {
    const icons: Record<string, React.ReactNode> = {
      instagram: <Instagram className="w-4 h-4" />, tiktok: <Music className="w-4 h-4" />, youtube: <Youtube className="w-4 h-4" />
    };
    return icons[p];
  };
  const getPlatformColor = (p: string) => {
    const colors: Record<string, string> = {
      instagram: 'from-pink-500 to-orange-500',
      tiktok: 'from-black to-red-500',
      youtube: 'from-red-500 to-red-600'
    };
    return colors[p];
  };
  const canCreateAudit = () => {
    if (!user) return false;
    const limits: any = { free: 50, starter: 500, pro: 2000, enterprise: Infinity };
    const plan = user.subscription?.plan || 'free';
    const limit = limits[plan] || 50;
    return (user.usage?.audits || 0) < limit;
  };
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Audit Rapide</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plateforme</label>
            <div className="grid grid-cols-3 gap-2">
              {(['instagram', 'tiktok', 'youtube'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={
                    `flex items-center justify-center p-3 rounded-lg border-2 transition-all ` +
                    (platform === p
                      ? `border-transparent bg-gradient-to-r ${getPlatformColor(p)} text-white`
                      : 'border-gray-200 hover:border-gray-300 text-gray-600')
                  }
                >
                  {getPlatformIcon(p)}
                  <span className="ml-2 text-xs font-medium capitalize">{p}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nom_utilisateur"
                className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={auditMutation.isLoading || !canCreateAudit()}
                required
              />
            </div>
            {platform === 'instagram' && <p className="mt-1 text-xs text-gray-500">Le profil doit être public pour être analysé</p>}
          </div>
          <Button
            type="submit"
            disabled={auditMutation.isLoading || !username.trim() || !canCreateAudit()}
            className="w-full"
            size="lg"
          >
            {auditMutation.isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" /> Analyse en cours...
              </>
            ) : (
              <>
                <SearchIcon className="w-4 h-4 mr-2" /> Analyser le profil
              </>
            )}
          </Button>
          {user && (
            <div className="text-center">
              <p className="text-xs text-gray-500">
                {canCreateAudit() ? (
                  <>
                    {user.usage?.audits || 0} audit{(user.usage?.audits || 0) > 1 ? 's' : ''} utilisé{(user.usage?.audits || 0) > 1 ? 's' : ''} ce mois
                  </>
                ) : (
                  <span className="text-red-600">Limite d'audits atteinte pour ce mois</span>
                )}
              </p>
            </div>
          )}
        </form>
        {auditMutation.isError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{(auditMutation.error as any)?.response?.data?.error || 'Erreur lors de la création de l\'audit'}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuickAudit;
