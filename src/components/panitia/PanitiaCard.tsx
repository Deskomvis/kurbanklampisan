
import React from 'react';
import { Card } from '@/components/ui/card';

interface PanitiaItem {
  jabatan: string;
  nama: string[];
}

interface PanitiaCardProps {
  item: PanitiaItem;
}

export const PanitiaCard: React.FC<PanitiaCardProps> = ({ item }) => {
  return (
    <Card className="p-4">
      <div className="border-l-4 border-green-500 pl-4">
        <h4 className="font-semibold text-green-700 mb-2">{item.jabatan}</h4>
        <div className="space-y-1">
          {item.nama.map((nama, namaIndex) => (
            <div key={namaIndex} className="text-sm text-gray-700">
              {item.nama.length > 1 ? `${namaIndex + 1}. ` : ""}{nama}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
