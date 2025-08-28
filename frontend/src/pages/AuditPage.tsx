import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const AuditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const token = useAuthStore((s) => s.token);
  const fetchAudit = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/audits/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined }
    });
    return res.data.audit;
  };
  const { data: audit, isLoading, error } = useQuery(['audit', id], fetchAudit, { enabled: !!id });
  if (isLoading) return <p className="p-4">Chargement...</p>;
  if (error || !audit) return <p className="p-4 text-red-600">Erreur lors du chargement de l'audit</p>;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit de @{audit.influencer?.username}</h1>
      <p>Plateforme : {audit.influencer?.platform}</p>
      <p>Score global : {audit.qualityAnalysis?.overallScore}/100</p>
      <p>Followers : {audit.metrics?.followers}</p>
      <p>Engagement rate : {audit.metrics?.engagementRate}%</p>
      {/* Additional details can be shown here */}
    </div>
  );
};

export default AuditPage;
