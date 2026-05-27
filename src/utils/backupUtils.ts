import { BackupItem } from '@/contexts/BackupContext';

export const restoredKey = (year: string) => `klampisan_last_restored_backup_id_${year}`;

export const extractBackupYear = (name: string): string | undefined => {
  const autoMatch = name.match(/Auto - (\d{4}) - /);
  if (autoMatch?.[1]) return autoMatch[1];

  const yearMatch = name.match(/\b(20\d{2})\b/);
  return yearMatch?.[1];
};

export const getBackupYear = (backup: BackupItem): string | undefined =>
  backup.data?.year || extractBackupYear(backup.name);

export const isManualBackup = (backup: BackupItem) => !backup.name.startsWith('Auto - ');

export const findCanonicalBackup = (backups: BackupItem[], year: string): BackupItem | undefined => {
  return backups.find((backup) => isManualBackup(backup) && getBackupYear(backup) === year);
};
