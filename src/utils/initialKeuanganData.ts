import { Transaction } from '@/contexts/KeuanganContext';

export const initialSaldoAwal = '2560100';

export const initialTransactions: Omit<Transaction, 'id'>[] = [
  // Pemasukan
  { tanggal: '2025-06-06', keterangan: 'Pendapatan Operasional Sapi', jumlah: 3000000, type: 'pemasukan' },
  { tanggal: '2025-06-06', keterangan: 'Pendapatan Operasional Kambing', jumlah: 950000, type: 'pemasukan' },
  { tanggal: '2025-06-06', keterangan: 'Sumbangan Bu Rustiyanti', jumlah: 150000, type: 'pemasukan' },
  { tanggal: '2025-06-06', keterangan: 'Pemasukan Kulit Kurban', jumlah: 472000, type: 'pemasukan' },

  // Pengeluaran
  { tanggal: '2025-05-01', keterangan: 'Print Realita', jumlah: 4100, type: 'pengeluaran' },
  { tanggal: '2025-05-01', keterangan: 'Belanja Rapat Kecil', jumlah: 180000, type: 'pengeluaran' },
  { tanggal: '2025-05-01', keterangan: 'Konsumsi', jumlah: 269000, type: 'pengeluaran' },
  { tanggal: '2025-05-10', keterangan: 'Belanja Rapat Besar', jumlah: 425000, type: 'pengeluaran' },
  { tanggal: '2025-05-10', keterangan: 'Print Realita', jumlah: 39000, type: 'pengeluaran' },
  { tanggal: '2025-05-15', keterangan: 'Penyiapan Tempat Kurban', jumlah: 269000, type: 'pengeluaran' },
  { tanggal: '2025-05-15', keterangan: 'Transport Pembagian Undangan', jumlah: 20000, type: 'pengeluaran' },
  { tanggal: '2025-05-20', keterangan: 'Konsumsi Rapat Besar', jumlah: 700000, type: 'pengeluaran' },
  { tanggal: '2025-05-25', keterangan: 'Sunlight & Wipol', jumlah: 80000, type: 'pengeluaran' },
  { tanggal: '2025-05-25', keterangan: '5 Ember', jumlah: 125000, type: 'pengeluaran' },
  { tanggal: '2025-05-25', keterangan: 'Beli Bendrat', jumlah: 10000, type: 'pengeluaran' },
  { tanggal: '2025-05-25', keterangan: 'Beli 10 Bambu', jumlah: 140000, type: 'pengeluaran' },
  { tanggal: '2025-05-25', keterangan: 'Bensin Operasional', jumlah: 15000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Snack Kerja Bakti', jumlah: 100000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Teh Kerja Bakti', jumlah: 50000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Pembuatan Spanduk MMT', jumlah: 230000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Beli Bendrat', jumlah: 12000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Tali Tambang', jumlah: 67000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Sapu dan Sikat', jumlah: 66000, type: 'pengeluaran' },
  { tanggal: '2025-06-01', keterangan: 'Transport Bensin Operasional', jumlah: 15000, type: 'pengeluaran' },
  { tanggal: '2025-06-05', keterangan: 'Rokok Penjaga Malam', jumlah: 71000, type: 'pengeluaran' },
  { tanggal: '2025-06-06', keterangan: 'Konsumsi Siang Hari H', jumlah: 1200000, type: 'pengeluaran' },
  { tanggal: '2025-06-07', keterangan: 'Konsumsi Musyawarah Pembubaran Panitia', jumlah: 19000, type: 'pengeluaran' },
  { tanggal: '2025-06-07', keterangan: 'Roti Bakar Persiapan Pembubaran', jumlah: 16000, type: 'pengeluaran' },
  { tanggal: '2025-06-06', keterangan: 'Tenaga Bantu Bp. Tono', jumlah: 100000, type: 'pengeluaran' },
  { tanggal: '2025-06-06', keterangan: 'Tenaga Bantu Ust. Andika', jumlah: 200000, type: 'pengeluaran' },
  { tanggal: '2025-06-06', keterangan: 'Beli Bis Beton 60x50 & Perlengkapan', jumlah: 542000, type: 'pengeluaran' },
];
