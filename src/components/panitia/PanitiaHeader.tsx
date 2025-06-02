
import React from 'react';

export const PanitiaHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h3 className="text-lg font-semibold text-green-700 mb-2">
        HASIL MUSYAWARAH PANITIA KECIL
      </h3>
      <div className="text-sm text-gray-600 space-y-1">
        <div>PADA HARI SABTU, 24 Mei 2025</div>
        <div>PENGURUS MASJID ISTIQOMAH KLAMPISAN</div>
        <div>KEL. KALIANCAR, KEC. SELOGIRI, KAB. WONOGIRI</div>
        <div>Alamat : Jl. Klampisan, Kec. Selogiri, Kab. Wonogiri</div>
      </div>
      <div className="mt-4 pt-4 border-t-2 border-gray-300">
        <h4 className="font-semibold text-green-700">
          PANITIA HARI RAYA IDUL ADHA 1446 H / 2025 M
        </h4>
        <h4 className="font-semibold text-green-700">
          DAN PENYEMBELIHAN HEWAN QURBAN
        </h4>
      </div>
    </div>
  );
};
