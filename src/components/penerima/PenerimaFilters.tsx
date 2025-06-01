
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

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
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter berdasarkan RT:
          </label>
          <Select value={filters.rt} onValueChange={(value) => setFilters({ ...filters, rt: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Semua RT" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua RT</SelectItem>
              <SelectItem value="01">RT 01</SelectItem>
              <SelectItem value="02">RT 02</SelectItem>
              <SelectItem value="tambahan">Penerima Tambahan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cari (Nomor/Nama/Blok):
          </label>
          <Input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Ketik nomor, nama, atau blok..."
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onResetFilter}>
          🔄 Reset Filter
        </Button>
        <span className="text-sm text-gray-600 flex items-center">
          {filteredCount} total penerima
        </span>
      </div>
    </Card>
  );
};
