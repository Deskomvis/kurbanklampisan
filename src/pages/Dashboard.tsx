
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
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">Dashboard Kurban 2025</h2>
        <p className="text-sm text-gray-600">Ringkasan data dan statistik kurban</p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card title="Hewan Sapi" value={getTotalSapi().toString()} />
        <Card title="Hewan Kambing" value={getTotalKambing().toString()} />
        <Card title="Penerima Daging" value={penerima.length.toString()} />
        <Card title="Sudah Menerima" value={sudahMenerima.toString()} />
        <Card title="Total Pengeluaran" value={formatRupiah(getTotalPengeluaran())} />
        <Card title="Progress Pembagian" value={`${progressPercentage}%`} />
      </div>

      {/* Quick Actions or Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 md:p-6 rounded-lg border-l-4 border-green-500">
          <h3 className="text-base md:text-lg font-semibold text-green-700 mb-2">Status Pembagian</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sudah Menerima:</span>
              <span className="font-semibold text-green-600">{sudahMenerima} orang</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Belum Menerima:</span>
              <span className="font-semibold text-orange-600">{penerima.length - sudahMenerima} orang</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-base md:text-lg font-semibold text-blue-700 mb-2">Ringkasan Hewan</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Sapi:</span>
              <span className="font-semibold text-blue-600">{getTotalSapi()} ekor</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Kambing:</span>
              <span className="font-semibold text-blue-600">{getTotalKambing()} ekor</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-blue-700 pt-2 border-t border-blue-200">
              <span>Total Hewan:</span>
              <span>{getTotalSapi() + getTotalKambing()} ekor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
