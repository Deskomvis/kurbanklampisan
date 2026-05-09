import React from 'react';
import { ExportImportPanel } from '@/components/data/ExportImportPanel';
import { BackupPanel } from '@/components/data/BackupPanel';
import { PrintReportsPanel } from '@/components/data/PrintReportsPanel';
import { Database, Zap, ShieldCheck, Info, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useYear } from '@/contexts/YearContext';

const DataManagement = () => {
  const { currentYear } = useYear();
  const hijriahYear = parseInt(currentYear) - 579;
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Database className="w-8 h-8 text-green-600" />
            Manajemen Sistem
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Export, Import, Backup Data, dan konfigurasi cetak laporan kurban {hijriahYear} H / {currentYear} M.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-700">Protected Mode</span>
        </div>
      </div>

      {/* Mode Kolaboratif Notice */}
      <Card className="p-6 rounded-xl bg-green-600 text-white shadow-sm border-none relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm hidden md:block">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Mode Kolaboratif Real-time Aktif</h3>
              <p className="text-green-50 text-sm">Sinkronisasi data antar perangkat berjalan secara otomatis setiap 10 detik.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-3 py-2 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Sync: On
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-3 py-2 rounded-lg border border-white/10">
                <Share2 className="w-3.5 h-3.5" />
                Auto-Broadcast Active
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Reporting & Print</h3>
          </div>
          <PrintReportsPanel />
          
          <div className="flex items-center gap-3 pt-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Database className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Storage & Backup</h3>
          </div>
          <BackupPanel />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Share2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Data Exchange</h3>
          </div>
          <ExportImportPanel />

          <Card className="p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Panduan Kolaborasi</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Save Manual', desc: 'Klik untuk memaksa pembaruan data ke semua user dalam antrian 10 detik.' },
                { label: 'Auto-sync', desc: 'Aplikasi memuat data terbaru secara periodik tanpa perlu refresh halaman.' },
                { label: 'External Backup', desc: 'Gunakan Export JSON untuk mengamankan data di luar server utama.' }
              ].map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{tip.label}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
