
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AppData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

export interface BackupItem {
  id: string;
  name: string;
  data: AppData;
  createdAt: string;
}

interface BackupContextType {
  backups: BackupItem[];
  isLoading: boolean;
  saveBackup: (name: string, data: AppData) => Promise<void>;
  loadBackup: (id: string) => BackupItem | undefined;
  deleteBackup: (id: string) => Promise<void>;
  getBackupsList: () => BackupItem[];
  refreshBackups: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch backups from Supabase on component mount
  useEffect(() => {
    refreshBackups();
  }, []);

  const refreshBackups = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('backups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedBackups: BackupItem[] = (data || []).map(backup => ({
        id: backup.id,
        name: backup.name,
        data: backup.data as AppData,
        createdAt: backup.created_at
      }));

      setBackups(formattedBackups);
    } catch (error) {
      console.error('Error fetching backups:', error);
      toast({
        title: "Error",
        description: "Gagal memuat backup dari server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveBackup = async (name: string, data: AppData): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('backups')
        .insert({
          name,
          data: data as any
        });

      if (error) {
        throw error;
      }

      // Refresh the backups list to show the new backup
      await refreshBackups();
      
      toast({
        title: "Berhasil",
        description: "Backup berhasil disimpan ke server",
      });
    } catch (error) {
      console.error('Error saving backup:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan backup ke server",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadBackup = (id: string): BackupItem | undefined => {
    return backups.find(backup => backup.id === id);
  };

  const deleteBackup = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('backups')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setBackups(prev => prev.filter(backup => backup.id !== id));
      
      toast({
        title: "Berhasil",
        description: "Backup berhasil dihapus dari server",
      });
    } catch (error) {
      console.error('Error deleting backup:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus backup dari server",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getBackupsList = (): BackupItem[] => {
    return backups;
  };

  return (
    <BackupContext.Provider value={{
      backups,
      isLoading,
      saveBackup,
      loadBackup,
      deleteBackup,
      getBackupsList,
      refreshBackups
    }}>
      {children}
    </BackupContext.Provider>
  );
};
