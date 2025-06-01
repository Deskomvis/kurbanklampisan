
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const PembagianDaging = () => {
  const [filterRt, setFilterRt] = useState('');
  const [cariNama, setCariNama] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Pembagian Daging Kurban 2025</h2>
      <p className="text-sm text-gray-600">Sistem Pembagian dan Tracking Penerimaan Daging</p>
      
      {/* Status Pembagian */}
      <Card className="p-4 bg-green-50 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
          📊 Status Pembagian Daging
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 p-3 rounded">
            <div className="text-2xl font-bold text-green-700">0</div>
            <div className="text-sm text-gray-600">Sudah Menerima</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <div className="text-2xl font-bold text-yellow-700">0</div>
            <div className="text-sm text-gray-600">Belum Menerima</div>
          </div>
          <div className="bg-blue-100 p-3 rounded">
            <div className="text-2xl font-bold text-blue-700">0%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>
      </Card>

      {/* Filter dan Pencarian */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter berdasarkan RT:
            </label>
            <Select value={filterRt} onValueChange={setFilterRt}>
              <SelectTrigger>
                <SelectValue placeholder="Semua RT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua RT</SelectItem>
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cari Nomor/Nama:
            </label>
            <Input
              type="text"
              value={cariNama}
              onChange={(e) => setCariNama(e.target.value)}
              placeholder="Ketik nomor atau nama..."
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            🔄 Reset Filter
          </Button>
          <span className="text-sm text-gray-600 flex items-center">
            0 total belum menerima
          </span>
        </div>
      </Card>

      {/* Daftar Pembagian RT 01 */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">RT 01 / 10 KLAMPISAN - BELUM MENERIMA</h3>
          <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">0 penerima</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">NO</th>
                <th className="p-3 text-left">NAMA PENERIMA</th>
                <th className="p-3 text-left">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-center text-green-600" colSpan={3}>
                  🎉 Semua penerima di RT ini sudah menerima daging!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Daftar Pembagian RT 02 */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">RT 02 / 10 KLAMPISAN - BELUM MENERIMA</h3>
          <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">0 penerima</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">NO</th>
                <th className="p-3 text-left">NAMA PENERIMA</th>
                <th className="p-3 text-left">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-center text-green-600" colSpan={3}>
                  🎉 Semua penerima di RT ini sudah menerima daging!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button className="bg-green-600 hover:bg-green-700">
          ✅ Tandai Semua Sudah Menerima
        </Button>
        <Button variant="secondary">
          🔄 Reset Semua Pembagian
        </Button>
        <Button variant="outline">
          📄 Cetak Laporan Pembagian
        </Button>
      </div>

      {/* Tips */}
      <Card className="p-4 bg-blue-50">
        <p className="text-sm text-blue-700">
          💡 Tips: Klik tombol "✅ Sudah Menerima" setelah memberikan daging kepada penerima
        </p>
      </Card>
    </div>
  );
};

export default PembagianDaging;
