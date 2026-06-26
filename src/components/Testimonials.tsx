import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const feedbacks = [
  { quote: "Phenex has consistently proven itself as a trustworthy partner. Their team is highly responsive, professional, and always ready to accommodate distributor needs.", author: "DISTRIBUTOR A" },
  { quote: "The combination of product quality and brand credibility makes Phenex easy to recommend. Customers return because they trust the performance.", author: "DISTRIBUTOR B" },
  { quote: "After trying many brands, Phenex remains my top recommendation. The consistency and quality are outstanding.", author: "END USER C" }
];

export const Testimonials: React.FC = () => {
  const liquidGlassStyle = "bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-[32px] border border-white/[0.06] shadow-[0_20px_40px_rgba(0,0,0,0.4)]";

  return (
    <section className="bg-[#020813] py-24 text-white border-t border-white/3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">Reviews</span>
          <h2 className="text-3xl font-black tracking-tight uppercase">Voices of the Water</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {feedbacks.map((f, i) => (
            <Card key={i} className={`${liquidGlassStyle} rounded-3xl p-6 text-white flex flex-col justify-between hover:border-white/20 transition-colors duration-300`}>
              <CardContent className="p-0">
                <Quote className="h-7 w-7 text-luxury-gold/30 mb-4" />
                <p className="text-slate-300 text-sm leading-relaxed font-light italic">"{f.quote}"</p>
              </CardContent>
              <CardFooter className="mt-8 p-0 border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase">— {f.author}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};