import React from 'react';
import { PanitiaHeader } from '@/components/panitia/PanitiaHeader';
import { PanitiaCard } from '@/components/panitia/PanitiaCard';
import { InformasiTambahan } from '@/components/panitia/InformasiTambahan';
import { panitiaData } from '@/data/panitiaData';
import { Users, Gavel, FileCheck } from 'lucide-react';

const Panitia = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Struktur Panitia
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Hasil musyawarah dan penunjukan tim pelaksana kurban Masjid Istiqomah Klampisan.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
          <Gavel className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-700">Keputusan Musyawarah</span>
        </div>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-8">
          <PanitiaHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {panitiaData.map((item, index) => (
              <div key={index}>
                <PanitiaCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileCheck className="w-5 h-5 text-green-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Klausul & Informasi</h3>
        </div>
        <InformasiTambahan />
      </div>
    </div>
  );
};

export default Panitia;
