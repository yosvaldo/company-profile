import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TeamCardProps {
  name: string;
  role: string;
  desc: string;
  image: string;
  delayIndex: number;
}

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
}

const maleRoles = [
  { role: "Commercial Director", desc: "Leads business growth, market expansion, and strategic partnerships across corporate channels." },
  { role: "Operational Director", desc: "Oversees day-to-day operations, supply synchronization, and organizational execution efficiency." },
  { role: "Head of West Area", desc: "Responsible for distributor development and market footprint growth across Western Indonesia." },
  { role: "Head of Supply Chain", desc: "Manages technical inventory planning, factory procurement, and regional product distribution pipelines." }
];

const femaleRoles = [
  { role: "Head of East Area", desc: "Leads sales expansion, commercial networks, and distributor relationships throughout Eastern Indonesia." },
  { role: "Head of Finance", desc: "Ensures long-term financial sustainability, macro resource management, and corporate health strategies." }
];

const cofounders = [
  {
    name: "Yosvaldo",
    role: "Co-Founder",
    desc: "A logistics and customer operations specialist dedicated to elite-grade reliability.",
    image: "/cofounder1.webp"
  },
  {
    name: "Samuel",
    role: "Co-Founder",
    desc: "A product researcher and strategist leading market vision and innovation.",
    image: "/cofounder2.webp"
  }
];

const TeamCard: React.FC<TeamCardProps> = ({ name, role, desc, image, delayIndex }) => {
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(delayIndex * 0.05, 0.3), ease: "easeOut" }}
      className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col group hover:border-luxury-gold/20 transition-all duration-300`}
    >
      <div className="aspect-4/5 w-full overflow-hidden relative border-b border-white/8 bg-black/40">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6 sm:p-8 grow flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base text-white tracking-wide font-sans font-bold">{name}</h3>
          <span className="inline-block text-luxury-gold font-bold text-[9px] tracking-[0.2em] uppercase">{role}</span>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed border-t border-white/4 pt-3">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export const Teams: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaleData = fetch('https://randomuser.me/api/?results=4&gender=male&inc=name,picture&nat=us,gb,ca&noinfo').then(res => res.json());
    const fetchFemaleData = fetch('https://randomuser.me/api/?results=2&gender=female&inc=name,picture&nat=us,gb,ca&noinfo').then(res => res.json());

    Promise.all([fetchMaleData, fetchFemaleData])
      .then(([maleResult, femaleResult]) => {
        const mappedMales: TeamMember[] = maleRoles.map((blueprint, idx) => {
          const user = maleResult.results?.[idx];
          return {
            name: user ? `${user.name.first} ${user.name.last}` : "Executive Director",
            image: user ? user.picture.large : "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60",
            ...blueprint
          };
        });

        const mappedFemales: TeamMember[] = femaleRoles.map((blueprint, idx) => {
          const user = femaleResult.results?.[idx];
          return {
            name: user ? `${user.name.first} ${user.name.last}` : "Managing Executive",
            image: user ? user.picture.large : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
            ...blueprint
          };
        });

        setTeamData([...cofounders, ...mappedMales, ...mappedFemales]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dynamic parsing compilation fault:", err);
        const combinedFallback: TeamMember[] = [
          ...cofounders,
          ...maleRoles.map(b => ({ ...b, name: "Executive Member", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60" })),
          ...femaleRoles.map(b => ({ ...b, name: "Executive Member", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" }))
        ];
        setTeamData(combinedFallback);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020813] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020813] text-white pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Management Structure</span>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mt-4">
            Leadership <span className="text-luxury-gold italic">Team</span>
          </h1>
          <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamData.map((member, index) => (
            <TeamCard 
              key={`${member.role}-${index}`} 
              name={member.name} 
              role={member.role} 
              desc={member.desc} 
              image={member.image} 
              delayIndex={index} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};