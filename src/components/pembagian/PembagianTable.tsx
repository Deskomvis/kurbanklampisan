
import React from 'react';
import { Button } from '@/components/ui/button';
import { Penerima } from '@/contexts/PenerimaContext';
import { PenerimaTableBase } from '@/components/shared/PenerimaTableBase';

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
  const headers = ['NO', 'NAMA PENERIMA', 'BLOK', 'AKSI'];
  const rtTitle = rt === 'tambahan' ? 'PENERIMA TAMBAHAN' : `RT ${rt} / 10 KLAMPISAN`;
  const title = `${rtTitle} - BELUM MENERIMA`;
  const emptyMessage = `🎉 Semua penerima di ${rt === 'tambahan' ? 'kategori ini' : 'RT ini'} sudah menerima daging!`;

  const renderActions = (penerimaItem: Penerima) => (
    <Button
      variant="default"
      size="sm"
      className="bg-green-600 hover:bg-green-700 text-xs"
      onClick={() => onSudahMenerima(penerimaItem.id)}
    >
      🥩 Bagikan
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
      {renderActions}
    </PenerimaTableBase>
  );
};
