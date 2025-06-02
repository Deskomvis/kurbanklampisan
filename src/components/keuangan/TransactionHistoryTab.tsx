
import React from 'react';
import { TransactionSummary } from './TransactionSummary';
import { Transaction } from '@/contexts/KeuanganContext';

interface TransactionHistoryTabProps {
  transactions: Transaction[];
  onEdit: (transaction: any) => void;
  onDelete: (id: number) => void;
  formatRupiah: (amount: number) => string;
  saldoAwal: string;
  isSaldoAwalSet: boolean;
  totalPemasukan: number;
  totalPengeluaran: number;
  totalDanaMasjid: number;
  saldoAkhir: number;
}

export const TransactionHistoryTab: React.FC<TransactionHistoryTabProps> = ({
  transactions,
  onEdit,
  onDelete,
  formatRupiah,
  saldoAwal,
  isSaldoAwalSet,
  totalPemasukan,
  totalPengeluaran,
  totalDanaMasjid,
  saldoAkhir
}) => {
  return (
    <TransactionSummary
      transactions={transactions}
      onEdit={onEdit}
      onDelete={onDelete}
      formatRupiah={formatRupiah}
      saldoAwal={saldoAwal}
      isSaldoAwalSet={isSaldoAwalSet}
      totalPemasukan={totalPemasukan}
      totalPengeluaran={totalPengeluaran}
      totalDanaMasjid={totalDanaMasjid}
      saldoAkhir={saldoAkhir}
    />
  );
};
