
import { Penerima } from '@/contexts/PenerimaContext';

export const generatePenerimaSection = (penerima: Penerima[]): string => {
  const rt01 = penerima.filter(p => p.rt === '01');
  const rt02 = penerima.filter(p => p.rt === '02');
  const rt00 = penerima.filter(p => p.rt === '00');
  const tambahan = penerima.filter(p => p.rt === 'tambahan');

  const sections: Array<{ label: string; data: Penerima[]; headerColor: string }> = [
    { label: 'RT 01', data: rt01, headerColor: '#16a34a' },
    { label: 'RT 02', data: rt02, headerColor: '#16a34a' },
  ];
  if (tambahan.length > 0) sections.push({ label: 'PENERIMA TAMBAHAN', data: tambahan, headerColor: '#16a34a' });
  if (rt00.length > 0) sections.push({ label: 'DILUAR RT (RT 00)', data: rt00, headerColor: '#d97706' });

  const summaryCards = [
    { label: 'Total Penerima', value: penerima.length, color: '#16a34a' },
    { label: 'RT 01', value: rt01.length, color: '#16a34a' },
    { label: 'RT 02', value: rt02.length, color: '#16a34a' },
    { label: 'Diluar RT', value: rt00.length, color: '#d97706' },
  ];

  return `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📋 Daftar Penerima Daging</h2>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 15px;">
        ${summaryCards.map(c => `
          <div style="background: ${c.color}; color: white; padding: 8px; border-radius: 6px; text-align: center;">
            <div style="font-size: 14px; font-weight: bold;">${c.value}</div>
            <div style="font-size: 9px;">${c.label}</div>
          </div>
        `).join('')}
      </div>

      ${sections.map(section => `
        <div style="page-break-inside: avoid; margin-bottom: 15px;">
          <h3 style="color: ${section.headerColor}; margin-bottom: 8px; font-size: 12px;">${section.label}</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
            <thead>
              <tr style="background: ${section.headerColor}; color: white;">
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 12%;">No Pengambilan</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Nama</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">Blok</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${section.data.map((p, index) => `
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
      `).join('')}
    </div>
  `;
};
