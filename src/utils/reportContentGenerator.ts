
import { Penerima } from '@/contexts/PenerimaContext';
import { KelompokSapi, KurbanKambing } from '@/contexts/KelompokKurbanContext';

interface ReportData {
  penerima: Penerima[];
  kelompokSapi: KelompokSapi[];
  kurbanKambing: KurbanKambing[];
  getTotalSapi: () => number;
  getTotalKambing: () => number;
  transactions: any[];
  saldoAwal: string;
  getTotalPemasukan: () => number;
  getTotalPengeluaran: () => number;
  formatRupiah: (amount: number) => string;
}

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
      case 'kelompok':
        content += generateKelompokSection(kelompokSapi, kurbanKambing);
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

const generateDashboardSection = (getTotalSapi: () => number, getTotalKambing: () => number, penerima: Penerima[], sudahMenerima: number, progressPercentage: number): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📊 Dashboard & Statistik</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${getTotalSapi()}</div>
          <div style="color: #666; font-size: 10px;">🐄 Hewan Sapi</div>
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${getTotalKambing()}</div>
          <div style="color: #666; font-size: 10px;">🐐 Hewan Kambing</div>
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${penerima.length}</div>
          <div style="color: #666; font-size: 10px;">👥 Penerima Daging</div>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #16a34a;">
        <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 12px;">Status Pembagian Daging</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 10px;">
          <span>Sudah Menerima: <strong style="color: #16a34a;">${sudahMenerima} orang</strong></span>
          <span>Belum Menerima: <strong style="color: #f59e0b;">${penerima.length - sudahMenerima} orang</strong></span>
        </div>
        <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="background: #16a34a; height: 100%; width: ${progressPercentage}%; border-radius: 4px;"></div>
        </div>
        <div style="text-align: center; margin-top: 4px; font-weight: bold; color: #16a34a; font-size: 11px;">${progressPercentage}% Progress</div>
      </div>
    </div>
  `;
};

const generateKelompokSection = (kelompokSapi: KelompokSapi[], kurbanKambing: KurbanKambing[]): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">👥 Data Kelompok Kurban</h2>
      
      <h3 style="color: #16a34a; margin-bottom: 8px; font-size: 12px;">🐄 Kelompok Sapi</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
        <thead>
          <tr style="background: #16a34a; color: white;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">No Kelompok</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Anggota</th>
          </tr>
        </thead>
        <tbody>
          ${kelompokSapi.map((kelompok, index) => `
            <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 6px; vertical-align: top;">${kelompok.nomor}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">
                ${kelompok.anggota.map((anggota, anggotaIndex) => `
                  <div style="margin-bottom: 1px;">${anggotaIndex + 1}. ${anggota}</div>
                `).join('')}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h3 style="color: #16a34a; margin-bottom: 8px; font-size: 12px;">🐐 Kurban Kambing</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
        <thead>
          <tr style="background: #16a34a; color: white;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">No</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Nama Pemilik</th>
          </tr>
        </thead>
        <tbody>
          ${kurbanKambing.map((kambing, index) => `
            <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 6px;">${kambing.nomor}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">${kambing.pemilik}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};

const generatePenerimaSection = (penerima: Penerima[]): string => {
  const rt01 = penerima.filter(p => p.rt === '01');
  const rt02 = penerima.filter(p => p.rt === '02');
  const tambahan = penerima.filter(p => p.rt === 'tambahan');
  
  return `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📋 Daftar Penerima Daging</h2>
      
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 15px;">
        <div style="background: #16a34a; color: white; padding: 8px; border-radius: 6px; text-align: center;">
          <div style="font-size: 14px; font-weight: bold;">${penerima.length}</div>
          <div style="font-size: 9px;">Total Penerima</div>
        </div>
        <div style="background: #16a34a; color: white; padding: 8px; border-radius: 6px; text-align: center;">
          <div style="font-size: 14px; font-weight: bold;">${rt01.length}</div>
          <div style="font-size: 9px;">RT 01</div>
        </div>
        <div style="background: #16a34a; color: white; padding: 8px; border-radius: 6px; text-align: center;">
          <div style="font-size: 14px; font-weight: bold;">${rt02.length}</div>
          <div style="font-size: 9px;">RT 02</div>
        </div>
        <div style="background: #16a34a; color: white; padding: 8px; border-radius: 6px; text-align: center;">
          <div style="font-size: 14px; font-weight: bold;">${tambahan.length}</div>
          <div style="font-size: 9px;">Penerima Tambahan</div>
        </div>
      </div>

      ${['RT 01', 'RT 02', 'PENERIMA TAMBAHAN'].map((rtLabel, rtIndex) => {
        const rtData = rtIndex === 0 ? rt01 : rtIndex === 1 ? rt02 : tambahan;
        return `
          <div style="page-break-inside: avoid; margin-bottom: 15px;">
            <h3 style="color: #16a34a; margin-bottom: 8px; font-size: 12px;">${rtLabel}</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
              <thead>
                <tr style="background: #16a34a; color: white;">
                  <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 12%;">No Pengambilan</th>
                  <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Nama</th>
                  <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">Blok</th>
                  <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${rtData.map((p, index) => `
                  <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                    <td style="border: 1px solid #ddd; padding: 6px;">${p.nomorPengambilan}</td>
                    <td style="border: 1px solid #ddd; padding: 6px;">${p.nama}</td>
                    <td style="border: 1px solid #ddd; padding: 6px;">${p.blok || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 6px;">
                      <span style="background: ${p.sudahMenerima ? '#16a34a' : '#f59e0b'}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 8px;">
                        ${p.sudahMenerima ? '✅ Sudah' : '⏳ Belum'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

const generatePembagianSection = (sudahMenerima: number, penerima: Penerima[], progressPercentage: number): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📦 Status Pembagian Daging</h2>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${sudahMenerima}</div>
          <div style="color: #666; font-size: 10px;">✅ Sudah Menerima</div>
        </div>
        <div style="background: #fffbeb; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #f59e0b;">
          <div style="font-size: 18px; font-weight: bold; color: #f59e0b;">${penerima.length - sudahMenerima}</div>
          <div style="color: #666; font-size: 10px;">⏳ Belum Menerima</div>
        </div>
        <div style="background: #eff6ff; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #3b82f6;">
          <div style="font-size: 18px; font-weight: bold; color: #3b82f6;">${progressPercentage}%</div>
          <div style="color: #666; font-size: 10px;">📈 Progress</div>
        </div>
      </div>
      
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #16a34a;">
        <div style="background: #e5e7eb; height: 12px; border-radius: 6px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%); height: 100%; width: ${progressPercentage}%; border-radius: 6px; transition: width 0.3s ease;"></div>
        </div>
        <div style="text-align: center; margin-top: 8px; font-weight: bold; color: #16a34a; font-size: 11px;">Progress Pembagian: ${progressPercentage}%</div>
      </div>
    </div>
  `;
};

const generateKeuanganSection = (saldoAwal: string, getTotalPemasukan: () => number, getTotalPengeluaran: () => number, transactions: any[], formatRupiah: (amount: number) => string): string => {
  const totalPemasukan = getTotalPemasukan();
  const totalPengeluaran = getTotalPengeluaran();
  const saldoAkhir = parseFloat(saldoAwal) + totalPemasukan - totalPengeluaran;
  
  return `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">💰 Laporan Keuangan</h2>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 15px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; border: 1px solid #16a34a;">
          <h3 style="color: #16a34a; margin: 0 0 8px 0; font-size: 12px;">💵 Saldo Awal</h3>
          <div style="font-size: 14px; font-weight: bold; color: #16a34a;">${formatRupiah(parseFloat(saldoAwal))}</div>
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; border: 1px solid #16a34a;">
          <h3 style="color: #16a34a; margin: 0 0 8px 0; font-size: 12px;">💰 Total Pemasukan</h3>
          <div style="font-size: 14px; font-weight: bold; color: #16a34a;">${formatRupiah(totalPemasukan)}</div>
        </div>
        <div style="background: #fef2f2; padding: 12px; border-radius: 6px; border: 1px solid #ef4444;">
          <h3 style="color: #ef4444; margin: 0 0 8px 0; font-size: 12px;">💸 Total Pengeluaran</h3>
          <div style="font-size: 14px; font-weight: bold; color: #ef4444;">${formatRupiah(totalPengeluaran)}</div>
        </div>
        <div style="background: #eff6ff; padding: 12px; border-radius: 6px; border: 1px solid #3b82f6;">
          <h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 12px;">💳 Saldo Akhir</h3>
          <div style="font-size: 14px; font-weight: bold; color: #3b82f6;">${formatRupiah(saldoAkhir)}</div>
        </div>
      </div>

      <h3 style="color: #16a34a; margin-bottom: 8px; font-size: 12px;">📊 Rincian Transaksi</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
        <thead>
          <tr style="background: #16a34a; color: white;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">Tanggal</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Keterangan</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 20%;">Jenis</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: right; width: 20%;">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          ${transactions.map((t, index) => `
            <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 6px;">${t.tanggal}</td>
              <td style="border: 1px solid #ddd; padding: 6px; word-wrap: break-word;">${t.keterangan}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">
                <span style="background: ${t.type === 'pemasukan' ? '#16a34a' : t.type === 'dana-masjid' ? '#3b82f6' : '#ef4444'}; color: white; padding: 1px 4px; border-radius: 3px; font-size: 8px;">
                  ${t.type === 'pemasukan' ? '💰 Pemasukan' : t.type === 'dana-masjid' ? '🏛️ Dana Masjid' : '💸 Pengeluaran'}
                </span>
              </td>
              <td style="border: 1px solid #ddd; padding: 6px; text-align: right; color: ${t.type === 'pemasukan' || t.type === 'dana-masjid' ? '#16a34a' : '#ef4444'}; font-weight: bold;">
                ${t.type === 'pengeluaran' ? '-' : '+'}${formatRupiah(t.jumlah)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};

const generateLaporanSection = (getTotalSapi: () => number, getTotalKambing: () => number, saldoAwal: string, getTotalPemasukan: () => number, getTotalPengeluaran: () => number, penerima: Penerima[], progressPercentage: number, formatRupiah: (amount: number) => string): string => {
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
