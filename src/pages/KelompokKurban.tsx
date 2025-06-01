
import React from 'react';
import KelompokSapiForm from '../components/kelompok/KelompokSapiForm';
import KurbanKambingForm from '../components/kelompok/KurbanKambingForm';
import KelompokSapiTable from '../components/kelompok/KelompokSapiTable';
import KurbanKambingTable from '../components/kelompok/KurbanKambingTable';

const KelompokKurban = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Kelompok Kurban 2025</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KelompokSapiForm />
        <KurbanKambingForm />
      </div>

      <div className="space-y-4">
        <KelompokSapiTable />
        <KurbanKambingTable />
      </div>
    </div>
  );
};

export default KelompokKurban;
