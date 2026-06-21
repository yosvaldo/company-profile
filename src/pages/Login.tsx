import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/create-blog');
    } catch (err) { alert('Invalid credentials'); }
  };

  return (
    <div className="min-h-screen bg-[#061121] flex items-center justify-center p-6">
      <div className={`w-full max-w-[360px] ${glassStyle} p-10 rounded-[28px]`}>
        <div className="text-center mb-10">
          <img src="/transparent.png" alt="Logo" className="w-12 mx-auto mb-6 brightness-110" />
          <h2 className="text-sm text-white font-semibold tracking-[0.2em] uppercase">Login Portal</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="email" 
            placeholder="Email Address" 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full bg-white/[0.03] p-4 text-[12px] text-white border border-white/[0.08] rounded-2xl outline-none focus:border-[#DFCE72]/50 transition-all placeholder-slate-500" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full bg-white/[0.03] p-4 text-[12px] text-white border border-white/[0.08] rounded-2xl outline-none focus:border-[#DFCE72]/50 transition-all placeholder-slate-500" 
          />
          <button className="w-full bg-[#DFCE72] text-[#061121] font-semibold py-4 rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-[#c9b863] transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};