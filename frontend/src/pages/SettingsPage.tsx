import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { Button } from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { user, setUser, token } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [company, setCompany] = useState(user?.company || "");
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        { firstName, lastName, company },
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );
      setUser(res.data.user);
      alert('Profil mis à jour');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erreur de mise à jour');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Paramètres du compte</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        </div>
        <Button type="submit" disabled={saving} className="w-full" size="lg">
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
