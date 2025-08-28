import React from 'react';
import { motion } from 'framer-motion';
import { 
  CpuChipIcon,
  MagnifyingGlassIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  StarIcon,
  QuoteIcon
} from '@heroicons/react/24/outline';

const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: "IA de Pointe",
      description: "Algorithmes d'apprentissage automatique pour détecter les faux followers avec 97.3% de précision",
      color: "primary"
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Analyse Approfondie",
      description: "Examination complète des métriques d'engagement, démographie et comportement d'audience",
      color: "success"
    },
    {
      icon: DocumentChartBarIcon,
      title: "Rapports Détaillés",
      description: "Tableaux de bord interactifs et exports PDF pour présenter vos analyses",
      color: "accent"
    },
    {
      icon: ShieldCheckIcon,
      title: "Vérification Instantanée",
      description: "Résultats en temps réel pour prendre des décisions rapides et éclairées",
      color: "primary"
    },
    {
      icon: BoltIcon,
      title: "Performance Optimale",
      description: "Infrastructure cloud scalable pour analyser des millions de profils simultanément",
      color: "success"
    },
    {
      icon: GlobeAltIcon,
      title: "Multi-Plateformes",
      description: "Support complet pour Instagram, TikTok, YouTube et Twitter",
      color: "accent"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Marketing Director",
      company: "FashionForward Agency",
      content: "Cette plateforme a révolutionné notre processus de sélection d'influenceurs. Nous économisons 15 heures par semaine et nos campagnes ont 40% plus d'engagement.",
      rating: 5
    },
    {
      name: "Thomas Chen",
      role: "Brand Manager",
      company: "TechStart Inc.",
      content: "Enfin un outil qui nous donne la vérité sur les influenceurs. Les insights prédictifs nous ont permis d'optimiser notre ROI de 250%.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Influencer Relations",
      company: "GlobalBrand Co.",
      content: "L'interface est intuitive et les rapports sont parfaits pour nos présentations clients. Un must-have pour toute agence sérieuse.",
      rating: 5
    }
  ];

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,107,107,0.03),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(16px,4vw,64px)]">
        
        {/* Features Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-sm font-medium text-primary-300 mb-6">
              <BoltIcon className="w-4 h-4" />
              Technologie de pointe 2025-2026
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Notre technologie d'IA révolutionnaire combinée à une interface intuitive 
              vous donne tout ce dont vous avez besoin pour réussir.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-4xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 card-hover">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-4xl ${
                    feature.color === 'primary' ? 'bg-gradient-to-br from-primary-500/10 to-transparent' :
                    feature.color === 'success' ? 'bg-gradient-to-br from-success-500/10 to-transparent' :
                    'bg-gradient-to-br from-accent-500/10 to-transparent'
                  }`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 ${
                      feature.color === 'primary' ? 'bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-primary' :
                      feature.color === 'success' ? 'bg-gradient-to-br from-success-400 to-success-600 shadow-glow-accent' :
                      'bg-gradient-to-br from-accent-400 to-accent-600 shadow-glow-accent'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-500/10 border border-success-500/20 rounded-full text-sm font-medium text-success-300 mb-6">
              <StarIcon className="w-4 h-4" />
              Témoignages clients
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
              Ils nous font 
              <span className="gradient-text-accent"> confiance</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment nos clients transforment leur stratégie d'influence 
              et obtiennent des résultats exceptionnels.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-4xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 card-hover">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 w-8 h-8 text-primary-400/30">
                    <QuoteIcon className="w-full h-full" />
                  </div>
                  
                  <div className="relative">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                        <div className="text-primary-400 text-sm font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl shadow-glow-primary hover:shadow-glow-primary hover:scale-105 transition-all duration-300 cursor-pointer button-glow">
              Rejoignez 2,500+ entreprises qui nous font confiance
              <BoltIcon className="w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesShowcase;