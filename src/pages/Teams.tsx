import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TeamCardProps {
  name: string;
  role: string;
  desc: string;
  image: string;
  delayIndex: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, desc, image, delayIndex }) => {
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delayIndex * 0.05 }}
      className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col group hover:from-white/[0.1] transition-all duration-300`}
    >
      <div className="h-72 w-full overflow-hidden relative border-b border-white/[0.08]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />
      </div>
      <div className="p-8 flex-grow flex flex-col space-y-3">
        <h3 className="text-base text-white tracking-[0.05em] uppercase">{name}</h3>
        <span className="inline-block text-[#DFCE72] font-bold text-[9px] tracking-[0.2em] uppercase">{role}</span>
        <p className="text-[12px] text-slate-400 font-light leading-relaxed pt-2">{desc}</p>
      </div>
    </motion.div>
  );
};

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
            image: user ? user.picture.large : "https://via.placeholder.com/500", 
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

  if (loading) return (
    <div className="min-h-screen bg-[#061121] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#DFCE72]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#061121] text-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#DFCE72] uppercase">Management Structure</span>
          <h1 className="text-3xl tracking-tight text-white uppercase mt-4">Leadership <span className="text-[#DFCE72]">Team</span></h1>
          <div className="w-12 h-[1px] bg-[#DFCE72]/40 mx-auto mt-8" />
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