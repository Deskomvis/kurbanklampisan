
import React from 'react';
import Card from '../components/Card';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';

const Dashboard = () => {
  const { penerima } = usePenerima();
  const { getTotalSapi, getTotalKambing } = useKelompokKurban();
  const { getTotalPengeluaran } = useKeuangan();
  
  const sudahMenerima = penerima.filter(p => p.sudahMenerima).length;
  const progressPercentage = penerima.length > 0 ? Math.round((sudahMenerima / penerima.length) * 100) : 0;
  
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Dashboard Kurban 2025</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Hewan Sapi" value={getTotalSapi().toString()} />
        <Card title="Hewan Kambing" value={getTotalKambing().toString()} />
        <Card title="Penerima Daging" value={penerima.length.toString()} />
        <Card title="Sudah Menerima" value={sudahMenerima.toString()} />
        <Card title="Total Pengeluaran" value={formatRupiah(getTotalPengeluaran())} />
        <Card title="Progress Pembagian" value={`${progressPercentage}%`} />
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        

        
      </div>
    </div>
  );
};

export default Dashboard;
