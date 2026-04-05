'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthCard() {
  const [tab, setTab] = useState('login');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 40px rgba(11,110,110,0.13), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(11,110,110,0.08)',
      }}
    >
      {/* Animated top gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light animate-gradient-x" />
      <div className="p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-3 relative"
            style={{ boxShadow: '0 4px 20px rgba(11,110,110,0.35)' }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Heart size={24} className="text-white" fill="white" />
            {/* Sparkle */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <Sparkles size={12} className="text-accent" />
            </motion.div>
          </motion.div>
          <div className="text-2xl font-extrabold tracking-tight">
            <span className="text-primary">Med</span>
            <span className="text-text-primary">Swap</span>
          </div>
          <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Medicine Substitute Finder
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-background rounded-xl p-1 mb-7 border border-gray-100 relative">
          {/* Sliding indicator */}
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
            animate={{ x: tab === 'login' ? 0 : 'calc(100% + 4px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          {[
            { key: 'login', label: 'Log in' },
            { key: 'register', label: 'Register' },
          ]?.map(t => (
            <button
              key={`tab-${t?.key}`}
              onClick={() => setTab(t?.key)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 relative z-10 ${
                tab === t?.key ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {t?.label}
            </button>
          ))}
        </div>

        {/* Form area */}
        <AnimatePresence mode="wait">
          {tab === 'login' ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <LoginForm onSwitchToRegister={() => setTab('register')} />
            </motion.div>
          ) : (
            <motion.div
              key="register-form"
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <RegisterForm onSwitchToLogin={() => setTab('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Footer */}
      <div className="px-8 py-4 bg-gradient-to-r from-background to-primary-lighter/20 border-t border-gray-100 text-center">
        <p className="text-xs text-text-muted">
          By continuing, you agree to MedSwap&apos;s{' '}
          <span className="text-primary font-medium cursor-pointer hover:underline">Terms of Service</span>
          {' '}and{' '}
          <span className="text-primary font-medium cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </motion.div>
  );
}