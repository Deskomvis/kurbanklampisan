import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const PenerimaDaging = () => {
  const [namaPenerima, setNamaPenerima] = useState('');
  const [rtPenerima, setRtPenerima] = useState('');
  const [filterRt, setFilterRt] = useState('');
  const [cariNama, setCariNama] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Daftar Penerima Daging Kurban 2025</h2>
      <p className="text-sm text-gray-600">RT 01 & RT 02 / RW 10 Klampisan</p>
      
      {/* Data Referensi */}
      <Card className="p-4 bg-green-50 border-l-4 border-green-500">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-700 font-medium">✅ Data Referensi Tahun 2024 Sudah Dimuat</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Total: 0 penerima dari tahun 2024</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-semibold">RT 01</div>
            <div className="text-sm text-gray-600">168 penerima</div>
          </div>
          <div>
            <div className="font-semibold">RT 02</div>
            <div className="text-sm text-gray-600">152 penerima</div>
          </div>
          <div>
            <div className="font-semibold">0</div>
            <div className="text-sm text-gray-600">Sudah Menerima</div>
          </div>
          <div>
            <div className="font-semibold">0</div>
            <div className="text-sm text-gray-600">Belum Menerima</div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          💡 Fitur Baru: Klik nomor "Edit" di setiap baris untuk mengubah nama atau nomor urut penerima. 
          Nomor urut kustom akan ditampilkan dalam daftar dan laporan cetak. Penerima yang sudah menerima 
          daging akan ditandai dengan 🎉highlight hijau.
        </p>
      </Card>

      {/* Tambah Penerima */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
          📝 Tambah Penerima
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NAMA PENERIMA:
            </label>
            <Input
              type="text"
              value={namaPenerima}
              onChange={(e) => setNamaPenerima(e.target.value)}
              placeholder="Nama lengkap penerima"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RT:
            </label>
            <Select value={rtPenerima} onValueChange={setRtPenerima}>
              <SelectTrigger>
                <SelectValue placeholder="-- Pilih RT --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button className="bg-green-600 hover:bg-green-700 mt-4">
          💾 Simpan Penerima
        </Button>
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
                <SelectItem value="all">Semua RT</SelectItem>
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cari Nama:
            </label>
            <Input
              type="text"
              value={cariNama}
              onChange={(e) => setCariNama(e.target.value)}
              placeholder="Ketik nama penerima..."
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            🔄 Reset Filter
          </Button>
          <span className="text-sm text-gray-600 flex items-center">
            0 total penerima
          </span>
        </div>
      </Card>

      {/* Daftar Penerima RT 01 */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">RT 01 / 10 KLAMPISAN</h3>
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
                <td className="p-3 text-center text-gray-500" colSpan={3}>
                  Tidak ada data yang sesuai dengan filter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Daftar Penerima RT 02 */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">RT 02 / 10 KLAMPISAN</h3>
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
                <td className="p-3 text-center text-gray-500" colSpan={3}>
                  Tidak ada data yang sesuai dengan filter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-600 text-white text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-green-100">Total Penerima</div>
        </Card>
        <Card className="p-4 bg-green-600 text-white text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-green-100">RT 01</div>
        </Card>
        <Card className="p-4 bg-green-600 text-white text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-green-100">RT 02</div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button className="bg-green-600 hover:bg-green-700">
          📄 Cetak Daftar Penerima
        </Button>
        <Button variant="secondary">
          📊 Export Excel
        </Button>
        <Button variant="secondary">
          📋 Muat Ulang Data 2024
        </Button>
        <Button variant="destructive">
          🗑️ Kosongkan Semua Data
        </Button>
      </div>
    </div>
  );
};

export default PenerimaDaging;
