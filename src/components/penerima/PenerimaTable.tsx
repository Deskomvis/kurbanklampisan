
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Penerima } from '@/contexts/PenerimaContext';

interface PenerimaTableProps {
  rt: string;
  penerima: Penerima[];
  onEdit: (penerima: Penerima) => void;
  onDelete: (id: string) => void;
}

export const PenerimaTable: React.FC<PenerimaTableProps> = ({
  rt,
  penerima,
  onEdit,
  onDelete
}) => {
  const rtTitle = rt === 'tambahan' ? 'Penerima Tambahan' : `RT ${rt} / 10 KLAMPISAN`;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-green-700">{rtTitle}</h3>
        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
          {penerima.length} penerima
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-600">
              <TableHead className="text-white">NOMOR</TableHead>
              <TableHead className="text-white">NAMA PENERIMA</TableHead>
              <TableHead className="text-white">BLOK</TableHead>
              <TableHead className="text-white">STATUS</TableHead>
              <TableHead className="text-white">AKSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {penerima.length > 0 ? (
              penerima.map((penerimaItem) => (
                <TableRow key={penerimaItem.id}>
                  <TableCell>{penerimaItem.nomorPengambilan}</TableCell>
                  <TableCell>{penerimaItem.nama}</TableCell>
                  <TableCell>{penerimaItem.blok || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      penerimaItem.sudahMenerima 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {penerimaItem.sudahMenerima ? 'Sudah menerima' : 'Belum menerima'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(penerimaItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(penerimaItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center text-gray-500" colSpan={5}>
                  Tidak ada data penerima untuk {rt === 'tambahan' ? 'kategori ini' : 'RT ini'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
