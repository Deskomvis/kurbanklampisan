
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Keuangan = () => {
  const [tanggalPemasukan, setTanggalPemasukan] = useState('01/06/2025');
  const [keteranganPemasukan, setKeteranganPemasukan] = useState('');
  const [jumlahPemasukan, setJumlahPemasukan] = useState('0');
  
  const [tanggalPengeluaran, setTanggalPengeluaran] = useState('01/06/2025');
  const [keteranganPengeluaran, setKeteranganPengeluaran] = useState('');
  const [jumlahPengeluaran, setJumlahPengeluaran] = useState('0');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Manajemen Keuangan</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tambah Pemasukan */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            💰 Tambah Pemasukan
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TANGGAL:
              </label>
              <Input
                type="text"
                value={tanggalPemasukan}
                onChange={(e) => setTanggalPemasukan(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                KETERANGAN:
              </label>
              <Input
                type="text"
                value={keteranganPemasukan}
                onChange={(e) => setKeteranganPemasukan(e.target.value)}
                placeholder="Sumber pemasukan"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                JUMLAH (RP):
              </label>
              <Input
                type="number"
                value={jumlahPemasukan}
                onChange={(e) => setJumlahPemasukan(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              💾 Simpan Pemasukan
            </Button>
          </div>
        </Card>

        {/* Tambah Pengeluaran */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            💸 Tambah Pengeluaran
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TANGGAL:
              </label>
              <Input
                type="text"
                value={tanggalPengeluaran}
                onChange={(e) => setTanggalPengeluaran(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                KETERANGAN:
              </label>
              <Input
                type="text"
                value={keteranganPengeluaran}
                onChange={(e) => setKeteranganPengeluaran(e.target.value)}
                placeholder="Keperluan pengeluaran"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                JUMLAH (RP):
              </label>
              <Input
                type="number"
                value={jumlahPengeluaran}
                onChange={(e) => setJumlahPengeluaran(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              💾 Simpan Pengeluaran
            </Button>
          </div>
        </Card>
      </div>

      {/* Ringkasan Keuangan */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
          📊 Ringkasan Keuangan
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">TANGGAL</th>
                <th className="p-3 text-left">KETERANGAN</th>
                <th className="p-3 text-left">PEMASUKAN</th>
                <th className="p-3 text-left">PENGELUARAN</th>
                <th className="p-3 text-left">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan={5}>
                  Belum ada data transaksi
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-green-600 text-white text-center">
            <div className="text-2xl font-bold">Rp 0,00</div>
            <div className="text-green-100">Total Pemasukan</div>
          </Card>
          <Card className="p-4 bg-green-600 text-white text-center">
            <div className="text-2xl font-bold">Rp 0,00</div>
            <div className="text-green-100">Total Pengeluaran</div>
          </Card>
          <Card className="p-4 bg-green-600 text-white text-center">
            <div className="text-2xl font-bold">Rp 0,00</div>
            <div className="text-green-100">Saldo Akhir</div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Keuangan;
