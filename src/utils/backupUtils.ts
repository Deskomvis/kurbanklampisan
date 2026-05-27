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

export const findCanonicalBackup = (backups: BackupItem[], year: string): BackupItem | undefined => {
  const pinned = backups.find((backup) => isPinnedYearBackup(backup.name, year));
  if (pinned) return pinned;

  return backups.find((backup) => {
    const backupYear = extractBackupYear(backup.name);
    return backupYear === year;
  });
};
