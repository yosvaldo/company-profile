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

const ProductCard: React.FC<{ product: ProductItem; glassStyle: string; index: number }> = ({ product, glassStyle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
      className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col justify-between group hover:border-luxury-gold/20 transition-all duration-300`}
    >
      <div className="aspect-16/10 w-full overflow-hidden relative border-b border-white/8 bg-black/40">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy" 
          decoding="async"
        />
      </div>

      <div className="p-6 sm:p-8 space-y-4 grow">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
              {product.name}
            </h3>
            {product.badge && (
              <span className="inline-block bg-white/4 border border-white/8 text-[8px] text-luxury-gold px-2.5 py-1 rounded-md uppercase tracking-[0.2em] font-medium">
                {product.badge}
              </span>
            )}
          </div>
          <span className="text-luxury-gold font-bold text-[11px] sm:text-xs tracking-widest shrink-0 mt-0.5">
            {product.price}
          </span>
        </div>
        
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed tracking-wide font-light">
          {product.description}
        </p>
      </div>

      <div className="bg-black/20 border-t border-white/4 p-5 sm:p-6 font-light italic text-[11px] text-slate-300 flex items-start gap-1">
        <span className="text-luxury-gold text-sm leading-none font-serif">“</span>
        <p className="leading-relaxed">{product.testimonial}</p>
      </div>
    </motion.div>
  );
};

export const Products: React.FC = () => {
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const catalog: ProductItem[] = [
    { name: "Phenex Platinum", badge: "Best Seller", description: "Reliable, versatile, and trusted by thousands of anglers throughout Indonesia.", price: "IDR 114,000", testimonial: "The perfect balance between strength and value.", image: "/platinum.webp" },
    { name: "Phenex Alligator", badge: "Our First Product", description: "The product that started the Phenex journey.", price: "IDR 120,000", testimonial: "A proven performer that still holds up exceptionally well.", image: "/alligator.webp" },
    { name: "Phenex Whalepower", badge: "Top Class Series", description: "Designed for maximum power and demanding fishing conditions.", price: "IDR 230,000", testimonial: "When I need absolute confidence, Whalepower is my first choice.", image: "/whalepower.webp" },
    { name: "Phenex Monster", badge: "Best Seller", description: "Premium performance for serious anglers.", price: "IDR 160,000", testimonial: "Exceptional strength and smooth handling.", image: "/monster.webp" },
    { name: "Phenex Gold", badge: "Smooth Performance", description: "Outstanding value with smooth casting performance.", price: "IDR 76,000", testimonial: "Affordable, reliable, and surprisingly smooth.", image: "/gold.webp" },
    { name: "Phenex Gatotkaca", badge: "Colorful Edition", description: "Available in Blue and Pink striking colorful variations.", price: "IDR 66,000", testimonial: "Looks unique and performs beyond expectations.", image: "/gatotkaca.webp" },
    { name: "Specialist", badge: "Economic Series", description: "Affordable quality for everyday fishing.", price: "IDR 60,000", testimonial: "Excellent value for money.", image: "/specialist.webp" },
    { name: "Phenex Little Gladiator", badge: "Multi-Threaded / Ultra-Light", description: "Specially engineered for ultra-light fishing.", price: "IDR 290,000", testimonial: "The ultimate choice for ultra-light fishing.", image: "/gladiator.webp" },
    { name: "Phenex Invisible", badge: "Leader Line", description: "Low visibility with excellent abrasion resistance.", price: "IDR 162,000", testimonial: "Crystal clear and incredibly dependable.", image: "/invisible.webp" },
    { name: "Phenex Arjuna", badge: "Premium Class", description: "Precision-engineered for performance-focused anglers.", price: "IDR 196,000", testimonial: "A true premium experience from cast to catch.", image: "/arjuna.webp" },
    { name: "Phenex Gajah Mada", badge: "Newest Premium Release", description: "The latest evolution in premium fishing line technology.", price: "IDR 140,000", testimonial: "Phenex's most exciting release yet.", image: "/gajahmada.webp" },
    { name: "Phenex Athena", badge: "Connecting Line", description: "Built for secure and reliable fishing.", price: "IDR 50,000", testimonial: "Simple, dependable, and highly effective.", image: "/athena.webp" },
    { name: "Phenex Sumo", badge: "Fishing Hook", description: "Strong, sharp, and tournament-ready.", price: "IDR 15,000", testimonial: "Excellent hook penetration and durability.", image: "/sumo.webp" }
  ];

  return (
    <div className="min-h-screen bg-[#020813] pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Official Gear Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mt-4">
            PHENEX <span className="text-luxury-gold italic">Collection</span>
          </h1>
          <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {catalog.map((product, index) => (
            <ProductCard 
              key={product.name} 
              product={product} 
              glassStyle={glassStyle} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};