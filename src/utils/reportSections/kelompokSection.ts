
import { KelompokSapi, KurbanKambing } from '@/contexts/KelompokKurbanContext';

export const generateKelompokSection = (kelompokSapi: KelompokSapi[], kurbanKambing: KurbanKambing[]): string => {
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
