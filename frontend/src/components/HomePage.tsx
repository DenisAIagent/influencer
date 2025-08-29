import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3, 
  Shield, 
  Eye, 
  Users, 
  Play, 
  Star, 
  ArrowRight, 
  Check 
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Audit Instantané",
      description: "Analyse complète en 30 secondes avec des métriques détaillées"
    },
    {
      icon: Shield,
      title: "IA Avancée",
      description: "Détection de fraude et bots avec 98.5% de précision"
    },
    {
      icon: Eye,
      title: "Métriques Détaillées",
      description: "Engagement, portée, démographie et analyse d'audience"
    },
    {
      icon: Users,
      title: "Multi-plateformes",
      description: "Instagram, TikTok et YouTube supportés"
    }
  ];

  const stats = [
    { number: "10K+", label: "Audits réalisés" },
    { number: "98.5%", label: "Précision IA" },
    { number: "30s", label: "Temps d'analyse" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Auditez vos{' '}
              <span className="text-gradient">influenceurs</span>
              <br />
              en toute confiance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Plateforme moderne d'audit d'influenceurs avec IA avancée pour analyser 
              l'authenticité, les performances et la qualité d'audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="btn-primary hover-lift">
                  <Play className="h-5 w-5 mr-2" />
                  Commencer l'audit
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="btn-secondary hover-lift">
                <Eye className="h-5 w-5 mr-2" />
                Voir la démo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fonctionnalités <span className="text-gradient">avancées</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez tous les outils dont vous avez besoin pour analyser 
              et valider vos partenariats d'influence.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover-lift border-0">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          <motion.div 
            className="glass-card text-center p-12 hover-lift"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez des milliers de marques qui font confiance à InfluencerAudit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="btn-primary hover-lift">
                  Démarrer gratuitement
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="btn-secondary hover-lift">
                Contacter l'équipe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

