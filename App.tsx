
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import RouterDemo from './components/RouterDemo';

const App: React.FC = () => {
  // 'landing' or 'app' view state
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  const navigateToApp = () => {
    window.scrollTo(0, 0);
    setCurrentView('app');
  };

  if (currentView === 'app') {
    return <RouterDemo />;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text selection:bg-brand-purple selection:text-white">
      <Navbar onTryClick={navigateToApp} />
      
      <main>
        <Hero onTryClick={navigateToApp} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing onTryClick={navigateToApp} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
