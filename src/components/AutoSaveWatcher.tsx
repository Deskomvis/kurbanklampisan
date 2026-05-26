import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';

// Restores data from the latest Supabase backup when opened on a new device/browser.
// Also detects the year embedded in backup names (e.g. "Auto - 2026 - ...") and
// switches the active year so the restore lands in the correct year-scoped context.
const AutoSaveWatcher = () => {
  const { currentYear, ensureYear, switchYear } = useYear();
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, addTransaction, setSaldoAwal } = useKeuangan();
  const { backups, isLoading } = useBackup();
  const { toast } = useToast();

  const restoreChecked = useRef(false);

  useEffect(() => {
    if (restoreChecked.current || isLoading) return;
    restoreChecked.current = true;

    if (backups.length === 0) return;

    const latest = backups[0];

    // Parse year from backup name: "Auto - 2026 - ..."
    const yearMatch = latest.name.match(/Auto - (\d{4}) - /);
    const backupYear = yearMatch?.[1];

    // Register any years found across all backups so the year selector shows them
    backups.forEach(b => {
      const m = b.name.match(/Auto - (\d{4}) - /);
      if (m?.[1]) ensureYear(m[1]);
    });

    // If the latest backup belongs to a different year, switch to it.
    // The component will remount under the new year, and the restore will run again.
    if (backupYear && backupYear !== currentYear) {
      switchYear(backupYear);
      return;
    }

    // Guard: skip if already restored for this year in this session
    const restoreKey = `klampisan_restored_${currentYear}`;
    if (sessionStorage.getItem(restoreKey)) return;
    sessionStorage.setItem(restoreKey, 'done');

    const saldoNum = parseFloat(saldoAwal) || 0;
    const isEmpty =
      penerima.length === 0 &&
      kelompokSapi.length === 0 &&
      kurbanKambing.length === 0 &&
      transactions.length === 0 &&
      saldoNum === 0;

    if (!isEmpty) return;

    setPenerimaList(latest.data.penerima || []);
    (latest.data.kelompokSapi || []).forEach((k: any) => addKelompokSapi(k));
    (latest.data.kurbanKambing || []).forEach((k: any) => addKurbanKambing(k));
    (latest.data.transactions || []).forEach((t: any) => addTransaction(t));
    if (latest.data.saldoAwal) setSaldoAwal(latest.data.saldoAwal);

    toast({
      title: 'Data dipulihkan otomatis',
      description: `Dimuat dari backup: ${latest.name}`,
    });
  }, [backups, isLoading]);

  return null;
};

export default AutoSaveWatcher;
