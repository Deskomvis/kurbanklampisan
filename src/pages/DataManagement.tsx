
import React from 'react';
import { ExportImportPanel } from '@/components/data/ExportImportPanel';
import { BackupPanel } from '@/components/data/BackupPanel';

const DataManagement = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">Manajemen Data</h2>
        <p className="text-sm text-gray-600">Export, Import, dan Backup Data Kurban 2025</p>
      </div>

      <ExportImportPanel />
      <BackupPanel />

      {/* Informasi */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-sm font-semibold text-blue-700 mb-2">ℹ️ Informasi</h3>
        <div className="space-y-2 text-xs text-blue-700">
          <p><strong>Export Data:</strong> Menyimpan semua data ke file JSON untuk backup eksternal</p>
          <p><strong>Import Data:</strong> Memuat data dari file JSON (akan menimpa data saat ini)</p>
          <p><strong>Save Backup:</strong> Menyimpan snapshot data saat ini ke history internal</p>
          <p><strong>Load Backup:</strong> Memuat data dari history backup yang tersimpan</p>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
