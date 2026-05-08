import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';

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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Nomor Pengambilan <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.nomorPengambilan}
            onChange={(e) => setFormData({ ...formData, nomorPengambilan: e.target.value })}
            placeholder="Contoh: 001"
            className="h-12 px-4 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-green-500 transition-all font-bold text-gray-900"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            placeholder="Masukkan nama penerima..."
            className="h-12 px-4 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-green-500 transition-all font-bold text-gray-900"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Wilayah RT <span className="text-red-500">*</span>
            </label>
            <Select value={formData.rt} onValueChange={(value) => setFormData({ ...formData, rt: value })}>
              <SelectTrigger className="h-12 rounded-2xl bg-gray-50 border-gray-100 font-bold">
                <SelectValue placeholder="Pilih RT" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl shadow-2xl border-gray-100">
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
                <SelectItem value="tambahan">Tambahan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Blok Rumah
            </label>
            <Input
              type="text"
              value={formData.blok}
              onChange={(e) => setFormData({ ...formData, blok: e.target.value })}
              placeholder="Blok / No"
              className="h-12 px-4 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-green-500 transition-all font-bold text-gray-900"
            />
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-14 bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg shadow-green-200 text-white font-black text-lg transition-all active:scale-95 flex items-center gap-2"
      >
        <Save className="w-5 h-5" />
        Simpan Data
      </Button>
    </form>
  );
};
