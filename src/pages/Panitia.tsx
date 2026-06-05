import React, { useState } from 'react';
import { PanitiaHeader } from '@/components/panitia/PanitiaHeader';
import { PanitiaCard } from '@/components/panitia/PanitiaCard';
import { InformasiTambahan } from '@/components/panitia/InformasiTambahan';
import { usePanitia, PanitiaHeaderInfo } from '@/contexts/PanitiaContext';
import { PanitiaItem } from '@/data/panitiaData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Users, Gavel, FileCheck, Pencil, Check, X, Plus, Printer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useYear } from '@/contexts/YearContext';
import { printPanitia } from '@/utils/printPanitia';

const Panitia = () => {
  const { panitiaList, headerInfo, setPanitiaList, updateHeader } = usePanitia();
  const { isAuthenticated } = useAuth();
  const { currentYear } = useYear();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editList, setEditList] = useState<PanitiaItem[]>([]);
  const [editHeader, setEditHeader] = useState<PanitiaHeaderInfo>(headerInfo);

  const startEdit = () => {
    setEditList(panitiaList.map(item => ({ jabatan: item.jabatan, nama: [...item.nama] })));
    setEditHeader({ ...headerInfo });
    setIsEditing(true);
  };

  const saveEdit = () => {
    const cleaned = editList.filter(item => item.jabatan.trim() !== '');
    setPanitiaList(cleaned);
    updateHeader(editHeader);
    setIsEditing(false);
    toast({ title: 'Tersimpan', description: 'Susunan panitia berhasil diperbarui.' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const updateItem = (index: number, item: PanitiaItem) => {
    const next = [...editList];
    next[index] = item;
    setEditList(next);
  };

  const deleteItem = (index: number) => {
    setEditList(editList.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setEditList([...editList, { jabatan: '', nama: [''] }]);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Struktur Panitia
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Hasil musyawarah dan penunjukan tim pelaksana kurban Masjid Istiqomah Klampisan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={cancelEdit} className="flex items-center gap-1.5 border-gray-200">
                <X className="w-4 h-4" /> Batal
              </Button>
              <Button size="sm" onClick={saveEdit} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                <Check className="w-4 h-4" /> Simpan
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
                <Gavel className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Keputusan Musyawarah</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => printPanitia(panitiaList, headerInfo, currentYear)} className="flex items-center gap-1.5 border-gray-200 text-gray-600 hover:text-gray-900">
                <Printer className="w-4 h-4" /> Cetak
              </Button>
              {isAuthenticated && (
                <Button variant="outline" size="sm" onClick={startEdit} className="flex items-center gap-1.5 border-gray-200 text-gray-600 hover:text-gray-900">
                  <Pencil className="w-4 h-4" /> Edit Susunan
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-8">
          <PanitiaHeader isEditing={isEditing} editHeader={editHeader} onChangeHeader={setEditHeader} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(isEditing ? editList : panitiaList).map((item, index) => (
              <PanitiaCard
                key={index}
                item={item}
                isEditing={isEditing}
                onUpdate={(updated) => updateItem(index, updated)}
                onDelete={() => deleteItem(index)}
              />
            ))}
          </div>

          {isEditing && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={addItem}
                className="flex items-center gap-2 border-dashed border-gray-300 text-gray-500 hover:text-green-700 hover:border-green-400 h-12 px-6"
              >
                <Plus className="w-4 h-4" />
                Tambah Jabatan Baru
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileCheck className="w-5 h-5 text-green-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Klausul & Informasi</h3>
        </div>
        <InformasiTambahan />
      </div>
    </div>
  );
};

export default Panitia;
