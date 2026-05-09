import React from 'react';
import KelompokSapiForm from '../components/kelompok/KelompokSapiForm';
import KurbanKambingForm from '../components/kelompok/KurbanKambingForm';
import KelompokSapiTable from '../components/kelompok/KelompokSapiTable';
import KurbanKambingTable from '../components/kelompok/KurbanKambingTable';
import { Calendar, Beef, PawPrint } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useYear } from '@/contexts/YearContext';

const KelompokKurban = () => {
  const { isAuthenticated } = useAuth();
  const { currentYear } = useYear();
  const hijriahYear = parseInt(currentYear) - 579;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-green-600" />
            Kelompok Sapi & Kambing
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Manajemen kelompok kurban sapi dan pendaftaran kurban kambing periode {hijriahYear} H / {currentYear} M.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">Tahun {currentYear}</span>
        </div>
      </div>
      
      {/* Forms Area — only for authenticated users */}
      {isAuthenticated && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Beef className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Formulir Kelompok Sapi</h3>
            </div>
            <KelompokSapiForm />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <PawPrint className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Pendaftaran Kambing</h3>
            </div>
            <KurbanKambingForm />
          </div>
        </div>
      )}

      {/* Tables Area */}
      <div className="space-y-8 pt-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Beef className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Daftar Kelompok Sapi</h3>
          </div>
          <KelompokSapiTable />
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <PawPrint className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Daftar Kurban Kambing</h3>
          </div>
          <KurbanKambingTable />
        </div>
      </div>
    </div>
  );
};

export default KelompokKurban;
