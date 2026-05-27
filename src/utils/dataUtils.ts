
import { Penerima } from '@/contexts/PenerimaContext';
import { KelompokSapi, KurbanKambing } from '@/contexts/KelompokKurbanContext';
import { Transaction } from '@/contexts/KeuanganContext';

export interface AppData {
  penerima: Penerima[];
  kelompokSapi: KelompokSapi[];
  kurbanKambing: KurbanKambing[];
  transactions: Transaction[];
  year?: string;
  saldoAwal: string;
  isSaldoAwalSet: boolean;
  exportDate: string;
  version: string;
}

export const exportData = (
  penerima: Penerima[],
  kelompokSapi: KelompokSapi[],
  kurbanKambing: KurbanKambing[],
  transactions: Transaction[],
  saldoAwal: string,
  isSaldoAwalSet: boolean,
  year?: string
): string => {
  const data: AppData = {
    penerima,
    kelompokSapi,
    kurbanKambing,
    transactions,
    year,
    saldoAwal,
    isSaldoAwalSet,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  return JSON.stringify(data, null, 2);
};

export const downloadJSON = (data: string, filename: string) => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateImportData = (data: any): data is AppData => {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.penerima) &&
    Array.isArray(data.kelompokSapi) &&
    Array.isArray(data.kurbanKambing) &&
    Array.isArray(data.transactions) &&
    typeof data.saldoAwal === 'string' &&
    typeof data.isSaldoAwalSet === 'boolean'
  );
};
