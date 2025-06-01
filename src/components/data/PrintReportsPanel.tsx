
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { Printer, FileText, Users, DollarSign, UserCheck, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportOption {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  checked: boolean;
}

export const PrintReportsPanel = () => {
  const { toast } = useToast();
  const { penerima } = usePenerima();
  const { getTotalSapi, getTotalKambing, kelompokSapi, kurbanKambing } = useKelompokKurban();
  const { transactions, saldoAwal, isSaldoAwalSet, getTotalPemasukan, getTotalPengeluaran } = useKeuangan();

  const [reportOptions, setReportOptions] = useState<ReportOption[]>([
    { id: 'dashboard', label: 'Dashboard & Statistik', icon: FileText, checked: true },
    { id: 'kelompok', label: 'Data Kelompok Kurban', icon: Users, checked: true },
    { id: 'penerima', label: 'Daftar Penerima Daging', icon: UserCheck, checked: true },
    { id: 'pembagian', label: 'Status Pembagian Daging', icon: Share2, checked: true },
    { id: 'keuangan', label: 'Laporan Keuangan', icon: DollarSign, checked: true },
    { id: 'laporan', label: 'Laporan Pertanggungjawaban', icon: FileText, checked: true },
  ]);

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

  const generatePrintableContent = () => {
    const selectedReports = reportOptions.filter(option => option.checked);
    
    if (selectedReports.length === 0) {
      toast({
        title: "Error",
        description: "Pilih minimal satu laporan untuk dicetak",
        variant: "destructive",
      });
      return null;
    }

    const sudahMenerima = penerima.filter(p => p.sudahMenerima).length;
    const progressPercentage = penerima.length > 0 ? Math.round((sudahMenerima / penerima.length) * 100) : 0;

    let content = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #16a34a; padding-bottom: 20px;">
          <h1 style="color: #16a34a; margin: 0; font-size: 24px;">📋 LAPORAN KURBAN 2025</h1>
          <p style="color: #666; margin: 5px 0;">Masjid Istiqomah Klampisan - Kaliancar, Selogiri, Wonogiri</p>
          <p style="color: #666; margin: 5px 0; font-size: 14px;">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}</p>
        </div>
    `;

    selectedReports.forEach(report => {
      switch (report.id) {
        case 'dashboard':
          content += `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 10px; margin-bottom: 20px;">📊 Dashboard & Statistik</h2>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #16a34a;">
                  <div style="font-size: 24px; font-weight: bold; color: #16a34a;">${getTotalSapi()}</div>
                  <div style="color: #666; font-size: 14px;">🐄 Hewan Sapi</div>
                </div>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #16a34a;">
                  <div style="font-size: 24px; font-weight: bold; color: #16a34a;">${getTotalKambing()}</div>
                  <div style="color: #666; font-size: 14px;">🐐 Hewan Kambing</div>
                </div>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #16a34a;">
                  <div style="font-size: 24px; font-weight: bold; color: #16a34a;">${penerima.length}</div>
                  <div style="color: #666; font-size: 14px;">👥 Penerima Daging</div>
                </div>
              </div>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
                <h3 style="margin: 0 0 10px 0; color: #16a34a;">Status Pembagian Daging</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span>Sudah Menerima: <strong style="color: #16a34a;">${sudahMenerima} orang</strong></span>
                  <span>Belum Menerima: <strong style="color: #f59e0b;">${penerima.length - sudahMenerima} orang</strong></span>
                </div>
                <div style="background: #e5e7eb; height: 10px; border-radius: 5px; overflow: hidden;">
                  <div style="background: #16a34a; height: 100%; width: ${progressPercentage}%; border-radius: 5px;"></div>
                </div>
                <div style="text-align: center; margin-top: 5px; font-weight: bold; color: #16a34a;">${progressPercentage}% Progress</div>
              </div>
            </div>
          `;
          break;

        case 'kelompok':
          content += `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 10px; margin-bottom: 20px;">👥 Data Kelompok Kurban</h2>
              
              <h3 style="color: #16a34a; margin-bottom: 10px;">🐄 Kelompok Sapi</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
                <thead>
                  <tr style="background: #16a34a; color: white;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">No Kelompok</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Anggota</th>
                  </tr>
                </thead>
                <tbody>
                  ${kelompokSapi.map((kelompok, index) => `
                    <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                      <td style="border: 1px solid #ddd; padding: 8px;">${kelompok.nomor}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${kelompok.anggota.join(', ')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <h3 style="color: #16a34a; margin-bottom: 10px;">🐐 Kurban Kambing</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
                <thead>
                  <tr style="background: #16a34a; color: white;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">No</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nama Pemilik</th>
                  </tr>
                </thead>
                <tbody>
                  ${kurbanKambing.map((kambing, index) => `
                    <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                      <td style="border: 1px solid #ddd; padding: 8px;">${kambing.nomor}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${kambing.pemilik}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;
          break;

        case 'penerima':
          const rt01 = penerima.filter(p => p.rt === '01');
          const rt02 = penerima.filter(p => p.rt === '02');
          const tambahan = penerima.filter(p => p.rt === 'tambahan');
          
          content += `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 10px; margin-bottom: 20px;">📋 Daftar Penerima Daging</h2>
              
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;">
                <div style="background: #16a34a; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 18px; font-weight: bold;">${penerima.length}</div>
                  <div style="font-size: 12px;">Total Penerima</div>
                </div>
                <div style="background: #16a34a; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 18px; font-weight: bold;">${rt01.length}</div>
                  <div style="font-size: 12px;">RT 01</div>
                </div>
                <div style="background: #16a34a; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 18px; font-weight: bold;">${rt02.length}</div>
                  <div style="font-size: 12px;">RT 02</div>
                </div>
                <div style="background: #16a34a; color: white; padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 18px; font-weight: bold;">${tambahan.length}</div>
                  <div style="font-size: 12px;">Penerima Tambahan</div>
                </div>
              </div>

              ${['RT 01', 'RT 02', 'PENERIMA TAMBAHAN'].map((rtLabel, rtIndex) => {
                const rtData = rtIndex === 0 ? rt01 : rtIndex === 1 ? rt02 : tambahan;
                return `
                  <h3 style="color: #16a34a; margin-bottom: 10px;">${rtLabel}</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
                    <thead>
                      <tr style="background: #16a34a; color: white;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">No Pengambilan</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nama</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Blok</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${rtData.map((p, index) => `
                        <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                          <td style="border: 1px solid #ddd; padding: 8px;">${p.nomorPengambilan}</td>
                          <td style="border: 1px solid #ddd; padding: 8px;">${p.nama}</td>
                          <td style="border: 1px solid #ddd; padding: 8px;">${p.blok || '-'}</td>
                          <td style="border: 1px solid #ddd; padding: 8px;">
                            <span style="background: ${p.sudahMenerima ? '#16a34a' : '#f59e0b'}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                              ${p.sudahMenerima ? '✅ Sudah' : '⏳ Belum'}
                            </span>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                `;
              }).join('')}
            </div>
          `;
          break;

        case 'pembagian':
          content += `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 10px; margin-bottom: 20px;">📦 Status Pembagian Daging</h2>
              
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #16a34a;">
                  <div style="font-size: 24px; font-weight: bold; color: #16a34a;">${sudahMenerima}</div>
                  <div style="color: #666; font-size: 14px;">✅ Sudah Menerima</div>
                </div>
                <div style="background: #fffbeb; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #f59e0b;">
                  <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">${penerima.length - sudahMenerima}</div>
                  <div style="color: #666; font-size: 14px;">⏳ Belum Menerima</div>
                </div>
                <div style="background: #eff6ff; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #3b82f6;">
                  <div style="font-size: 24px; font-weight: bold; color: #3b82f6;">${progressPercentage}%</div>
                  <div style="color: #666; font-size: 14px;">📈 Progress</div>
                </div>
              </div>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
                <div style="background: #e5e7eb; height: 15px; border-radius: 8px; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%); height: 100%; width: ${progressPercentage}%; border-radius: 8px; transition: width 0.3s ease;"></div>
                </div>
                <div style="text-align: center; margin-top: 10px; font-weight: bold; color: #16a34a;">Progress Pembagian: ${progressPercentage}%</div>
              </div>
            </div>
          `;
          break;

        case 'keuangan':
          const totalPemasukan = getTotalPemasukan();
          const totalPengeluaran = getTotalPengeluaran();
          const saldoAkhir = parseFloat(saldoAwal) + totalPemasukan - totalPengeluaran;
          
          content += `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 10px; margin-bottom: 20px;">💰 Laporan Keuangan</h2>
              
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #16a34a;">
                  <h3 style="color: #16a34a; margin: 0 0 10px 0; font-size: 16px;">💵 Saldo Awal</h3>
                  <div style="font-size: 20px; font-weight: bold; color: #16a34a;">${formatRupiah(parseFloat(saldoAwal))}</div>
                </div>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #16a34a;">
                  <h3 style="color: #16a34a; margin: 0 0 10px 0; font-size: 16px;">💰 Total Pemasukan</h3>
                  <div style="font-size: 20px; font-weight: bold; color: #16a34a;">${formatRupiah(totalPemasukan)}</div>
                </div>
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border: 1px solid #ef4444;">
                  <h3 style="color: #ef4444; margin: 0 0 10px 0; font-size: 16px;">💸 Total Pengeluaran</h3>
                  <div style="font-size: 20px; font-weight: bold; color: #ef4444;">${formatRupiah(totalPengeluaran)}</div>
                </div>
                <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border: 1px solid #3b82f6;">
                  <h3 style="color: #3b82f6; margin: 0 0 10px 0; font-size: 16px;">💳 Saldo Akhir</h3>
                  <div style="font-size: 20px; font-weight: bold; color: #3b82f6;">${formatRupiah(saldoAkhir)}</div>
                </div>
              </div>

              <h3 style="color: #16a34a; margin-bottom: 10px;">📊 Rincian Transaksi</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
                <thead>
                  <tr style="background: #16a34a; color: white;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tanggal</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Keterangan</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Jenis</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  ${transactions.map((t, index) => `
                    <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                      <td style="border: 1px solid #ddd; padding: 8px;">${t.tanggal}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">${t.keterangan}</td>
                      <td style="border: 1px solid #ddd; padding: 8px;">
                        <span style="background: ${t.type === 'pemasukan' ? '#16a34a' : t.type === 'dana-masjid' ? '#3b82f6' : '#ef4444'}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                          ${t.type === 'pemasukan' ? '💰 Pemasukan' : t.type === 'dana-masjid' ? '🏛️ Dana Masjid' : '💸 Pengeluaran'}
                        </span>
                      </td>
                      <td style="border: 1px solid #ddd; padding: 8px; text-align: right; color: ${t.type === 'pemasukan' || t.type === 'dana-masjid' ? '#16a34a' : '#ef4444'}; font-weight: bold;">
                        ${t.type === 'pengeluaran' ? '-' : '+'}${formatRupiah(t.jumlah)}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;
          break;

        case 'laporan':
          content += `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 10px; margin-bottom: 20px;">📄 Laporan Pertanggungjawaban</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #16a34a; margin-bottom: 15px;">I. Pendahuluan</h3>
                <p style="line-height: 1.6; color: #374151; margin-bottom: 15px;">
                  Segala puji bagi Allah yang telah memberikan kemudahan dalam pelaksanaan ibadah Idul Adha Tahun 1446 H / 2025 M, 
                  yang meliputi pelaksanaan sholat Idul Adha kemudian dilanjutkan dengan pemotongan hewan qurban serta pendistribusian 
                  daging qurban sehingga berjalan dengan lancar sebagaimana mestinya.
                </p>
              </div>

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #16a34a; margin-bottom: 15px;">II. Pelaksanaan Kegiatan</h3>
                <div style="margin-bottom: 15px;">
                  <strong>Tanggal:</strong> Jumat, 06 Juni 2025<br>
                  <strong>Tempat:</strong> Masjid Istiqomah Klampisan, Kaliancar, Selogiri, Wonogiri
                </div>
                
                <h4 style="color: #16a34a; margin-bottom: 10px;">Hewan Kurban:</h4>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                  <thead>
                    <tr style="background: #16a34a; color: white;">
                      <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Jenis Hewan</th>
                      <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="background: #f9fafb;">
                      <td style="border: 1px solid #ddd; padding: 10px;">🐄 Hewan Kurban Sapi</td>
                      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">${getTotalSapi()} ekor</td>
                    </tr>
                    <tr style="background: white;">
                      <td style="border: 1px solid #ddd; padding: 10px;">🐐 Hewan Kurban Kambing</td>
                      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">${getTotalKambing()} ekor</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #16a34a; margin-bottom: 15px;">III. Rincian Keuangan</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
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

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                <h3 style="color: #16a34a; margin-bottom: 15px;">IV. Penutup</h3>
                <p style="line-height: 1.6; color: #374151; margin-bottom: 20px;">
                  Demikian laporan pertanggungjawaban ini kami susun, saran dan kritik yang membangun sangat kami nantikan. 
                  Semoga dengan laporan pertanggungjawaban ini dapat dijadikan bahan evaluasi dan acuan kegiatan di masa-masa mendatang.
                </p>
                
                <div style="text-align: right; margin-top: 40px;">
                  <div>Klampisan, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  <div style="margin-top: 60px;">
                    <strong>Panitia Idul Qurban 1446 H / 2025 M</strong>
                  </div>
                </div>
              </div>
            </div>
          `;
          break;
      }
    });

    content += `
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Laporan ini digenerate otomatis oleh Aplikasi Laporan Kurban - Masjid Istiqomah Klampisan</p>
        </div>
      </div>
    `;

    return content;
  };

  const handlePrintReports = async () => {
    const content = generatePrintableContent();
    if (!content) return;

    setIsGenerating(true);
    try {
      // Create a temporary div to render the content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      document.body.appendChild(tempDiv);

      // Convert to canvas and then to PDF
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const selectedReports = reportOptions.filter(option => option.checked);
      const filename = `Laporan_Kurban_2025_${selectedReports.map(r => r.label.replace(/\s/g, '_')).join('_')}_${new Date().getTime()}.pdf`;
      pdf.save(filename);

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
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Pilih Laporan:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={option.id}
                      checked={option.checked}
                      onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                    />
                    <Icon className="w-4 h-4 text-green-600" />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t">
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
