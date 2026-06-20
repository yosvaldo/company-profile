import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    setTimeout(() => navigate('/create-blog'), 100);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/create-blog');
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 flex items-center justify-center pt-16 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,68,119,0.12),transparent_60%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-ocean-900/40 backdrop-blur-md border border-ocean-800/60 p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img src="/logo.jpg" alt="Phenex Logo" className="w-16 h-16 object-contain rounded-full border border-luxury-gold/30 p-1 bg-ocean-950" />
          </div>
          <h2 className="font-display text-2xl tracking-widest text-white uppercase">
            EXECUTIVE <span className="text-luxury-gold">PORTAL</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans tracking-wider uppercase mt-1">
            Phenex Fishing Administration
          </p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-xs p-3 rounded mb-6 font-sans tracking-wide">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Admin Email
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ocean-950 border border-ocean-800 focus:border-luxury-gold text-white px-4 py-3 rounded text-sm transition-all duration-300 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Security Password
            </label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ocean-950 border border-ocean-800 focus:border-luxury-gold text-white px-4 py-3 rounded text-sm transition-all duration-300 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-ocean-950 font-bold uppercase tracking-widest text-xs py-3.5 rounded shadow-lg hover:brightness-110 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'AUTHENTICATING...' : 'SECURE SIGN IN'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};