
import { Transaction } from '@/components/keuangan/types';

export const calculateTotals = (transactions: Transaction[]) => {
  const totalPemasukan = transactions
    .filter(t => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.jumlah, 0);
  
  const totalPengeluaran = transactions
    .filter(t => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.jumlah, 0);

  const totalDanaMasjid = transactions
    .filter(t => t.type === 'dana-masjid')
    .reduce((sum, t) => sum + t.jumlah, 0);

  return {
    totalPemasukan,
    totalPengeluaran,
    totalDanaMasjid
  };
};

export const calculateSaldoAkhir = (
  saldoAwal: string,
  totalPemasukan: number,
  totalPengeluaran: number,
  totalDanaMasjid: number
) => {
  return parseFloat(saldoAwal) + totalPemasukan + totalDanaMasjid - totalPengeluaran;
};

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
