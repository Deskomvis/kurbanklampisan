
import { KurbanKambing } from '@/contexts/KelompokKurbanContext';

export const generateKelompokKambingSection = (kurbanKambing: KurbanKambing[]): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">🐐 Data Kurban Kambing</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
        <thead>
          <tr style="background: #16a34a; color: white;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">No Urut</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Nama Pemilik</th>
          </tr>
        </thead>
        <tbody>
          ${kurbanKambing.length > 0 ? kurbanKambing
            .sort((a, b) => a.nomor - b.nomor)
            .map((kambing, index) => `
            <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 6px; text-align: center; font-weight: bold;">${kambing.nomor}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">${kambing.pemilik}</td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="2" style="border: 1px solid #ddd; padding: 12px; text-align: center; color: #666; font-style: italic;">
                Belum ada data kurban kambing
              </td>
            </tr>
          `}
        </tbody>
      </table>
      
      <div style="background: #f0f9ff; padding: 10px; border-radius: 4px; border-left: 3px solid #0ea5e9; font-size: 9px;">
        <strong>📊 Ringkasan:</strong> Total ${kurbanKambing.length} kurban kambing
      </div>
    </div>
  `;
};
