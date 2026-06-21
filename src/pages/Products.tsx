import React from 'react';
import { motion } from 'framer-motion';

interface ProductItem {
  name: string;
  badge?: string;
  description: string;
  price: string;
  testimonial: string;
  image: string;
}

export const Products: React.FC = () => {
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const catalog: ProductItem[] = [
    { name: "Phenex Platinum", badge: "Best Seller", description: "Reliable, versatile, and trusted by thousands of anglers throughout Indonesia.", price: "IDR 114,000", testimonial: "The perfect balance between strength and value.", image: "/platinum.png" },
    { name: "Phenex Alligator", badge: "Our First Product", description: "The product that started the Phenex journey.", price: "IDR 120,000", testimonial: "A proven performer that still holds up exceptionally well.", image: "/alligator.png" },
    { name: "Phenex Whalepower", badge: "Top Class Series", description: "Designed for maximum power and demanding fishing conditions.", price: "IDR 230,000", testimonial: "When I need absolute confidence, Whalepower is my first choice.", image: "/whalepower.png" },
    { name: "Phenex Monster", badge: "Best Seller", description: "Premium performance for serious anglers.", price: "IDR 160,000", testimonial: "Exceptional strength and smooth handling.", image: "/monster.png" },
    { name: "Phenex Gold", badge: "Smooth Performance", description: "Outstanding value with smooth casting performance.", price: "IDR 76,000", testimonial: "Affordable, reliable, and surprisingly smooth.", image: "/gold.png" },
    { name: "Phenex Gatotkaca", badge: "Colorful Edition", description: "Available in Blue and Pink striking colorful variations.", price: "IDR 66,000", testimonial: "Looks unique and performs beyond expectations.", image: "/gatotkaca.png" },
    { name: "Specialist", badge: "Economic Series", description: "Affordable quality for everyday fishing.", price: "IDR 60,000", testimonial: "Excellent value for money.", image: "/specialist.png" },
    { name: "Phenex Little Gladiator", badge: "Multi-Threaded / Ultra-Light", description: "Specially engineered for ultra-light fishing.", price: "IDR 290,000", testimonial: "The ultimate choice for ultra-light fishing.", image: "/gladiator.png" },
    { name: "Phenex Invisible", badge: "Leader Line", description: "Low visibility with excellent abrasion resistance.", price: "IDR 162,000", testimonial: "Crystal clear and incredibly dependable.", image: "/invisible.png" },
    { name: "Phenex Arjuna", badge: "Premium Class", description: "Precision-engineered for performance-focused anglers.", price: "IDR 196,000", testimonial: "A true premium experience from cast to catch.", image: "/arjuna.png" },
    { name: "Phenex Gajah Mada", badge: "Newest Premium Release", description: "The latest evolution in premium fishing line technology.", price: "IDR 140,000", testimonial: "Phenex's most exciting release yet.", image: "/gajahmada.png" },
    { name: "Phenex Athena", badge: "Connecting Line", description: "Built for secure and reliable fishing.", price: "IDR 50,000", testimonial: "Simple, dependable, and highly effective.", image: "/athena.png" },
    { name: "Phenex Sumo", badge: "Fishing Hook", description: "Strong, sharp, and tournament-ready.", price: "IDR 15,000", testimonial: "Excellent hook penetration and durability.", image: "/sumo.png" }
  ];

  return (
    <div className="min-h-screen bg-[#061121] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#DFCE72] uppercase">Official Gear Catalog</span>
          <h1 className="text-3xl tracking-tight text-white uppercase mt-4">
            PHENEX <span className="text-[#DFCE72]">Collection</span>
          </h1>
          <div className="w-12 h-[1px] bg-[#DFCE72]/40 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalog.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col justify-between group hover:from-white/[0.1] transition-all duration-300`}
            >
              <div className="h-48 w-full overflow-hidden relative border-b border-white/[0.08]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy" 
                />
              </div>

              <div className="p-8 space-y-4 flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-[0.1em] uppercase">{product.name}</h3>
                    {product.badge && (
                      <span className="inline-block mt-3 bg-white/[0.05] border border-white/[0.08] text-[9px] text-[#DFCE72] px-3 py-1 rounded-lg uppercase tracking-[0.2em]">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[#DFCE72] font-semibold text-[11px] tracking-widest shrink-0">
                    {product.price}
                  </span>
                </div>
                
                <p className="text-[12px] text-slate-400 leading-relaxed tracking-wide font-light">
                  {product.description}
                </p>
              </div>

              <div className="bg-black/20 border-t border-white/[0.05] p-6 font-light italic text-[11px] text-slate-300">
                <span className="text-[#DFCE72] text-xs mr-2">“</span>
                {product.testimonial}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};