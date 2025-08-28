import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SparklesIcon,
  BoltIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const ModernNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Fonctionnalités', href: '/features' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Démo', href: '/demo' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-[clamp(16px,4vw,64px)]">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow-primary group-hover:shadow-glow-primary transition-all duration-300 group-hover:scale-110">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
              </div>
              <div className="text-xl font-bold text-white">
                Audit<span className="gradient-text-primary">Influence</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-slate-300 hover:text-white transition-colors duration-300 font-medium group"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <UserIcon className="w-4 h-4" />
                Connexion
              </Link>
              <Link
                to="/register"
                className="group relative px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-glow-primary hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 button-glow overflow-hidden"
              >
                <div className="relative flex items-center gap-2">
                  <BoltIcon className="w-4 h-4" />
                  Essai gratuit
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-t border-white/10"
            >
              <div className="px-[clamp(16px,4vw,64px)] py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 text-slate-300 hover:text-white transition-colors duration-300 font-medium border-b border-white/5"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-4 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-3 text-slate-300 hover:text-white transition-colors duration-300 font-medium"
                  >
                    <UserIcon className="w-4 h-4" />
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-glow-primary"
                  >
                    <BoltIcon className="w-4 h-4" />
                    Essai gratuit
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

    </>
  );
};

export default ModernNavigation;