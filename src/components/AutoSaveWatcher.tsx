import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';

// Restores data from the latest Supabase backup when opened on a new device/browser.
// Also switches to the correct year embedded in the backup name (e.g. "Auto - 2026 - ...").
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

    // If the backup belongs to a different year, register that year and switch to it.
    // The component will remount after the year switch, and the restore will run again
    // under the correct year context.
    if (backupYear && backupYear !== currentYear) {
      ensureYear(backupYear);
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
