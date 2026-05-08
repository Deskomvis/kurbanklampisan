import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionInputTab } from './TransactionInputTab';
import { TransactionHistoryTab } from './TransactionHistoryTab';
import { Transaction } from '@/contexts/KeuanganContext';
import { PlusCircle, ListFilter } from 'lucide-react';

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
  return (
    <Tabs defaultValue="input" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-xl h-12 sm:h-14">
        <TabsTrigger 
          value="input" 
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm font-semibold text-gray-500 flex items-center gap-2 transition-all duration-200"
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          <span>Input Transaksi</span>
        </TabsTrigger>
        <TabsTrigger 
          value="history" 
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm font-semibold text-gray-500 flex items-center gap-2 transition-all duration-200"
        >
          <ListFilter className="w-4 h-4 shrink-0" />
          <span>Riwayat Transaksi</span>
        </TabsTrigger>
      </TabsList>

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
    </Tabs>
  );
};
