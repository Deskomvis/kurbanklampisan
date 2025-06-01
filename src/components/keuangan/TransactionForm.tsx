
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Transaction } from './types';

interface TransactionFormProps {
  type: 'pemasukan' | 'pengeluaran' | 'dana-masjid';
  title: string;
  icon: string;
  tanggal: string;
  setTanggal: (value: string) => void;
  keterangan: string;
  setKeterangan: (value: string) => void;
  jumlah: string;
  setJumlah: (value: string) => void;
  placeholder: string;
  onSave: () => void;
  onUpdate: () => void;
  onCancelEdit: () => void;
  editingId: number | null;
  transactions: Transaction[];
  buktiNota?: File | null;
  setBuktiNota?: (file: File | null) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  type,
  title,
  icon,
  tanggal,
  setTanggal,
  keterangan,
  setKeterangan,
  jumlah,
  setJumlah,
  placeholder,
  onSave,
  onUpdate,
  onCancelEdit,
  editingId,
  transactions,
  buktiNota,
  setBuktiNota
}) => {
  const isEditing = editingId && transactions.find(t => t.id === editingId)?.type === type;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (setBuktiNota) {
      setBuktiNota(file);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        {icon} {isEditing ? 'Edit' : 'Tambah'} {title}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            TANGGAL:
          </label>
          <Input
            type="text"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            KETERANGAN:
          </label>
          <Input
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder={placeholder}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            JUMLAH (RP):
          </label>
          <Input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="w-full"
          />
        </div>

        {type === 'pengeluaran' && setBuktiNota && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BUKTI NOTA:
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full"
              />
              <Upload className="h-4 w-4 text-gray-500" />
            </div>
            {buktiNota && (
              <p className="text-sm text-gray-600 mt-1">
                File terpilih: {buktiNota.name}
              </p>
            )}
          </div>
        )}
        
        <Button 
          onClick={isEditing ? onUpdate : onSave}
          className="bg-green-600 hover:bg-green-700 w-full"
        >
          💾 {isEditing ? 'Update' : 'Simpan'} {title}
        </Button>
        
        {isEditing && (
          <Button 
            onClick={onCancelEdit}
            variant="outline"
            className="w-full"
          >
            Batal Edit
          </Button>
        )}
      </div>
    </Card>
  );
};
