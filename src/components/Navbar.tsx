import { motion } from 'motion/react';
import { SiteConfig } from '../types';
import DefaultLogo from './logo.png';

export default function Navbar({ onNavigate, config }: { onNavigate: (page: 'home' | 'services' | 'about') => void, config: SiteConfig | null }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <img 
            src={config?.logoUrl || DefaultLogo} 
            alt="Poody Logo" 
            className="h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-[#A259FF] font-medium">ANASAYFA</button>
          <button onClick={() => onNavigate('about')} className="text-gray-600 hover:text-[#A259FF] font-medium">Hakkımızda</button>
          <button onClick={() => onNavigate('services')} className="text-gray-600 hover:text-[#A259FF] font-medium">İşletmeler</button>
          <button 
            onClick={() => onNavigate('services')}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Hemen Başvur
          </button>
        </div>
      </div>
    </nav>
  );
}
