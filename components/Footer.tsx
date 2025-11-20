import React from 'react';
import { Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080810] py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-6 h-6 text-brand-purple" />
                <span className="text-lg font-bold">Next-Gen AI</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">Automating the future, one workflow at a time.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Request Demo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-600 pt-8 border-t border-white/5">
          © 2024 Next-Gen AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;