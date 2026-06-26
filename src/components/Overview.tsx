import React from 'react';
import { Shield, Zap, Target, Trophy } from 'lucide-react';

const valueProps = [
  { icon: Shield, title: "Advanced Technology", desc: "Coated with highly durable specialized molecular sealants." },
  { icon: Zap, title: "Superior Strength", desc: "Uncompromising linear power to withstand intense, brutal impacts." },
  { icon: Target, title: "Unmatched Precision", desc: "Perfect calibration for stealth line invisibility underwater." },
  { icon: Trophy, title: "Built For Champions", desc: "Tournament-tested across competitive waters worldwide." }
];

export const Overview: React.FC = () => {
  const liquidGlassStyle = "bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-[40px] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_50px_rgba(0,0,0,0.5)]";

  return (
    <section className="relative bg-[#020813] py-28 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase">Our Legacy</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">Forged by Passion<br/>& Innovation</h2>
          </div>
          <div className="space-y-6 text-slate-300 lg:col-span-7 text-sm md:text-base font-light leading-relaxed">
            <p>
              Founded in 2020, Phenex was established with a simple vision: to provide anglers with premium-quality fishing equipment at fair and accessible prices.
            </p>
            <p>
              Driven by a passion for innovation and performance, the founders spent more than six months conducting product research and testing before introducing the first Phenex fishing line to the market. Today, Phenex has grown into one of Indonesia's trusted fishing line brands.
            </p>
            <p className="font-semibold text-white">
              From entry-level products to tournament-grade premium series, every Phenex product is developed with the same commitment to strength, reliability, and performance.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8">
          {valueProps.map((item, idx) => (
            <div key={idx} className={`${liquidGlassStyle} flex flex-col items-center text-center p-8 rounded-3xl border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-500 group`}>
              <div className="mb-5 rounded-full bg-[#020813] p-4 border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-6 w-6 text-luxury-gold" />
              </div>
              <h3 className="text-base font-bold tracking-wide text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};