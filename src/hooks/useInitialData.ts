
import { useEffect } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { initialPenerimaData } from '@/utils/initialPenerimaData';
import { initialKelompokSapiData, initialKurbanKambingData } from '@/utils/initialKelompokData';
import { initialSaldoAwal, initialTransactions } from '@/utils/initialKeuanganData';
import { useToast } from '@/hooks/use-toast';
import { generateUniqueId } from '@/utils/idGenerator';

export const useInitialData = () => {
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing } = useKelompokKurban();
  const { transactions, isSaldoAwalSet, setSaldoAwal, addTransaction } = useKeuangan();
  const { toast } = useToast();

  useEffect(() => {
    if (penerima.length === 0) {
      let rt01Count = 0;
      let rt02Count = 0;

      const processedData = initialPenerimaData.map((penerimaItem) => {
        const processedItem = {
          ...penerimaItem,
          id: generateUniqueId(),
          sudahMenerima: false
        };

        if (penerimaItem.rt === '01') {
          rt01Count++;
        } else if (penerimaItem.rt === '02') {
          rt02Count++;
        }

        return processedItem;
      });

      setPenerimaList(processedData);

      if (processedData.length > 0) {
        toast({
          title: "Data Berhasil Dimuat",
          description: `${processedData.length} penerima berhasil ditambahkan (${rt01Count} dari RT 01 dan ${rt02Count} dari RT 02)`,
        });
      }
    }
  }, [penerima.length, setPenerimaList, toast]);

  useEffect(() => {
    if (kelompokSapi.length === 0) {
      initialKelompokSapiData.forEach((kelompok) => {
        addKelompokSapi(kelompok);
      });
    }
  }, [kelompokSapi.length, addKelompokSapi]);

  useEffect(() => {
    if (kurbanKambing.length === 0) {
      initialKurbanKambingData.forEach((kambing) => {
        addKurbanKambing(kambing);
      });
    }
  }, [kurbanKambing.length, addKurbanKambing]);

  useEffect(() => {
    if (!isSaldoAwalSet && transactions.length === 0) {
      setSaldoAwal(initialSaldoAwal);
      initialTransactions.forEach((trx) => {
        addTransaction(trx);
      });
    }
  }, [isSaldoAwalSet, transactions.length, setSaldoAwal, addTransaction]);
};
