import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';
import { extractBackupYear, findCanonicalBackup, isPinnedYearBackup, restoredKey } from '@/utils/backupUtils';

const AutoSaveWatcher = () => {
  const { currentYear, ensureYear } = useYear();
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, loadKelompokSapi, loadKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, loadTransactions, setSaldoAwal } = useKeuangan();
  const { backups, isLoading } = useBackup();
  const { toast } = useToast();

  const restoreChecked = useRef(false);

  useEffect(() => {
    restoreChecked.current = false;
  }, [backups, currentYear]);

  useEffect(() => {
    if (restoreChecked.current || isLoading) return;
    restoreChecked.current = true;

    if (backups.length === 0) return;

    // Register every year found across backup names so the selector shows them.
    backups.forEach(b => {
      const backupYear = extractBackupYear(b.name);
      if (backupYear) ensureYear(backupYear);
    });

    const canonical = findCanonicalBackup(backups, currentYear);

    if (!canonical) {
      return;
    }

    const lastRestoredId = localStorage.getItem(restoredKey(currentYear));
    if (lastRestoredId === canonical.id) return;

    const saldoNum = parseFloat(saldoAwal) || 0;
    const hasLocalData =
      penerima.length > 0 ||
      kelompokSapi.length > 0 ||
      kurbanKambing.length > 0 ||
      transactions.length > 0 ||
      saldoNum > 0;

    // SAFETY: kalau pertama kali jalan di perangkat ini dan ada data lokal,
    // jangan timpa — cukup tandai sudah sinkron.
    if (!lastRestoredId && hasLocalData && !isPinnedYearBackup(canonical.name, currentYear)) {
      localStorage.setItem(restoredKey(currentYear), canonical.id);
      return;
    }

    // Replace local data dengan snapshot kanon
    setPenerimaList(canonical.data.penerima || []);
    loadKelompokSapi(canonical.data.kelompokSapi || []);
    loadKurbanKambing(canonical.data.kurbanKambing || []);
    loadTransactions(canonical.data.transactions || []);
    if (canonical.data.saldoAwal !== undefined) {
      setSaldoAwal(canonical.data.saldoAwal);
    }

    localStorage.setItem(restoredKey(currentYear), canonical.id);

    toast({
      title: 'Data tersinkronisasi',
      description: `Dimuat dari: ${canonical.name}`,
    });
  }, [
    backups,
    currentYear,
    ensureYear,
    isLoading,
    kelompokSapi.length,
    kurbanKambing.length,
    loadKelompokSapi,
    loadKurbanKambing,
    penerima.length,
    saldoAwal,
    setPenerimaList,
    setSaldoAwal,
    toast,
    transactions.length,
    loadTransactions,
  ]);

  return null;
};

export default AutoSaveWatcher;
