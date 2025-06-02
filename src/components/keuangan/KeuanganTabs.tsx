
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionInputTab } from './TransactionInputTab';
import { TransactionHistoryTab } from './TransactionHistoryTab';
import { Transaction } from '@/contexts/KeuanganContext';

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
    <Tabs defaultValue="input" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="input">Input Transaksi</TabsTrigger>
        <TabsTrigger value="history">Riwayat Transaksi</TabsTrigger>
      </TabsList>

      <TabsContent value="input">
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

      <TabsContent value="history">
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
