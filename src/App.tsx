import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Admin from './components/Admin';
import { db } from './lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { SiteConfig } from './types';

export default function App() {
  const [page, setPage] = useState<'home' | 'services' | 'about' | 'admin'>('home');
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    // Handle root /admin path check (simple routing without react-router)
    if (window.location.pathname === '/admin') {
      setPage('admin');
    }

    // Subscribe to site config
    const unsub = onSnapshot(doc(db, 'configs', 'main'), (d) => {
      if (d.exists()) {
        setConfig(d.data() as SiteConfig);
      }
    });

    return () => unsub();
  }, []);

  const renderPage = () => {
    switch (page) {
        case 'home': return <Home config={config} />;
        case 'services': return <Services />;
        case 'about': return <About />;
        case 'admin': return <Admin />;
        default: return <Home config={config} />;
    }
  }

  if (page === 'admin') {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900">
      <Navbar onNavigate={setPage} config={config} />
      <main>
        {renderPage()}
      </main>
      <Footer config={config} />
    </div>
  );
}
