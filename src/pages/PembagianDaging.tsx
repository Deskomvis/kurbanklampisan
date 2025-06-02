
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePenerima } from '@/contexts/PenerimaContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { useToast } from '@/hooks/use-toast';
import { StatusPembagian } from '@/components/pembagian/StatusPembagian';
import { PembagianFilters } from '@/components/pembagian/PembagianFilters';

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
        const rtTitle = rt === 'tambahan' ? 'PENERIMA TAMBAHAN' : `RT ${rt} / 10 KLAMPISAN`;
        
        return (
          <Card key={rt} className="p-3 md:p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h3 className="text-base md:text-lg font-semibold text-green-700">
                {rtTitle} - BELUM MENERIMA
              </h3>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs md:text-sm self-start">
                {belumMenerimaRt.length} penerima
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-600">
                    <TableHead className="text-white text-xs md:text-sm">NO</TableHead>
                    <TableHead className="text-white text-xs md:text-sm">NAMA PENERIMA</TableHead>
                    <TableHead className="text-white text-xs md:text-sm">BLOK</TableHead>
                    <TableHead className="text-white text-xs md:text-sm">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {belumMenerimaRt.length > 0 ? (
                    belumMenerimaRt.map((penerimaItem) => (
                      <TableRow key={penerimaItem.id}>
                        <TableCell className="text-xs md:text-sm">{penerimaItem.nomorPengambilan}</TableCell>
                        <TableCell className="text-xs md:text-sm">{penerimaItem.nama}</TableCell>
                        <TableCell className="text-xs md:text-sm">{penerimaItem.blok || '-'}</TableCell>
                        <TableCell>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            onClick={() => handleSudahMenerima(penerimaItem.id)}
                          >
                            🥩 Bagikan
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-center text-green-600 text-xs md:text-sm" colSpan={4}>
                        🎉 Semua penerima di {rt === 'tambahan' ? 'kategori ini' : 'RT ini'} sudah menerima daging!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
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
