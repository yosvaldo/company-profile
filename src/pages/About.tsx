import React from 'react';
import { motion } from 'framer-motion';

interface MilestoneItem {
  date: string;
  title: string;
}

interface CultureItem {
  title: string;
  desc: string;
}

export const About: React.FC = () => {
  const storyParagraphs = [
    "Phenex was founded by passionate anglers who believed that premium fishing products should not be limited to premium prices.",
    "Recognizing the gap between quality and affordability in the market, the founders set out to develop fishing lines that deliver exceptional performance while remaining accessible to anglers of all levels.",
    "Before launching the company, the founding team spent more than six months conducting extensive research, testing materials, studying market needs, and evaluating product performance in real fishing environments.",
    "The result was a product lineup built on durability, strength, precision, and value.",
    "Today, Phenex continues to innovate while remaining committed to the original vision: delivering exceptional fishing experiences through reliable and affordable products."
  ];

  const milestones: MilestoneItem[] = [
    { date: "May 20, 2020", title: "Phenex officially founded." },
    { date: "2023", title: "Reached over 100,000+ products sold." },
    { date: "2025", title: "Surpassed 200,000+ products sold nationwide." }
  ];

  const cultureList: CultureItem[] = [
    { title: "Trustworthiness", desc: "Trust is the foundation of every relationship we build—with customers, distributors, suppliers, and employees." },
    { title: "Excellence in Service", desc: "We believe exceptional products must be supported by exceptional service." },
    { title: "Continuous Improvement", desc: "Innovation and learning drive us to consistently improve our products and customer experience." },
    { title: "Customer-Centric Mindset", desc: "Every decision begins with understanding the needs of anglers." }
  ];

  return (
    <div className="min-h-screen bg-ocean-950 text-white pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto space-y-24">
        
        <section className="text-center space-y-8">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-luxury-gold uppercase">ESTABLISHED 2020</span>
            <h1 className="font-display text-4xl tracking-widest text-white uppercase mt-2">
              OUR <span className="text-luxury-gold">STORY</span>
            </h1>
            <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {storyParagraphs.map((paragraph, idx) => (
              <p key={idx} className="text-xs md:text-sm text-slate-300 font-sans font-light leading-relaxed tracking-wide">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="border-t border-ocean-900 pt-16">
          <h2 className="font-display text-xl uppercase tracking-widest text-center mb-12">
            COMPANY <span className="text-luxury-gold">MILESTONES</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-ocean-900/20 border border-ocean-800/60 rounded-xl p-6 text-center space-y-2 group hover:border-luxury-gold/20 transition-colors"
              >
                <div className="font-display text-base text-luxury-gold tracking-wider">
                  {milestone.date}
                </div>
                <p className="text-xs text-slate-400 font-sans font-light tracking-wide leading-relaxed">
                  {milestone.title}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t border-ocean-900 pt-16">
          <h2 className="font-display text-xl uppercase tracking-widest text-center mb-12">
            OUR <span className="text-luxury-gold">CULTURE</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cultureList.map((culture, idx) => (
              <div 
                key={idx} 
                className="bg-ocean-900/30 border border-ocean-800/50 rounded-xl p-6 flex flex-col justify-between hover:border-luxury-gold/10 transition-all duration-300"
              >
                <div className="space-y-2">
                  <h3 className="font-display text-sm text-white tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    {culture.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed tracking-wide font-light pl-3.5">
                    {culture.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};