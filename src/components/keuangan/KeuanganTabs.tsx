import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionInputTab } from './TransactionInputTab';
import { TransactionHistoryTab } from './TransactionHistoryTab';
import { Transaction } from '@/contexts/KeuanganContext';
import { PlusCircle, ListFilter, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface KeuanganTabsProps {
  formData: {
    pemasukan: { tanggal: string; keterangan: string; jumlah: string };
    pengeluaran: { tanggal: string; keterangan: string; jumlah: string; buktiNota: File | null };
    'dana-masjid': { tanggal: string; keterangan: string; jumlah: string };
  };
  updateForm: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', field: string, value: any) => void;
  validateAndSave: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', data: any) => void;
  handleUpdate: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', data: any) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  resetForm: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => void;
  transactions: Transaction[];
  handleEdit: (transaction: any) => void;
  deleteTransaction: (id: number) => void;
  formatRupiah: (amount: number) => string;
  saldoAwal: string;
  isSaldoAwalSet: boolean;
  totalPemasukan: number;
  totalPengeluaran: number;
  totalDanaMasjid: number;
  saldoAkhir: number;
}

export const KeuanganTabs: React.FC<KeuanganTabsProps> = ({
  formData,
  updateForm,
  validateAndSave,
  handleUpdate,
  editingId,
  setEditingId,
  resetForm,
  transactions,
  handleEdit,
  deleteTransaction,
  formatRupiah,
  saldoAwal,
  isSaldoAwalSet,
  totalPemasukan,
  totalPengeluaran,
  totalDanaMasjid,
  saldoAkhir
}) => {
  const { isAuthenticated } = useAuth();

  const txPemasukan = transactions.filter(t => t.type === 'pemasukan' || t.type === 'dana-masjid');
  const txPengeluaran = transactions.filter(t => t.type === 'pengeluaran');

  const sumPemasukan = txPemasukan.filter(t => t.type === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
  const sumDanaMasjid = txPemasukan.filter(t => t.type === 'dana-masjid').reduce((s, t) => s + t.jumlah, 0);
  const sumPengeluaran = txPengeluaran.reduce((s, t) => s + t.jumlah, 0);

  return (
    <Tabs defaultValue={isAuthenticated ? 'input' : 'history'} className="w-full space-y-6">
      <TabsList className={`grid w-full p-1 bg-gray-100 rounded-xl h-12 sm:h-14 ${isAuthenticated ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {isAuthenticated && (
          <TabsTrigger
            value="input"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm font-semibold text-gray-500 flex items-center gap-1.5 transition-all duration-200 text-xs sm:text-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Input</span>
          </TabsTrigger>
        )}
        <TabsTrigger
          value="history"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm font-semibold text-gray-500 flex items-center gap-1.5 transition-all duration-200 text-xs sm:text-sm"
        >
          <ListFilter className="w-3.5 h-3.5 shrink-0" />
          <span>Semua</span>
        </TabsTrigger>
        <TabsTrigger
          value="pemasukan"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm font-semibold text-gray-500 flex items-center gap-1.5 transition-all duration-200 text-xs sm:text-sm"
        >
          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
          <span>Pemasukan</span>
        </TabsTrigger>
        <TabsTrigger
          value="pengeluaran"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-semibold text-gray-500 flex items-center gap-1.5 transition-all duration-200 text-xs sm:text-sm"
        >
          <TrendingDown className="w-3.5 h-3.5 shrink-0" />
          <span>Pengeluaran</span>
        </TabsTrigger>
      </TabsList>

      {isAuthenticated && (
        <TabsContent value="input" className="focus-visible:outline-none">
          <TransactionInputTab
            formData={formData}
            updateForm={updateForm}
            validateAndSave={validateAndSave}
            handleUpdate={handleUpdate}
            editingId={editingId}
            setEditingId={setEditingId}
            resetForm={resetForm}
            transactions={transactions}
          />
        </TabsContent>
      )}

      {/* Semua transaksi */}
      <TabsContent value="history" className="focus-visible:outline-none">
        <TransactionHistoryTab
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
          formatRupiah={formatRupiah}
          saldoAwal={saldoAwal}
          isSaldoAwalSet={isSaldoAwalSet}
          totalPemasukan={totalPemasukan}
          totalPengeluaran={totalPengeluaran}
          totalDanaMasjid={totalDanaMasjid}
          saldoAkhir={saldoAkhir}
        />
      </TabsContent>

      {/* Riwayat pemasukan saja (pemasukan + dana masjid) */}
      <TabsContent value="pemasukan" className="focus-visible:outline-none">
        <TransactionHistoryTab
          transactions={txPemasukan}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
          formatRupiah={formatRupiah}
          saldoAwal=""
          isSaldoAwalSet={false}
          totalPemasukan={sumPemasukan}
          totalPengeluaran={0}
          totalDanaMasjid={sumDanaMasjid}
          saldoAkhir={sumPemasukan + sumDanaMasjid}
        />
      </TabsContent>

      {/* Riwayat pengeluaran saja */}
      <TabsContent value="pengeluaran" className="focus-visible:outline-none">
        <TransactionHistoryTab
          transactions={txPengeluaran}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
          formatRupiah={formatRupiah}
          saldoAwal=""
          isSaldoAwalSet={false}
          totalPemasukan={0}
          totalPengeluaran={sumPengeluaran}
          totalDanaMasjid={0}
          saldoAkhir={-sumPengeluaran}
        />
      </TabsContent>
    </Tabs>
  );
};
