import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface RecentAuditsProps {
  audits: any[];
  isLoading: boolean;
  searchQuery: string;
}

const RecentAudits: React.FC<RecentAuditsProps> = ({ audits = [], isLoading, searchQuery }) => {
  const filtered = audits.filter((a) => {
    const username = a.influencer?.username || '';
    return username.toLowerCase().includes(searchQuery.toLowerCase());
  });
  if (isLoading) {
    return <p className="text-gray-500">Chargement des audits...</p>;
  }
  if (filtered.length === 0) {
    return <p className="text-gray-500">Aucun audit récent</p>;
  }
  return (
    <div className="space-y-4">
      {filtered.map((audit) => (
        <div key={audit._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">@{audit.influencer?.username}</p>
              <p className="text-xs text-gray-500">{audit.influencer?.platform}</p>
            </div>
            <div>
              <span className="text-sm font-semibold">{audit.qualityAnalysis?.overallScore ?? '—'}/100</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">{formatDistanceToNow(new Date(audit.createdAt), { addSuffix: true })}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentAudits;
