import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X, Plus, Beef, Users } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useAuth } from '@/contexts/AuthContext';

const KelompokSapiTable = () => {
  const { toast } = useToast();
  const { kelompokSapi, updateKelompokSapi, deleteKelompokSapi } = useKelompokKurban();
  const { isAuthenticated } = useAuth();

  const [editingSapi, setEditingSapi] = useState<string | null>(null);
  const [editNomorSapi, setEditNomorSapi] = useState('');
  const [editAnggotaSapi, setEditAnggotaSapi] = useState<string[]>([]);

  const mulaiEditSapi = (kelompok: any) => {
    setEditingSapi(kelompok.id);
    setEditNomorSapi(kelompok.nomor);
    setEditAnggotaSapi([...kelompok.anggota]);
  };

  const simpanEditSapi = (id: string) => {
    if (editNomorSapi.trim() === '') {
      toast({ title: 'Error', description: 'Nomor kelompok tidak boleh kosong', variant: 'destructive' });
      return;
    }
    const sudahAda = kelompokSapi.some(k => k.nomor === editNomorSapi.trim() && k.id !== id);
    if (sudahAda) {
      toast({ title: 'Error', description: 'Nomor kelompok sudah ada', variant: 'destructive' });
      return;
    }
    updateKelompokSapi(id, { nomor: editNomorSapi.trim(), anggota: [...editAnggotaSapi] });
    setEditingSapi(null);
    toast({ title: 'Berhasil', description: 'Kelompok sapi berhasil diupdate' });
  };

  const hapusKelompokSapi = (id: string) => {
    deleteKelompokSapi(id);
    toast({ title: 'Berhasil', description: 'Kelompok sapi berhasil dihapus' });
  };

  const tambahAnggotaEdit = () => setEditAnggotaSapi([...editAnggotaSapi, '']);

  const updateAnggotaEdit = (index: number, value: string) => {
    const next = [...editAnggotaSapi];
    next[index] = value;
    setEditAnggotaSapi(next);
  };

  const hapusAnggotaEdit = (index: number) => {
    const next = editAnggotaSapi.filter((_, i) => i !== index);
    setEditAnggotaSapi(next);
  };

  const sortedKelompokSapi = [...kelompokSapi].sort((a, b) => {
    return (parseInt(a.nomor) || 0) - (parseInt(b.nomor) || 0);
  });

  return (
    <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-row justify-between items-center gap-3 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg shrink-0">
            <Beef className="w-5 h-5 text-orange-700" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Data Kelompok Sapi</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 shrink-0">
          <Users className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold text-gray-800">
            {sortedKelompokSapi.length} <span className="text-gray-500 font-normal">Kelompok</span>
          </span>
        </div>
      </div>

      {sortedKelompokSapi.length === 0 ? (
        <div className="py-12 flex flex-col items-center gap-3 text-gray-400">
          <Beef className="w-10 h-10 text-gray-300" />
          <p className="font-medium text-sm">Belum ada kelompok sapi yang tersimpan</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {sortedKelompokSapi.map((kelompok) => (
            <div key={kelompok.id} className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors">
              {editingSapi === kelompok.id ? (
                /* ── Edit Mode ── */
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-500 shrink-0">No. Sapi</span>
                    <Input
                      value={editNomorSapi}
                      onChange={(e) => setEditNomorSapi(e.target.value)}
                      className="h-9 w-20 rounded-md font-semibold text-center focus:ring-orange-500"
                    />
                    <div className="flex gap-2 ml-auto">
                      <Button
                        onClick={() => simpanEditSapi(kelompok.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-md"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setEditingSapi(null)}
                        variant="outline"
                        size="sm"
                        className="rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Daftar Anggota</p>
                    {editAnggotaSapi.map((anggota, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={anggota}
                          onChange={(e) => updateAnggotaEdit(index, e.target.value)}
                          className="h-9 flex-1 rounded-md font-medium"
                          placeholder={`Nama anggota ${index + 1}`}
                        />
                        <Button
                          onClick={() => hapusAnggotaEdit(index)}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={tambahAnggotaEdit}
                      variant="outline"
                      size="sm"
                      className="w-full rounded-md border-dashed border-gray-300 text-gray-500 hover:text-orange-600 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Tambah Anggota
                    </Button>
                  </div>
                </div>
              ) : (
                /* ── View Mode ── */
                <div className="flex gap-4 items-start">
                  {/* Number badge */}
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 font-bold text-orange-700 text-base">
                      {kelompok.nomor}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400">Sapi</span>
                  </div>

                  {/* Member list */}
                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {kelompok.anggota.map((anggota, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-xs font-semibold text-gray-400 mt-0.5 shrink-0 w-5 text-right">
                            {index + 1}.
                          </span>
                          <span className="text-sm text-gray-800 leading-snug">{anggota}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total + actions */}
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <div className="flex flex-col items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-lg font-bold text-gray-800 leading-none">{kelompok.anggota.length}</span>
                      <span className="text-[10px] font-medium text-gray-500">Orang</span>
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-1.5">
                        <Button
                          onClick={() => mulaiEditSapi(kelompok)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md text-gray-600 hover:text-orange-600"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          onClick={() => hapusKelompokSapi(kelompok.id)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default KelompokSapiTable;
