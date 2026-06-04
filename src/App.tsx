import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';

export default function App() {
  const [page, setPage] = useState<'home' | 'services' | 'about'>('home');

  const renderPage = () => {
    switch (page) {
        case 'home': return <Home />;
        case 'services': return <Services />;
        case 'about': return <About />;
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900">
      <Navbar onNavigate={setPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
