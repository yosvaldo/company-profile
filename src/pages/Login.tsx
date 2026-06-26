import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/create-blog');
    } catch (err) { 
      const errMsg = err instanceof Error ? err.message : "Invalid admin or credentials routing info";
      alert(errMsg); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020813] flex items-center justify-center p-4">
      <div className={`w-full max-w-95 ${glassStyle} p-8 sm:p-10 rounded-[28px]`}>
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-linear-to-b from-luxury-gold to-yellow-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-[#020813] font-bold text-lg font-serif">P</span>
          </div>
          <h2 className="text-xs text-white font-bold tracking-[0.2em] uppercase">Control Portal</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            required
            placeholder="Identity Email" 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full bg-white/3 p-4 text-[11px] text-white border border-white/8 rounded-xl outline-none focus:border-luxury-gold/50 transition-all placeholder-slate-500" 
          />
          <input 
            type="password" 
            required
            placeholder="Security Access Token" 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full bg-white/3 p-4 text-[11px] text-white border border-white/8 rounded-xl outline-none focus:border-luxury-gold/50 transition-all placeholder-slate-500" 
          />
          <button 
            disabled={submitting}
            className="w-full bg-luxury-gold text-[#020813] font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] hover:bg-[#eedf9d] transition-all disabled:opacity-50"
          >
            {submitting ? 'Verifying...' : 'Authenticate Access'}
          </button>
        </form>
      </div>
    </div>
  );
};