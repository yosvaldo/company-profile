import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden bg-[#020813]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/banner.webp" 
          alt="Phenex Banner of Champions" 
          className="h-full w-full object-cover object-right md:object-center opacity-60 filter brightness-90 contrast-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#020813] via-[#020813]/80 to-transparent md:via-[#020813]/40" />
        <div className="absolute inset-0 bg-linear-to-t from-[#020813] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl md:max-w-2xl space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold"
          >
            Trusted by Anglers • Engineered for Champions
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl leading-none"
          >
            The<br />
            <span className="text-luxury-gold">Fishing Line</span> <br />
            <span className="font-serif italic font-normal text-luxury-gold tracking-normal lowercase">of</span> Champions
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-300 sm:text-lg max-w-md font-light leading-relaxed"
          >
            Engineered for elite tournament performance. Experience unmatched knot strength and tactical stealth underwater.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Button asChild size="lg" className="rounded-full bg-luxury-gold text-[#020813] px-10 font-bold uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(223,206,114,0.25)] transition-all duration-300 hover:bg-white hover:scale-105">
              <Link to="/products">Explore Products</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};