
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, RotateCcw, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { exportData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

export const BackupPanel: React.FC = () => {
  const [backupName, setBackupName] = useState('');
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();
  
  const { penerima, setPenerimaList } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();
  const { saveBackup, loadBackup, deleteBackup, getBackupsList, refreshBackups, isLoading } = useBackup();

  const handleSaveBackup = async () => {
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
      
      console.log('Saving backup with penerima data:', data.penerima);
      
      await saveBackup(backupName.trim(), data);
      setBackupName('');
    } catch (error) {
      // Error handling is already done in the context
    }
  };

  const handleLoadBackup = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    
    try {
      const backup = loadBackup(id);
      if (!backup) {
        throw new Error('Backup tidak ditemukan');
      }

      console.log('Loading backup with penerima data:', backup.data.penerima);

      // Clear existing data
      kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
      kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
      transactions.forEach(t => deleteTransaction(t.id));

      // Load backup data - use setPenerimaList to replace all penerima data including status
      setPenerimaList(backup.data.penerima || []);
      backup.data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
      backup.data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
      backup.data.transactions.forEach((t: any) => addTransaction(t));
      setSaldoAwal(backup.data.saldoAwal);

      toast({
        title: "Berhasil",
        description: `Backup "${backup.name}" berhasil dimuat dari server`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat backup dari server",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteBackup = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [`delete_${id}`]: true }));
    
    try {
      await deleteBackup(id);
    } catch (error) {
      // Error handling is already done in the context
    } finally {
      setLoadingStates(prev => ({ ...prev, [`delete_${id}`]: false }));
    }
  };

  const handleRefreshBackups = async () => {
    await refreshBackups();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  const backups = getBackupsList();
  const isImportBackup = (name: string) => name.includes('Import JSON');
  const isAutoBackup = (name: string) => name.startsWith('Auto - ');

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-green-700">
          Backup & History (Supabase)
        </h3>
        <Button
          onClick={handleRefreshBackups}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>
      
      {/* Save Manual Backup */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="md:col-span-2">
            <Input
              type="text"
              value={backupName}
              onChange={(e) => setBackupName(e.target.value)}
              placeholder="Nama backup manual (contoh: Data Awal Kurban)"
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSaveBackup}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
            disabled={isLoading || !backupName.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Manual
          </Button>
        </div>
      </div>

      {/* Backup History */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">History Backup dari Server</h4>
        
        {isLoading && backups.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">
            <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
            Memuat backup dari server...
          </div>
        ) : backups.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Belum ada backup tersimpan di server
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Tipe</TableHead>
                  <TableHead className="text-xs">Nama</TableHead>
                  <TableHead className="text-xs">Tanggal</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="text-xs">
                      {isAutoBackup(backup.name) ? (
                        <span className="text-green-600 font-medium">Auto</span>
                      ) : isImportBackup(backup.name) ? (
                        <span className="text-orange-600">Import</span>
                      ) : (
                        <span className="text-gray-600">Manual</span>
                      )}
                    </TableCell>
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
                          disabled={loadingStates[backup.id]}
                        >
                          {loadingStates[backup.id] ? (
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <RotateCcw className="w-3 h-3 mr-1" />
                          )}
                          Load
                        </Button>
                        <Button
                          onClick={() => handleDeleteBackup(backup.id)}
                          variant="destructive"
                          size="sm"
                          className="text-xs"
                          disabled={loadingStates[`delete_${backup.id}`]}
                        >
                          {loadingStates[`delete_${backup.id}`] ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
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

      {/* Information Panel */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">📋 Manual Backup & Import</h4>
        <div className="space-y-1 text-xs text-blue-700">
          <p>• Backup manual dapat dibuat kapan saja dengan nama khusus</p>
          <p>• Import JSON otomatis tersimpan ke server</p>
          <p>• Klik "Load" untuk memuat backup tertentu ke semua menu</p>
          <p>• Data tersimpan permanen di server Supabase</p>
          <p>• <strong>Status pembagian daging otomatis tersimpan dan dimuat</strong></p>
        </div>
      </div>
    </Card>
  );
};
