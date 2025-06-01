
import React from 'react';
import { Card } from '@/components/ui/card';

interface PenerimaSummaryProps {
  totalPenerima: number;
  rt01Count: number;
  rt02Count: number;
  tambahanCount: number;
}

export const PenerimaSummary: React.FC<PenerimaSummaryProps> = ({
  totalPenerima,
  rt01Count,
  rt02Count,
  tambahanCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4 bg-green-600 text-white text-center">
        <div className="text-2xl font-bold">{totalPenerima}</div>
        <div className="text-green-100">Total Penerima</div>
      </Card>
      <Card className="p-4 bg-green-600 text-white text-center">
        <div className="text-2xl font-bold">{rt01Count}</div>
        <div className="text-green-100">RT 01</div>
      </Card>
      <Card className="p-4 bg-green-600 text-white text-center">
        <div className="text-2xl font-bold">{rt02Count}</div>
        <div className="text-green-100">RT 02</div>
      </Card>
      <Card className="p-4 bg-green-600 text-white text-center">
        <div className="text-2xl font-bold">{tambahanCount}</div>
        <div className="text-green-100">Penerima Tambahan</div>
      </Card>
    </div>
  );
};
