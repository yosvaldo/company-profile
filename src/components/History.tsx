import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface MilestoneItem {
  date: string;
  title: string;
}

const TypewriterParagraph: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.05 }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 1 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.08, ease: "easeOut" } }
  } as const;

  return (
    <motion.p 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-sm text-slate-200 font-sans font-light leading-loose tracking-wide flex flex-wrap gap-x-1"
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={childVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export const History: React.FC<{ glassStyle: string }> = ({ glassStyle }) => {
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

  return (
    <div className="space-y-28">
      <section className={`${glassStyle} p-6 sm:p-12 rounded-3xl text-center space-y-8`}>
        <div>
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Since 2020</span>
          <h1 className="font-serif italic text-4xl sm:text-5xl text-white mt-4">Our Story</h1>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-6" />
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          {storyParagraphs.map((paragraph, idx) => (
            <TypewriterParagraph key={idx} text={paragraph} />
          ))}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="font-serif text-3xl text-center mb-12 text-luxury-gold">Company Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`${glassStyle} rounded-2xl p-8 text-center space-y-3 hover:border-luxury-gold/30 transition-all duration-300`}
            >
              <div className="font-bold text-lg text-luxury-gold tracking-wider">{milestone.date}</div>
              <p className="text-xs text-slate-300 font-sans font-light tracking-wide leading-relaxed">
                {milestone.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};