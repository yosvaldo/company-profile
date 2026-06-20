import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TeamCardProps {
  name: string;
  role: string;
  desc: string;
  image: string;
  delayIndex: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, desc, image, delayIndex }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: delayIndex * 0.05 }}
    className="bg-ocean-900/30 border border-ocean-800/50 rounded-xl overflow-hidden shadow-xl hover:border-luxury-gold/30 transition-all duration-300 flex flex-col group"
  >
    <div className="h-64 w-full bg-ocean-950 overflow-hidden relative border-b border-ocean-800/40">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/50 via-transparent to-transparent" />
    </div>
    <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
      <div>
        <h3 className="font-display text-lg text-white tracking-wide uppercase group-hover:text-luxury-gold-light transition-colors">{name}</h3>
        <span className="inline-block text-luxury-gold font-sans font-bold text-[10px] tracking-widest uppercase mt-0.5">{role}</span>
      </div>
      <p className="text-slate-400 text-xs font-sans leading-relaxed font-light">{desc}</p>
    </div>
  </motion.div>
);

export const Teams: React.FC = () => {
  const [teamData, setTeamData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const corporateRoles = [
    { role: "Commercial Director", desc: "Leads business growth, market expansion, and strategic partnerships across corporate channels." },
    { role: "Operational Director", desc: "Oversees day-to-day operations, supply synchronization, and organizational execution efficiency." },
    { role: "Head of West Area", desc: "Responsible for distributor development and market footprint growth across Western Indonesia." },
    { role: "Head of East Area", desc: "Leads sales expansion, commercial networks, and distributor relationships throughout Eastern Indonesia." },
    { role: "Head of Finance", desc: "Ensures long-term financial sustainability, macro resource management, and corporate health strategies." },
    { role: "Head of Supply Chain", desc: "Manages technical inventory planning, factory procurement, and regional product distribution pipelines." }
  ];

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=6&inc=name,picture&nat=us,gb,ca&noinfo')
      .then((res) => res.json())
      .then((data) => {
        const combined = corporateRoles.map((blueprint, index) => {
          const user = data.results[index];
          return {
            name: user ? `${user.name.first} ${user.name.last}` : "Executive Manager",
            image: user ? user.picture.large : "https://via.placeholder.com/500", // Grabs their large asset link
            ...blueprint
          };
        });
        setTeamData(combined);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-ocean-950 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-luxury-gold" /></div>;

  return (
    <div className="min-h-screen bg-ocean-950 text-white pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-sans font-bold tracking-widest text-luxury-gold uppercase">MANAGEMENT STRUCTURE</span>
          <h1 className="font-display text-4xl tracking-widest text-white uppercase mt-2">LEADERSHIP <span className="text-luxury-gold">TEAM</span></h1>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <TeamCard key={index} name={member.name} role={member.role} desc={member.desc} image={member.image} delayIndex={index} />
          ))}
        </div>
      </div>
    </div>
  );
};