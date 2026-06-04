import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ShieldCheck, Plus, Search, Filter, RefreshCw, PawPrint, Heart, Info, X } from 'lucide-react';
import { Pet } from '../types';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal for adding a pet
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetAge, setNewPetAge] = useState('');
  const [newPetStatus, setNewPetStatus] = useState<'playing' | 'walking' | 'resting' | 'active'>('playing');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  const predefinedImages = [
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200", // Jack Russel
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200", // Golden
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=200", // Pug
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200", // Cat British
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=200"  // Cat Black
  ];

  // Fetch pets with stable state guarding to prevent infinite re-renders
  const fetchPets = () => {
    setLoading(true);
    fetch('/api/pets')
      .then((res) => {
        if (!res.ok) throw new Error('Sunucu hatası oluştu');
        return res.json();
      })
      .then((data: Pet[]) => {
        setPets(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Pets fetch failed', err);
        setError('Evcil hayvan verileri yüklenemedi.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPets();
  }, []); // Only runs on component mount

  const handleAddPetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const requestData = {
      pet_name: newPetName,
      pet_image_url: predefinedImages[selectedImgIdx],
      breed: newPetBreed || "Karışık Klasik",
      age: newPetAge || "1 Yaş",
      status: newPetStatus,
      owner_name: "Siz",
    };

    fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Kayıt oluşturulamadı');
        return res.json();
      })
      .then((addedPet: Pet) => {
        // Safe functional update to prevent re-renders
        setPets((prev) => [...prev, addedPet]);
        
        // Reset form states
        setNewPetName('');
        setNewPetBreed('');
        setNewPetAge('');
        setShowAddForm(false);
      })
      .catch((err) => {
        alert('Hayvan kaydedilemedi: ' + err.message);
      });
  };

  // Filtered lists
  const filteredPets = pets.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch = p.pet_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Pati Camiasına Katılın!
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-6xl tracking-tight text-gray-900 leading-tight">
              Patili Dostunun Sosyal Dünyası Şimdi Haritada!
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Poody ile çevrendeki patileri keşfet, yeni oyun arkadaşları bul, canlı rota takibiyle güvenli yürüyüşler yap ve ekosistemdeki en iyi pet hizmetlerine anında ulaş.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#map-section" className="bg-gradient-to-r from-[#FF5F6D] to-[#A259FF] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-95 transition-opacity inline-flex items-center gap-2">
                Pati Radarını Keşfet
                <Navigation className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setShowAddForm(true)} 
                className="bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                Kendi Patini Ekle
                <Plus className="w-4 h-4 text-[#A259FF]" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-3xl -z-10 blur-xl opacity-70" />
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" 
              alt="Poody Harita Dostlar" 
              className="w-full h-[400px] object-cover rounded-3xl shadow-sm border border-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Pati Radarı Interactive Section */}
      <section id="map-section" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <h2 className="font-display font-semibold text-3xl text-gray-900">Canlı Pati Radarı</h2>
            <p className="text-gray-500 mt-1">Platformumuzdaki evcil hayvanların anlık lokasyon simülasyonu ve profil kartları</p>
          </div>
          <button 
            onClick={fetchPets}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls, Searches and Left Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Find Search Panel */}
            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Arama ve Filtreleme</h3>
              
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="İsim veya cins ara..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 text-sm border-0 focus:ring-1 focus:ring-indigo-100 rounded-2xl text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase block">Durum</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tümü' },
                    { id: 'playing', label: '🎾 Oyunda', color: 'bg-green-500' },
                    { id: 'walking', label: '🦮 Yürüyüşte', color: 'bg-blue-500' },
                    { id: 'resting', label: '😴 Dinleniyor', color: 'bg-yellow-500' },
                    { id: 'active', label: '⚡️Aktif', color: 'bg-indigo-500' }
                  ].map((statusBtn) => (
                    <button
                      key={statusBtn.id}
                      onClick={() => setFilterStatus(statusBtn.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        filterStatus === statusBtn.id 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {statusBtn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* "Patilerim" Dashboard List */}
            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900">Patilerim</h3>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-xs font-semibold text-gray-600">
                  {filteredPets.length} Toplam
                </span>
              </div>

              {loading ? (
                <div className="py-8 text-center text-sm text-gray-400">Yükleniyor...</div>
              ) : error ? (
                <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl">{error}</div>
              ) : filteredPets.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-400">Aranan kriterde bir pati bulunamadı.</div>
              ) : (
                <div className="flex flex-wrap gap-4 py-2">
                  {/* Dynamic map iteration for Patilerim list avatar circles */}
                  {filteredPets.map((pet) => {
                    return (
                      <div 
                        key={pet.id} 
                        onClick={() => setSelectedPet(pet)}
                        className="flex flex-col items-center gap-1 cursor-pointer group text-center"
                        style={{ width: '70px' }}
                      >
                        {/* Circle Avatar Frame (Strictly dynamic pet_image_url) */}
                        <div className={`w-14 h-14 rounded-full border-2 p-0.5 transition-all ${
                          selectedPet?.id === pet.id 
                            ? 'border-[#FF5F6D] bg-[#FF5F6D]/10 scale-105' 
                            : 'border-transparent bg-gray-50 hover:border-gray-300'
                        }`}>
                          <img 
                            src={pet.pet_image_url} 
                            alt={pet.pet_name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full bg-gray-100"
                          />
                        </div>
                        {/* Mandatory Pet Name rendering as small, readable text right beneath the dynamic avatar circle */}
                        <span className="text-xs font-medium text-gray-700 truncate w-full">
                          {pet.pet_name}
                        </span>
                        {/* Dynamic category dot */}
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          pet.status === 'playing' ? 'bg-green-500' :
                          pet.status === 'walking' ? 'bg-blue-500' :
                          pet.status === 'resting' ? 'bg-yellow-500' : 'bg-indigo-500'
                        }`} />
                      </div>
                    );
                  })}
                </div>
              )}

              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4 text-[#A259FF]" />
                Yeni Pati Ekle
              </button>
            </div>
          </div>

          {/* Interactive Flat Matte Pastel simulated map */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-xs font-semibold rounded-xl text-gray-800 shadow-sm border border-gray-100 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Bölge: İstanbul / Fatih Parkı
                </span>
              </div>

              {/* Clean matte light pastel map board */}
              <div className="h-[450px] rounded-2xl bg-gradient-to-br from-[#E2EAF4] via-[#E8F0F2] to-[#E3EBE4] relative overflow-hidden border border-gray-100 flex items-center justify-center">
                
                {/* Simulated Street Grids & Park boundaries. Very flat design, no gradients/filters to ensure smooth animation */}
                <div className="absolute inset-0 opacity-40 pointers-events-none">
                  <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Simulated Local Park - Matte Green Pastels */}
                <div className="absolute top-1/4 left-1/4 w-[280px] h-[180px] bg-[#D7ECD9] rounded-full border border-white/40 opacity-70 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#88A98C] uppercase tracking-wider">Köpek Koşu Parkı</span>
                </div>

                {/* Simulated Pond - Matte Soft Blue */}
                <div className="absolute bottom-12 right-24 w-[160px] h-[120px] bg-[#DEF3F6] rounded-[40%] border border-white/40 opacity-80 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#79B4BF] uppercase tracking-wider">Pati Gölü</span>
                </div>

                {/* Pathways */}
                <div className="absolute w-full h-8 bg-[#EFEEEC] rotate-12 top-1/3 left-0 opacity-80 border-t border-b border-white" />
                <div className="absolute h-full w-8 bg-[#EFEEEC] -rotate-45 left-1/3 top-0 opacity-80 border-l border-r border-white" />

                {/* Simulated Pet Avatars floating dynamically on absolute coordinates translated into map positions */}
                {filteredPets.map((pet, idx) => {
                  // Normalize coordinate positions inside the simulated container
                  const normalizedX = 15 + ((pet.longitude - 28.95) / 0.05) * 70;
                  const normalizedY = 15 + (1 - (pet.latitude - 41.0) / 0.03) * 70;

                  return (
                    <motion.div
                      key={pet.id}
                      style={{ 
                        left: `${Math.min(Math.max(normalizedX, 5), 90)}%`, 
                        top: `${Math.min(Math.max(normalizedY, 5), 85)}%` 
                      }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedPet(pet)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center"
                    >
                      {/* Anchor pin point with dynamic image inside */}
                      <div className="relative">
                        {/* Status ring */}
                        <div className={`absolute -inset-1 rounded-full animate-ping ${
                          pet.status === 'playing' ? 'bg-green-400' :
                          pet.status === 'walking' ? 'bg-blue-400' :
                          pet.status === 'resting' ? 'bg-yellow-400' : 'bg-indigo-400'
                        } opacity-40`} />

                        {/* Flat Matte Avatar container */}
                        <div className={`w-11 h-11 rounded-full border-2 shadow-sm relative z-10 overflow-hidden ${
                          selectedPet?.id === pet.id ? 'border-red-500 scale-110' : 'border-white'
                        }`}>
                          <img 
                            src={pet.pet_image_url} 
                            alt={pet.pet_name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Miniature badge */}
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center text-[7px] text-white ${
                          pet.status === 'playing' ? 'bg-green-500' :
                          pet.status === 'walking' ? 'bg-blue-500' :
                          pet.status === 'resting' ? 'bg-yellow-500' : 'bg-indigo-500'
                        }`}>
                          {pet.status === 'playing' ? '🎾' :
                           pet.status === 'walking' ? '🦮' :
                           pet.status === 'resting' ? '😴' : '⚡️'}
                        </span>
                      </div>

                      {/* Small dynamic name tooltip with white backdrop to make it highly legible on pastel screens */}
                      <span className="mt-1 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-800 shadow-sm border border-gray-100 whitespace-nowrap">
                        {pet.pet_name}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Center marker or explanation when no selection */}
                {!selectedPet && (
                  <div className="absolute bottom-6 right-6 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-sm border border-gray-100 text-xs font-medium max-w-sm">
                    💡 <span className="font-semibold text-gray-800">İpucu:</span> Harita üzerindeki evcil hayvanlara tıklayarak profil detaylarını eşzamanlı izleyebilirsiniz.
                  </div>
                )}
              </div>
            </div>

            {/* Expanded Active Profile view - No placeholder mapping. Clean Matte Styling */}
            <AnimatePresence mode="wait">
              {selectedPet && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm relative overflow-hidden"
                >
                  <button 
                    onClick={() => setSelectedPet(null)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <img 
                      src={selectedPet.pet_image_url} 
                      alt={selectedPet.pet_name} 
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl bg-gray-50 border"
                    />
                    
                    <div className="space-y-3 flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                        <h4 className="text-2xl font-bold text-gray-900">{selectedPet.pet_name}</h4>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {selectedPet.breed}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto sm:mx-0 text-sm">
                        <div className="bg-gray-50 p-2.5 rounded-xl">
                          <span className="text-xs text-gray-400 block font-medium">Yaş / Dönem</span>
                          <span className="font-semibold text-gray-800">{selectedPet.age}</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl">
                          <span className="text-xs text-gray-400 block font-medium">Sahibi</span>
                          <span className="font-semibold text-gray-800">{selectedPet.owner_name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-center sm:justify-start pt-2">
                        <span className={`w-3 h-3 rounded-full ${
                          selectedPet.status === 'playing' ? 'bg-green-500 animate-pulse' :
                          selectedPet.status === 'walking' ? 'bg-blue-500 animate-pulse' :
                          selectedPet.status === 'resting' ? 'bg-yellow-500' : 'bg-indigo-500 animate-pulse'
                        }`} />
                        <span className="text-sm font-medium text-gray-600">
                          {selectedPet.status === 'playing' ? 'Şu an enerjik biçimde parkta oyunda' :
                           selectedPet.status === 'walking' ? 'Rotada sakin bir gezintide' :
                           selectedPet.status === 'resting' ? 'Evinde konforla dinlenmeye çekildi' : 'Ekosistemde aktif durumda'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Dynamic Popover Modal for Adding a Pet */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative border border-gray-100"
            >
              <button 
                onClick={() => setShowAddForm(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5F6D] to-[#A259FF] flex items-center justify-center">
                  <PawPrint className="text-white w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-gray-900">Evcil Hayvan Kaydet</h3>
              </div>

              <form onSubmit={handleAddPetSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Patinin Adı *</label>
                  <input 
                    type="text" 
                    required
                    value={newPetName} 
                    onChange={(e) => setNewPetName(e.target.value)}
                    placeholder="Örn: Pamuk, Şila" 
                    className="w-full p-3.5 bg-gray-50 text-sm border-0 focus:ring-1 focus:ring-indigo-100 rounded-xl text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Irk / Cins</label>
                    <input 
                      type="text" 
                      value={newPetBreed} 
                      onChange={(e) => setNewPetBreed(e.target.value)}
                      placeholder="Örn: Golden Retriever" 
                      className="w-full p-3.5 bg-gray-50 text-sm border-0 focus:ring-1 focus:ring-indigo-100 rounded-xl text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Yaş Bilgisi</label>
                    <input 
                      type="text" 
                      value={newPetAge} 
                      onChange={(e) => setNewPetAge(e.target.value)}
                      placeholder="Örn: 2 Yaşında" 
                      className="w-full p-3.5 bg-gray-50 text-sm border-0 focus:ring-1 focus:ring-indigo-100 rounded-xl text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Avatar Resmi Seçin</label>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1">
                    {predefinedImages.map((img, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedImgIdx(idx)}
                        className={`w-14 h-14 rounded-full flex-shrink-0 cursor-pointer border-2 transition-all duration-250 ${
                          selectedImgIdx === idx ? 'border-[#FF5F6D] ring-2 ring-pink-100 scale-105' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt="Predefined Avatar" 
                          className="w-full h-full object-cover rounded-full" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Radar Durumu</label>
                  <select 
                    value={newPetStatus}
                    onChange={(e: any) => setNewPetStatus(e.target.value)}
                    className="w-full p-3.5 bg-gray-50 text-sm border-0 focus:ring-1 focus:ring-indigo-100 rounded-xl text-gray-900"
                  >
                    <option value="playing">🎾 Oyunda (Parkta)</option>
                    <option value="walking">🦮 Yürüyüşte (Yolda)</option>
                    <option value="resting">😴 Dinleniyor (Evde)</option>
                    <option value="active">⚡ Aktif</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3.5 text-sm font-semibold text-gray-500 hover:text-gray-700 bg-gray-50 border hover:bg-gray-100 rounded-xl"
                  >
                    Vazgeç
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#FF5F6D] to-[#A259FF] hover:opacity-95 rounded-xl shadow-lg shadow-purple-100"
                  >
                    Radar Kaydı Yap
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
