import React, { useState } from 'react';
import { UploadCloud, Cpu, BarChart3 } from 'lucide-react';

const tabs = [
  { id: 0, label: '1. Input Data', icon: UploadCloud },
  { id: 1, label: '2. AI Processing', icon: Cpu },
  { id: 2, label: '3. Get Results', icon: BarChart3 },
];

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="how-it-works" className="py-20 bg-brand-dark relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        
        {/* Tabs Navigation */}
        <div className="flex justify-center border-b border-white/10 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-2 px-8 py-4 text-sm font-medium transition-all relative ${
                activeTab === tab.id ? 'text-brand-purple' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-brand-card rounded-2xl p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Upload and Connect Your Data</h3>
            <p className="text-gray-400 leading-relaxed">
              Begin by securely uploading your datasets or connecting your existing data sources. Our platform supports a wide range of formats and integrations, ensuring a smooth and hassle-free setup process. Your data's privacy and security are our top priority.
            </p>
          </div>
          <div className="flex-1 w-full">
             {/* Placeholder for the abstract image in the screenshot */}
            <div className="rounded-xl overflow-hidden relative aspect-square md:aspect-video bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-center justify-center group">
               <div className="absolute inset-0 bg-brand-purple/10 mix-blend-overlay"></div>
               <img 
                 src="https://picsum.photos/600/400?grayscale&blur=2" 
                 alt="Abstract AI Visualization" 
                 className="opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 bg-brand-purple/20 rounded-full animate-pulse flex items-center justify-center backdrop-blur-sm border border-brand-purple/30">
                    <Cpu className="w-10 h-10 text-brand-purple" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;