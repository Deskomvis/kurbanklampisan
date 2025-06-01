
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface PenerimaFormProps {
  formData: {
    nomorPengambilan: string;
    nama: string;
    rt: string;
    blok: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PenerimaForm: React.FC<PenerimaFormProps> = ({
  formData,
  setFormData,
  onSubmit
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        📝 Tambah Penerima
      </h3>
      
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NOMOR PENGAMBILAN: <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.nomorPengambilan}
              onChange={(e) => setFormData({ ...formData, nomorPengambilan: e.target.value })}
              placeholder="Nomor urut pengambilan"
              className="w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NAMA PENERIMA: <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Nama lengkap penerima"
              className="w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RT: <span className="text-red-500">*</span>
            </label>
            <Select value={formData.rt} onValueChange={(value) => setFormData({ ...formData, rt: value })}>
              <SelectTrigger>
                <SelectValue placeholder="-- Pilih RT --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
                <SelectItem value="tambahan">Penerima Tambahan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BLOK:
            </label>
            <Input
              type="text"
              value={formData.blok}
              onChange={(e) => setFormData({ ...formData, blok: e.target.value })}
              placeholder="Contoh: A, B, C"
              className="w-full"
            />
          </div>
        </div>
        
        <Button type="submit" className="bg-green-600 hover:bg-green-700 mt-4">
          💾 Simpan Penerima
        </Button>
      </form>
    </Card>
  );
};
