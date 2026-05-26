import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useYear } from '@/contexts/YearContext';
import { usePenerima } from '@/contexts/PenerimaContext';
import { PENERIMA_2026 } from '@/utils/penerima2026Data';
import { generateUniqueId } from '@/utils/idGenerator';
import { useToast } from '@/hooks/use-toast';

export const PenerimaActions: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { currentYear } = useYear();
  const { setPenerimaList } = usePenerima();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // Tombol hanya muncul untuk admin di tahun 2026
  if (!isAuthenticated || currentYear !== '2026') return null;

  const handleLoad = () => {
    const newList = PENERIMA_2026.map(p => ({
      ...p,
      id: generateUniqueId(),
      sudahMenerima: false,
    }));
    setPenerimaList(newList);
    setOpen(false);
    toast({
      title: 'Data penerima 2026 dimuat',
      description: `${newList.length} entri berhasil dimuat. Klik tombol Update di header untuk simpan ke server.`,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
      >
        <Download className="w-3.5 h-3.5 mr-1.5" />
        Muat Data Penerima 2026
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Muat data penerima 2026?</AlertDialogTitle>
            <AlertDialogDescription>
              Daftar penerima saat ini akan diganti dengan {PENERIMA_2026.length} entri data tahun
              2026 (RT 01, RT 02, dan Tambahan/Diluar RT). Data kelompok sapi, kambing, transaksi
              keuangan, dan saldo TIDAK akan terpengaruh. Setelah dimuat, klik tombol Update untuk
              simpan ke server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLoad}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Ya, muat data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
