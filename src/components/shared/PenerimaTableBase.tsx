
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Penerima } from '@/contexts/PenerimaContext';
import { useStableIds } from '@/hooks/useStableIds';

interface PenerimaTableBaseProps {
  rt: string;
  penerima: Penerima[];
  title?: string;
  children: (penerima: Penerima) => React.ReactNode;
  headers: string[];
  emptyMessage?: string;
  showStatus?: boolean;
}

export const PenerimaTableBase: React.FC<PenerimaTableBaseProps> = ({
  rt,
  penerima,
  title,
  children,
  headers,
  emptyMessage,
  showStatus = false
}) => {
  const { getStableId } = useStableIds();
  
  const rtTitle = title || (rt === 'tambahan' ? 'Penerima Tambahan' : `RT ${rt} / 10 KLAMPISAN`);
  const defaultEmptyMessage = emptyMessage || `Tidak ada data penerima untuk ${rt === 'tambahan' ? 'kategori ini' : 'RT ini'}`;

  return (
    <Card className="p-3 md:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h3 className="text-base md:text-lg font-semibold text-green-700">
          {rtTitle}
        </h3>
        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs md:text-sm self-start">
          {penerima.length} penerima
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-600">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-white text-xs md:text-sm">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {penerima.length > 0 ? (
              penerima.map((penerimaItem) => (
                <TableRow key={getStableId(penerimaItem)}>
                  <TableCell className="text-xs md:text-sm">{penerimaItem.nomorPengambilan}</TableCell>
                  <TableCell className="text-xs md:text-sm">{penerimaItem.nama}</TableCell>
                  <TableCell className="text-xs md:text-sm">{penerimaItem.blok || '-'}</TableCell>
                  {showStatus && (
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-sm ${
                        penerimaItem.sudahMenerima 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {penerimaItem.sudahMenerima ? 'Sudah menerima' : 'Belum menerima'}
                      </span>
                    </TableCell>
                  )}
                  <TableCell>
                    {children(penerimaItem)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center text-gray-500 text-xs md:text-sm" colSpan={headers.length}>
                  {defaultEmptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
