
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { Printer } from 'lucide-react';
import { generatePDF } from '@/utils/pdfGenerator';
import { generateReportContent } from '@/utils/reportContentGenerator';
import { ReportOptions, ReportOption, defaultReportOptions } from './ReportOptions';
import { printPenerima } from '@/utils/printPenerima';

export const PrintReportsPanel = () => {
  const { toast } = useToast();
  const { penerima } = usePenerima();
  const { getTotalSapi, getTotalKambing, kelompokSapi, kurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, getTotalPemasukan, getTotalPengeluaran } = useKeuangan();

  const [reportOptions, setReportOptions] = useState<ReportOption[]>(defaultReportOptions);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setReportOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, checked } : option
      )
    );
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrintReports = async () => {
    const selectedReports = reportOptions.filter(option => option.checked);
    
    if (selectedReports.length === 0) {
      toast({
        title: "Error",
        description: "Pilih minimal satu laporan untuk dicetak",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const content = generateReportContent(selectedReports, {
        penerima,
        kelompokSapi,
        kurbanKambing,
        getTotalSapi,
        getTotalKambing,
        transactions,
        saldoAwal,
        getTotalPemasukan,
        getTotalPengeluaran,
        formatRupiah
      });

      const filename = `Laporan_Kurban_2025_${selectedReports.map(r => r.label.replace(/\s/g, '_')).join('_')}_${new Date().getTime()}.pdf`;
      
      await generatePDF(content, filename);

      toast({
        title: "Berhasil",
        description: `Laporan berhasil dicetak sebagai ${filename}`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Gagal mencetak laporan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-4 md:p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg md:text-xl font-semibold text-green-700 flex items-center gap-2">
          <Printer className="w-5 h-5" />
          🖨️ Cetak Semua Laporan
        </CardTitle>
        <p className="text-sm text-gray-600">
          Pilih laporan yang ingin dicetak dan generate PDF dengan layout yang rapi dan profesional
        </p>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <div className="space-y-4">
          <ReportOptions
            reportOptions={reportOptions}
            onCheckboxChange={handleCheckboxChange}
          />

          <div className="pt-4 border-t space-y-3">
            <Button
              onClick={() => printPenerima(penerima)}
              variant="outline"
              className="w-full border-green-600 text-green-700 hover:bg-green-50"
            >
              <Printer className="w-4 h-4 mr-2" />
              🖨️ Cetak Daftar Penerima (A4)
            </Button>

            <Button
              onClick={handlePrintReports}
              disabled={isGenerating || reportOptions.every(option => !option.checked)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4 mr-2" />
                  🖨️ Cetak Laporan Terpilih
                </>
              )}
            </Button>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
            <p className="text-xs text-blue-700">
              💡 <strong>Tips:</strong> Laporan akan dicetak dalam format PDF dengan layout yang rapi dan profesional. 
              Pastikan koneksi internet stabil untuk hasil terbaik.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
