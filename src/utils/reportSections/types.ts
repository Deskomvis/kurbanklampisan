
import { Penerima } from '@/contexts/PenerimaContext';
import { KelompokSapi, KurbanKambing } from '@/contexts/KelompokKurbanContext';

export interface ReportData {
  penerima: Penerima[];
  kelompokSapi: KelompokSapi[];
  kurbanKambing: KurbanKambing[];
  getTotalSapi: () => number;
  getTotalKambing: () => number;
  transactions: any[];
  saldoAwal: string;
  getTotalPemasukan: () => number;
  getTotalPengeluaran: () => number;
  formatRupiah: (amount: number) => string;
}
