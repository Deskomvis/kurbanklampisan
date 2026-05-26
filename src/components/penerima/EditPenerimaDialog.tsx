
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Penerima } from '@/contexts/PenerimaContext';

interface EditPenerimaDialogProps {
  penerima: Penerima | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: Omit<Penerima, 'id'>) => void;
}

export const EditPenerimaDialog: React.FC<EditPenerimaDialogProps> = ({
  penerima,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nomorPengambilan: '',
    nama: '',
    rt: '',
    blok: '',
    sudahMenerima: false
  });

  useEffect(() => {
    if (penerima) {
      setFormData({
        nomorPengambilan: penerima.nomorPengambilan,
        nama: penerima.nama,
        rt: penerima.rt,
        blok: penerima.blok,
        sudahMenerima: penerima.sudahMenerima
      });
    }
  }, [penerima]);

  const handleSave = () => {
    if (penerima && formData.nama && formData.rt && formData.nomorPengambilan) {
      onSave(penerima.id, formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Penerima</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NOMOR PENGAMBILAN:
            </label>
            <Input
              value={formData.nomorPengambilan}
              onChange={(e) => setFormData({ ...formData, nomorPengambilan: e.target.value })}
              placeholder="Nomor urut pengambilan"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NAMA PENERIMA:
            </label>
            <Input
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Nama lengkap penerima"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RT:
            </label>
            <Select value={formData.rt} onValueChange={(value) => setFormData({ ...formData, rt: value })}>
              <SelectTrigger>
                <SelectValue placeholder="-- Pilih RT --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
                <SelectItem value="00">RT 00 (Diluar RT)</SelectItem>
                <SelectItem value="tambahan">Penerima Tambahan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BLOK:
            </label>
            <Input
              value={formData.blok}
              onChange={(e) => setFormData({ ...formData, blok: e.target.value })}
              placeholder="Contoh: A, B, C"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              STATUS PENERIMAAN:
            </label>
            <Select 
              value={formData.sudahMenerima ? "sudah" : "belum"} 
              onValueChange={(value) => setFormData({ ...formData, sudahMenerima: value === "sudah" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="belum">Belum Menerima</SelectItem>
                <SelectItem value="sudah">Sudah Menerima</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            💾 Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
