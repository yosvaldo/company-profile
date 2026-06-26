import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const liquidGlassStyle = "bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-[32px] border-t border-white/[0.06] shadow-[0_-24px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]";

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about", external: false },
        { label: "Leadership Team", path: "/teams", external: false }
      ]
    },
    {
      title: "Products & News",
      links: [
        { label: "Products Catalog", path: "/products", external: false },
        { label: "Blog List", path: "/blogs", external: false }
      ]
    },
    {
      title: "Social",
      links: [
        { label: "Instagram", path: "https://www.instagram.com/phenexfishingline/", external: true },
        { label: "Tiktok", path: "https://www.tiktok.com/@phenexfishingline", external: true }
      ]
    },
    {
      title: "Marketplace",
      links: [
        { label: "Shopee", path: "https://shopee.co.id/phenexfishingline", external: true },
        { label: "Tokopedia", path: "https://tokopedia.com/phenex-fishing-line", external: true }
      ]
    }
  ];

  return (
    <footer className={`${liquidGlassStyle} text-slate-400 py-20 px-4 sm:px-8`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
        
        <div className="md:col-span-1 space-y-4 flex flex-col items-start sm:items-start">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-footer.webp" 
              alt="Phenex Logo Footer" 
              className="h-10 w-auto object-contain brightness-110" 
              loading="lazy"
            />
            <span className="text-white font-black tracking-[0.15em] text-sm">PHENEX</span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-luxury-gold leading-relaxed">
            The Fishing Line <br />of Champions
          </p>
        </div>
        
        {footerSections.map((section, idx) => (
          <div key={idx} className="space-y-5">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">
              {section.title}
            </h4>
            <ul className="text-[11px] space-y-3 font-light tracking-wide">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  {link.external ? (
                    <a 
                      href={link.path} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hover:text-luxury-gold transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="hover:text-luxury-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-20 text-[9px] text-slate-500 border-t border-white/6 pt-8 tracking-[0.2em] uppercase font-medium">
        © {new Date().getFullYear()} Phenex Fishing.
      </div>
    </footer>
  );
};