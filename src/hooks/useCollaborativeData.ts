import { useEffect, useState, useRef } from 'react';
import { useBackup } from '@/contexts/BackupContext';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useYear } from '@/contexts/YearContext';
import { extractBackupYear, findCanonicalBackup, restoredKey } from '@/utils/backupUtils';

export const useCollaborativeData = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastLoadedBackupId, setLastLoadedBackupId] = useState<string | null>(null);
  const { getBackupsList, isLoading, refreshBackups } = useBackup();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { currentYear, ensureYear } = useYear();
  
  const { setPenerimaList } = usePenerima();
  const { loadKelompokSapi, loadKurbanKambing } = useKelompokKurban();
  const { loadTransactions, setSaldoAwal } = useKeuangan();

  const loadBackupData = async (backup: any, isInitial = false) => {
    console.log('Loading backup data:', backup.name);
    console.log('Penerima data in backup:', backup.data.penerima);

    // Load latest data - use setPenerimaList to preserve status
    setPenerimaList(backup.data.penerima || []);
    loadKelompokSapi(backup.data.kelompokSapi || []);
    loadKurbanKambing(backup.data.kurbanKambing || []);
    loadTransactions(backup.data.transactions || []);
    setSaldoAwal(backup.data.saldoAwal);

    setLastLoadedBackupId(backup.id);
    localStorage.setItem(restoredKey(currentYear), backup.id);

    if (!isInitial) {
      console.log('Collaborative data updated:', backup.name);
    }
  };

  const checkForNewBackups = async () => {
    try {
      await refreshBackups();
      const backups = getBackupsList();

      backups.forEach((backup) => {
        const backupYear = extractBackupYear(backup.name);
        if (backupYear) ensureYear(backupYear);
      });
      
      const canonicalBackup = findCanonicalBackup(backups, currentYear);
      if (canonicalBackup) {
        
        // Jika ada backup baru yang berbeda dari yang terakhir dimuat
        if (lastLoadedBackupId && canonicalBackup.id !== lastLoadedBackupId) {
          console.log('New backup detected, loading:', canonicalBackup.name);
          await loadBackupData(canonicalBackup, false);
        }
      }
    } catch (error) {
      console.error('Error checking for new backups:', error);
    }
  };

  useEffect(() => {
    const loadLatestData = async () => {
      if (isLoading) return;

      try {
        const backups = getBackupsList();

        backups.forEach((backup) => {
          const backupYear = extractBackupYear(backup.name);
          if (backupYear) ensureYear(backupYear);
        });

        const canonicalBackup = findCanonicalBackup(backups, currentYear);

        if (canonicalBackup) {
          if (canonicalBackup.id !== lastLoadedBackupId) {
            await loadBackupData(canonicalBackup, !isInitialized);
          }
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
  }, [currentYear, ensureYear, getBackupsList, isInitialized, isLoading, lastLoadedBackupId]);

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
  }, [currentYear, isInitialized, lastLoadedBackupId]);

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
