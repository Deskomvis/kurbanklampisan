
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Penerima } from '@/contexts/PenerimaContext';
import { PenerimaTableBase } from '@/components/shared/PenerimaTableBase';
import { useAuth } from '@/contexts/AuthContext';

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
  const { isAuthenticated } = useAuth();
  const headers = isAuthenticated
    ? ['NOMOR', 'NAMA PENERIMA', 'BLOK', 'STATUS', 'AKSI']
    : ['NOMOR', 'NAMA PENERIMA', 'BLOK', 'STATUS'];

  const renderActions = (penerimaItem: Penerima) => (
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
  );

  return (
    <PenerimaTableBase
      rt={rt}
      penerima={penerima}
      headers={headers}
      showStatus={true}
    >
      {isAuthenticated ? renderActions : undefined}
    </PenerimaTableBase>
  );
};
