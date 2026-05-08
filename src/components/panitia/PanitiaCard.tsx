import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, BadgeCheck, Trash2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PanitiaItem } from '@/data/panitiaData';

interface PanitiaCardProps {
  item: PanitiaItem;
  isEditing?: boolean;
  onUpdate?: (updated: PanitiaItem) => void;
  onDelete?: () => void;
}

export const PanitiaCard: React.FC<PanitiaCardProps> = ({
  item,
  isEditing = false,
  onUpdate,
  onDelete,
}) => {
  const setJabatan = (value: string) => {
    onUpdate?.({ ...item, jabatan: value });
  };

  const setNama = (index: number, value: string) => {
    const next = [...item.nama];
    next[index] = value;
    onUpdate?.({ ...item, nama: next });
  };

  const addNama = () => {
    onUpdate?.({ ...item, nama: [...item.nama, ''] });
  };

  const removeNama = (index: number) => {
    const next = item.nama.filter((_, i) => i !== index);
    onUpdate?.({ ...item, nama: next.length > 0 ? next : [''] });
  };

  if (isEditing) {
    return (
      <Card className="p-5 rounded-[2rem] bg-white border-green-100 shadow-md overflow-hidden border-2 border-dashed">
        <div className="flex flex-col gap-3">
          {/* Jabatan input */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
              <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
            </div>
            <Input
              value={item.jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              placeholder="Nama jabatan..."
              className="h-9 rounded-xl text-xs font-black uppercase tracking-wide text-gray-700 border-gray-200 flex-1"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0"
              title="Hapus jabatan"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Nama list */}
          <div className="space-y-2 pl-1">
            {item.nama.map((nama, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 w-5 shrink-0 text-right">{i + 1}.</span>
                <Input
                  value={nama}
                  onChange={(e) => setNama(i, e.target.value)}
                  placeholder={`Nama anggota ${i + 1}...`}
                  className="h-9 rounded-xl font-semibold text-gray-800 border-gray-200 flex-1 text-sm"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeNama(i)}
                  className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={addNama}
              className="w-full h-8 border border-dashed border-gray-200 text-gray-400 hover:text-green-600 hover:border-green-400 rounded-xl text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Tambah Nama
            </Button>
          </div>
        </div>
      </Card>
    );
  }

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

      <User className="absolute -right-4 -bottom-4 w-24 h-24 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
};
