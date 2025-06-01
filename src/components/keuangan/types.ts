
export interface Transaction {
  id: number;
  tanggal: string;
  keterangan: string;
  jumlah: number;
  type: 'pemasukan' | 'pengeluaran' | 'dana-masjid';
  buktiNota?: File | null;
}
