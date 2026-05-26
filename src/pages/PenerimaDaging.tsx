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
import { useInitialData } from '@/hooks/useInitialData';
import { UserCheck, ClipboardList, Filter } from 'lucide-react';
import { useYear } from '@/contexts/YearContext';
import { useAuth } from '@/contexts/AuthContext';

const PenerimaDaging = () => {
  // Load initial data from the images
  useInitialData();
  const { currentYear } = useYear();
  const { isAuthenticated } = useAuth();
  
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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-green-600" />
            Data Penerima Daging
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Manajemen daftar penerima daging kurban untuk wilayah RT 01 & RT 02 / RW 10 Klampisan.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">Periode {currentYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar / Form Area — admin only */}
        {isAuthenticated && (
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 md:top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <ClipboardList className="w-5 h-5 text-green-700" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Formulir Input</h3>
                  </div>
                  <PenerimaForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className={isAuthenticated ? 'lg:col-span-8 space-y-8' : 'lg:col-span-12 space-y-8'}>
          {/* Summary Cards Area */}
          <PenerimaSummary
            totalPenerima={penerima.length}
            rt01Count={groupedPenerima['01']?.length || 0}
            rt02Count={groupedPenerima['02']?.length || 0}
            rt00Count={groupedPenerima['00']?.length || 0}
            tambahanCount={groupedPenerima['tambahan']?.length || 0}
          />

          {/* Filter Bar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Filter className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Filter & Pencarian</h3>
            </div>
            <PenerimaFilters
              filters={filters}
              setFilters={setFilters}
              onResetFilter={handleResetFilter}
              filteredCount={filteredPenerima.length}
            />
          </div>

          {/* Tables Area */}
          <div className="space-y-6">
            {['01', '02', 'tambahan', '00'].map(rt => {
              const penerimaRt = groupedPenerima[rt] || [];
              if (penerimaRt.length === 0 && (rt === 'tambahan' || rt === '00')) return null;
              return (
                <div key={rt} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <PenerimaTable
                    rt={rt}
                    penerima={penerimaRt}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-8 border-t border-gray-100">
            <PenerimaActions />
          </div>
        </div>
      </div>

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
