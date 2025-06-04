
import { Penerima } from '@/contexts/PenerimaContext';

export const generateLaporanSection = (getTotalSapi: () => number, getTotalKambing: () => number, saldoAwal: string, getTotalPemasukan: () => number, getTotalPengeluaran: () => number, penerima: Penerima[], progressPercentage: number, formatRupiah: (amount: number) => string): string => {
  const totalPemasukan = getTotalPemasukan();
  const totalPengeluaran = getTotalPengeluaran();
  const saldoAkhir = parseFloat(saldoAwal) + totalPemasukan - totalPengeluaran;
  
  return `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📄 Laporan Pertanggungjawaban</h2>
      
      <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
        <h3 style="color: #16a34a; margin-bottom: 12px; font-size: 12px;">I. Pendahuluan</h3>
        <p style="line-height: 1.5; color: #374151; margin-bottom: 12px; font-size: 10px;">
          Segala puji bagi Allah yang telah memberikan kemudahan dalam pelaksanaan ibadah Idul Adha Tahun 1446 H / 2025 M, 
          yang meliputi pelaksanaan sholat Idul Adha kemudian dilanjutkan dengan pemotongan hewan qurban serta pendistribusian 
          daging qurban sehingga berjalan dengan lancar sebagaimana mestinya.
        </p>
      </div>

      <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
        <h3 style="color: #16a34a; margin-bottom: 12px; font-size: 12px;">II. Pelaksanaan Kegiatan</h3>
        <div style="margin-bottom: 12px; font-size: 10px;">
          <strong>Tanggal:</strong> Jumat, 06 Juni 2025<br>
          <strong>Tempat:</strong> Masjid Istiqomah Klampisan, Kaliancar, Selogiri, Wonogiri
        </div>
        
        <h4 style="color: #16a34a; margin-bottom: 8px; font-size: 11px;">Hewan Kurban:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10px;">
          <thead>
            <tr style="background: #16a34a; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Jenis Hewan</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #f9fafb;">
              <td style="border: 1px solid #ddd; padding: 8px;">🐄 Hewan Kurban Sapi</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">${getTotalSapi()} ekor</td>
            </tr>
            <tr style="background: white;">
              <td style="border: 1px solid #ddd; padding: 8px;">🐐 Hewan Kurban Kambing</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">${getTotalKambing()} ekor</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
        <h3 style="color: #16a34a; margin-bottom: 12px; font-size: 12px;">III. Rincian Keuangan</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 10px;">
          <div>
            <strong>Saldo Awal:</strong> ${formatRupiah(parseFloat(saldoAwal))}<br>
            <strong>Total Pemasukan:</strong> ${formatRupiah(totalPemasukan)}<br>
            <strong>Total Pengeluaran:</strong> ${formatRupiah(totalPengeluaran)}
          </div>
          <div>
            <strong>Saldo Akhir:</strong> ${formatRupiah(saldoAkhir)}<br>
            <strong>Jumlah Penerima:</strong> ${penerima.length} orang<br>
            <strong>Progress Pembagian:</strong> ${progressPercentage}%
          </div>
        </div>
      </div>

      <div style="background: #f8fafc; padding: 15px; border-radius: 6px;">
        <h3 style="color: #16a34a; margin-bottom: 12px; font-size: 12px;">IV. Penutup</h3>
        <p style="line-height: 1.5; color: #374151; margin-bottom: 15px; font-size: 10px;">
          Demikian laporan pertanggungjawaban ini kami susun, saran dan kritik yang membangun sangat kami nantikan. 
          Semoga dengan laporan pertanggungjawaban ini dapat dijadikan bahan evaluasi dan acuan kegiatan di masa-masa mendatang.
        </p>
        
        <div style="text-align: right; margin-top: 30px; font-size: 10px;">
          <div>Klampisan, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div style="margin-top: 40px;">
            <strong>Panitia Idul Qurban 1446 H / 2025 M</strong>
          </div>
        </div>
      </div>
    </div>
  `;
};
