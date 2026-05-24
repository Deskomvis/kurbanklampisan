import { useEffect, useRef } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { exportData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

const AutoSaveWatcher = () => {
  const { currentYear } = useYear();
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet, addTransaction, setSaldoAwal } = useKeuangan();
  const { scheduleAutoSave, forceAutoSave, backups, isLoading } = useBackup();
  const { toast } = useToast();

  const skipAutoSave = useRef(true);
  const restoreChecked = useRef(false);

  // Force-save to Supabase immediately when year is switched (component unmounts)
  // This prevents losing data from the 3-second debounce being cancelled
  useEffect(() => {
    return () => { forceAutoSave(); };
  }, []);

  // Auto-restore: when backups finish loading and local data is empty, restore from latest backup
  useEffect(() => {
    if (restoreChecked.current || isLoading) return;
    restoreChecked.current = true;

    const restoreKey = `klampisan_restored_${currentYear}`;
    if (sessionStorage.getItem(restoreKey)) return;
    sessionStorage.setItem(restoreKey, 'done');

    if (backups.length === 0) return;

    // Empty = no meaningful user data exists for this year yet.
    // isSaldoAwalSet alone is NOT enough — createNewYear always sets it to true,
    // so we check the actual saldo value too.
    const saldoNum = parseFloat(saldoAwal) || 0;
    const isEmpty =
      penerima.length === 0 &&
      kelompokSapi.length === 0 &&
      kurbanKambing.length === 0 &&
      transactions.length === 0 &&
      saldoNum === 0;

    if (!isEmpty) return;

    // Apply latest backup
    const latest = backups[0];
    skipAutoSave.current = true;
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

  // Auto-save to Supabase on data change (skip on first mount)
  useEffect(() => {
    if (skipAutoSave.current) {
      skipAutoSave.current = false;
      return;
    }
    const data = JSON.parse(
      exportData(penerima, kelompokSapi, kurbanKambing, transactions, saldoAwal, isSaldoAwalSet)
    );
    scheduleAutoSave(data, currentYear);
  }, [penerima, kelompokSapi, kurbanKambing, transactions, saldoAwal, isSaldoAwalSet]);

  return null;
};

export default AutoSaveWatcher;
