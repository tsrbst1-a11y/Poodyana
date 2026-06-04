import { motion } from 'motion/react';
import React from 'react';
import { Target, ShieldCheck, AlertTriangle, Map, Users, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h1 className="font-display font-semibold text-5xl tracking-tight text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#FF5F6D] to-[#A259FF]">
            Teknoloji ve Sosyal Ağların Gücüyle Pet Ekosistemini Yeniden Şekillendiriyoruz.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Poody, evcil hayvan sahipleri ile ekosistemin profesyonel hizmet sağlayıcılarını
            (veteriner hekimler, profesyonel gezdiriciler, pet otelleri ve bakım merkezleri)
            gelişmiş lokasyon teknolojileri çatısı altında birleştiren yeni nesil bir dijital platformdur.
            Amacımız, patili dostlarımızın yaşam kalitesini artırırken, sektöre yön veren işletmelere
            uçtan uca dijital dönüşüm ve sürdürülebilir büyüme altyapısı sunmaktır.
          </p>
        </div>
      </section>

      {/* Strategic Values */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="font-display font-semibold text-3xl mb-12 text-center">Stratejik Değerlerimiz</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            title="İnovasyon & Konum Teknolojileri" 
            icon={<Target className="text-[#FF5F6D]"/>} 
            text="Sıradan listeleme mantığının ötesine geçerek; anlık Pati Radarı, gerçek zamanlı OSRM rota takipleri ve park entegrasyonları ile konum tabanlı teknolojileri pet ekosisteminin merkezine konumlandırıyoruz." 
          />
          <ValueCard 
            title="Güven & Şeffaflık" 
            icon={<ShieldCheck className="text-[#A259FF]"/>} 
            text="Platformumuzdaki tüm hizmet sağlayıcıları ve profesyonel köpek gezdiricileri sıkı bir arka plan kontrolü, sabıka kaydı doğrulama ve topluluk puanlaması filtresinden geçirerek ekosistemdeki en yüksek güvenlik standardını inşa ediyoruz." 
          />
          <ValueCard 
            title="Toplumsal Sorumluluk" 
            icon={<AlertTriangle className="text-[#FF5F6D]"/>} 
            text="Sosyal etki bilincimizle geliştirdiğimiz 'Kırmızı Alarm' altyapısı sayesinde, kaybolan patili dostlarımızın saniyeler içinde 3 KM çapındaki tüm topluluğa ve koordineli arama ağlarına bildirilmesini sağlıyoruz." 
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
            <Metric title="Lokasyon Odaklı Akıllı Arayüz" icon={<Map className="mx-auto mb-4 text-[#FF5F6D]"/>} text="%100 Canlı Harita Filtreleri" />
            <Metric title="Denetlenen İş Ortakları" icon={<Users className="mx-auto mb-4 text-[#A259FF]"/>} text="7/24 Onaylı Sağlayıcılar" />
            <Metric title="Hızlı Reaksiyon Ağı" icon={<Clock className="mx-auto mb-4 text-[#FF5F6D]"/>} text="Saniyeler İçinde Kırmızı Alarm" />
        </div>
      </section>
    </div>
  );
}

function ValueCard({title, icon, text}: {title: string, icon: React.ReactNode, text: string}) {
  return (
    <motion.div whileHover={{y:-5}} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center">{icon}</div>
      <h3 className="font-display font-semibold text-xl text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </motion.div>
  )
}

function Metric({title, icon, text}: {title: string, icon: React.ReactNode, text: string}) {
    return (
        <div className="p-6">
            {icon}
            <p className="text-3xl font-bold text-white mb-2">{text}</p>
            <p className="text-gray-400">{title}</p>
        </div>
    )
}
