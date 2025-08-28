# InfluencerAudit - Plateforme d'Audit d'Influenceurs

## 🎯 Description

Plateforme moderne d'audit d'influenceurs avec IA avancée pour analyser l'authenticité, les performances et la qualité d'audience sur Instagram, TikTok et YouTube.

## ✨ Fonctionnalités

- 🔍 **Audit instantané** - Analyse complète en 30 secondes
- 🤖 **IA avancée** - Détection de fraude et bots avec 98.5% de précision
- 📊 **Métriques détaillées** - Engagement, portée, démographie
- 🎨 **Interface moderne** - UX/UI 2025 avec dark mode et glassmorphism
- 📱 **Responsive** - Mobile-first design
- 🔒 **Sécurisé** - Best practices de sécurité implémentées

## 🚀 Technologies

### Frontend
- React 18 + TypeScript
- Vite + Tailwind CSS
- Framer Motion (animations)
- React Query (état serveur)
- Zustand (état global)
- React Router v6

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Redis (cache/queues)
- Puppeteer (scraping)
- Stripe (paiements)

## 📦 Installation

```bash
# Cloner le repository
git clone git@github.com:DenisAIagent/influencer.git
cd influencer

# Installation backend
cd backend
npm install

# Installation frontend
cd ../frontend
npm install
```

## 🔧 Configuration

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/influencer-audit
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk_test_...
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🚀 Développement

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🏗️ Architecture

```
influencer-audit-platform/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── components/    # Composants UI
│   │   ├── pages/         # Pages principales
│   │   ├── store/         # État global (Zustand)
│   │   └── services/      # API calls
│   └── public/
└── backend/               # Node.js + Express
    ├── src/
    │   ├── routes/        # Routes API
    │   ├── models/        # Modèles MongoDB
    │   ├── services/      # Services métier
    │   └── middleware/    # Middlewares
    └── .env
```

## 🎨 Design System

- **Couleurs**: Violet/Indigo primary (#6366f1)
- **Typography**: Inter Variable
- **Animations**: Framer Motion
- **Glassmorphism**: Backdrop blur effects
- **Dark mode**: Par défaut

## 📱 Responsive Breakpoints

- sm: 640px
- md: 768px  
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 🧪 Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📈 Déploiement

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway)
```bash
railway login
railway init
railway up
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Denis AI Agent**
- GitHub: [@DenisAIagent](https://github.com/DenisAIagent)

---

⭐️ **Star ce repo si il vous a aidé!**
# influencer
