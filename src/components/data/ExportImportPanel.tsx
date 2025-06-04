
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Upload } from 'lucide-react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useBackup } from '@/contexts/BackupContext';
import { exportData, downloadJSON, validateImportData, AppData } from '@/utils/dataUtils';
import { useToast } from '@/hooks/use-toast';

export const ExportImportPanel: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const { penerima, addPenerima, deletePenerima } = usePenerima();
  const { kelompokSapi, kurbanKambing, addKelompokSapi, addKurbanKambing, deleteKelompokSapi, deleteKurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet, addTransaction, deleteTransaction, setSaldoAwal } = useKeuangan();
  const { saveBackup } = useBackup();

  const handleExport = () => {
    try {
      const data = exportData(
        penerima,
        kelompokSapi,
        kurbanKambing,
        transactions,
        saldoAwal,
        isSaldoAwalSet
      );
      
      const filename = `kurban-data-${new Date().toISOString().split('T')[0]}.json`;
      downloadJSON(data, filename);
      
      toast({
        title: "Berhasil",
        description: "Data berhasil diekspor",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengekspor data",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!validateImportData(data)) {
        throw new Error('Format file tidak valid');
      }

      // Clear existing data
      penerima.forEach(p => deletePenerima(p.id));
      kelompokSapi.forEach(k => deleteKelompokSapi(k.id));
      kurbanKambing.forEach(k => deleteKurbanKambing(k.id));
      transactions.forEach(t => deleteTransaction(t.id));

      // Import new data
      data.penerima.forEach((p: any) => addPenerima(p));
      data.kelompokSapi.forEach((k: any) => addKelompokSapi(k));
      data.kurbanKambing.forEach((k: any) => addKurbanKambing(k));
      data.transactions.forEach((t: any) => addTransaction(t));
      setSaldoAwal(data.saldoAwal);

      // Save imported data to Supabase
      const timestamp = new Date().toLocaleString('id-ID');
      await saveBackup(`Import JSON - ${timestamp}`, data);

      toast({
        title: "Berhasil",
        description: "Data berhasil diimpor dan disimpan ke server",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengimpor data. Pastikan format file benar.",
        variant: "destructive",
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-green-700 mb-4">
        Export & Import Data
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Export Data</h4>
          <p className="text-xs text-gray-600">
            Simpan semua data aplikasi ke file JSON
          </p>
          <Button
            onClick={handleExport}
            className="w-full bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Import Data</h4>
          <p className="text-xs text-gray-600">
            Muat data dari file JSON (otomatis tersimpan ke server)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import JSON
          </Button>
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">📁 Manual Data Management</h4>
        <div className="space-y-1 text-xs text-blue-700">
          <p>• Export: Unduh data saat ini ke file JSON untuk backup eksternal</p>
          <p>• Import: Muat data dari file JSON dan simpan otomatis ke server</p>
          <p>• Gunakan backup manual untuk menyimpan milestone penting</p>
        </div>
      </div>
    </Card>
  );
};
