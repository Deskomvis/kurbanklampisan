
import React from 'react';
import { ExportImportPanel } from '@/components/data/ExportImportPanel';
import { BackupPanel } from '@/components/data/BackupPanel';
import { PrintReportsPanel } from '@/components/data/PrintReportsPanel';

const DataManagement = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">Manajemen Data</h2>
        <p className="text-sm text-gray-600">Export, Import, Backup Data, dan Cetak Laporan Kurban 2025</p>
      </div>

      {/* Mode Kolaboratif Notice */}
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
        <h3 className="text-sm font-semibold text-green-700 mb-2">🤝 Mode Kolaboratif Aktif</h3>
        <div className="space-y-2 text-xs text-green-700">
          <p><strong>Semua user melihat data yang sama:</strong> Data terbaru dari server dimuat otomatis saat aplikasi dibuka</p>
          <p><strong>Untuk berbagi perubahan:</strong> Klik "Save Manual" agar semua user lain bisa melihat data terbaru Anda</p>
          <p><strong>Kolaborasi real-time:</strong> Setiap user dapat mengedit dan menyimpan data untuk dibagikan</p>
        </div>
      </div>

      <PrintReportsPanel />
      <ExportImportPanel />
      <BackupPanel />

      {/* Informasi */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-sm font-semibold text-blue-700 mb-2">ℹ️ Panduan Kolaborasi</h3>
        <div className="space-y-2 text-xs text-blue-700">
          <p><strong>Save Manual:</strong> Simpan data saat ini agar bisa diakses semua user</p>
          <p><strong>Load Backup:</strong> Muat data backup tertentu untuk semua user</p>
          <p><strong>Export Data:</strong> Unduh data saat ini ke file JSON untuk backup eksternal</p>
          <p><strong>Import Data:</strong> Muat data dari file JSON dan bagikan ke semua user</p>
          <p><strong>Tip:</strong> Refresh halaman untuk memuat data terbaru dari server</p>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
