import React from 'react';

interface CultureItem {
  title: string;
  desc: string;
}

export const Culture: React.FC<{ glassStyle: string }> = ({ glassStyle }) => {
  const cultureList: CultureItem[] = [
    { title: "Trustworthiness", desc: "Trust is the foundation of every relationship we build—with customers, distributors, suppliers, and employees." },
    { title: "Excellence in Service", desc: "We believe exceptional products must be supported by exceptional service." },
    { title: "Continuous Improvement", desc: "Innovation and learning drive us to consistently improve our products and customer experience." },
    { title: "Customer-Centric Mindset", desc: "Every decision begins with understanding the needs of anglers." }
  ];

  return (
    <section className="pt-4">
      <h2 className="font-serif text-3xl text-center mb-12 text-luxury-gold">Our Culture</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cultureList.map((culture, idx) => (
          <div 
            key={idx} 
            className={`${glassStyle} rounded-2xl p-8 flex flex-col justify-between hover:border-luxury-gold/20 transition-all duration-300`}
          >
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                {culture.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed tracking-wide font-light pl-4.5 border-l border-luxury-gold/20">
                {culture.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};