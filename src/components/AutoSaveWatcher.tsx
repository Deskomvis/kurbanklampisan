import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup, BackupItem } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';

// Sync model:
// - Public-facing source of truth = a manual backup named "Data baru {YEAR}"
//   (e.g. "Data baru 2026"). This is what semua perangkat lihat saat buka web.
// - Admin "Update" tetap dorong snapshot lengkap ke Supabase sebagai auto-backup;
//   bila tidak ada manual "Data baru ..." untuk tahun aktif, fallback ke auto-backup
//   terbaru seperti sebelumnya.
// - SAFETY: kalau perangkat sudah punya data lokal dan belum pernah sinkronisasi,
//   jangan timpa otomatis — cukup catat ID backup terbaru sebagai sudah sinkron.
const restoredKey = (year: string) => `klampisan_last_restored_backup_id_${year}`;

// Cari backup "kanon" untuk tahun aktif:
//   1. Backup manual bernama persis "Data baru {YEAR}" (case-insensitive)
//   2. Auto-backup terbaru dengan tag "Auto - YYYY - "
const findCanonicalBackup = (backups: BackupItem[], year: string): BackupItem | undefined => {
  const pinnedName = `data baru ${year}`;
  const pinned = backups.find(b => b.name.trim().toLowerCase() === pinnedName);
  if (pinned) return pinned;

  return backups.find(b => {
    const m = b.name.match(/Auto - (\d{4}) - /);
    return m?.[1] === year;
  });
};

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

    // Register every year found across backup names so the selector shows them.
    // Match "Auto - YYYY - " or any standalone 20YY in name (e.g. "Data baru 2026").
    backups.forEach(b => {
      const autoMatch = b.name.match(/Auto - (\d{4}) - /);
      if (autoMatch?.[1]) {
        ensureYear(autoMatch[1]);
        return;
      }
      const yearMatch = b.name.match(/\b(20\d{2})\b/);
      if (yearMatch?.[1]) ensureYear(yearMatch[1]);
    });

    const canonical = findCanonicalBackup(backups, currentYear);

    // If no backup matches current year, switch ke tahun backup terbaru yang ada
    if (!canonical) {
      const latestAny = backups[0];
      const m = latestAny.name.match(/Auto - (\d{4}) - /) || latestAny.name.match(/\b(20\d{2})\b/);
      const fallbackYear = m?.[1];
      if (fallbackYear && fallbackYear !== currentYear) {
        switchYear(fallbackYear);
      }
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
    if (!lastRestoredId && hasLocalData) {
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
  }, [backups, isLoading]);

  return null;
};

export default AutoSaveWatcher;
