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
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";
  
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
    <div className="min-h-screen bg-[#061121] text-white pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto space-y-24">
        
        <section className={`${glassStyle} p-12 rounded-3xl text-center space-y-8`}>
          <div>
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#DFCE72] uppercase">Since 2020</span>
            <h1 className="font-serif italic text-5xl text-white mt-4">
              Our Story
            </h1>
            <div className="w-16 h-[1px] bg-[#DFCE72]/40 mx-auto mt-6" />
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {storyParagraphs.map((paragraph, idx) => (
              <p key={idx} className="text-sm text-slate-200 font-sans font-light leading-loose tracking-wide">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="pt-8">
          <h2 className="font-serif text-3xl text-center mb-12 text-[#DFCE72]">Company Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`${glassStyle} rounded-2xl p-8 text-center space-y-3 hover:bg-white/10 transition-all duration-300`}
              >
                <div className="font-bold text-lg text-[#DFCE72] tracking-wider">
                  {milestone.date}
                </div>
                <p className="text-xs text-slate-300 font-sans font-light tracking-wide leading-relaxed">
                  {milestone.title}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="pt-8">
          <h2 className="font-serif text-3xl text-center mb-12 text-[#DFCE72]">Our Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cultureList.map((culture, idx) => (
              <div 
                key={idx} 
                className={`${glassStyle} rounded-2xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-300`}
              >
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFCE72]" />
                    {culture.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed tracking-wide font-light pl-4.5 border-l border-[#DFCE72]/20">
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