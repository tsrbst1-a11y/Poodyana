import { motion } from 'motion/react';
import React from 'react';
import { Stethoscope, User, Building2, Scissors, ShoppingBasket, CheckCircle } from 'lucide-react';

export default function Services() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h1 className="font-display font-semibold text-5xl tracking-tight text-gray-900">Poody İş Ortağı Olun, Binlerce Pati Sahibine Anında Ulaşın.</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Veteriner kliniklerinden pet otellerine kadar tüm hizmetlerinizi Poody haritasında listeleyin, randevularınızı ve kazancınızı yönetin.</p>
          <a href="#form" className="inline-block bg-[#A259FF] text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700">Hemen Başvur</a>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="font-display font-semibold text-3xl mb-12 text-center">Harita Tabanlı İş Avantajları</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6"><strong>Veterinerler:</strong> 7/24 Nöbetçi piniyle acil rota çizdirin.</div>
            <div className="p-6"><strong>Gezdiriciler:</strong> GPS rotasıyla güven verin, "Müsait" görünün.</div>
            <div className="p-6"><strong>Pet Otelleri:</strong> "Yerim Var" yeşil piniyle doluluk yönetin.</div>
            <div className="p-6"><strong>Kuaförler:</strong> Hareketli pinle servis alanınızı gösterin.</div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="font-display font-semibold text-3xl mb-12 text-center">Hizmet Kategorileri</h2>
        <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard title="Veteriner" icon={<Stethoscope className="text-[#FF5F6D]"/>} />
            <ServiceCard title="Köpek Gezdirici" icon={<User className="text-[#A259FF]"/>} />
            <ServiceCard title="Pet Otelleri" icon={<Building2 className="text-[#FF5F6D]"/>} />
            <ServiceCard title="Pet Kuaför" icon={<Scissors className="text-[#A259FF]"/>} />
            <ServiceCard title="Petshoplar" icon={<ShoppingBasket className="text-[#FF5F6D]"/>} />
        </div>
      </section>

      <section id="form" className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
             <h2 className="font-display font-semibold text-2xl mb-6">Başvuru Formu</h2>
             <form className="space-y-4">
                 <input type="text" placeholder="İşletme Adı" className="w-full p-4 rounded-xl border" />
                 <input type="text" placeholder="Hizmet Verilecek Bölge (Örn: İstanbul/Beylikdüzü)" className="w-full p-4 rounded-xl border" />
                 <select className="w-full p-4 rounded-xl border">
                     <option>Veteriner</option>
                     <option>Köpek Gezdirici</option>
                     <option>Pet Otelleri</option>
                     <option>Pet Kuaför</option>
                     <option>Petshoplar</option>
                 </select>
                 <button className="w-full bg-gradient-to-r from-[#FF5F6D] to-[#A259FF] text-white p-4 rounded-xl font-semibold">Başvuruyu Tamamla</button>
             </form>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({title, icon}: {title: string, icon: React.ReactNode}) {
    return <div className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
        <h3 className="font-medium text-lg">{title}</h3>
    </div>
}
