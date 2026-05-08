import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X, Plus, Beef, Users } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { cn } from '@/lib/utils';

const KelompokSapiTable = () => {
  const { toast } = useToast();
  const { kelompokSapi, updateKelompokSapi, deleteKelompokSapi } = useKelompokKurban();
  
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
      toast({
        title: "Error",
        description: "Nomor kelompok tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    const sudahAda = kelompokSapi.some(k => k.nomor === editNomorSapi.trim() && k.id !== id);
    if (sudahAda) {
      toast({
        title: "Error",
        description: "Nomor kelompok sudah ada",
        variant: "destructive"
      });
      return;
    }

    updateKelompokSapi(id, {
      nomor: editNomorSapi.trim(),
      anggota: [...editAnggotaSapi]
    });
    
    setEditingSapi(null);
    
    toast({
      title: "Berhasil",
      description: "Kelompok sapi berhasil diupdate"
    });
  };

  const hapusKelompokSapi = (id: string) => {
    deleteKelompokSapi(id);
    toast({
      title: "Berhasil",
      description: "Kelompok sapi berhasil dihapus"
    });
  };

  const tambahAnggotaEdit = () => {
    setEditAnggotaSapi([...editAnggotaSapi, '']);
  };

  const updateAnggotaEdit = (index: number, value: string) => {
    const newAnggota = [...editAnggotaSapi];
    newAnggota[index] = value;
    setEditAnggotaSapi(newAnggota);
  };

  const hapusAnggotaEdit = (index: number) => {
    const newAnggota = editAnggotaSapi.filter((_, i) => i !== index);
    setEditAnggotaSapi(newAnggota);
  };

  const sortedKelompokSapi = [...kelompokSapi].sort((a, b) => {
    const nomorA = parseInt(a.nomor) || 0;
    const nomorB = parseInt(b.nomor) || 0;
    return nomorA - nomorB;
  });

  return (
    <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Beef className="w-5 h-5 text-orange-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Data Kelompok Sapi
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
          <Users className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold text-gray-800">
            {sortedKelompokSapi.length} <span className="text-gray-500 font-normal ml-1">Kelompok</span>
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-500 w-32">No. Sapi</TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-500">Daftar Anggota</TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-500 w-24">Total</TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-500 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedKelompokSapi.length > 0 ? (
              sortedKelompokSapi.map((kelompok) => (
                <TableRow key={kelompok.id} className="group border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="px-6 py-4 align-top">
                    {editingSapi === kelompok.id ? (
                      <Input
                        value={editNomorSapi}
                        onChange={(e) => setEditNomorSapi(e.target.value)}
                        className="h-9 w-16 rounded-md font-semibold text-center focus:ring-orange-500"
                      />
                    ) : (
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 font-bold text-orange-700 text-base">
                        {kelompok.nomor}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {editingSapi === kelompok.id ? (
                      <div className="space-y-2">
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
                              className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
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
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {kelompok.anggota.map((anggota, index) => (
                          <div key={index} className="flex items-center gap-2 group/member">
                            <span className="text-xs font-semibold text-gray-400 w-4">{index + 1}.</span>
                            <span className="text-sm font-medium text-gray-800">
                              {anggota}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="inline-flex flex-col">
                      <span className="text-lg font-bold text-gray-800">{kelompok.anggota.length}</span>
                      <span className="text-xs font-medium text-gray-500">Orang</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top text-right">
                    <div className="flex justify-end gap-2">
                      {editingSapi === kelompok.id ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => mulaiEditSapi(kelompok)}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md text-gray-600 hover:text-orange-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => hapusKelompokSapi(kelompok.id)}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-md text-gray-600 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="px-6 py-12 text-center text-gray-400" colSpan={4}>
                  <div className="flex flex-col items-center gap-2">
                    <Beef className="w-10 h-10 text-gray-300" />
                    <p className="font-medium">Belum ada kelompok sapi yang tersimpan</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default KelompokSapiTable;
