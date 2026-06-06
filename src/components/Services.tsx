import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Stethoscope, User, Building2, Scissors, ShoppingBasket, CheckCircle, Send, RefreshCw } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Services() {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('Veteriner');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !email) return;

    setLoading(true);
    try {
      // Add a timeout fallback in case Firestore hangs
      const timeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
          alert("İşlem zaman aşımına uğradı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
        }
      }, 10000);

      await addDoc(collection(db, 'applications'), {
        businessName,
        contactName,
        email,
        phone,
        region,
        category,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      clearTimeout(timeout);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      // More descriptive error
      const msg = err?.code === 'permission-denied' 
        ? "Erişim engellendi. Veritabanı kuralları henüz aktif olmamış olabilir." 
        : "Başvuru gönderilirken bir hata oluştu: " + (err?.message || "Bilinmeyen hata");
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-semibold text-5xl tracking-tight text-gray-900"
          >
            Petpoody İş Ortağı Olun, Binlerce Pati Sahibine Anında Ulaşın.
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Veteriner kliniklerinden pet otellerine kadar tüm hizmetlerinizi Petpoody haritasında listeleyin, randevularınızı ve kazancınızı yönetin.</p>
          <a href="#form" className="inline-block bg-[#A259FF] text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-all">Hemen Başvur</a>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="font-display font-semibold text-3xl mb-12 text-center">Harita Tabanlı İş Avantajları</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <FeatureCard title="Veterinerler" desc="7/24 Nöbetçi piniyle acil rota çizdirin." />
            <FeatureCard title="Gezdiriciler" desc="GPS rotasıyla güven verin, 'Müsait' görünün." />
            <FeatureCard title="Pet Otelleri" desc="'Yerim Var' yeşil piniyle doluluk yönetin." />
            <FeatureCard title="Kuaförler" desc="Hareketli pinle servis alanınızı gösterin." />
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
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
             {submitted ? (
               <div className="text-center space-y-4 py-8">
                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                   <CheckCircle className="w-10 h-10" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900">Başvurunuz Alındı!</h2>
                 <p className="text-gray-500">Ekibimiz başvurunuzu inceleyip en kısa sürede sizinle iletişime geçecektir.</p>
                 <button 
                  onClick={() => setSubmitted(false)}
                  className="text-indigo-600 font-medium hover:underline"
                 >
                   Yeni bir başvuru yap
                 </button>
               </div>
             ) : (
               <>
                 <h2 className="font-display font-semibold text-2xl mb-6">Başvuru Formu</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid sm:grid-cols-2 gap-4">
                       <input 
                         type="text" 
                         required
                         value={businessName}
                         onChange={(e) => setBusinessName(e.target.value)}
                         placeholder="İşletme Adı" 
                         className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100" 
                       />
                       <input 
                         type="text" 
                         required
                         value={contactName}
                         onChange={(e) => setContactName(e.target.value)}
                         placeholder="Yetkili Adı" 
                         className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100" 
                       />
                     </div>
                     <div className="grid sm:grid-cols-2 gap-4">
                       <input 
                         type="email" 
                         required
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="E-posta Adresi" 
                         className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100" 
                       />
                       <input 
                         type="tel" 
                         required
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                         placeholder="Telefon Numarası" 
                         className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100" 
                       />
                     </div>
                     <input 
                       type="text" 
                       value={region}
                       onChange={(e) => setRegion(e.target.value)}
                       placeholder="Hizmet Verilecek Bölge (Örn: İstanbul/Beylikdüzü)" 
                       className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100" 
                     />
                     <select 
                       value={category}
                       onChange={(e) => setCategory(e.target.value)}
                       className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100"
                     >
                         <option>Veteriner</option>
                         <option>Köpek Gezdirici</option>
                         <option>Pet Otelleri</option>
                         <option>Pet Kuaför</option>
                         <option>Petshoplar</option>
                     </select>
                     <button 
                       disabled={loading}
                       className="w-full bg-gradient-to-r from-[#FF5F6D] to-[#A259FF] text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg"
                     >
                        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        Başvuruyu Tamamla
                     </button>
                 </form>
               </>
             )}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({title, desc}: {title: string, desc: string}) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-3xl space-y-2">
      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}

function ServiceCard({title, icon}: {title: string, icon: React.ReactNode}) {
    return <div className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
        <h3 className="font-medium text-lg">{title}</h3>
    </div>
}
