
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

const KurbanKambingTable = () => {
  const { toast } = useToast();
  const { kurbanKambing, updateKurbanKambing, deleteKurbanKambing } = useKelompokKurban();
  
  const [editingKambing, setEditingKambing] = useState<string | null>(null);
  const [editPemilikKambing, setEditPemilikKambing] = useState('');

  const mulaiEditKambing = (kambing: any) => {
    setEditingKambing(kambing.id);
    setEditPemilikKambing(kambing.pemilik);
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

    updateKurbanKambing(id, {
      pemilik: editPemilikKambing.trim()
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
            {sortedKurbanKambing.map((kambing) => (
              <TableRow key={kambing.id}>
                <TableCell>{kambing.nomor}</TableCell>
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
