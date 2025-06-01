
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { EditPenerimaDialog } from '@/components/penerima/EditPenerimaDialog';
import { useToast } from '@/hooks/use-toast';

const PenerimaDaging = () => {
  const { penerima, addPenerima, updatePenerima, deletePenerima } = usePenerima();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nomorPengambilan: '',
    nama: '',
    rt: '',
    blok: ''
  });
  
  const [filters, setFilters] = useState({
    rt: '',
    search: ''
  });
  
  const [editingPenerima, setEditingPenerima] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nama && formData.rt && formData.nomorPengambilan) {
      addPenerima(formData);
      setFormData({
        nomorPengambilan: '',
        nama: '',
        rt: '',
        blok: ''
      });
      toast({
        title: "Berhasil",
        description: "Penerima berhasil ditambahkan",
      });
    } else {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (penerimaItem) => {
    setEditingPenerima(penerimaItem);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePenerima(id);
    toast({
      title: "Berhasil",
      description: "Penerima berhasil dihapus",
    });
  };

  const handleResetFilter = () => {
    setFilters({ rt: '', search: '' });
  };

  const filteredPenerima = filterPenerima(penerima, filters);
  const groupedPenerima = groupByRt(filteredPenerima);
  
  const totalBelumMenerima = penerima.filter(p => !p.sudahMenerima).length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Daftar Penerima Daging Kurban 2025</h2>
      <p className="text-sm text-gray-600">RT 01 & RT 02 / RW 10 Klampisan</p>

      {/* Tambah Penerima */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
          📝 Tambah Penerima
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NOMOR PENGAMBILAN: <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.nomorPengambilan}
                onChange={(e) => setFormData({ ...formData, nomorPengambilan: e.target.value })}
                placeholder="Nomor urut pengambilan"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NAMA PENERIMA: <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Nama lengkap penerima"
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RT: <span className="text-red-500">*</span>
              </label>
              <Select value={formData.rt} onValueChange={(value) => setFormData({ ...formData, rt: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Pilih RT --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">RT 01</SelectItem>
                  <SelectItem value="02">RT 02</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BLOK:
              </label>
              <Input
                type="text"
                value={formData.blok}
                onChange={(e) => setFormData({ ...formData, blok: e.target.value })}
                placeholder="Contoh: A, B, C"
                className="w-full"
              />
            </div>
          </div>
          
          <Button type="submit" className="bg-green-600 hover:bg-green-700 mt-4">
            💾 Simpan Penerima
          </Button>
        </form>
      </Card>

      {/* Filter dan Pencarian */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter berdasarkan RT:
            </label>
            <Select value={filters.rt} onValueChange={(value) => setFilters({ ...filters, rt: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Semua RT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua RT</SelectItem>
                <SelectItem value="01">RT 01</SelectItem>
                <SelectItem value="02">RT 02</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cari (Nomor/Nama/Blok):
            </label>
            <Input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Ketik nomor, nama, atau blok..."
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetFilter}>
            🔄 Reset Filter
          </Button>
          <span className="text-sm text-gray-600 flex items-center">
            {filteredPenerima.length} total penerima
          </span>
        </div>
      </Card>

      {/* Daftar Penerima per RT */}
      {['01', '02'].map(rt => {
        const penerimaRt = groupedPenerima[rt] || [];
        return (
          <Card key={rt} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700">RT {rt} / 10 KLAMPISAN</h3>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                {penerimaRt.length} penerima
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-600">
                    <TableHead className="text-white">NOMOR</TableHead>
                    <TableHead className="text-white">NAMA PENERIMA</TableHead>
                    <TableHead className="text-white">BLOK</TableHead>
                    <TableHead className="text-white">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {penerimaRt.length > 0 ? (
                    penerimaRt.map((penerimaItem) => (
                      <TableRow key={penerimaItem.id}>
                        <TableCell>{penerimaItem.nomorPengambilan}</TableCell>
                        <TableCell>{penerimaItem.nama}</TableCell>
                        <TableCell>{penerimaItem.blok || '-'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(penerimaItem)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(penerimaItem.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-center text-gray-500" colSpan={4}>
                        Tidak ada data penerima untuk RT ini
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        );
      })}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-600 text-white text-center">
          <div className="text-2xl font-bold">{penerima.length}</div>
          <div className="text-green-100">Total Penerima</div>
        </Card>
        <Card className="p-4 bg-green-600 text-white text-center">
          <div className="text-2xl font-bold">{groupedPenerima['01']?.length || 0}</div>
          <div className="text-green-100">RT 01</div>
        </Card>
        <Card className="p-4 bg-green-600 text-white text-center">
          <div className="text-2xl font-bold">{groupedPenerima['02']?.length || 0}</div>
          <div className="text-green-100">RT 02</div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button className="bg-green-600 hover:bg-green-700">
          📄 Cetak Daftar Penerima
        </Button>
        <Button variant="secondary">
          📊 Export Excel
        </Button>
        <Button variant="destructive">
          🗑️ Kosongkan Semua Data
        </Button>
      </div>

      {/* Edit Dialog */}
      <EditPenerimaDialog
        penerima={editingPenerima}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingPenerima(null);
        }}
        onSave={updatePenerima}
      />
    </div>
  );
};

export default PenerimaDaging;
