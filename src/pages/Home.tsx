import React from 'react';
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Flagship } from '../components/Flagship';
import { Testimonials } from '../components/Testimonials';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020813] text-white overflow-x-hidden antialiased">
      <Hero />
      <Overview />
      <Flagship />
      <Testimonials />
    </div>
  );
};