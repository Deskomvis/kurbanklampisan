
import React from 'react';
import { SaldoAwalForm } from '@/components/keuangan/SaldoAwalForm';
import { KeuanganTabs } from '@/components/keuangan/KeuanganTabs';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useKeuanganHandlers } from '@/hooks/useKeuanganHandlers';
import { formatRupiah } from '@/utils/keuanganCalculations';

const Keuangan = () => {
  const {
    transactions,
    saldoAwal,
    isSaldoAwalSet,
    deleteTransaction,
    setSaldoAwal,
    getTotalPengeluaran,
    getTotalPemasukan,
    getTotalDanaMasjid,
    getSaldoAkhir
  } = useKeuangan();

  const {
    editingId,
    setEditingId,
    formData,
    resetForm,
    updateForm,
    validateAndSave,
    handleEdit,
    handleUpdate,
    handleSetSaldoAwal,
    handleEditSaldoAwal
  } = useKeuanganHandlers();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Manajemen Keuangan</h2>
      
      <SaldoAwalForm
        saldoAwal={saldoAwal}
        setSaldoAwal={(value) => setSaldoAwal(value)}
        keteranganSaldoAwal=""
        setKeteranganSaldoAwal={() => {}}
        isSaldoAwalSet={isSaldoAwalSet}
        onSetSaldoAwal={handleSetSaldoAwal}
        onEditSaldoAwal={handleEditSaldoAwal}
        formatRupiah={formatRupiah}
      />

      <KeuanganTabs
        formData={formData}
        updateForm={updateForm}
        validateAndSave={validateAndSave}
        handleUpdate={handleUpdate}
        editingId={editingId}
        setEditingId={setEditingId}
        resetForm={resetForm}
        transactions={transactions}
        handleEdit={handleEdit}
        deleteTransaction={deleteTransaction}
        formatRupiah={formatRupiah}
        saldoAwal={saldoAwal}
        isSaldoAwalSet={isSaldoAwalSet}
        totalPemasukan={getTotalPemasukan()}
        totalPengeluaran={getTotalPengeluaran()}
        totalDanaMasjid={getTotalDanaMasjid()}
        saldoAkhir={getSaldoAkhir()}
      />
    </div>
  );
};

export default Keuangan;
