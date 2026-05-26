import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useAuth } from '@/contexts/AuthContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { useToast } from '@/hooks/use-toast';
import { StatusPembagian } from '@/components/pembagian/StatusPembagian';
import { PembagianFilters } from '@/components/pembagian/PembagianFilters';
import { PembagianTable } from '@/components/pembagian/PembagianTable';
import { QrScannerModal } from '@/components/pembagian/QrScannerModal';
import { Share2, Info, CheckCircle2, ClipboardCheck, QrCode, ScanLine } from 'lucide-react';

const PembagianDaging = () => {
  const { penerima, toggleSudahMenerima } = usePenerima();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    rt: '',
    search: ''
  });

  const handleSudahMenerima = (id: string) => {
    toggleSudahMenerima(id);
    toast({
      title: "Berhasil Diupdate",
      description: "Status penerimaan warga telah diperbarui",
    });
  };

  const handleResetFilter = () => {
    setFilters({ rt: '', search: '' });
  };

  const filteredPenerima = filterPenerima(penerima, filters);
  const belumMenerima = filteredPenerima.filter(p => !p.sudahMenerima);
  const sudahMenerima = penerima.filter(p => p.sudahMenerima);
  const groupedBelumMenerima = groupByRt(belumMenerima);
  
  const progressPercentage = penerima.length > 0 ? Math.round((sudahMenerima.length / penerima.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-green-600" />
            Monitoring Pembagian
          </h2>
          <p className="text-sm text-gray-500">
            Tracking real-time distribusi daging kurban untuk memastikan seluruh warga mendapatkan haknya.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
          <ClipboardCheck className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-700">Live Status</span>
        </div>
      </div>
      
      {/* Status Progress Area */}
      <div>
        <StatusPembagian
          sudahMenerima={sudahMenerima.length}
          totalPenerima={penerima.length}
          progressPercentage={progressPercentage}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters & Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 md:top-24 space-y-4">
            {isAuthenticated && (
              <Card className="p-6 rounded-xl shadow-md border border-green-200 bg-gradient-to-br from-green-50/60 to-emerald-50/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2.5 bg-green-100 text-green-700 rounded-lg">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-none">Scan Barcode / QR</h3>
                    <p className="text-[10px] text-gray-500 mt-1 leading-none">Opsional: Scan kartu untuk konfirmasi instan</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Gunakan kamera ponsel Anda untuk memindai QR Code di kartu penerima kurban secara langsung. Status akan otomatis diperbarui.
                </p>
                <Button 
                  onClick={() => setIsScannerOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ScanLine className="w-4 h-4 animate-pulse" />
                  Buka Kamera Scanner
                </Button>
              </Card>
            )}

            <Card className="p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Navigasi Antrian</h3>
              </div>
              <PembagianFilters
                filters={filters}
                setFilters={setFilters}
                onResetFilter={handleResetFilter}
                belumMenerimaCount={belumMenerima.length}
              />
            </Card>

            <Card className="p-6 rounded-xl bg-green-600 text-white shadow-sm border-none">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Instruksi Petugas</h4>
                </div>
                <p className="text-green-50 text-sm leading-relaxed">
                  Klik tombol "Konfirmasi Terima" pada setiap baris nama warga setelah daging diserahkan. Data otomatis berpindah ke laporan.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Tables Area */}
        <div className="lg:col-span-8 space-y-6">
          {['01', '02', 'tambahan', '00'].map((rt) => {
            const belumMenerimaRt = groupedBelumMenerima[rt] || [];
            if (belumMenerimaRt.length === 0 && (rt === 'tambahan' || rt === '00')) return null;
            return (
              <div key={rt}>
                <PembagianTable
                  rt={rt}
                  penerima={belumMenerimaRt}
                  onSudahMenerima={handleSudahMenerima}
                />
              </div>
            );
          })}
          
          {belumMenerima.length === 0 && (
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Alhamdulillah!</h3>
              <p className="text-gray-500 text-sm">Seluruh daging kurban telah berhasil didistribusikan.</p>
            </div>
          )}
        </div>
      </div>
      {isScannerOpen && (
        <QrScannerModal onClose={() => setIsScannerOpen(false)} />
      )}
    </div>
  );
};

export default PembagianDaging;
