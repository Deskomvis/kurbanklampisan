
import { Penerima } from '@/contexts/PenerimaContext';

export const generatePenerimaSection = (penerima: Penerima[]): string => {
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
