import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, MapPin, UserPlus, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PenerimaSummaryProps {
  totalPenerima: number;
  rt01Count: number;
  rt02Count: number;
  rt00Count: number;
  tambahanCount: number;
}

export const PenerimaSummary: React.FC<PenerimaSummaryProps> = ({
  totalPenerima,
  rt01Count,
  rt02Count,
  rt00Count,
  tambahanCount,
}) => {
  const baseStats = [
    { label: 'Total Penerima', value: totalPenerima, icon: Users, color: 'bg-green-600', shadow: 'shadow-green-100', text: 'text-white' },
    { label: 'Warga RT 01', value: rt01Count, icon: MapPin, color: 'bg-white', shadow: 'shadow-gray-100', text: 'text-gray-900' },
    { label: 'Warga RT 02', value: rt02Count, icon: MapPin, color: 'bg-white', shadow: 'shadow-gray-100', text: 'text-gray-900' },
    { label: 'Diluar RT', value: rt00Count, icon: ExternalLink, color: 'bg-amber-500', shadow: 'shadow-amber-100', text: 'text-white' },
  ];

  // Tampilkan Tambahan hanya bila ada datanya (kategori legacy)
  const stats = tambahanCount > 0
    ? [...baseStats, { label: 'Tambahan', value: tambahanCount, icon: UserPlus, color: 'bg-white', shadow: 'shadow-gray-100', text: 'text-gray-900' }]
    : baseStats;

  return (
    <div className={cn(
      'grid gap-4 md:gap-6 grid-cols-2',
      stats.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
    )}>
      {stats.map((stat, i) => (
        <Card key={i} className={cn(
          "relative overflow-hidden p-6 rounded-[2rem] border-transparent shadow-xl transition-all duration-300 hover:-translate-y-1",
          stat.color,
          stat.shadow
        )}>
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className={cn(
              "p-3 rounded-2xl",
              stat.color === 'bg-green-600' || stat.color === 'bg-amber-500' ? "bg-white/20" : "bg-gray-50"
            )}>
              <stat.icon className={cn(
                "w-6 h-6",
                stat.color === 'bg-green-600' || stat.color === 'bg-amber-500' ? "text-white" : "text-green-600"
              )} />
            </div>
            <div>
              <div className={cn("text-3xl font-black tracking-tight", stat.text)}>{stat.value}</div>
              <div className={cn("text-[10px] font-black uppercase tracking-widest opacity-60", stat.text)}>{stat.label}</div>
            </div>
          </div>

          <div className={cn(
            "absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-20",
            stat.color === 'bg-green-600' ? "bg-white" : stat.color === 'bg-amber-500' ? "bg-white" : "bg-green-200"
          )} />
        </Card>
      ))}
    </div>
  );
};
