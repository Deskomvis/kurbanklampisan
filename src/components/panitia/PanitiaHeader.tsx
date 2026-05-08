import React from 'react';
import { MapPin, Calendar, Scroll } from 'lucide-react';

export const PanitiaHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 pb-10 border-b border-gray-100">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
          <Scroll className="w-3 h-3" />
          Berita Acara Musyawarah
        </div>
        <h3 className="text-3xl font-black text-gray-900 tracking-tight max-w-2xl mx-auto leading-tight">
          Panitia Hari Raya Idul Adha 1447 H & Penyembelihan Hewan Kurban
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu Sidang</p>
            <p className="text-sm font-bold text-gray-900">Sabtu, 24 Mei 2026</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sekretariat</p>
            <p className="text-sm font-bold text-gray-900">Masjid Istiqomah Klampisan</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
            <Scroll className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Legalitas</p>
            <p className="text-sm font-bold text-gray-900">Pengurus Ta'mir Masjid</p>
          </div>
        </div>
      </div>
    </div>
  );
};
