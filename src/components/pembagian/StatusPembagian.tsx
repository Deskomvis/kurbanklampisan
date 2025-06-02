
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatusPembagianProps {
  sudahMenerima: number;
  totalPenerima: number;
  progressPercentage: number;
}

export const StatusPembagian: React.FC<StatusPembagianProps> = ({
  sudahMenerima,
  totalPenerima,
  progressPercentage
}) => {
  const belumMenerima = totalPenerima - sudahMenerima;

  return (
    <Card className="p-4 md:p-6 bg-green-50 border-l-4 border-green-500">
      <h3 className="text-base md:text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
        📊 Status Pembagian Daging
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-center">
        <div className="bg-green-100 p-3 md:p-4 rounded-lg">
          <div className="text-xl md:text-2xl font-bold text-green-700">{sudahMenerima}</div>
          <div className="text-xs md:text-sm text-gray-600">Sudah Menerima</div>
        </div>
        <div className="bg-yellow-100 p-3 md:p-4 rounded-lg">
          <div className="text-xl md:text-2xl font-bold text-yellow-700">{belumMenerima}</div>
          <div className="text-xs md:text-sm text-gray-600">Belum Menerima</div>
        </div>
        <div className="bg-blue-100 p-3 md:p-4 rounded-lg">
          <div className="text-xl md:text-2xl font-bold text-blue-700">{progressPercentage}%</div>
          <div className="text-xs md:text-sm text-gray-600">Progress</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};
