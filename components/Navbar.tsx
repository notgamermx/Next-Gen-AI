import React from 'react';
import { Cpu } from 'lucide-react';

interface NavbarProps {
  onTryClick: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onTryClick, className = '' }) => {
  return (
    <nav className={`w-full py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 ${className}`}>
      <div className="flex items-center gap-2">
        <Cpu className="w-8 h-8 text-brand-purple" />
        <span className="text-xl font-bold tracking-wide">Next-Gen AI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
        <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
      </div>

      <button 
        onClick={onTryClick}
        className="bg-brand-purple hover:bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      >
        Try for Free
      </button>
    </nav>
  );
};

export default Navbar;