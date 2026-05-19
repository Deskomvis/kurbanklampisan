import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { exportData } from '@/utils/dataUtils';

const AutoSaveWatcher = () => {
  const { penerima } = usePenerima();
  const { kelompokSapi, kurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet } = useKeuangan();
  const { scheduleAutoSave } = useBackup();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const data = JSON.parse(
      exportData(penerima, kelompokSapi, kurbanKambing, transactions, saldoAwal, isSaldoAwalSet)
    );
    scheduleAutoSave(data);
  }, [penerima, kelompokSapi, kurbanKambing, transactions, saldoAwal, isSaldoAwalSet]);

  return null;
};

export default AutoSaveWatcher;
