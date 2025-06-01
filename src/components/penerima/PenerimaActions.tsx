
import React from 'react';
import { Button } from '@/components/ui/button';

export const PenerimaActions: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button className="bg-green-600 hover:bg-green-700">
        📄 Cetak Daftar Penerima
      </Button>
      <Button variant="secondary">
        📊 Export Excel
      </Button>
      <Button variant="destructive">
        🗑️ Kosongkan Semua Data
      </Button>
    </div>
  );
};
