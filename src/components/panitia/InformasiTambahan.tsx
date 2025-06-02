
import React from 'react';

export const InformasiTambahan: React.FC = () => {
  return (
    <>
      {/* Informasi Tambahan */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-700 mb-2">Pelaksanaan Sholat Idul Adha</h4>
        <div className="text-sm text-blue-600 space-y-1">
          <div><strong>Tanggal:</strong> Jumat, 06 Juni 2025</div>
          <div><strong>Imam/Khotib:</strong> Ust. Syukur Prihantoro Al Hafid</div>
          <div><strong>Bilal:</strong> Sdr. Moch Al Fatih</div>
          <div><strong>Laporan Hasil Qurban:</strong> Ust. Andika</div>
          <div><strong>Kotak Infaq:</strong> Penanggung jawab - Sdr. Nindi (Ketua TPQ), Sdr. Anisa (Penasehat TPQ)</div>
          <div><strong>Pelaksana:</strong> TPQ dan Remaja Masjid</div>
        </div>
      </div>

      {/* Malam Takbiran */}
      <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
        <h4 className="font-semibold text-amber-700 mb-2">Malam Takbiran</h4>
        <div className="text-sm text-amber-600 space-y-1">
          <div><strong>Penanggung jawab:</strong> Ust Syukur Prihantoro Al Hafid, Ust. Reza (Pondok)</div>
          <div><strong>Pelaksana:</strong> Bp. Warto, Ust. Andika, Moch Al Fatih, Remaja Masjid dan TPQ</div>
        </div>
      </div>

      {/* Konsumsi */}
      <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
        <h4 className="font-semibold text-emerald-700 mb-2">Konsumsi Malam Takbiran dan Penyembelihan Hewan Qurban</h4>
        <div className="text-sm text-emerald-600">
          <div><strong>Tempat:</strong> Ibu-Ibu warga Klampisan dan Remas - Area Gedung TPQ</div>
        </div>
      </div>

      {/* Tanda Tangan */}
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <div className="text-sm text-gray-600 mb-2">Ketua Takmir Masjid</div>
        <div className="font-semibold text-gray-800 text-lg">H. Hilman Suyatman</div>
      </div>
    </>
  );
};
