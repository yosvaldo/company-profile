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
    { title: "PHENEX PLATINUM", badge: "Best Seller", desc: "Over 87,000 units sold through distributors and 12,000+ units sold through online marketplaces.", image: "/platinum.png" },
    { title: "PHENEX MONSTER", badge: "Premium Best Seller", desc: "Designed for anglers who demand superior strength and confidence during every strike.", image: "/monster.png" },
    { title: "PHENEX GAJAH MADA", badge: "Newest Premium Release", desc: "Advanced performance and modern engineering for serious anglers.", image: "/gajahmada.png" },
    { title: "PHENEX WHALEPOWER", badge: "Top Class Tournament Line", desc: "Built for maximum power, durability, and professional-level performance.", image: "/whalepower.png" }
  ];

  const testimonials = [
    { text: "Phenex has consistently proven itself as a trustworthy partner. Their team is highly responsive, professional, and always ready to accommodate distributor needs.", author: "DISTRIBUTOR A" },
    { text: "The combination of product quality and brand credibility makes Phenex easy to recommend. Customers return because they trust the performance.", author: "DISTRIBUTOR B" },
    { text: "After trying many brands, Phenex remains my top recommendation. The consistency and quality are outstanding.", author: "END USER C" },
    { text: "Phenex gives me confidence on every cast. The line is incredibly strong and reliable, especially when fighting larger fish.", author: "END USER D" }
  ];

  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  return (
    <div className="min-h-screen bg-[#061121] text-white overflow-x-hidden">
      
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 z-0">
          <img src="/banner.png" alt="Phenex Line of Champions" className="w-full h-full object-cover opacity-30 filter contrast-125 scale-105" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061121] via-[#061121]/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.3em] text-[#DFCE72] uppercase font-bold">
            Trusted by anglers • Engineered for champions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl tracking-tight uppercase leading-none">
            THE FISHING LINE <br /><span className="font-serif italic text-[#DFCE72]">OF CHAMPIONS</span>
          </motion.h1>
          <div className="pt-8 flex justify-center gap-4">
            <Link to="/products" className="bg-[#DFCE72] text-[#061121] font-semibold uppercase tracking-[0.2em] text-[11px] px-10 py-4 rounded-2xl hover:bg-[#c9b863] transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-3xl mx-auto text-center">
        <div className={`${glassStyle} p-12 rounded-[28px]`}>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#DFCE72] uppercase mb-6 block">About Phenex</span>
          {overviewParagraphs.map((paragraph, index) => (
            <p key={index} className="text-sm text-slate-200 font-light leading-relaxed tracking-wide mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl uppercase tracking-[0.2em] text-center mb-16">Featured <span className="text-[#DFCE72]">Products</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredSeries.map((series, index) => (
              <div key={index} className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col group hover:from-white/[0.1] transition-all duration-500`}>
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={series.image} alt={series.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-base text-white tracking-wide">{series.title}</h4>
                    <p className="text-[9px] text-[#DFCE72] font-bold uppercase tracking-[0.2em]">{series.badge}</p>
                    <p className="text-[12px] text-slate-300 font-light leading-relaxed">{series.desc}</p>
                  </div>
                  <Link to="/products" className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mt-8 block border border-white/20 py-3 text-center hover:bg-[#DFCE72] hover:text-[#061121] hover:border-transparent transition-all rounded-xl">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl uppercase tracking-[0.2em] text-center mb-16">Voices <span className="text-[#DFCE72]">of the Water</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${glassStyle} p-10 rounded-[24px] flex flex-col justify-between hover:from-white/[0.1] transition-all duration-500`}>
                <p className="text-slate-200 italic font-light text-sm leading-relaxed">"{testimonial.text}"</p>
                <p className="text-[#DFCE72] uppercase font-bold text-[9px] mt-8 tracking-[0.2em]">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};