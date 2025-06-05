
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

const KurbanKambingTable = () => {
  const { toast } = useToast();
  const { kurbanKambing, updateKurbanKambing, deleteKurbanKambing, reorderKurbanKambing } = useKelompokKurban();
  
  const [editingKambing, setEditingKambing] = useState<string | null>(null);
  const [editPemilikKambing, setEditPemilikKambing] = useState('');
  const [editNomorKambing, setEditNomorKambing] = useState(1);

  const mulaiEditKambing = (kambing: any) => {
    setEditingKambing(kambing.id);
    setEditPemilikKambing(kambing.pemilik);
    setEditNomorKambing(kambing.nomor);
  };

  const simpanEditKambing = (id: string) => {
    if (editPemilikKambing.trim() === '') {
      toast({
        title: "Error",
        description: "Nama pemilik tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    if (editNomorKambing < 1 || editNomorKambing > kurbanKambing.length) {
      toast({
        title: "Error",
        description: `Nomor urut harus antara 1 sampai ${kurbanKambing.length}`,
        variant: "destructive"
      });
      return;
    }

    updateKurbanKambing(id, {
      pemilik: editPemilikKambing.trim(),
      nomor: editNomorKambing
    });
    
    setEditingKambing(null);
    
    toast({
      title: "Berhasil",
      description: "Kurban kambing berhasil diupdate"
    });
  };

  const hapusKurbanKambing = (id: string) => {
    deleteKurbanKambing(id);
    toast({
      title: "Berhasil",
      description: "Kurban kambing berhasil dihapus"
    });
  };

  const pindahKeAtas = (index: number) => {
    if (index > 0) {
      reorderKurbanKambing(index, index - 1);
      toast({
        title: "Berhasil",
        description: "Urutan berhasil diubah"
      });
    }
  };

  const pindahKeBawah = (index: number) => {
    if (index < sortedKurbanKambing.length - 1) {
      reorderKurbanKambing(index, index + 1);
      toast({
        title: "Berhasil",
        description: "Urutan berhasil diubah"
      });
    }
  };

  const sortedKurbanKambing = [...kurbanKambing].sort((a, b) => a.nomor - b.nomor);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        📋 Daftar Kurban Kambing ({sortedKurbanKambing.length} kambing)
      </h3>
      
      {sortedKurbanKambing.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Nama Pemilik</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedKurbanKambing.map((kambing, index) => (
              <TableRow key={kambing.id}>
                <TableCell>
                  {editingKambing === kambing.id ? (
                    <Input
                      type="number"
                      min="1"
                      max={kurbanKambing.length}
                      value={editNomorKambing}
                      onChange={(e) => setEditNomorKambing(parseInt(e.target.value) || 1)}
                      className="w-20"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{kambing.nomor}</span>
                      <div className="flex flex-col">
                        <Button
                          onClick={() => pindahKeAtas(index)}
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          onClick={() => pindahKeBawah(index)}
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          disabled={index === sortedKurbanKambing.length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingKambing === kambing.id ? (
                    <Input
                      value={editPemilikKambing}
                      onChange={(e) => setEditPemilikKambing(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    kambing.pemilik
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editingKambing === kambing.id ? (
                      <>
                        <Button
                          onClick={() => simpanEditKambing(kambing.id)}
                          variant="default"
                          size="sm"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setEditingKambing(null)}
                          variant="secondary"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => mulaiEditKambing(kambing)}
                          variant="secondary"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => hapusKurbanKambing(kambing.id)}
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
        <p className="text-gray-500 text-center py-4">Belum ada kurban kambing yang tersimpan</p>
      )}
    </Card>
  );
};

export default KurbanKambingTable;
