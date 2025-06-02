
import { useEffect, useState } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useToast } from '@/hooks/use-toast';

export const useAutoLoad = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { penerima, addPenerima, deletePenerima } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();
  const { getBackupsList } = useBackup();
  const { toast } = useToast();

  useEffect(() => {
    const loadLatestBackup = async () => {
      if (hasLoaded) return;

      try {
        const backups = getBackupsList();
        if (backups.length === 0) {
          setHasLoaded(true);
          return;
        }

        // Get the latest backup
        const latestBackup = backups[0];
        
        // Clear existing data
        penerima.forEach(p => deletePenerima(p.id));
        kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
        kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
        transactions.forEach(t => deleteTransaction(t.id));

        // Load backup data
        latestBackup.data.penerima.forEach((p: any) => addPenerima(p));
        latestBackup.data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
        latestBackup.data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
        latestBackup.data.transactions.forEach((t: any) => addTransaction(t));
        setSaldoAwal(latestBackup.data.saldoAwal);

        toast({
          title: "Data Dimuat",
          description: `Data terakhir dari "${latestBackup.name}" berhasil dimuat`,
        });

        setHasLoaded(true);
      } catch (error) {
        console.error('Auto-load failed:', error);
        setHasLoaded(true);
      }
    };

    // Load data after contexts are ready
    if (getBackupsList().length >= 0) {
      loadLatestBackup();
    }
  }, [getBackupsList, hasLoaded]);

  return { hasLoaded };
};
