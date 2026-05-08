import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const stats = [
    { 
      label: 'Sudah Menerima', 
      value: sudahMenerima, 
      icon: CheckCircle2, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      border: 'border-green-100'
    },
    { 
      label: 'Belum Menerima', 
      value: belumMenerima, 
      icon: Clock, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    { 
      label: 'Persentase Progress', 
      value: `${progressPercentage}%`, 
      icon: TrendingUp, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    }
  ];

  return (
    <Card className="p-6 md:p-8 rounded-xl shadow-sm border-gray-200 bg-white overflow-hidden relative">
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Statistik Distribusi Daging
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500 block">Total Basis Data</span>
            <span className="text-base font-bold text-gray-900">{totalPenerima} Warga</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex flex-col items-center text-center gap-2",
              stat.bg,
              stat.border
            )}>
              <div className="p-2 bg-white rounded-lg shadow-sm mb-1">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <div className={cn("text-2xl font-bold mb-0.5", stat.color === 'text-green-600' ? "text-gray-900" : stat.color)}>
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-gray-600">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Bar Container */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Progress Pembagian Real-time</span>
            </div>
            <span className="text-xl font-bold text-green-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
