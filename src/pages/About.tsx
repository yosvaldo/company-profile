import React from 'react';
import { History } from '../components/History';
import { Cofounder } from '../components/Cofounder';
import { Culture } from '../components/Culture';

export const About: React.FC = () => {
  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  return (
    <div className="min-h-screen bg-[#020813] text-white pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-28">
        
        <History glassStyle={glassStyle} />

        <Cofounder glassStyle={glassStyle} />

        <Culture glassStyle={glassStyle} />

      </div>
    </div>
  );
};