
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PricingProps {
  onTryClick?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onTryClick }) => {
  return (
    <section id="pricing" className="py-20 bg-brand-dark relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything is Free For Now</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take advantage of our platform's full capabilities at no cost while we're in beta. Choose the plan that fits your needs and get started today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="bg-brand-card border border-white/5 rounded-2xl p-8 flex flex-col">
            <h3 className="font-bold text-lg mb-2 text-white">Starter</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold">Free</span>
              <span className="text-gray-500 text-sm mb-1">/forever</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">Ideal for individuals and small projects.</p>
            <ul className="space-y-4 mb-8 flex-1">
              {['Basic Features', 'Limited Usage', 'Community Support'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={onTryClick}
              className="w-full py-3 rounded-lg bg-brand-purple hover:bg-brand-accent text-white font-semibold text-sm transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Team (Highlighted) */}
          <div className="bg-brand-card border border-brand-purple rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                All Free For Now
             </div>
            <h3 className="font-bold text-lg mb-2 text-white">Team</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold">Free</span>
              <span className="text-gray-500 text-sm mb-1">/for now</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">Unlock powerful features for your team.</p>
            <ul className="space-y-4 mb-8 flex-1">
              {['All Starter Features', 'Advanced AI Tools', 'Collaboration Tools', 'Priority Support'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={onTryClick}
              className="w-full py-3 rounded-lg bg-brand-purple hover:bg-brand-accent text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-purple/25"
            >
              Get Full Access
            </button>
          </div>

          {/* All Free */}
          <div className="bg-brand-card border border-white/5 rounded-2xl p-8 flex flex-col">
            <h3 className="font-bold text-lg mb-2 text-white">All free for now</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-bold">Free</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">Get complete access to all features during our beta period.</p>
            <ul className="space-y-4 mb-8 flex-1">
              {['Full Platform Access', 'Unlimited Usage', 'Dedicated Support', 'Early Access to New Features'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={onTryClick}
              className="w-full py-3 rounded-lg bg-brand-purple hover:bg-brand-accent text-white font-semibold text-sm transition-colors"
            >
              Start Building
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
