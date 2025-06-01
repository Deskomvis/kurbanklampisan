
import { useEffect, useState } from 'react';
import { useBackup } from '@/contexts/BackupContext';
import { AppData } from '@/utils/dataUtils';

export const useAutoLoadBackup = () => {
  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);
  const { autoLoadLatestBackup, isAutoLoading } = useBackup();

  useEffect(() => {
    const autoLoad = async () => {
      // Check if we've already auto-loaded in this session
      const hasLoadedThisSession = sessionStorage.getItem('hasAutoLoadedBackup');
      
      if (!hasLoadedThisSession && !hasAutoLoaded) {
        const success = await autoLoadLatestBackup();
        if (success) {
          setHasAutoLoaded(true);
          sessionStorage.setItem('hasAutoLoadedBackup', 'true');
        }
      }
    };

    autoLoad();
  }, [autoLoadLatestBackup, hasAutoLoaded]);

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
