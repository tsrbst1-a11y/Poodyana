import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SiteConfig } from '../types';
import DefaultLogo from './logo.png';

export default function Navbar({ onNavigate, config }: { onNavigate: (page: 'home' | 'services' | 'about') => void, config: SiteConfig | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'ANASAYFA', value: 'home' as const },
    { label: 'Hakkımızda', value: 'about' as const },
    { label: 'İşletmeler', value: 'services' as const },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => { onNavigate('home'); setIsOpen(false); }}>
          <img 
            src={config?.logoUrl || DefaultLogo} 
            alt="Poody Logo" 
            className="h-10 sm:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.value} 
              onClick={() => onNavigate(item.value)} 
              className="text-gray-600 hover:text-[#A259FF] font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('services')}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105"
          >
            Hemen Başvur
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.value} 
                  onClick={() => { onNavigate(item.value); setIsOpen(false); }} 
                  className="text-left text-xl font-bold text-gray-900"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => { onNavigate('services'); setIsOpen(false); }}
                className="w-full bg-[#A259FF] text-white py-4 rounded-2xl font-bold transition-all"
              >
                Hemen Başvur
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
