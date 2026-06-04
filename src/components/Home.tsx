import { motion } from 'motion/react';
import React from 'react';
import { MapPin, Navigation, ShieldCheck, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h1 className="font-display font-semibold text-6xl tracking-tight text-gray-900 leading-tight">
              Patili Dostunun Sosyal Dünyası Şimdi Haritada!
            </h1>
            <p className="text-xl text-gray-600">
              Poody ile çevrendeki patileri keşfet, yeni oyun arkadaşları bul, canlı rota takibiyle güvenli yürüyüşler yap ve ekosistemdeki en iyi pet hizmetlerine anında ulaş.
            </p>
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-[#FF5F6D] to-[#A259FF] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition-opacity">App Store'dan İndir</button>
              <button className="bg-white border text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">Google Play'den İndir</button>
            </div>
          </div>
          <img 
              src="https://i.hizliresim.com/o36b2d3.jpg" 
              alt="Poody Harita Mockup" 
              className="w-full h-full object-cover rounded-3xl"
            />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <FeatureCard title="Pati Radarı" icon={<div className="relative"><motion.div animate={{scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5]}} className="absolute -inset-2 rounded-full bg-[#FF5F6D]"/> <MapPin className="relative text-[#FF5F6D]"/></div>} text="Çevreni anlık tara, gelişmiş cins filtreleriyle oyun arkadaşını bul."/>
            <FeatureCard title="Parklarda Buluşma" icon={<MapPin className="text-[#A259FF]"/>} text="Popüler parklardaki canlı etkinlik pinlerini gör ve hemen katıl."/>
            <FeatureCard title="Kırmızı Alarm" icon={<ShieldCheck className="text-red-600"/>} text="Kayıp durumunda 3 KM çapında anlık kırmızı bildirim gönder." className="bg-red-50 border-red-100 shadow-red-100"/>
            <FeatureCard title="Fog of War" icon={<Navigation className="text-[#A259FF]"/>} text="Yeni rotalar gezdikçe sisi kaldır, kemik ve rozet kazan."/>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({title, icon, text, className}: {title: string, icon: React.ReactNode, text: string, className?: string}) {
  return (
    <motion.div whileHover={{y:-5}} className={`p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 ${className || ''}`}>
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6">{icon}</div>
      <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </motion.div>
  )
}
