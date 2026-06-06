import { motion } from 'motion/react';
import React from 'react';
import { MapPin, Navigation, ShieldCheck, PawPrint, Heart } from 'lucide-react';
import MockupImage from './mockup.jpg';
import { SiteConfig } from '../types';

export default function Home({ config }: { config: SiteConfig | null }) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Yepyeni Bir Dünya
            </div>
            
            <h1 className="font-display font-bold text-5xl md:text-7xl text-gray-900 leading-[1.1] tracking-tight">
              {config?.heroTitle || "Dostun İçin En İyisi Burada."}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              {config?.heroDescription || "Poody, patili dostlarınızın sosyal dünyası, güvenli haritası ve veterinerden pet oteline tüm hizmetleri barındıran kapsamlı bir evcil hayvan ekosistemidir."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                <svg viewBox="0 0 384 512" width="20" height="20" className="fill-current">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-24.3-80.9-24.3-29.8 0-71.5 20.1-93.1 53.3-45.4 70.4-12.3 161.9 20.3 211.5 16.3 24.3 36.1 51.3 64.1 51.3 25.1 0 35.8-15.1 65.8-15.1 30 0 41.5 15.1 66.6 15.1 28.3 0 45.4-24.3 62-49.8 19.1-28.5 26.6-55.9 26.9-57.3-.8-.3-65.7-25-66.2-100.2zM289.4 86.8c16.1-20.1 27.6-47.7 27.6-76.4 0-4.1-.5-8.2-1.2-12.2-26.2 1.1-52.1 17.5-68.5 35.2-13.3 14.3-25.1 39.4-25.1 66.8 0 4.1.7 8.2 1.3 10.4 2.8.2 5.5.3 8.3.3 22.1 0 46.2-10.1 61.6-24.1z" />
                </svg>
                App Store
              </button>
              <a 
                href={config?.googlePlayLink || "https://dosya.co/8rjpcbyxjpn0/13505_Poody.apk.html"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
              >
                <svg viewBox="0 0 512 512" width="20" height="20" className="fill-current">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                Google Play
              </a>
            </div>
            
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">10k+</span> pati sahibi aramıza katıldı.
              </p>
            </div>
          </motion.div>

          {/* Phone Mockup Right Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden ring-1 ring-gray-700">
              {/* Speaker/Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" />
              
              {/* Phone Content Screen */}
              <div className="absolute inset-0 bg-white overflow-hidden">
                <img 
                  src={MockupImage} 
                  alt="Poody App Mockup" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Decorative Background Elements behind phone */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-2xl opacity-60 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-100 rounded-full blur-2xl opacity-60 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Feature Static Cards */}
      <section className="py-16 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Pati Radarı" 
            icon={<MapPin className="text-[#FF5F6D] w-5 h-5"/>} 
            text="Semtinizdeki patili dostları ve yürüyüş yollarını flat modern bir harita üzerinden takip edin."
          />
          <FeatureCard 
            title="Kırmızı Alarm" 
            icon={<ShieldCheck className="text-red-500 w-5 h-5"/>} 
            text="Kayıp durumunda saniyeler içinde 3 KM çapındaki tüm topluluğa ve koordineli arama ağlarına bildirim gönderin."
          />
          <FeatureCard 
            title="Buluşma Noktaları" 
            icon={<Navigation className="text-[#A259FF] w-5 h-5"/>} 
            text="Popüler semt parklarındaki canlı köpek buluşma etkinliklerini anlık izleyin ve katılın."
          />
          <FeatureCard 
            title="Sınırsız Keşif" 
            icon={<Heart className="text-[#FF5F6D] w-5 h-5"/>} 
            text="Yürüyüş rotalarında gezdikçe rozetler, mama indirimleri ve kemikler kazanın."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({title, icon, text}: {title: string, icon: React.ReactNode, text: string}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition-all">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}
