
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePenerima } from '@/contexts/PenerimaContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { useToast } from '@/hooks/use-toast';
import { StatusPembagian } from '@/components/pembagian/StatusPembagian';
import { PembagianFilters } from '@/components/pembagian/PembagianFilters';
import { PembagianTable } from '@/components/pembagian/PembagianTable';

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
      title: "Berhasil",
      description: "Status penerima berhasil diupdate",
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
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">Pembagian Daging Kurban</h2>
        <p className="text-sm text-gray-600">Sistem Pembagian dan Tracking Penerimaan Daging - 2025</p>
      </div>
      
      <StatusPembagian
        sudahMenerima={sudahMenerima.length}
        totalPenerima={penerima.length}
        progressPercentage={progressPercentage}
      />

      <PembagianFilters
        filters={filters}
        setFilters={setFilters}
        onResetFilter={handleResetFilter}
        belumMenerimaCount={belumMenerima.length}
      />

      {/* Daftar Pembagian per RT */}
      {['01', '02', 'tambahan'].map(rt => {
        const belumMenerimaRt = groupedBelumMenerima[rt] || [];
        
        return (
          <PembagianTable
            key={rt}
            rt={rt}
            penerima={belumMenerimaRt}
            onSudahMenerima={handleSudahMenerima}
          />
        );
      })}

      {/* Tips */}
      <Card className="p-3 md:p-4 bg-blue-50">
        <p className="text-xs md:text-sm text-blue-700">
          💡 Tips: Klik tombol "🥩 Bagikan" setelah memberikan daging kepada penerima
        </p>
      </Card>
    </div>
  );
};

export default PembagianDaging;
