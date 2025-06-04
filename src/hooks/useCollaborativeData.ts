
import { useEffect, useState } from 'react';
import { useBackup } from '@/contexts/BackupContext';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useToast } from '@/hooks/use-toast';

export const useCollaborativeData = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { getBackupsList, isLoading } = useBackup();
  const { toast } = useToast();
  
  const { penerima, addPenerima, deletePenerima } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();

  useEffect(() => {
    const loadLatestData = async () => {
      if (isLoading || isInitialized) return;

      try {
        const backups = getBackupsList();
        
        if (backups.length > 0) {
          // Ambil backup terbaru (sudah diurutkan desc by created_at)
          const latestBackup = backups[0];
          
          console.log('Loading latest collaborative data:', latestBackup.name);
          
          // Clear existing data
          penerima.forEach(p => deletePenerima(p.id));
          kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
          kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
          transactions.forEach(t => deleteTransaction(t.id));

          // Load latest data
          latestBackup.data.penerima.forEach((p: any) => addPenerima(p));
          latestBackup.data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
          latestBackup.data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
          latestBackup.data.transactions.forEach((t: any) => addTransaction(t));
          setSaldoAwal(latestBackup.data.saldoAwal);

          toast({
            title: "Data Kolaboratif Dimuat",
            description: `Memuat data terbaru: "${latestBackup.name}"`,
          });
        } else {
          console.log('No backup data found, starting with empty data');
          toast({
            title: "Mode Kolaboratif",
            description: "Memulai dengan data kosong. Save manual untuk berbagi data.",
          });
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading collaborative data:', error);
        toast({
          title: "Info",
          description: "Memulai dengan data lokal",
          variant: "default",
        });
        setIsInitialized(true);
      }
    };

    // Load data setelah backup context siap
    if (!isLoading) {
      loadLatestData();
    }
  }, [isLoading, isInitialized]);

  return { isInitialized };
};
