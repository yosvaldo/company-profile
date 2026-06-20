import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  
  const overviewParagraphs = [
    "Founded in 2020, Phenex was established with a simple vision: to provide anglers with premium-quality fishing equipment at fair and accessible prices.",
    "Driven by a passion for innovation and performance, the founders spent more than six months conducting product research and testing before introducing the first Phenex fishing line to the market. Today, Phenex has grown into one of Indonesia's trusted fishing line brands, supported by an extensive distributor network and a loyal community of anglers.",
    "From entry-level products to tournament-grade premium series, every Phenex product is developed with the same commitment to strength, reliability, and performance."
  ];

  const featuredSeries = [
    { title: "PHENEX PLATINUM", badge: "Best Seller Series", desc: "Over 87,000 units sold through distributors and 12,000+ units sold through online marketplaces.", image: "/platinum.png", cta: "Explore Platinum →" },
    { title: "PHENEX MONSTER", badge: "Premium Best Seller", desc: "Designed for anglers who demand superior strength and confidence during every strike.", image: "/monster.png", cta: "Discover Monster →" },
    { title: "PHENEX GAJAH MADA", badge: "Newest Premium Release", desc: "Advanced performance and modern engineering for serious anglers.", image: "/banner.png", cta: "View Details →" },
    { title: "PHENEX WHALEPOWER", badge: "Top Class Tournament Line", desc: "Built for maximum power, durability, and professional-level performance.", image: "/whalepower.png", cta: "Learn More →" }
  ];

  const testimonials = [
    { text: "Phenex has consistently proven itself as a trustworthy partner. Their team is highly responsive, professional, and always ready to accommodate distributor needs.", author: "DISTRIBUTOR A" },
    { text: "The combination of product quality and brand credibility makes Phenex easy to recommend. Customers return because they trust the performance.", author: "DISTRIBUTOR B" },
    { text: "After trying many brands, Phenex remains my top recommendation. The consistency and quality are outstanding.", author: "END USER C" },
    { text: "Phenex gives me confidence on every cast. The line is incredibly strong and reliable, especially when fighting larger fish.", author: "END USER D" }
  ];

  return (
    <div className="min-h-screen bg-ocean-950 text-white overflow-x-hidden">
      
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 z-0">
          <img src="/banner.png" alt="Phenex Line of Champions" className="w-full h-full object-cover opacity-20 object-center filter contrast-125 scale-105" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-transparent to-ocean-950/70" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-sans tracking-widest text-luxury-gold font-bold uppercase">
            TRUSTED BY ANGLERS • ENGINEERED FOR CHAMPIONS
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-7xl tracking-wide uppercase leading-none">
            THE FISHING LINE <br /><span className="font-serif italic text-luxury-gold-light">OF CHAMPIONS</span>
          </motion.h1>
          <div className="pt-4 font-sans flex justify-center gap-4">
            <Link to="/products" className="bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-ocean-950 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded shadow-xl hover:brightness-110 transition-all duration-300">EXPLORE PRODUCTS</Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-3xl mx-auto text-center space-y-6 border-t border-ocean-900">
        <span className="text-xs font-sans font-bold tracking-widest text-luxury-gold uppercase">ABOUT PHENEX</span>
        {overviewParagraphs.map((paragraph, index) => (
          <p key={index} className="text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed tracking-wide">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="py-24 px-6 bg-ocean-900/10 border-t border-ocean-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl uppercase tracking-widest text-center mb-16">FEATURED <span className="text-luxury-gold">SERIES</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSeries.map((series, index) => (
              <div key={index} className="bg-ocean-900/30 border border-ocean-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-luxury-gold/20 transition-all duration-300">
                <div className="h-40 w-full bg-ocean-950 overflow-hidden relative">
                  <img 
                    src={series.image} 
                    alt={series.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/banner.png'; }}
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-display text-base text-white">{series.title}</h4>
                    <p className="text-[9px] text-luxury-gold font-bold uppercase tracking-wider">{series.badge}</p>
                    <p className="text-xs text-slate-400 font-sans pt-2 font-light leading-relaxed">{series.desc}</p>
                  </div>
                  <Link to="/products" className="text-xs font-sans font-bold text-luxury-gold uppercase tracking-wider mt-6 block hover:underline">
                    {series.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-ocean-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl uppercase tracking-widest text-center mb-16">TRUSTED <span className="text-luxury-gold">TESTIMONIALS</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-ocean-900/20 border border-ocean-800/60 p-6 rounded-lg text-xs tracking-wide leading-relaxed flex flex-col justify-between">
                <p className="text-slate-300 italic">"{testimonial.text}"</p>
                <p className="text-luxury-gold uppercase font-bold text-[9px] mt-4 tracking-widest">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};