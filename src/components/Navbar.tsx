import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]";

  const linkClass = (path: string) => 
    `text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
      isActive(path) ? 'text-[#DFCE72]' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${glassStyle} px-6 py-5`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 text-white font-semibold tracking-[0.1em] text-sm">
          <img src="/transparent.png" alt="Logo" className="h-7 brightness-110" />
          <span>PHENEX<span className="text-[#DFCE72] ml-1">FISHING</span></span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/about" className={linkClass('/about')}>About</Link>
          <Link to="/products" className={linkClass('/products')}>Products</Link>
          <Link to="/teams" className={linkClass('/teams')}>Teams</Link>
          <Link to="/blogs" className={linkClass('/blogs')}>Blogs</Link>
          
          {user && (
            <Link to="/create-blog" className={linkClass('/create-blog')}>
              Create Blog
            </Link>
          )}
          
          {user ? (
            <button 
              onClick={logout} 
              className="text-[10px] uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors duration-300 font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className={linkClass('/login')}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};