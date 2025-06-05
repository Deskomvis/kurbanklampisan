
import { generateDashboardSection } from './reportSections/dashboardSection';
import { generateKelompokSapiSection } from './reportSections/kelompokSapiSection';
import { generateKelompokKambingSection } from './reportSections/kelompokKambingSection';
import { generatePenerimaSection } from './reportSections/penerimaSection';
import { generatePembagianSection } from './reportSections/pembagianSection';
import { generateKeuanganSection } from './reportSections/keuanganSection';
import { generateLaporanSection } from './reportSections/laporanSection';
import { ReportData } from './reportSections/types';

export const generateReportContent = (selectedReports: any[], data: ReportData): string => {
  const {
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
  } = data;

  const sudahMenerima = penerima.filter(p => p.sudahMenerima).length;
  const progressPercentage = penerima.length > 0 ? Math.round((sudahMenerima / penerima.length) * 100) : 0;

  let content = `
    <div style="font-family: Arial, sans-serif; padding: 10mm; max-width: 190mm; margin: 0 auto; font-size: 11px; line-height: 1.4;">
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #16a34a; padding-bottom: 15px;">
        <h1 style="color: #16a34a; margin: 0; font-size: 18px; margin-bottom: 5px;">📋 LAPORAN KURBAN 2025</h1>
        <p style="color: #666; margin: 0; font-size: 12px;">Masjid Istiqomah Klampisan - Kaliancar, Selogiri, Wonogiri</p>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 10px;">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}</p>
      </div>
  `;

  selectedReports.forEach(report => {
    switch (report.id) {
      case 'dashboard':
        content += generateDashboardSection(getTotalSapi, getTotalKambing, penerima, sudahMenerima, progressPercentage);
        break;
      case 'kelompok-sapi':
        content += generateKelompokSapiSection(kelompokSapi);
        break;
      case 'kelompok-kambing':
        content += generateKelompokKambingSection(kurbanKambing);
        break;
      case 'penerima':
        content += generatePenerimaSection(penerima);
        break;
      case 'pembagian':
        content += generatePembagianSection(sudahMenerima, penerima, progressPercentage);
        break;
      case 'keuangan':
        content += generateKeuanganSection(saldoAwal, getTotalPemasukan, getTotalPengeluaran, transactions, formatRupiah);
        break;
      case 'laporan':
        content += generateLaporanSection(getTotalSapi, getTotalKambing, saldoAwal, getTotalPemasukan, getTotalPengeluaran, penerima, progressPercentage, formatRupiah);
        break;
    }
  });

  content += `
      <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; color: #666; font-size: 9px;">
        <p>Laporan ini digenerate otomatis oleh Aplikasi Laporan Kurban - Masjid Istiqomah Klampisan</p>
      </div>
    </div>
  `;

  return content;
};
