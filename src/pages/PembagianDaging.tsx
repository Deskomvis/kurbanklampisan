import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePenerima } from '@/contexts/PenerimaContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { useToast } from '@/hooks/use-toast';
import { StatusPembagian } from '@/components/pembagian/StatusPembagian';
import { PembagianFilters } from '@/components/pembagian/PembagianFilters';
import { PembagianTable } from '@/components/pembagian/PembagianTable';
import { Share2, Info, CheckCircle2, ClipboardCheck } from 'lucide-react';

const PembagianDaging = () => {
  const { penerima, toggleSudahMenerima } = usePenerima();
  const { toast } = useToast();
  
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Filters & Info Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-4">
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
        <div className="xl:col-span-8 space-y-6">
          {['01', '02', 'tambahan'].map((rt) => {
            const belumMenerimaRt = groupedBelumMenerima[rt] || [];
            
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
    </div>
  );
};

export default PembagianDaging;
