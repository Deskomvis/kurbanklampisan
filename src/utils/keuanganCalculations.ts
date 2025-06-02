
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotals = (transactions: any[]) => {
  const totalPemasukan = transactions
    .filter(t => t.type === 'pemasukan')
    .reduce((total, t) => total + t.jumlah, 0);
    
  const totalPengeluaran = transactions
    .filter(t => t.type === 'pengeluaran')
    .reduce((total, t) => total + t.jumlah, 0);
    
  const totalDanaMasjid = transactions
    .filter(t => t.type === 'dana-masjid')
    .reduce((total, t) => total + t.jumlah, 0);

  return { totalPemasukan, totalPengeluaran, totalDanaMasjid };
};

export const calculateSaldoAkhir = (
  saldoAwal: number,
  totalPemasukan: number,
  totalPengeluaran: number,
  totalDanaMasjid: number
): number => {
  return saldoAwal + totalPemasukan - totalPengeluaran - totalDanaMasjid;
};
