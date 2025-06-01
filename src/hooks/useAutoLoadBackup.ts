
import { useEffect, useState } from 'react';
import { useBackup } from '@/contexts/BackupContext';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { AppData } from '@/utils/dataUtils';

export const useAutoLoadBackup = () => {
  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);
  const { autoLoadLatestBackup, isAutoLoading } = useBackup();
  
  // Get context functions to load data
  const { penerima, addPenerima, deletePenerima } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();

  useEffect(() => {
    const autoLoad = async () => {
      // Check if we've already auto-loaded in this session
      const hasLoadedThisSession = sessionStorage.getItem('hasAutoLoadedBackup');
      
      if (!hasLoadedThisSession && !hasAutoLoaded) {
        console.log('Attempting to auto-load latest backup...');
        const success = await autoLoadLatestBackup();
        
        if (success) {
          // Get the backup data that was stored
          const dataStr = localStorage.getItem('autoLoadBackupData');
          if (dataStr) {
            try {
              const backupData: AppData = JSON.parse(dataStr);
              
              // Clear existing data first
              console.log('Clearing existing data...');
              penerima.forEach(p => deletePenerima(p.id));
              kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
              kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
              transactions.forEach(t => deleteTransaction(t.id));

              // Load backup data into contexts
              console.log('Loading backup data into contexts...');
              backupData.penerima.forEach((p: any) => addPenerima(p));
              backupData.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
              backupData.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
              backupData.transactions.forEach((t: any) => addTransaction(t));
              setSaldoAwal(backupData.saldoAwal);

              // Clean up the temporary storage
              localStorage.removeItem('autoLoadBackupData');
              localStorage.removeItem('autoLoadBackupName');
              
              console.log('Auto-load completed successfully');
            } catch (error) {
              console.error('Error parsing auto-loaded backup data:', error);
            }
          }
          
          setHasAutoLoaded(true);
          sessionStorage.setItem('hasAutoLoadedBackup', 'true');
        }
      }
    };

    // Only run auto-load if contexts are ready (have their functions)
    if (addPenerima && addKelompokSapi && addKurbanKambing && addTransaction && setSaldoAwal) {
      autoLoad();
    }
  }, [autoLoadLatestBackup, hasAutoLoaded, addPenerima, addKelompokSapi, addKurbanKambing, addTransaction, setSaldoAwal, penerima, kelompokSapi, kurbanKambing, transactions, deletePenerima, deleteKelompokSapi, deleteKurbanKambing, deleteTransaction]);

  const getAutoLoadedData = (): AppData | null => {
    const dataStr = localStorage.getItem('autoLoadBackupData');
    if (dataStr) {
      try {
        return JSON.parse(dataStr);
      } catch (error) {
        console.error('Error parsing auto-loaded backup data:', error);
        return null;
      }
    }
    return null;
  };

  const clearAutoLoadedData = () => {
    localStorage.removeItem('autoLoadBackupData');
    localStorage.removeItem('autoLoadBackupName');
  };

  return {
    hasAutoLoaded,
    isAutoLoading,
    getAutoLoadedData,
    clearAutoLoadedData
  };
};
