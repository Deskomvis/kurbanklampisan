import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Search, MapPin } from 'lucide-react';

interface PenerimaFiltersProps {
  filters: {
    rt: string;
    search: string;
  };
  setFilters: (filters: any) => void;
  onResetFilter: () => void;
  filteredCount: number;
}

export const PenerimaFilters: React.FC<PenerimaFiltersProps> = ({
  filters,
  setFilters,
  onResetFilter,
  filteredCount
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Filter Wilayah RT
          </label>
          <Select value={filters.rt} onValueChange={(value) => setFilters({ ...filters, rt: value })}>
            <SelectTrigger className="h-12 rounded-2xl bg-gray-50 border-gray-100 font-bold focus:ring-green-500">
              <SelectValue placeholder="Semua RT" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-gray-100">
              <SelectItem value="all">Semua RT</SelectItem>
              <SelectItem value="01">RT 01</SelectItem>
              <SelectItem value="02">RT 02</SelectItem>
              <SelectItem value="tambahan">Penerima Tambahan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <Search className="w-3 h-3" />
            Cari Nama / No / Blok
          </label>
          <div className="relative">
            <Input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Masukkan kata kunci pencarian..."
              className="h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-green-500 transition-all font-bold text-gray-900"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider">
            Ditemukan: {filteredCount} Penerima
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={onResetFilter}
          className="rounded-xl border-gray-200 text-gray-500 font-bold hover:bg-gray-50 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Atur Ulang Filter
        </Button>
      </div>
    </div>
  );
};
