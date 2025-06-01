
import React, { useState } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { filterPenerima, groupByRt } from '@/utils/filterUtils';
import { EditPenerimaDialog } from '@/components/penerima/EditPenerimaDialog';
import { PenerimaForm } from '@/components/penerima/PenerimaForm';
import { PenerimaFilters } from '@/components/penerima/PenerimaFilters';
import { PenerimaTable } from '@/components/penerima/PenerimaTable';
import { PenerimaSummary } from '@/components/penerima/PenerimaSummary';
import { PenerimaActions } from '@/components/penerima/PenerimaActions';
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

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">Daftar Penerima Daging</h2>
        <p className="text-sm text-gray-600">RT 01 & RT 02 / RW 10 Klampisan - Kurban 2025</p>
      </div>

      <PenerimaForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      <PenerimaFilters
        filters={filters}
        setFilters={setFilters}
        onResetFilter={handleResetFilter}
        filteredCount={filteredPenerima.length}
      />

      {['01', '02', 'tambahan'].map(rt => {
        const penerimaRt = groupedPenerima[rt] || [];
        return (
          <PenerimaTable
            key={rt}
            rt={rt}
            penerima={penerimaRt}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      })}

      <PenerimaSummary
        totalPenerima={penerima.length}
        rt01Count={groupedPenerima['01']?.length || 0}
        rt02Count={groupedPenerima['02']?.length || 0}
        tambahanCount={groupedPenerima['tambahan']?.length || 0}
      />

      <PenerimaActions />

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
