
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePenerima } from '@/contexts/PenerimaContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { useToast } from '@/hooks/use-toast';

const PembagianDaging = () => {
  const { penerima, toggleSudahMenerima, resetPembagian, markAllSudahMenerima } = usePenerima();
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

  const handleResetPembagian = () => {
    resetPembagian();
    toast({
      title: "Berhasil",
      description: "Semua status pembagian direset",
    });
  };

  const handleMarkAllSudahMenerima = () => {
    markAllSudahMenerima();
    toast({
      title: "Berhasil",
      description: "Semua penerima ditandai sudah menerima",
    });
  };

  const filteredPenerima = filterPenerima(penerima, filters);
  const belumMenerima = filteredPenerima.filter(p => !p.sudahMenerima);
  const sudahMenerima = penerima.filter(p => p.sudahMenerima);
  const groupedBelumMenerima = groupByRt(belumMenerima);
  
  const progressPercentage = penerima.length > 0 ? Math.round((sudahMenerima.length / penerima.length) * 100) : 0;

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
            <div className="text-2xl font-bold text-green-700">{sudahMenerima.length}</div>
            <div className="text-sm text-gray-600">Sudah Menerima</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <div className="text-2xl font-bold text-yellow-700">{penerima.length - sudahMenerima.length}</div>
            <div className="text-sm text-gray-600">Belum Menerima</div>
          </div>
          <div className="bg-blue-100 p-3 rounded">
            <div className="text-2xl font-bold text-blue-700">{progressPercentage}%</div>
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
            <Select value={filters.rt} onValueChange={(value) => setFilters({ ...filters, rt: value })}>
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
              Cari (Nomor/Nama/Blok):
            </label>
            <Input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Ketik nomor, nama, atau blok..."
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetFilter}>
            🔄 Reset Filter
          </Button>
          <span className="text-sm text-gray-600 flex items-center">
            {belumMenerima.length} total belum menerima
          </span>
        </div>
      </Card>

      {/* Daftar Pembagian per RT */}
      {['01', '02'].map(rt => {
        const belumMenerimaRt = groupedBelumMenerima[rt] || [];
        return (
          <Card key={rt} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700">
                RT {rt} / 10 KLAMPISAN - BELUM MENERIMA
              </h3>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                {belumMenerimaRt.length} penerima
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-600">
                    <TableHead className="text-white">NO</TableHead>
                    <TableHead className="text-white">NAMA PENERIMA</TableHead>
                    <TableHead className="text-white">BLOK</TableHead>
                    <TableHead className="text-white">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {belumMenerimaRt.length > 0 ? (
                    belumMenerimaRt.map((penerimaItem) => (
                      <TableRow key={penerimaItem.id}>
                        <TableCell>{penerimaItem.nomorPengambilan}</TableCell>
                        <TableCell>{penerimaItem.nama}</TableCell>
                        <TableCell>{penerimaItem.blok || '-'}</TableCell>
                        <TableCell>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleSudahMenerima(penerimaItem.id)}
                          >
                            ✅ Sudah Menerima
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-center text-green-600" colSpan={4}>
                        🎉 Semua penerima di RT ini sudah menerima daging!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        );
      })}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={handleMarkAllSudahMenerima}
        >
          ✅ Tandai Semua Sudah Menerima
        </Button>
        <Button 
          variant="secondary"
          onClick={handleResetPembagian}
        >
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
