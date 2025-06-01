
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const KelompokKurban = () => {
  const [kelompokSapi, setKelompokSapi] = useState('');
  const [anggotaSapi, setAnggotaSapi] = useState('');
  const [pemilikKambing, setPemilikKambing] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Kelompok Kurban 2025</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tambah Kelompok Sapi */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            🐄 Tambah Kelompok Sapi
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NOMOR KELOMPOK:
              </label>
              <Input
                type="text"
                value={kelompokSapi}
                onChange={(e) => setKelompokSapi(e.target.value)}
                placeholder="1"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anggota Kelompok:
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={anggotaSapi}
                  onChange={(e) => setAnggotaSapi(e.target.value)}
                  placeholder="Nama anggota 1"
                  className="flex-1"
                />
                <Button variant="destructive" size="sm">
                  ×
                </Button>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" className="bg-gray-500 hover:bg-gray-600 text-white">
                  + Tambah Anggota
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  💾 Simpan Kelompok
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Tambah Kurban Kambing */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            🐐 Tambah Kurban Kambing
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NAMA PEMILIK:
              </label>
              <Input
                type="text"
                value={pemilikKambing}
                onChange={(e) => setPemilikKambing(e.target.value)}
                placeholder="Nama pemilik kambing"
                className="w-full"
              />
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              💾 Simpan Kurban Kambing
            </Button>
          </div>
        </Card>
      </div>

      {/* Daftar Kelompok */}
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
            📋 Daftar Kelompok Sapi
          </h3>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
            📋 Daftar Kurban Kambing
          </h3>
        </Card>
      </div>
    </div>
  );
};

export default KelompokKurban;
