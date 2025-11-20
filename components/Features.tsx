import React from 'react';
import { Zap, Link, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Intelligent Analysis",
    description: "Leverage AI to analyze complex data sets in seconds, uncovering actionable insights."
  },
  {
    icon: <Link className="w-6 h-6 text-purple-400" />,
    title: "Seamless Integration",
    description: "Easily connect our platform with the tools you already use for a smooth, unified experience."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
    title: "Predictive Insights",
    description: "Anticipate market trends and make data-driven decisions with our forecasting models."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-brand-dark relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Advanced Capabilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform is built with cutting-edge features designed to provide intelligent analysis and seamless integration into your existing workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-brand-card border border-white/5 p-8 rounded-xl hover:border-brand-purple/50 transition-colors group">
              <div className="bg-brand-dark w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-purple/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;