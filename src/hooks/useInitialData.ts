
import { useEffect } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useYear } from '@/contexts/YearContext';
import { initialPenerimaData } from '@/utils/initialPenerimaData';
import { initialKelompokSapiData, initialKurbanKambingData } from '@/utils/initialKelompokData';
import { initialSaldoAwal, initialTransactions } from '@/utils/initialKeuanganData';
import { useToast } from '@/hooks/use-toast';
import { generateUniqueId } from '@/utils/idGenerator';

export const useInitialData = () => {
  const { currentYear } = useYear();
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing } = useKelompokKurban();
  const { transactions, isSaldoAwalSet, setSaldoAwal, addTransaction } = useKeuangan();
  const { toast } = useToast();

  // Load penerima awal hanya jika kosong
  // Untuk tahun 2025 (sudah terlaksana), semua langsung ditandai sudahMenerima=true
  useEffect(() => {
    if (penerima.length === 0) {
      let rt01Count = 0;
      let rt02Count = 0;
      const alreadyDone = currentYear === '2025';

      const processedData = initialPenerimaData.map((penerimaItem) => {
        if (penerimaItem.rt === '01') rt01Count++;
        else if (penerimaItem.rt === '02') rt02Count++;
        return { ...penerimaItem, id: generateUniqueId(), sudahMenerima: alreadyDone };
      });

      setPenerimaList(processedData);

      if (processedData.length > 0) {
        toast({
          title: 'Data Berhasil Dimuat',
          description: `${processedData.length} penerima ditambahkan (RT 01: ${rt01Count}, RT 02: ${rt02Count})`,
        });
      }
    }
  }, [penerima.length, setPenerimaList, toast, currentYear]);

  // Load data kelompok & keuangan hanya untuk tahun 2025 (tahun dasar)
  useEffect(() => {
    if (currentYear === '2025' && kelompokSapi.length === 0) {
      initialKelompokSapiData.forEach((kelompok) => addKelompokSapi(kelompok));
    }
  }, [currentYear, kelompokSapi.length, addKelompokSapi]);

  useEffect(() => {
    if (currentYear === '2025' && kurbanKambing.length === 0) {
      initialKurbanKambingData.forEach((kambing) => addKurbanKambing(kambing));
    }
  }, [currentYear, kurbanKambing.length, addKurbanKambing]);

  useEffect(() => {
    if (currentYear === '2025' && !isSaldoAwalSet && transactions.length === 0) {
      setSaldoAwal(initialSaldoAwal);
      initialTransactions.forEach((trx) => addTransaction(trx));
    }
  }, [currentYear, isSaldoAwalSet, transactions.length, setSaldoAwal, addTransaction]);
};
