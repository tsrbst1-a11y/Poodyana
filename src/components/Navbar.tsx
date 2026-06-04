import { motion } from 'motion/react';
import { PawPrint } from 'lucide-react';

export default function Navbar({ onNavigate }: { onNavigate: (page: 'home' | 'services' | 'about') => void }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5F6D] to-[#A259FF] flex items-center justify-center">
            <PawPrint className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-semibold text-2xl tracking-tight">poody</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-[#A259FF] font-medium">B2C</button>
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
