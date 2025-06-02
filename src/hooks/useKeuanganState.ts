
import { useState } from 'react';

export interface TransactionFormState {
  tanggal: string;
  keterangan: string;
  jumlah: string;
  buktiNota?: File | null;
}

export const useKeuanganState = () => {
  const [pemasukan, setPemasukan] = useState<TransactionFormState>({
    tanggal: '01/06/2025',
    keterangan: '',
    jumlah: '0'
  });

  const [pengeluaran, setPengeluaran] = useState<TransactionFormState>({
    tanggal: '01/06/2025',
    keterangan: '',
    jumlah: '0',
    buktiNota: null
  });

  const [danaMasjid, setDanaMasjid] = useState<TransactionFormState>({
    tanggal: '01/06/2025',
    keterangan: '',
    jumlah: '0'
  });

  const [saldoAwal, setSaldoAwal] = useState<TransactionFormState>({
    tanggal: '',
    keterangan: '',
    jumlah: '0'
  });

  const [isSaldoAwalSet, setIsSaldoAwalSet] = useState<boolean>(false);

  const resetForm = (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => {
    const resetState = {
      tanggal: '01/06/2025',
      keterangan: '',
      jumlah: '0'
    };

    switch (type) {
      case 'pemasukan':
        setPemasukan(resetState);
        break;
      case 'pengeluaran':
        setPengeluaran({ ...resetState, buktiNota: null });
        break;
      case 'dana-masjid':
        setDanaMasjid(resetState);
        break;
    }
  };

  const updateForm = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    field: keyof TransactionFormState,
    value: any
  ) => {
    switch (type) {
      case 'pemasukan':
        setPemasukan(prev => ({ ...prev, [field]: value }));
        break;
      case 'pengeluaran':
        setPengeluaran(prev => ({ ...prev, [field]: value }));
        break;
      case 'dana-masjid':
        setDanaMasjid(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  return {
    pemasukan,
    pengeluaran,
    danaMasjid,
    saldoAwal,
    isSaldoAwalSet,
    setPemasukan,
    setPengeluaran,
    setDanaMasjid,
    setSaldoAwal,
    setIsSaldoAwalSet,
    resetForm,
    updateForm
  };
};
