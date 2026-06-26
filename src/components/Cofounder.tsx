import React from 'react';
import { motion } from 'framer-motion';

interface FounderItem {
  name: string;
  role: string;
  bio: string;
  img: string;
}

export const Cofounder: React.FC<{ glassStyle: string }> = ({ glassStyle }) => {
  const founders: FounderItem[] = [
    {
      name: "Yosvaldo",
      role: "Co-Founder",
      bio: "A logistics and customer operations specialist dedicated to elite-grade reliability.",
      img: "/cofounder1.webp"
    },
    {
      name: "Samuel",
      role: "Co-Founder",
      bio: "A product researcher and strategist leading market vision and innovation.",
      img: "/cofounder2.webp"
    }
  ];

  return (
    <section className="pt-4">
      <h2 className="font-serif text-3xl text-center mb-4 text-luxury-gold">The Founders</h2>
      <p className="text-center text-xs text-slate-400 max-w-md mx-auto mb-12 font-light">
        The driving force behind the performance engineering and market accessibility of Phenex Fishing.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {founders.map((founder, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
            className={`${glassStyle} rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:border-luxury-gold/20 transition-all duration-300`}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-luxury-gold/30 shadow-lg">
              <img 
                src={founder.img} 
                alt={founder.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-white tracking-wide">{founder.name}</h3>
              <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em]">{founder.role}</span>
            </div>
            <p className="text-xs text-slate-300 font-sans font-light leading-relaxed max-w-sm">
              {founder.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};