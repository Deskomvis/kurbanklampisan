
import React from 'react';
import { PanitiaHeader } from '@/components/panitia/PanitiaHeader';
import { PanitiaCard } from '@/components/panitia/PanitiaCard';
import { InformasiTambahan } from '@/components/panitia/InformasiTambahan';
import { panitiaData } from '@/data/panitiaData';

const Panitia = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Hasil Musyawarah Panitia Kecil</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <PanitiaHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {panitiaData.map((item, index) => (
            <PanitiaCard key={index} item={item} />
          ))}
        </div>
      </div>

      <InformasiTambahan />
    </div>
  );
};

export default Panitia;
