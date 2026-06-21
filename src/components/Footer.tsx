import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border-t border-white/[0.08] shadow-[0_-24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  return (
    <footer className={`${glassStyle} text-slate-400 py-16 px-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
        
        <div className="col-span-2 md:col-span-1 space-y-3">
          <div className="flex items-center gap-3">
            <img src="/transparent.png" alt="Logo" className="h-8 brightness-110" />
            <span className="text-white font-semibold tracking-[0.1em]">PHENEX</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#DFCE72]/90">The Fishing Line of Champions</p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold text-white uppercase mb-6 tracking-[0.2em]">Company</h4>
          <ul className="text-[11px] space-y-3">
            <li><Link to="/about" className="hover:text-[#DFCE72] transition-colors duration-300">About Us</Link></li>
            <li><Link to="/teams" className="hover:text-[#DFCE72] transition-colors duration-300">Leadership Team</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase mb-6 tracking-[0.2em]">Products & News</h4>
          <ul className="text-[11px] space-y-3">
            <li><Link to="/products" className="hover:text-[#DFCE72] transition-colors duration-300">Products Catalog</Link></li>
            <li><Link to="/blogs" className="hover:text-[#DFCE72] transition-colors duration-300">Blog List</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase mb-6 tracking-[0.2em]">Social</h4>
          <ul className="text-[11px] space-y-3">
            <li><a href="https://www.instagram.com/phenexfishingline/" target="_blank" rel="noreferrer" className="hover:text-[#DFCE72] transition-colors duration-300">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@phenexfishingline" target="_blank" rel="noreferrer" className="hover:text-[#DFCE72] transition-colors duration-300">Tiktok</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase mb-6 tracking-[0.2em]">Marketplace</h4>
          <ul className="text-[11px] space-y-3">
            <li><a href="https://shopee.co.id/phenexfishingline" target="_blank" rel="noreferrer" className="hover:text-[#DFCE72] transition-colors duration-300">Shopee</a></li>
            <li><a href="https://tokopedia.com/phenex-fishing-line" target="_blank" rel="noreferrer" className="hover:text-[#DFCE72] transition-colors duration-300">Tokopedia</a></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-16 text-[10px] text-slate-500 border-t border-white/[0.08] pt-8 tracking-[0.1em]">
        © {new Date().getFullYear()} Phenex Fishing. All Rights Reserved.
      </div>
    </footer>
  );
};