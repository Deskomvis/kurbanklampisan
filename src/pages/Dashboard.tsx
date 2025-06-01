
import React from 'react';
import Card from '../components/Card';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Dashboard Kurban 2025</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Hewan Sapi" value="0" />
        <Card title="Hewan Kambing" value="0" />
        <Card title="Penerima Daging" value="0" />
        <Card title="Sudah Menerima" value="0" />
        <Card title="Total Biaya" value="Rp 0,00" />
        <Card title="Progress Pembagian" value="0%" />
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            📅 Jadwal Kegiatan 2025
          </h3>
          <div className="space-y-3 text-sm">
            <div><strong>Sholat Idul Adha:</strong> Jumat, 06 Juni 2025</div>
            <div><strong>Kerja Bhakti:</strong> Minggu, 01 Juni 2025</div>
            <div><strong>Imam/Khotib:</strong> Ust. Syukur Prihantoro Al Hafid</div>
            <div><strong>Tempat:</strong> Masjid Istiqomah Klampisan</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            📊 Data Tahun 2024 (Referensi)
          </h3>
          <div className="space-y-3 text-sm">
            <div><strong>Hewan Sapi:</strong> 6 ekor</div>
            <div><strong>Hewan Kambing:</strong> 18 ekor</div>
            <div><strong>Kelompok Sapi:</strong> 6 kelompok (42 peserta)</div>
            <div><strong>Total Penerima:</strong> 320 orang</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
