import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const SecondaryHero: React.FC = () => {
  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(16px,4vw,64px)]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-sm font-medium text-primary-300 mb-6">
              <CheckCircleIcon className="w-4 h-4" />
              Déjà 2,500+ entreprises nous font confiance
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
              Prêt à révéler la 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400"> vérité</span> ?
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Rejoignez les leaders du marketing d'influence qui utilisent notre technologie pour 
              prendre des décisions éclairées et maximiser leur ROI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-glow-primary hover:shadow-glow-primary transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  Démarrer maintenant
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              
              <button className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center justify-center gap-2">
                  <PlayIcon className="w-5 h-5" />
                  Regarder la démo
                </div>
              </button>
            </div>

            {/* Benefits list */}
            <div className="space-y-3">
              {[
                "Essai gratuit de 14 jours",
                "Configuration en moins de 2 minutes",
                "Support client dédié 24/7"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <CheckCircleIcon className="w-5 h-5 text-success-400 flex-shrink-0" />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Glassmorphism card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-4xl shadow-glass-strong">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 rounded-4xl" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Tableau de bord en temps réel</h3>
                  <p className="text-slate-400">Visualisez vos données instantanément</p>
                </div>

                {/* Mock dashboard preview */}
                <div className="space-y-4">
                  {/* Header stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Followers réels", value: "89.3%", color: "success" },
                      { label: "Engagement", value: "4.2%", color: "primary" },
                      { label: "Score qualité", value: "A+", color: "accent" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-3 bg-white/5 rounded-2xl border border-white/10"
                      >
                        <div className={`text-lg font-bold ${
                          stat.color === 'success' ? 'text-success-400' :
                          stat.color === 'primary' ? 'text-primary-400' :
                          'text-accent-400'
                        }`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart preview */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-white">Évolution de l'audience</div>
                      <div className="text-xs text-slate-400">7 derniers jours</div>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-shift" />
                      {/* Mock chart bars */}
                      <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-2 pb-2">
                        {[20, 35, 25, 45, 30, 50, 40].map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                            className="w-2 bg-gradient-to-t from-primary-500 to-primary-400 rounded-sm opacity-80"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Activity feed */}
                  <div className="space-y-2">
                    {[
                      { action: "Nouvel audit terminé", time: "Il y a 2 min", status: "success" },
                      { action: "Analyse IA en cours", time: "Il y a 5 min", status: "processing" },
                      { action: "Rapport généré", time: "Il y a 8 min", status: "complete" }
                    ].map((activity, index) => (
                      <motion.div
                        key={activity.action}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-success-400' :
                          activity.status === 'processing' ? 'bg-primary-400 animate-pulse' :
                          'bg-accent-400'
                        }`} />
                        <div className="flex-1">
                          <div className="text-sm text-white">{activity.action}</div>
                          <div className="text-xs text-slate-500">{activity.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements for depth */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500/30 rounded-full blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500/30 rounded-full blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHero;