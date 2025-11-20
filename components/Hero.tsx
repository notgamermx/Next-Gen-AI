import React from 'react';

interface HeroProps {
  onTryClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onTryClick }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 hero-grid z-0 pointer-events-none"></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/20 blur-[120px] rounded-full z-0"></div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Automate Your Workflow with <span className="gradient-text">Next-Gen AI</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Harness the power of our advanced AI to streamline processes, gain intelligent insights, and drive unprecedented growth.
        </p>
        
        <button 
          onClick={onTryClick}
          className="bg-brand-purple hover:bg-brand-accent text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] hover:-translate-y-1"
        >
          Get Started for Free
        </button>

        {/* Decorative "Floor" Grid in the distance - simulated with CSS in global styles but emphasized here */}
        <div className="mt-20 h-40 w-full perspective-[1000px] opacity-50">
             <div className="w-full h-full bg-gradient-to-b from-transparent to-brand-dark"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;