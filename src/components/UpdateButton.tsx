import React, { useState } from 'react';
import { CloudUpload, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { useYear } from '@/contexts/YearContext';
import { exportData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

type SaveState = 'idle' | 'saving' | 'done';

export const UpdateButton: React.FC = () => {
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const { currentYear } = useYear();
  const { penerima } = usePenerima();
  const { kelompokSapi, kurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet } = useKeuangan();
  const { saveNow } = useBackup();
  const { toast } = useToast();

  const handleUpdate = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    try {
      const data = JSON.parse(
        exportData(penerima, kelompokSapi, kurbanKambing, transactions, saldoAwal, isSaldoAwalSet)
      );
      await saveNow(data, currentYear);
      setSaveState('done');
      toast({ title: 'Tersimpan', description: 'Data berhasil disimpan ke server.' });
      setTimeout(() => setSaveState('idle'), 2000);
    } catch {
      setSaveState('idle');
      toast({ title: 'Gagal', description: 'Coba lagi.', variant: 'destructive' });
    }
  };

  return (
    <Button
      onClick={handleUpdate}
      disabled={saveState === 'saving'}
      size="sm"
      className={`hidden sm:flex items-center gap-1.5 h-8 px-3 text-xs font-semibold transition-all ${
        saveState === 'done'
          ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-100'
          : 'bg-green-600 hover:bg-green-700 text-white'
      }`}
    >
      {saveState === 'saving' ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : saveState === 'done' ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <CloudUpload className="w-3.5 h-3.5" />
      )}
      {saveState === 'done' ? 'Tersimpan' : 'Update'}
    </Button>
  );
};
