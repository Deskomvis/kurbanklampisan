import { BackupItem } from '@/contexts/BackupContext';

export const restoredKey = (year: string) => `klampisan_last_restored_backup_id_${year}`;

export const extractBackupYear = (name: string): string | undefined => {
  const autoMatch = name.match(/Auto - (\d{4}) - /);
  if (autoMatch?.[1]) return autoMatch[1];

  const yearMatch = name.match(/\b(20\d{2})\b/);
  return yearMatch?.[1];
};

export const isPinnedYearBackup = (backupName: string, year: string) =>
  backupName.trim().toLowerCase() === `data baru ${year}`;

const isAutoBackup = (name: string) => name.startsWith('Auto - ');

// Canon = backup paling kanan ke kiri, dipilih dengan prioritas:
//   1. Manual backup bernama persis "Data baru {YEAR}" (legacy pinned)
//   2. Manual backup terbaru yang mengandung tahun aktif di nama
//   3. Manual backup terbaru apapun (jadi tiap Save Manual = update tampilan publik)
//   4. Auto-backup terbaru dengan tag "Auto - YYYY - "
//
// Backups sudah ter-sort descending by created_at di BackupContext, jadi `find()`
// otomatis mengambil yang terbaru.
export const findCanonicalBackup = (backups: BackupItem[], year: string): BackupItem | undefined => {
  const pinned = backups.find((b) => isPinnedYearBackup(b.name, year));
  if (pinned) return pinned;

  const manualWithYear = backups.find(
    (b) => !isAutoBackup(b.name) && b.name.includes(year)
  );
  if (manualWithYear) return manualWithYear;

  const latestManual = backups.find((b) => !isAutoBackup(b.name));
  if (latestManual) return latestManual;

  return backups.find((b) => {
    const m = b.name.match(/Auto - (\d{4}) - /);
    return m?.[1] === year;
  });
};
