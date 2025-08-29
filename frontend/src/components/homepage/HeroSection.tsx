import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  SparklesIcon, 
  StarIcon,
  EyeIcon,
  ArrowUpRightIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary-900 to-slate-900 animate-gradient-shift bg-[length:400%_400%]">
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Floating orbs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Main hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-[clamp(16px,4vw,64px)] text-center pt-20">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-medium text-white shadow-glass">
            <SparklesIcon className="w-4 h-4 text-primary-400" />
            Plateforme d'audit IA nouvelle génération
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-300">Live</span>
            </div>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-primary-400 mb-6 leading-[1.1] tracking-tight"
        >
          Auditez les
          <br />
          <span className="relative inline-block">
            Influenceurs
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-2xl opacity-30 animate-glow-pulse" />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl leading-relaxed font-light"
        >
          Découvrez la vérité derrière les métriques. Notre IA analyse en profondeur 
          <span className="text-primary-300 font-medium"> l'authenticité, l'engagement et la qualité</span> 
          des audiences sur Instagram, TikTok et YouTube.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link
            to="/register"
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-glow-primary hover:shadow-glow-primary transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              <BoltIcon className="w-5 h-5" />
              Commencer l'audit gratuit
              <div className="w-2 h-2 bg-white rounded-full animate-bounce-subtle" />
            </div>
          </Link>
          
          <Link
            to="/demo"
            className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl shadow-glass hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="flex items-center gap-2">
              <EyeIcon className="w-5 h-5" />
              Voir la démo interactive
            </div>
          </Link>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-20"
        >
          {[
            {
              icon: ChartBarIcon,
              title: "Analyse IA Avancée",
              description: "Détection de faux followers et bots avec 97% de précision",
              color: "primary"
            },
            {
              icon: ShieldCheckIcon,
              title: "Audit de Confiance",
              description: "Vérification de l'authenticité de l'engagement en temps réel",
              color: "success"
            },
            {
              icon: ArrowUpRightIcon,
              title: "Insights Prédictifs",
              description: "Prévisions de performance et ROI basées sur l'IA",
              color: "accent"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              className="group relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br ${
                  feature.color === 'primary' ? 'from-primary-400 to-primary-600' :
                  feature.color === 'success' ? 'from-success-400 to-success-600' :
                  'from-accent-400 to-accent-600'
                } rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-slate-400">Audits réalisés</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">97%</div>
              <div className="text-sm text-slate-400">Précision IA</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2.5M+</div>
              <div className="text-sm text-slate-400">Profils analysés</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  i % 3 === 0 ? 'from-primary-400 to-primary-600' :
                  i % 3 === 1 ? 'from-success-400 to-success-600' :
                  'from-accent-400 to-accent-600'
                } border-2 border-slate-900 flex items-center justify-center`}>
                  <UserGroupIcon className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm ml-2">4.9/5 • Utilisé par 1,200+ agences</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;