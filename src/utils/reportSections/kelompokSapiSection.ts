
import { KelompokSapi } from '@/contexts/KelompokKurbanContext';

export const generateKelompokSapiSection = (kelompokSapi: KelompokSapi[]): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">🐄 Data Kelompok Sapi</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
        <thead>
          <tr style="background: #16a34a; color: white;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">No Kelompok</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Anggota Kelompok</th>
          </tr>
        </thead>
        <tbody>
          ${kelompokSapi.length > 0 ? kelompokSapi.map((kelompok, index) => `
            <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 6px; vertical-align: top; font-weight: bold;">${kelompok.nomor}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">
                ${kelompok.anggota.map((anggota, anggotaIndex) => `
                  <div style="margin-bottom: 2px; padding: 1px 0;">${anggotaIndex + 1}. ${anggota}</div>
                `).join('')}
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="2" style="border: 1px solid #ddd; padding: 12px; text-align: center; color: #666; font-style: italic;">
                Belum ada data kelompok sapi
              </td>
            </tr>
          `}
        </tbody>
      </table>
      
      <div style="background: #f0f9ff; padding: 10px; border-radius: 4px; border-left: 3px solid #0ea5e9; font-size: 9px;">
        <strong>📊 Ringkasan:</strong> Total ${kelompokSapi.length} kelompok sapi dengan total ${kelompokSapi.reduce((total, k) => total + k.anggota.length, 0)} anggota
      </div>
    </div>
  `;
};
