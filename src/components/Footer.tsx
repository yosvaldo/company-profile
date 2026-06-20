import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Leadership Team", "Careers", "Press Kit"]
    },
    {
      title: "Solutions",
      links: ["Commercial Network", "Supply Chain", "Distributor Portal", "Regional Expansion"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Compliance", "Contact"]
    }
  ];

  return (
    <footer className="bg-ocean-950 border-t border-ocean-900/60 text-slate-400 font-sans text-xs tracking-wide">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-lg text-white tracking-widest uppercase">
              BRAND<span className="text-luxury-gold">NAME</span>
            </span>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              Delivering premium, high-performance commercial logistics, operational efficiency, and localized distributor solutions across Indonesia.
            </p>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-[10px] font-bold text-luxury-gold tracking-widest uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2.5 font-light">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="w-full h-[1px] bg-ocean-900/40 my-6" />

        <div className="flex flex-col md:flex-row