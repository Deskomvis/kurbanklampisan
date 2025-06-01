
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, RotateCcw, Trash2 } from 'lucide-react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { exportData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

export const BackupPanel: React.FC = () => {
  const [backupName, setBackupName] = useState('');
  const { toast } = useToast();
  
  const { penerima, addPenerima, deletePenerima } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();
  const { saveBackup, loadBackup, deleteBackup, getBackupsList } = useBackup();

  const handleSaveBackup = () => {
    if (!backupName.trim()) {
      toast({
        title: "Error",
        description: "Nama backup tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = JSON.parse(exportData(
        penerima,
        kelompokSapi,
        kurbanKambing,
        transactions,
        saldoAwal,
        isSaldoAwalSet
      ));
      
      saveBackup(backupName.trim(), data);
      setBackupName('');
      
      toast({
        title: "Berhasil",
        description: "Backup berhasil disimpan",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan backup",
        variant: "destructive",
      });
    }
  };

  const handleLoadBackup = (id: string) => {
    try {
      const backup = loadBackup(id);
      if (!backup) {
        throw new Error('Backup tidak ditemukan');
      }

      // Clear existing data
      penerima.forEach(p => deletePenerima(p.id));
      kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
      kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
      transactions.forEach(t => deleteTransaction(t.id));

      // Load backup data
      backup.data.penerima.forEach((p: any) => addPenerima(p));
      backup.data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
      backup.data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
      backup.data.transactions.forEach((t: any) => addTransaction(t));
      setSaldoAwal(backup.data.saldoAwal);

      toast({
        title: "Berhasil",
        description: `Backup "${backup.name}" berhasil dimuat`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat backup",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBackup = (id: string) => {
    deleteBackup(id);
    toast({
      title: "Berhasil",
      description: "Backup berhasil dihapus",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  const backups = getBackupsList();

  return (
    <Card className="p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-green-700 mb-4">
        Backup & History
      </h3>
      
      {/* Save Backup */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="md:col-span-2">
            <Input
              type="text"
              value={backupName}
              onChange={(e) => setBackupName(e.target.value)}
              placeholder="Nama backup (contoh: Data Awal Kurban)"
              className="w-full"
            />
          </div>
          <Button
            onClick={handleSaveBackup}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Backup
          </Button>
        </div>
      </div>

      {/* Backup History */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">History Backup</h4>
        
        {backups.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Belum ada backup tersimpan
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Nama</TableHead>
                  <TableHead className="text-xs">Tanggal</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="text-xs font-medium">
                      {backup.name}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">
                      {formatDate(backup.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleLoadBackup(backup.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Load
                        </Button>
                        <Button
                          onClick={() => handleDeleteBackup(backup.id)}
                          variant="destructive"
                          size="sm"
                          className="text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Card>
  );
};
