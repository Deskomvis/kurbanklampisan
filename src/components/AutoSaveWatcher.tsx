import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';

// Sync model (git-like):
// - "Update" button pushes the full local snapshot to Supabase.
// - On open/refresh, this watcher checks if the latest backup ID for the active year
//   differs from the last one we restored. If so, it replaces local data with the
//   backup snapshot — making all devices converge to the latest pushed state.
// - SAFETY: if lastRestoredId is missing (first run after this feature was added)
//   and local data already exists, we do NOT overwrite — we only "claim" the latest
//   backup ID so future updates from other devices still sync correctly.
const restoredKey = (year: string) => `klampisan_last_restored_backup_id_${year}`;

const AutoSaveWatcher = () => {
  const { currentYear, ensureYear, switchYear } = useYear();
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, loadKelompokSapi, loadKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, loadTransactions, setSaldoAwal } = useKeuangan();
  const { backups, isLoading } = useBackup();
  const { toast } = useToast();

  const restoreChecked = useRef(false);

  useEffect(() => {
    if (restoreChecked.current || isLoading) return;
    restoreChecked.current = true;

    if (backups.length === 0) return;

    // Register every year found across backups so the selector shows them
    backups.forEach(b => {
      const m = b.name.match(/Auto - (\d{4}) - /);
      if (m?.[1]) ensureYear(m[1]);
    });

    // Find the latest backup for the current year (by Auto - YYYY tag).
    // Backups are already sorted descending by created_at in BackupContext.
    const latestForYear = backups.find(b => {
      const m = b.name.match(/Auto - (\d{4}) - /);
      return m?.[1] === currentYear;
    });

    // If no backup matches current year, switch to the year of the latest backup
    if (!latestForYear) {
      const m = backups[0].name.match(/Auto - (\d{4}) - /);
      const fallbackYear = m?.[1];
      if (fallbackYear && fallbackYear !== currentYear) {
        switchYear(fallbackYear);
      }
      return;
    }

    const lastRestoredId = localStorage.getItem(restoredKey(currentYear));
    if (lastRestoredId === latestForYear.id) return;

    const saldoNum = parseFloat(saldoAwal) || 0;
    const hasLocalData =
      penerima.length > 0 ||
      kelompokSapi.length > 0 ||
      kurbanKambing.length > 0 ||
      transactions.length > 0 ||
      saldoNum > 0;

    // SAFETY: first run on this device with local data — claim the latest ID
    // and skip restore to avoid wiping the user's existing kelompok/penerima/etc.
    if (!lastRestoredId && hasLocalData) {
      localStorage.setItem(restoredKey(currentYear), latestForYear.id);
      return;
    }

    // Replace local data with the latest backup snapshot
    setPenerimaList(latestForYear.data.penerima || []);
    loadKelompokSapi(latestForYear.data.kelompokSapi || []);
    loadKurbanKambing(latestForYear.data.kurbanKambing || []);
    loadTransactions(latestForYear.data.transactions || []);
    if (latestForYear.data.saldoAwal !== undefined) {
      setSaldoAwal(latestForYear.data.saldoAwal);
    }

    localStorage.setItem(restoredKey(currentYear), latestForYear.id);

    toast({
      title: 'Data tersinkronisasi',
      description: `Dimuat dari: ${latestForYear.name}`,
    });
  }, [backups, isLoading]);

  return null;
};

export default AutoSaveWatcher;
