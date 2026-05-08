import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Search, MapPin } from 'lucide-react';

interface PembagianFiltersProps {
  filters: {
    rt: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    rt: string;
    search: string;
  }>>;
  onResetFilter: () => void;
  belumMenerimaCount: number;
}

export const PembagianFilters: React.FC<PembagianFiltersProps> = ({
  filters,
  setFilters,
  onResetFilter,
  belumMenerimaCount
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 ml-1">
            <MapPin className="w-4 h-4" />
            Filter Wilayah RT
          </label>
          <Select value={filters.rt} onValueChange={(value) => setFilters({ ...filters, rt: value })}>
            <SelectTrigger className="h-10 rounded-lg bg-white border-gray-200 font-medium focus:ring-green-500">
              <SelectValue placeholder="Semua RT" />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-lg border-gray-100">
              <SelectItem value="all">Semua RT</SelectItem>
              <SelectItem value="01">RT 01</SelectItem>
              <SelectItem value="02">RT 02</SelectItem>
              <SelectItem value="tambahan">Penerima Tambahan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 ml-1">
            <Search className="w-4 h-4" />
            Cari Warga
          </label>
          <div className="relative">
            <Input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Nomor / Nama / Blok..."
              className="h-10 pl-10 pr-4 rounded-lg bg-white border-gray-200 focus:ring-green-500 font-medium text-gray-900"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Sisa Antrian</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-bold">
            {belumMenerimaCount} Warga
          </span>
        </div>
        <Button 
          variant="outline" 
          onClick={onResetFilter} 
          className="w-full h-10 rounded-lg border-gray-200 text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Atur Ulang Pencarian
        </Button>
      </div>
    </div>
  );
};
