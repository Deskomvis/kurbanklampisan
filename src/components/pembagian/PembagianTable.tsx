import React from 'react';
import { Button } from '@/components/ui/button';
import { Penerima } from '@/contexts/PenerimaContext';
import { PenerimaTableBase } from '@/components/shared/PenerimaTableBase';
import { Beef } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PembagianTableProps {
  rt: string;
  penerima: Penerima[];
  onSudahMenerima: (id: string) => void;
}

export const PembagianTable: React.FC<PembagianTableProps> = ({
  rt,
  penerima,
  onSudahMenerima
}) => {
  const { isAuthenticated } = useAuth();
  const headers = isAuthenticated
    ? ['NO', 'NAMA PENERIMA', 'BLOK', 'KONFIRMASI']
    : ['NO', 'NAMA PENERIMA', 'BLOK'];
  const rtTitle =
    rt === 'tambahan' ? 'Penerima Tambahan' :
    rt === '00' ? 'Penerima Diluar RT (RT 00)' :
    `RT ${rt} / RW 10 Klampisan`;
  const title = `${rtTitle} — Antrian`;
  const emptyMessage = `Alhamdulillah, distribusi di ${
    rt === 'tambahan' ? 'kategori ini' : rt === '00' ? 'kategori Diluar RT' : 'RT ini'
  } telah selesai!`;

  const renderActions = (penerimaItem: Penerima) => (
    <Button
      variant="default"
      size="sm"
      className="h-8 sm:h-9 px-2 sm:px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-all active:scale-95 whitespace-nowrap"
      onClick={() => onSudahMenerima(penerimaItem.id)}
    >
      <Beef className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
      <span className="hidden sm:inline">Konfirmasi Terima</span>
      <span className="inline sm:hidden">Terima</span>
    </Button>
  );

  return (
    <PenerimaTableBase
      rt={rt}
      penerima={penerima}
      title={title}
      headers={headers}
      emptyMessage={emptyMessage}
    >
      {isAuthenticated ? renderActions : undefined}
    </PenerimaTableBase>
  );
};
