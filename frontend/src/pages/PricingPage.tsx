import React from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';

const plans = [
  { name: 'Starter', price: '49€ / mois', priceId: import.meta.env.VITE_STRIPE_PRICE_STARTER },
  { name: 'Pro', price: '99€ / mois', priceId: import.meta.env.VITE_STRIPE_PRICE_PRO },
  { name: 'Enterprise', price: 'Sur devis', priceId: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE }
];

const PricingPage: React.FC = () => {
  const { token } = useAuthStore();
  const handlePurchase = async (priceId: string | undefined) => {
    if (!priceId) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/checkout-session`,
        { priceId },
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );
      window.location.href = res.data.url;
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erreur lors de la création de la session de paiement');
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Choisissez votre plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="p-6 border border-gray-200 rounded-lg bg-white text-center">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-600 mb-4">{plan.price}</p>
            <Button onClick={() => handlePurchase(plan.priceId)} size="lg" className="w-full">
              S'abonner
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
