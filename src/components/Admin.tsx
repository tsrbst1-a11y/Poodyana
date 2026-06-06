import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { SiteConfig, Application } from '../types';
import { Save, Check, X, RefreshCw, LogIn, LayoutDashboard, FileText, Settings, Image as ImageIcon, Mail, Lock, Menu } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'applications'>('config');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [config, setConfig] = useState<SiteConfig>({
    logoUrl: '',
    heroTitle: '',
    heroDescription: '',
    googlePlayLink: '',
    appStoreLink: ''
  });
  
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        if (u.email === 'admin@poody.com' || u.email === 'serbesttayfun3@gmail.com') {
          setIsAdmin(true);
          fetchData();
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', u.uid));
            if (adminDoc.exists()) {
              setIsAdmin(true);
              fetchData();
            } else {
              setIsAdmin(false);
            }
          } catch (err) {
            console.warn("User is not an admin or permission denied.");
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const configDoc = await getDoc(doc(db, 'configs', 'main'));
      if (configDoc.exists()) {
        setConfig(configDoc.data() as SiteConfig);
      }

      const appsSnapshot = await getDocs(query(collection(db, 'applications'), orderBy('createdAt', 'desc')));
      const apps = appsSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Application));
      setApplications(apps);
    } catch (err: any) {
      console.error("Error fetching admin data:", err);
      // If it's a permission error, we should probably tell the user why
      if (err.code === 'permission-denied') {
        alert("Veri çekme yetkisi reddedildi. Firestore kurallarını kontrol edin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const seedSampleApplication = async () => {
    try {
      await addDoc(collection(db, 'applications'), {
        businessName: 'Örnek Veteriner Kliniği',
        contactName: 'Ahmet Yılmaz',
        email: 'ahmet@ornek.com',
        phone: '05551234567',
        region: 'İstanbul/Kadıköy',
        category: 'Veteriner',
        status: 'pending',
        createdAt: serverTimestamp()
      });
      fetchData();
    } catch (err) {
      console.error("Seed failed:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error("Login attempt failed:", err);
      
      // If it's the requested admin account, try to create it if login fails
      if (email === 'admin@poody.com' && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
        try {
          const { createUserWithEmailAndPassword } = await import('firebase/auth');
          await createUserWithEmailAndPassword(auth, email, password);
          alert("Admin hesabı ilk kez oluşturuldu ve giriş yapıldı.");
        } catch (createErr: any) {
          console.error("Auto-create failed:", createErr);
          if (createErr.code === 'auth/email-already-in-use') {
             alert("Şifre hatalı. Lütfen doğru şifreyi girin.");
          } else {
             alert("Giriş başarısız: " + createErr.message);
          }
        }
      } else {
        alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'configs', 'main'), {
        ...config,
        updatedAt: serverTimestamp()
      });
      alert('Ayarlar başarıyla kaydedildi!');
    } catch (err) {
      console.error("Save config failed:", err);
      alert('Kaydedilirken hata oluştu. Yetkiniz olmayabilir.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppStatus = async (appId: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'applications', appId), { status });
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  // Main component logic
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Girişi</h1>
            <p className="text-sm text-gray-500">Panel erişimi için yönetici bilgilerini girin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase px-1">E-Posta</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@poody.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase px-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {authLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              Giriş Yap
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
          <X className="w-16 h-16 text-rose-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Yetkisiz Erişim</h1>
          <p className="text-gray-500">Bu sayfayı görmeye yetkiniz yok. Admin listesinde olmanız gerekiyor.</p>
          <button 
            onClick={() => auth.signOut()}
            className="w-full py-3 text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row relative">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900">Poody Admin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col p-6 space-y-8 z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900">Poody Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => { setActiveTab('config'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'config' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            Site Ayarları
          </button>
          <button 
            onClick={() => { setActiveTab('applications'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'applications' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            Başvurular
          </button>
        </nav>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 mb-4">
            {user.photoURL ? (
              <img src={user.photoURL} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-900 truncate">{user.displayName || 'Yönetici'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => auth.signOut()}
            className="w-full py-2 text-sm text-rose-600 font-medium hover:bg-rose-50 rounded-lg transition-all"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-10 overflow-y-auto">
        {activeTab === 'config' ? (
          <div className="max-w-3xl space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Site Ayarları</h2>
                <p className="text-sm text-gray-500">Görsel ve metin içeriklerini yönetin.</p>
              </div>
              <button 
                onClick={handleSaveConfig}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Kaydet
              </button>
            </header>

            <div className="grid gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                  <ImageIcon className="w-5 h-5" />
                  Görsel Ayarları
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Logo URL</label>
                  <input 
                    type="text" 
                    value={config.logoUrl}
                    onChange={(e) => setConfig({...config, logoUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                  {config.logoUrl && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 inline-block">
                      <img src={config.logoUrl} alt="Logo Preview" className="h-10 w-auto object-contain" />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                  <FileText className="w-5 h-5" />
                  Hero Metinleri
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Başlık (Hero Title)</label>
                    <input 
                      type="text" 
                      value={config.heroTitle}
                      onChange={(e) => setConfig({...config, heroTitle: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Açıklama (Hero Description)</label>
                    <textarea 
                      rows={3}
                      value={config.heroDescription}
                      onChange={(e) => setConfig({...config, heroDescription: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                  <LayoutDashboard className="w-5 h-5" />
                  Linkler
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Google Play Linki</label>
                    <input 
                      type="text" 
                      value={config.googlePlayLink}
                      onChange={(e) => setConfig({...config, googlePlayLink: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">App Store Linki</label>
                    <input 
                      type="text" 
                      value={config.appStoreLink}
                      onChange={(e) => setConfig({...config, appStoreLink: e.target.value})}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <header>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Başvurular</h2>
              <p className="text-sm text-gray-500">İşletmelerden gelen başvuru taleplerini yönetin.</p>
            </header>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-4 sm:px-6 py-4 text-xs font-bold text-gray-400 uppercase whitespace-nowrap">İşletme Adı</th>
                      <th className="px-4 sm:px-6 py-4 text-xs font-bold text-gray-400 uppercase whitespace-nowrap">Yetkili</th>
                      <th className="px-4 sm:px-6 py-4 text-xs font-bold text-gray-400 uppercase whitespace-nowrap">İletişim</th>
                      <th className="px-4 sm:px-6 py-4 text-xs font-bold text-gray-400 uppercase whitespace-nowrap">Durum</th>
                      <th className="px-4 sm:px-6 py-4 text-xs font-bold text-gray-400 uppercase whitespace-nowrap text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <p className="text-gray-500 mb-4">Henüz başvuru bulunmuyor.</p>
                          <button 
                            onClick={seedSampleApplication}
                            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                          >
                            Örnek Başvuru Oluştur
                          </button>
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors text-sm">
                          <td className="px-4 sm:px-6 py-4">
                            <p className="font-bold text-gray-900 whitespace-nowrap">{app.businessName}</p>
                            <p className="text-[10px] text-indigo-500 font-bold uppercase">{app.category}</p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="font-medium text-gray-900 whitespace-nowrap">{app.contactName}</p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">{app.region}</p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="text-gray-900 whitespace-nowrap">{app.email}</p>
                            <p className="text-gray-500 whitespace-nowrap">{app.phone}</p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                              app.status === 'approved' ? 'bg-green-100 text-green-600' :
                              app.status === 'rejected' ? 'bg-rose-100 text-rose-600' :
                              'bg-amber-100 text-amber-600'
                            }`}>
                              {app.status === 'approved' ? 'Onaylandı' : app.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {app.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleUpdateAppStatus(app.id, 'approved')}
                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all"
                                    title="Onayla"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                                    className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all"
                                    title="Reddet"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
