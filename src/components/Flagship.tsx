import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';

const flagships = [
  {
    title: "Phenex Platinum",
    badge: "Best Seller",
    desc: "Ultimate all-round performance for everyday anglers. Featuring ultra-fast sinking core properties and heavy fluorocarbon protection layers.",
    img: "/platinum.webp",
    glowColor: "rgba(0, 149, 255, 0.4)"
  },
  {
    title: "Phenex Monster",
    badge: "Premium Class Best Seller",
    desc: "Built for trophy hunters and serious tournament competitors. Absolute brute-force tensile line memory reduction technology.",
    img: "/monster.webp",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    title: "Phenex Gatotkaca",
    badge: "Price-to-Performance King",
    desc: "Maximum value. Reliable local strength. Engineered carefully to maintain elite competitive structural tension without empty premium surcharges.",
    img: "/gatotkaca.webp",
    glowColor: "rgba(245, 158, 11, 0.4)"
  }
];

const IntelFlipCard: React.FC<{ prod: typeof flagships[0] }> = ({ prod }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-90, 0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center py-24"
      style={{ perspective: "1600px" }} 
    >
      <motion.div
        className="relative w-full max-w-md bg-[#040e1f]/90 border-2 rounded-2xl p-10 flex flex-col items-center text-center transition-all duration-300 ease-out"
        htmlFor-glow={prod.title}
        style={{ 
          rotateX, 
          opacity,
          borderColor: prod.glowColor,
          boxShadow: `0 0 50px ${prod.glowColor}, inset 0 0 20px rgba(255, 255, 255, 0.02)`,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="relative w-full h-56 flex items-center justify-center mb-6">
          <img 
            src={prod.img} 
            alt={prod.title} 
            className="h-full w-auto object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)]"
            loading="lazy"
          />
        </div>

        <span className="text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase mb-2">
          {prod.badge}
        </span>
        
        <h3 className="text-2xl font-black tracking-tight uppercase text-white mb-4">
          {prod.title}
        </h3>
        
        <p className="text-xs text-slate-300 font-light leading-relaxed mb-8 max-w-sm">
          {prod.desc}
        </p>

        <Button asChild className="w-full sm:w-auto rounded-xl bg-white text-[#020813] hover:bg-luxury-gold font-bold tracking-wider uppercase text-xs px-10 h-11 transition-all duration-300">
          <Link to="/products">Explore Details</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export const Flagship: React.FC = () => {
  return (
    <section className="bg-[#020813] py-24 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">Premium Showcase</span>
          <h2 className="text-3xl font-black tracking-wider uppercase sm:text-4xl">Flagship Engineering</h2>
          <div className="h-0.5 w-16 bg-luxury-gold mx-auto mt-4" />
        </div>

        <div className="space-y-20 py-10">
          {flagships.map((prod, idx) => (
            <IntelFlipCard key={idx} prod={prod} />
          ))}
        </div>

      </div>
    </section>
  );
};