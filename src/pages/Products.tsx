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
  const catalog: ProductItem[] = [
    { name: "Phenex Platinum", badge: "Best Seller Series", description: "Reliable, versatile, and trusted by thousands of anglers throughout Indonesia.", price: "IDR 114,000", testimonial: "The perfect balance between strength and value. My go-to fishing line.", image: "/platinum.png" },
    { name: "Phenex Alligator", badge: "Our First Product", description: "The product that started the Phenex journey.", price: "IDR 120,000", testimonial: "A proven performer that still holds up exceptionally well.", image: "/alligator.png" },
    { name: "Phenex Whalepower", badge: "Top Class Series", description: "Designed for maximum power and demanding fishing conditions.", price: "IDR 230,000", testimonial: "When I need absolute confidence, Whalepower is my first choice.", image: "/whalepower.png" },
    { name: "Phenex Monster", badge: "Best Seller Premium Class", description: "Premium performance for serious anglers.", price: "IDR 160,000", testimonial: "Exceptional strength and smooth handling.", image: "/monster.png" },
    { name: "Phenex Gold", badge: "Smooth Performance Series", description: "Outstanding value with smooth casting performance.", price: "IDR 76,000", testimonial: "Affordable, reliable, and surprisingly smooth.", image: "/gold.png" },
    { name: "Phenex Gatotkaca", badge: "Colorful Edition", description: "Available in Blue and Pink striking colorful variations.", price: "IDR 66,000", testimonial: "Looks unique and performs beyond expectations.", image: "/gatotkaca.png" },
    { name: "Specialist", badge: "Economic Series", description: "Affordable quality for everyday fishing.", price: "IDR 60,000", testimonial: "Excellent value for money.", image: "/specialist.png" },
    { name: "Phenex Little Gladiator", badge: "Multi-Threaded / Ultra-Light", description: "Specially engineered for ultra-light finesse setups.", price: "IDR 290,000", testimonial: "The ultimate choice for finesse fishing.", image: "/gladiator.png" },
    { name: "Phenex Invisible", badge: "Leader Line", description: "Low visibility with excellent abrasion resistance.", price: "IDR 162,000", testimonial: "Crystal clear and incredibly dependable.", image: "/invisible.png" },
    { name: "Phenex Arjuna", badge: "Premium Class", description: "Precision-engineered for performance-focused anglers.", price: "IDR 196,000", testimonial: "A true premium experience from cast to catch.", image: "/arjuna.png" },
    { name: "Phenex Gajah Mada", badge: "Newest Premium Release", description: "The latest evolution in premium fishing line technology.", price: "IDR 140,000", testimonial: "Phenex's most exciting release yet.", image: "/banner.png" }, // Falls back to banner info graphic
    { name: "Phenex Athena", badge: "Connecting Line", description: "Built for secure and reliable line connections.", price: "IDR 50,000", testimonial: "Simple, dependable, and highly effective.", image: "/logo.jpg" },
    { name: "Phenex Sumo", badge: "First Fishing Hook Series", description: "Strong, sharp, and tournament-ready.", price: "IDR 15,000", testimonial: "Excellent hook penetration and durability.", image: "/sumo.png" }
  ];

  return (
    <div className="min-h-screen bg-ocean-950 text-white pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-xs font-sans font-bold tracking-widest text-luxury-gold uppercase">OFFICIAL GEAR CATALOG</span>
          <h1 className="font-display text-4xl tracking-widest text-white uppercase mt-2">
            PHENEX <span className="text-luxury-gold">COLLECTION</span>
          </h1>
          <p className="text-xs text-slate-400 font-sans tracking-widest uppercase mt-2">
            Every product developed with an unyielding commitment to strength, reliability, and performance
          </p>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalog.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="bg-ocean-900/30 border border-ocean-800/50 rounded-xl overflow-hidden shadow-xl hover:border-luxury-gold/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="h-48 w-full bg-ocean-950 overflow-hidden relative border-b border-ocean-800/40">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 loading-lazy"
                  loading="lazy" 
                  onError={(e) => { (e.target as HTMLImageElement).src = '/banner.png'; }}
                />
              </div>

              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg text-white tracking-wide uppercase">{product.name}</h3>
                    {product.badge && (
                      <span className="inline-block bg-luxury-gold/10 border border-luxury-gold/20 text-[9px] text-luxury-gold px-2 py-0.5 rounded uppercase font-sans tracking-wider font-semibold mt-1">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-luxury-gold-light font-sans font-bold text-xs tracking-wide shrink-0 bg-ocean-950 px-2 py-1 rounded border border-ocean-800">
                    {product.price}
                  </span>
                </div>
                
                <p className="text-slate-400 text-xs font-sans leading-relaxed tracking-wide font-light">
                  {product.description}
                </p>
              </div>

              <div className="bg-ocean-950/50 border-t border-ocean-800/40 p-4 font-sans italic text-[11px] text-slate-300 flex items-start gap-2">
                <span className="text-luxury-gold text-xs leading-none">“</span>
                <p className="flex-grow">{product.testimonial}</p>
                <span className="text-luxury-gold text-xs leading-none">”</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};