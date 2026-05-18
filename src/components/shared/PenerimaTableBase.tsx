import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Penerima } from '@/contexts/PenerimaContext';
import { useStableIds } from '@/hooks/useStableIds';
import { cn } from '@/lib/utils';
import { MapPin, Users, CheckCircle2, XCircle } from 'lucide-react';

interface PenerimaTableBaseProps {
  rt: string;
  penerima: Penerima[];
  title?: string;
  children?: (penerima: Penerima) => React.ReactNode;
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
  
  const rtTitle = title || (rt === 'tambahan' ? 'Penerima Tambahan' : `RT ${rt} / RW 10 Klampisan`);
  const defaultEmptyMessage = emptyMessage || `Tidak ada data penerima untuk ${rt === 'tambahan' ? 'kategori ini' : 'wilayah ini'}`;

  return (
    <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <MapPin className="w-5 h-5 text-green-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {rtTitle}
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
          <Users className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-700">
            {penerima.length} <span className="font-normal text-gray-500">Penerima</span>
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              {headers.map((header, index) => (
                <TableHead key={index} className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-600">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {penerima.length > 0 ? (
              penerima.map((penerimaItem) => (
                <TableRow key={getStableId(penerimaItem)} className="border-b border-gray-100 hover:bg-green-50/30 transition-colors">
                  <TableCell className="px-2 sm:px-4 py-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gray-100 font-bold text-gray-700 text-xs sm:text-sm">
                      {penerimaItem.nomorPengambilan}
                    </span>
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-3">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{penerimaItem.nama}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Warga Penerima Kurban</p>
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-3">
                    {penerimaItem.blok ? (
                      <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded text-[10px] sm:text-xs font-medium border border-gray-200 whitespace-nowrap">
                        Blok {penerimaItem.blok}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  {showStatus && (
                    <TableCell className="px-4 py-3">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                        penerimaItem.sudahMenerima 
                          ? "bg-green-100 text-green-700 border border-green-200" 
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                      )}>
                        {penerimaItem.sudahMenerima ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Sudah Diambil
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Belum Diambil
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {children && (
                    <TableCell className="px-2 sm:px-4 py-3 text-right">
                      {children(penerimaItem)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="px-4 py-8 text-center text-gray-500" colSpan={headers.length}>
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-6 h-6 text-gray-300" />
                    <p>{defaultEmptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
;
