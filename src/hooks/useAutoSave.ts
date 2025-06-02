
import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { exportData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

export const useAutoSave = () => {
  const { penerima } = usePenerima();
  const { kelompokSapi, kurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet } = useKeuangan();
  const { saveBackup } = useBackup();
  const { toast } = useToast();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSaveRef = useRef<string>('');

  useEffect(() => {
    // Create current data snapshot
    const currentData = JSON.stringify({
      penerima,
      kelompokSapi,
      kurbanKambing,
      transactions,
      saldoAwal,
      isSaldoAwalSet
    });

    // Only save if data has actually changed
    if (currentData !== lastSaveRef.current) {
      lastSaveRef.current = currentData;

      // Clear previous timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Auto-save after 2 seconds of no changes (debounce)
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const data = JSON.parse(exportData(
            penerima,
            kelompokSapi,
            kurbanKambing,
            transactions,
            saldoAwal,
            isSaldoAwalSet
          ));

          const timestamp = new Date().toLocaleString('id-ID');
          await saveBackup(`Auto Save - ${timestamp}`, data);
          
          console.log('Data auto-saved successfully');
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }, 2000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [penerima, kelompokSapi, kurbanKambing, transactions, saldoAwal, isSaldoAwalSet, saveBackup]);
};
