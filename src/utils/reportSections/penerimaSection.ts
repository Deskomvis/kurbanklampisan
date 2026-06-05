
import { Penerima } from '@/contexts/PenerimaContext';

const twoColumnTable = (items: Penerima[]): string => {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const cellStyle = 'border: 1px solid #333; padding: 4px 6px; font-size: 9pt;';
  const thStyle = 'border: 1px solid #333; padding: 5px 6px; font-size: 9pt; font-weight: bold; background: #fff; text-align: center;';
  const numStyle = `${cellStyle} text-align: center; width: 30px;`;
  const blokStyle = `${cellStyle} text-align: center; width: 55px;`;

  const rows = Array.from({ length: half }, (_, i) => {
    const l = left[i];
    const r = right[i];

    const leftCells = l
      ? `<td style="${numStyle}">${l.nomorPengambilan}</td>
         <td style="${cellStyle}">${l.nama}</td>
         <td style="${blokStyle}">${l.blok || '-'}</td>`
      : `<td style="${numStyle}"></td><td style="${cellStyle}"></td><td style="${blokStyle}"></td>`;

    const rightCells = r
      ? `<td style="${numStyle}">${r.nomorPengambilan}</td>
         <td style="${cellStyle}">${r.nama}</td>
         <td style="${blokStyle}">${r.blok || '-'}</td>`
      : `<td style="${numStyle}"></td><td style="${cellStyle}"></td><td style="${blokStyle}"></td>`;

    const bg = i % 2 === 0 ? '#f9f9f9' : '#ffffff';
    return `<tr style="background:${bg};">
      ${leftCells}
      <td style="width:12px; border:none;"></td>
      ${rightCells}
    </tr>`;
  });

  return `
    <table style="width:100%; border-collapse: collapse; table-layout: fixed;">
      <thead>
        <tr>
          <th style="${thStyle} width:30px;">No</th>
          <th style="${thStyle}">Nama</th>
          <th style="${thStyle} width:55px;">Blok</th>
          <td style="width:12px; border:none;"></td>
          <th style="${thStyle} width:30px;">No</th>
          <th style="${thStyle}">Nama</th>
          <th style="${thStyle} width:55px;">Blok</th>
        </tr>
      </thead>
      <tbody>
        ${rows.join('')}
      </tbody>
    </table>
  `;
};

export const generatePenerimaSection = (penerima: Penerima[]): string => {
  const rt01 = penerima.filter(p => p.rt === '01');
  const rt02 = penerima.filter(p => p.rt === '02');
  const rt00 = penerima.filter(p => p.rt === '00');
  const tambahan = penerima.filter(p => p.rt === 'tambahan');

  const sections: Array<{ label: string; rtLabel: string; data: Penerima[] }> = [
    { label: 'RT 01 / 10 KLAMPISAN', rtLabel: 'RT 01', data: rt01 },
    { label: 'RT 02 / 10 KLAMPISAN', rtLabel: 'RT 02', data: rt02 },
  ];
  if (tambahan.length > 0) sections.push({ label: 'PENERIMA TAMBAHAN', rtLabel: 'Tambahan', data: tambahan });
  if (rt00.length > 0) sections.push({ label: 'DILUAR RT (RT 00)', rtLabel: 'Luar RT', data: rt00 });

  return `
    <div style="margin-bottom: 25px;">

      ${sections.filter(s => s.data.length > 0).map(section => `
        <div style="page-break-before: auto; margin-bottom: 30px;">
          <!-- Header dokumen -->
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
              DAFTAR PENERIMA DAGING KURBAN
            </div>
            <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">
              ${section.label}
            </div>
          </div>

          ${twoColumnTable(section.data)}

          <!-- Jumlah -->
          <div style="margin-top: 6px; text-align: right; font-size: 9pt; font-weight: bold;">
            Jumlah: ${section.data.length} orang
          </div>
        </div>
      `).join('')}

    </div>
  `;
};
