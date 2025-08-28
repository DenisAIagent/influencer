import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  EyeIcon, 
  UserGroupIcon,
  PlayIcon,
  StarIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { SimpleThemeToggle } from '../components/theme/ThemeToggle';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                InfluencerAudit
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Fonctionnalités
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Tarifs
              </a>
              <SimpleThemeToggle />
              <Link to="/login">
                <Button variant="ghost" size="sm">Se connecter</Button>
              </Link>
              <Link to="/register">
                <Button variant="premium" size="sm">Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements - TRÈS SUBTILS */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
              filter: 'blur(100px)',
              opacity: 0.03
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
              filter: 'blur(120px)',
              opacity: 0.02
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100/50 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 text-sm font-medium mb-8 dark:bg-indigo-900/30 dark:border-indigo-800/50 dark:text-indigo-300"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Nouvelle plateforme d'audit 2025
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block text-slate-900 dark:text-white">Auditez les</span>
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Influenceurs
            </span>
            <span className="block text-slate-900 dark:text-white">en 30 secondes</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Analysez l'authenticité, les performances et la qualité d'audience des influenceurs sur 
            <span className="font-semibold text-slate-900 dark:text-white"> Instagram, TikTok et YouTube</span> 
            avec notre IA avancée.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/register">
              <Button 
                variant="premium" 
                size="lg"
                rightIcon={<ArrowRightIcon className="h-5 w-5" />}
              >
                Commencer gratuitement
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              leftIcon={<PlayIcon className="h-5 w-5" />}
            >
              Voir la démo
            </Button>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                title: "Audits réalisés",
                value: "250K+",
                change: "+15.2%",
                changeLabel: "ce mois",
                icon: <ChartBarIcon className="h-8 w-8" />
              },
              {
                title: "Précision IA",
                value: "98.5%",
                change: "+2.1%",
                changeLabel: "amélioration",
                icon: <ShieldCheckIcon className="h-8 w-8" />
              },
              {
                title: "Clients satisfaits",
                value: "15K+",
                change: "+23.8%",
                changeLabel: "croissance",
                icon: <UserGroupIcon className="h-8 w-8" />
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium mr-1">
                        {stat.change}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {stat.changeLabel}
                      </span>
                    </div>
                  </div>
                  <div className="text-indigo-500 dark:text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Une suite complète d'outils pour analyser et vérifier l'authenticité des influenceurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <EyeIcon className="h-8 w-8" />,
                title: "Analyse d'audience",
                description: "Vérifiez la qualité et l'authenticité des followers avec notre IA"
              },
              {
                icon: <ChartBarIcon className="h-8 w-8" />,
                title: "Métriques avancées",
                description: "Taux d'engagement, portée, impressions et bien plus"
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8" />,
                title: "Détection de fraude",
                description: "Identifiez les bots, faux followers et activité suspecte"
              },
              {
                icon: <UserGroupIcon className="h-8 w-8" />,
                title: "Démographie",
                description: "Analysez l'âge, le genre et la géolocalisation de l'audience"
              },
              {
                icon: <StarIcon className="h-8 w-8" />,
                title: "Score d'influence",
                description: "Un score unique basé sur 50+ critères de performance"
              },
              {
                icon: <ArrowRightIcon className="h-8 w-8" />,
                title: "Rapports PDF",
                description: "Exportez des rapports professionnels personnalisés"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" interactive hover="glow" className="h-full">
                  <CardContent className="p-6">
                    <div className="text-indigo-500 dark:text-indigo-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="gradient" className="p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Prêt à révolutionner votre marketing d'influence ?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Rejoignez plus de 15 000 marketeurs qui utilisent notre plateforme pour prendre des décisions éclairées.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link to="/register">
                  <Button variant="premium" size="xl">
                    Essai gratuit 14 jours
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="xl">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center">
                  <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                  Aucune carte requise
                </span>
                <span className="flex items-center">
                  <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                  Support 24/7
                </span>
                <span className="flex items-center">
                  <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                  Annulation à tout moment
                </span>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;