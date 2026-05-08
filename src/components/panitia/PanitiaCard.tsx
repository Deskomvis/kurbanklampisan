import React from 'react';
import { Card } from '@/components/ui/card';
import { User, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PanitiaItem {
  jabatan: string;
  nama: string[];
}

interface PanitiaCardProps {
  item: PanitiaItem;
}

export const PanitiaCard: React.FC<PanitiaCardProps> = ({ item }) => {
  return (
    <Card className="p-6 rounded-[2.5rem] bg-white border-gray-100 shadow-xl shadow-gray-50 overflow-hidden relative group hover:border-green-200 transition-all duration-300">
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 rounded-xl">
              <BadgeCheck className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              {item.jabatan}
            </h4>
          </div>
          {item.nama.length > 1 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black">
              {item.nama.length} PERSONEL
            </span>
          )}
        </div>

        <div className="space-y-3">
          {item.nama.map((nama, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl transition-all",
                item.nama.length > 1 ? "bg-gray-50 group-hover:bg-green-50/50" : "bg-transparent"
              )}
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-xs font-black text-gray-400">
                {i + 1}
              </div>
              <p className="font-black text-gray-900 tracking-tight">{nama}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background icon */}
      <User className="absolute -right-4 -bottom-4 w-24 h-24 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
};
