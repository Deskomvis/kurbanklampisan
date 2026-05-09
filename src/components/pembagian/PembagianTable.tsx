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
  const rtTitle = rt === 'tambahan' ? 'Penerima Tambahan' : `RT ${rt} / RW 10 Klampisan`;
  const title = `${rtTitle} — Antrian`;
  const emptyMessage = `Alhamdulillah, distribusi di ${rt === 'tambahan' ? 'kategori ini' : 'RT ini'} telah selesai!`;

  const renderActions = (penerimaItem: Penerima) => (
    <Button
      variant="default"
      size="sm"
      className="h-9 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
      onClick={() => onSudahMenerima(penerimaItem.id)}
    >
      <Beef className="w-4 h-4" />
      Konfirmasi Terima
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
