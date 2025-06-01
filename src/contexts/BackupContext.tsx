
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppData } from '@/utils/dataUtils';

export interface BackupItem {
  id: string;
  name: string;
  data: AppData;
  createdAt: string;
}

interface BackupContextType {
  backups: BackupItem[];
  saveBackup: (name: string, data: AppData) => void;
  loadBackup: (id: string) => BackupItem | undefined;
  deleteBackup: (id: string) => void;
  getBackupsList: () => BackupItem[];
}

const BackupContext = createContext<BackupContextType | undefined>(undefined);

export const useBackup = () => {
  const context = useContext(BackupContext);
  if (!context) {
    throw new Error('useBackup must be used within a BackupProvider');
  }
  return context;
};

interface BackupProviderProps {
  children: ReactNode;
}

export const BackupProvider: React.FC<BackupProviderProps> = ({ children }) => {
  const [backups, setBackups] = useState<BackupItem[]>([]);

  const saveBackup = (name: string, data: AppData) => {
    const backup: BackupItem = {
      id: Date.now().toString(),
      name,
      data,
      createdAt: new Date().toISOString()
    };
    setBackups(prev => [backup, ...prev]);
  };

  const loadBackup = (id: string): BackupItem | undefined => {
    return backups.find(backup => backup.id === id);
  };

  const deleteBackup = (id: string) => {
    setBackups(prev => prev.filter(backup => backup.id !== id));
  };

  const getBackupsList = (): BackupItem[] => {
    return backups;
  };

  return (
    <BackupContext.Provider value={{
      backups,
      saveBackup,
      loadBackup,
      deleteBackup,
      getBackupsList
    }}>
      {children}
    </BackupContext.Provider>
  );
};
