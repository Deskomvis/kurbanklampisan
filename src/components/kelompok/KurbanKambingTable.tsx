import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X, ChevronUp, ChevronDown, PawPrint, User } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const KurbanKambingTable = () => {
  const { toast } = useToast();
  const { kurbanKambing, updateKurbanKambing, deleteKurbanKambing, reorderKurbanKambing } = useKelompokKurban();
  const { isAuthenticated } = useAuth();
  
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
    <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <PawPrint className="w-5 h-5 text-blue-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Daftar Kurban Kambing
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
          <User className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-800">
            {sortedKurbanKambing.length} <span className="text-gray-500 font-normal ml-1">Kambing</span>
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 w-24 sm:w-32">No. Urut</TableHead>
              <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500">Nama Pemilik</TableHead>
              {isAuthenticated && <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedKurbanKambing.length > 0 ? (
              sortedKurbanKambing.map((kambing, index) => (
                <TableRow key={kambing.id} className="group border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="px-3 sm:px-6 py-3 sm:py-4">
                    {editingKambing === kambing.id ? (
                      <Input
                        type="number"
                        min="1"
                        max={kurbanKambing.length}
                        value={editNomorKambing}
                        onChange={(e) => setEditNomorKambing(parseInt(e.target.value) || 1)}
                        className="h-9 w-20 rounded-md font-semibold text-center focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 font-bold text-blue-700 text-sm">
                          {kambing.nomor}
                        </span>
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            onClick={() => pindahKeAtas(index)}
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-sm hover:bg-blue-100 text-blue-600"
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => pindahKeBawah(index)}
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-sm hover:bg-blue-100 text-blue-600"
                            disabled={index === sortedKurbanKambing.length - 1}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-3 sm:px-6 py-3 sm:py-4">
                    {editingKambing === kambing.id ? (
                      <Input
                        value={editPemilikKambing}
                        onChange={(e) => setEditPemilikKambing(e.target.value)}
                        className="h-9 w-full rounded-md font-medium"
                        placeholder="Nama pemilik kambing..."
                      />
                    ) : (
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{kambing.pemilik}</p>
                        <p className="text-xs text-gray-500">Pendaftar Kurban Kambing</p>
                      </div>
                    )}
                  </TableCell>
                  {isAuthenticated && <TableCell className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {editingKambing === kambing.id ? (
                        <>
                          <Button
                            onClick={() => simpanEditKambing(kambing.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white rounded-md"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => setEditingKambing(null)}
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
                            onClick={() => mulaiEditKambing(kambing)}
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 sm:h-8 sm:w-8 rounded-md text-gray-600 hover:text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => hapusKurbanKambing(kambing.id)}
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 sm:h-8 sm:w-8 rounded-md text-gray-600 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="px-3 sm:px-6 py-8 sm:py-12 text-center text-gray-400" colSpan={isAuthenticated ? 3 : 2}>
                  <div className="flex flex-col items-center gap-2">
                    <PawPrint className="w-10 h-10 text-gray-300" />
                    <p className="font-medium">Belum ada kurban kambing yang tersimpan</p>
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

export default KurbanKambingTable;
