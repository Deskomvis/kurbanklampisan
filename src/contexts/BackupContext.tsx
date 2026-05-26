
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
  saveBackup: (name: string, data: AppData) => Promise<string | null>;
  saveNow: (data: AppData, year?: string) => Promise<string | null>;
  loadBackup: (id: string) => BackupItem | undefined;
  deleteBackup: (id: string) => Promise<void>;
  getBackupsList: () => BackupItem[];
  refreshBackups: () => Promise<void>;
}

const BackupContext = createContext<BackupContextType | undefined>(undefined);

export const useBackup = () => {
  const context = useContext(BackupContext);
  if (!context) throw new Error('useBackup must be used within a BackupProvider');
  return context;
};

const AUTO_SAVE_PREFIX = 'Auto - ';
const MAX_AUTO_SAVES = 15;

export const BackupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backups, setBackups] = useState<BackupItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

      if (error) throw error;

      setBackups((data || []).map(b => ({
        id: b.id,
        name: b.name,
        data: b.data as unknown as AppData,
        createdAt: b.created_at,
      })));
    } catch {
      toast({ title: 'Error', description: 'Gagal memuat backup dari server', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  // Save a named manual backup (visible in history)
  const saveBackup = async (name: string, data: AppData): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { data: inserted, error } = await supabase
        .from('backups')
        .insert({ name, data: data as unknown as any })
        .select('id')
        .single();
      if (error) throw error;
      await refreshBackups();
      toast({ title: 'Berhasil', description: 'Backup berhasil disimpan ke server' });
      return (inserted as { id: string } | null)?.id ?? null;
    } catch {
      toast({ title: 'Error', description: 'Gagal menyimpan backup ke server', variant: 'destructive' });
      throw new Error('save failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Save current snapshot immediately (called by Update button)
  const saveNow = async (data: AppData, year?: string): Promise<string | null> => {
    try {
      // Trim oldest auto-saves if over limit
      const { data: existing } = await supabase
        .from('backups')
        .select('id')
        .like('name', `${AUTO_SAVE_PREFIX}%`)
        .order('created_at', { ascending: true });

      if (existing && existing.length >= MAX_AUTO_SAVES) {
        const idsToDelete = existing
          .slice(0, existing.length - MAX_AUTO_SAVES + 1)
          .map((r: { id: string }) => r.id);
        await supabase.from('backups').delete().in('id', idsToDelete);
      }

      const yearTag = year ? `${year} - ` : '';
      const name = `${AUTO_SAVE_PREFIX}${yearTag}${new Date().toLocaleString('id-ID')}`;
      const { data: inserted, error } = await supabase
        .from('backups')
        .insert({ name, data: data as unknown as any })
        .select('id')
        .single();
      if (error) throw error;
      await refreshBackups();
      return (inserted as { id: string } | null)?.id ?? null;
    } catch (err) {
      console.error('saveNow failed:', err);
      throw err;
    }
  };

  const loadBackup = (id: string) => backups.find(b => b.id === id);

  const deleteBackup = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from('backups').delete().eq('id', id);
      if (error) throw error;
      setBackups(prev => prev.filter(b => b.id !== id));
      toast({ title: 'Berhasil', description: 'Backup berhasil dihapus dari server' });
    } catch {
      toast({ title: 'Error', description: 'Gagal menghapus backup dari server', variant: 'destructive' });
      throw new Error('delete failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getBackupsList = () => backups;

  return (
    <BackupContext.Provider value={{
      backups, isLoading,
      saveBackup, saveNow,
      loadBackup, deleteBackup,
      getBackupsList, refreshBackups,
    }}>
      {children}
    </BackupContext.Provider>
  );
};
