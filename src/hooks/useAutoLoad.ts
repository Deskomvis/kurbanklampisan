
import { useEffect, useState } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useToast } from '@/hooks/use-toast';
import { generateUniqueId } from '@/utils/idGenerator';

export const useAutoLoad = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, setSaldoAwal, loadTransactions } = useKeuangan();
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
        kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
        kurbanKambing.forEach(k => deleteKurbanKambing(k.id));

        // Load penerima data with proper ID handling
        if (latestBackup.data.penerima && latestBackup.data.penerima.length > 0) {
          const penerimaWithIds = latestBackup.data.penerima.map((p: any) => ({
            ...p,
            id: p.id || generateUniqueId()
          }));
          setPenerimaList(penerimaWithIds);
        }

        // Load other data
        latestBackup.data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
        latestBackup.data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
        
        // Use the new loadTransactions method instead of adding individually
        if (latestBackup.data.transactions && latestBackup.data.transactions.length > 0) {
          loadTransactions(latestBackup.data.transactions);
        }
        
        setSaldoAwal(latestBackup.data.saldoAwal || '');

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
  }, [getBackupsList, hasLoaded, setPenerimaList, kelompokSapi, kurbanKambing, deleteKelompokSapi, deleteKurbanKambing, addKelompokSapi, addKurbanKambing, loadTransactions, setSaldoAwal, toast]);

  return { hasLoaded };
};
