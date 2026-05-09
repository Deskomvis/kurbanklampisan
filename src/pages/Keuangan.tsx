import React from 'react';
import { SaldoAwalForm } from '@/components/keuangan/SaldoAwalForm';
import { KeuanganTabs } from '@/components/keuangan/KeuanganTabs';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useKeuanganHandlers } from '@/hooks/useKeuanganHandlers';
import { formatRupiah } from '@/utils/keuanganCalculations';
import { Wallet, Landmark, TrendingUp, History } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Keuangan = () => {
  const { isAuthenticated } = useAuth();
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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Landmark className="w-8 h-8 text-green-600" />
            Keuangan & Donasi
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Manajemen transparansi dana kurban, donasi masjid, dan operasional panitia.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100 w-fit">
          <Wallet className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-700">Audit Internal</span>
        </div>
      </div>
      
      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Saldo overview (visible to all) + Audit Log */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 md:top-24 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Saldo Utama</h3>
              </div>
              <SaldoAwalForm
                saldoAwal={saldoAwal}
                setSaldoAwal={(value) => setSaldoAwal(value)}
                keteranganSaldoAwal=""
                setKeteranganSaldoAwal={() => {}}
                isSaldoAwalSet={isSaldoAwalSet}
                onSetSaldoAwal={handleSetSaldoAwal}
                onEditSaldoAwal={handleEditSaldoAwal}
                formatRupiah={formatRupiah}
                isAuthenticated={isAuthenticated}
              />
            </div>

            {isAuthenticated && (
              <div className="p-6 rounded-xl bg-gray-900 text-white shadow-sm relative overflow-hidden hidden lg:block">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <History className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-base font-bold">Audit Log</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-px bg-white/20 relative ml-2">
                        <div className="absolute top-1.5 -left-1 w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400">Transaksi Terakhir</p>
                        <p className="text-sm font-medium text-gray-200 mt-0.5">Input pengeluaran konsumsi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content: Tabs & Lists */}
        <div className="lg:col-span-8">
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
      </div>
    </div>
  );
};

export default Keuangan;
