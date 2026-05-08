import React, { useState } from 'react';
import { ChevronDown, Plus, Check, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';

export const YearSelector: React.FC = () => {
  const { currentYear, availableYears, switchYear, createNewYear } = useYear();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newYearInput, setNewYearInput] = useState('');

  const handleCreateYear = () => {
    const trimmed = newYearInput.trim();
    if (!trimmed || !/^\d{4}$/.test(trimmed)) {
      toast({ title: 'Format Salah', description: 'Masukkan tahun dalam format 4 digit, contoh: 2026', variant: 'destructive' });
      return;
    }
    if (availableYears.includes(trimmed)) {
      toast({ title: 'Sudah Ada', description: `Data tahun ${trimmed} sudah tersedia.`, variant: 'destructive' });
      return;
    }
    createNewYear(trimmed);
    setDialogOpen(false);
    setNewYearInput('');
    toast({
      title: `Tahun ${trimmed} Dibuat`,
      description: 'Data penerima dan saldo awal telah disalin dari tahun sebelumnya.',
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 border-green-200 bg-green-50 text-green-800 hover:bg-green-100 hover:text-green-900 font-semibold px-3 h-8"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{currentYear}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Pilih Tahun
          </div>
          {availableYears.map((year) => (
            <DropdownMenuItem
              key={year}
              onClick={() => switchYear(year)}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="font-medium">{year} H/{parseInt(year) + 1} M</span>
              {year === currentYear && <Check className="w-4 h-4 text-green-600" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 text-green-700 font-medium cursor-pointer focus:text-green-700 focus:bg-green-50"
          >
            <Plus className="w-4 h-4" />
            Buat Tahun Baru
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-green-600" />
              Buat Data Tahun Baru
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="newYear">Tahun Hijriah</Label>
              <Input
                id="newYear"
                placeholder="Contoh: 1448"
                value={newYearInput}
                onChange={(e) => setNewYearInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateYear()}
                maxLength={4}
              />
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 space-y-1 text-sm text-amber-800">
              <p className="font-semibold">Yang akan disalin dari tahun {currentYear}:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>Daftar penerima daging (status reset)</li>
                <li>Saldo akhir → saldo awal baru</li>
              </ul>
              <p className="text-xs mt-1 text-amber-700">Kelompok kurban & transaksi keuangan dimulai kosong.</p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateYear}>
              Buat Tahun Baru
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
