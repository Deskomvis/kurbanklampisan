
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

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
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        📋 Daftar Kelompok Sapi ({sortedKelompokSapi.length} kelompok)
      </h3>
      
      {sortedKelompokSapi.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Kelompok</TableHead>
              <TableHead>Anggota</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedKelompokSapi.map((kelompok) => (
              <TableRow key={kelompok.id}>
                <TableCell>
                  {editingSapi === kelompok.id ? (
                    <Input
                      value={editNomorSapi}
                      onChange={(e) => setEditNomorSapi(e.target.value)}
                      className="w-20"
                    />
                  ) : (
                    kelompok.nomor
                  )}
                </TableCell>
                <TableCell>
                  {editingSapi === kelompok.id ? (
                    <div className="space-y-2">
                      {editAnggotaSapi.map((anggota, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={anggota}
                            onChange={(e) => updateAnggotaEdit(index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => hapusAnggotaEdit(index)}
                            variant="destructive"
                            size="sm"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={tambahAnggotaEdit}
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        + Tambah Anggota
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {kelompok.anggota.map((anggota, index) => (
                        <div key={index} className="text-sm">
                          {index + 1}. {anggota}
                        </div>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>{kelompok.anggota.length} orang</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editingSapi === kelompok.id ? (
                      <>
                        <Button
                          onClick={() => simpanEditSapi(kelompok.id)}
                          variant="default"
                          size="sm"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setEditingSapi(null)}
                          variant="secondary"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => mulaiEditSapi(kelompok)}
                          variant="secondary"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => hapusKelompokSapi(kelompok.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500 text-center py-4">Belum ada kelompok sapi yang tersimpan</p>
      )}
    </Card>
  );
};

export default KelompokSapiTable;
