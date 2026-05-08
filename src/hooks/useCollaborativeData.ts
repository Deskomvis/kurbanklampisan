import { useEffect, useState, useRef } from 'react';
import { useBackup } from '@/contexts/BackupContext';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';

export const useCollaborativeData = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastLoadedBackupId, setLastLoadedBackupId] = useState<string | null>(null);
  const { getBackupsList, isLoading, refreshBackups } = useBackup();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();

  const loadBackupData = async (backup: any, isInitial = false) => {
    console.log('Loading backup data:', backup.name);
    console.log('Penerima data in backup:', backup.data.penerima);
    
    // Clear existing data
    kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
    kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
    transactions.forEach(t => deleteTransaction(t.id));

    // Load latest data - use setPenerimaList to preserve status
    setPenerimaList(backup.data.penerima || []);
    backup.data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
    backup.data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
    backup.data.transactions.forEach((t: any) => addTransaction(t));
    setSaldoAwal(backup.data.saldoAwal);

    setLastLoadedBackupId(backup.id);

    if (!isInitial) {
      console.log('Collaborative data updated:', backup.name);
    }
  };

  const checkForNewBackups = async () => {
    try {
      await refreshBackups();
      const backups = getBackupsList();
      
      if (backups.length > 0) {
        const latestBackup = backups[0];
        
        // Jika ada backup baru yang berbeda dari yang terakhir dimuat
        if (lastLoadedBackupId && latestBackup.id !== lastLoadedBackupId) {
          console.log('New backup detected, loading:', latestBackup.name);
          await loadBackupData(latestBackup, false);
        }
      }
    } catch (error) {
      console.error('Error checking for new backups:', error);
    }
  };

  useEffect(() => {
    const loadLatestData = async () => {
      if (isLoading || isInitialized) return;

      try {
        const backups = getBackupsList();
        
        if (backups.length > 0) {
          // Ambil backup terbaru (sudah diurutkan desc by created_at)
          const latestBackup = backups[0];
          await loadBackupData(latestBackup, true);
        } else {
          console.log('No backup data found, starting with empty data');
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading collaborative data:', error);
        console.log('Starting with local data');
        setIsInitialized(true);
      }
    };

    // Load data setelah backup context siap
    if (!isLoading) {
      loadLatestData();
    }
  }, [isLoading, isInitialized]);

  // Set up periodic checking for new backups
  useEffect(() => {
    if (isInitialized) {
      // Check for new backups every 10 seconds
      intervalRef.current = setInterval(checkForNewBackups, 10000);
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isInitialized, lastLoadedBackupId]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { isInitialized };
};
