import { Penerima } from '@/contexts/PenerimaContext';

const twoColumnRows = (items: Penerima[]): string => {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return Array.from({ length: half }, (_, i) => {
    const l = left[i];
    const r = right[i];
    const bg = i % 2 === 0 ? '#f9f9f9' : '#fff';

    const lCells = l
      ? `<td class="no">${l.nomorPengambilan}</td><td class="nama">${l.nama}</td><td class="blok">${l.blok || '-'}</td>`
      : `<td class="no"></td><td class="nama"></td><td class="blok"></td>`;

    const rCells = r
      ? `<td class="no">${r.nomorPengambilan}</td><td class="nama">${r.nama}</td><td class="blok">${r.blok || '-'}</td>`
      : `<td class="no"></td><td class="nama"></td><td class="blok"></td>`;

    return `<tr style="background:${bg}">${lCells}<td class="gap"></td>${rCells}</tr>`;
  }).join('');
};

const sectionHTML = (label: string, items: Penerima[]): string => `
  <div class="section">
    <div class="header">
      <div class="title1">DAFTAR PENERIMA DAGING KURBAN</div>
      <div class="title2">${label}</div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="no">No</th><th class="nama">Nama</th><th class="blok">Blok</th>
          <td class="gap"></td>
          <th class="no">No</th><th class="nama">Nama</th><th class="blok">Blok</th>
        </tr>
      </thead>
      <tbody>
        ${twoColumnRows(items)}
      </tbody>
    </table>
    <div class="jumlah">Jumlah: ${items.length} orang</div>
  </div>
`;

export const printPenerima = (penerima: Penerima[]) => {
  const rt01 = penerima.filter(p => p.rt === '01');
  const rt02 = penerima.filter(p => p.rt === '02');
  const rt00 = penerima.filter(p => p.rt === '00');
  const tambahan = penerima.filter(p => p.rt === 'tambahan');

  const sections = [
    rt01.length > 0 ? sectionHTML('RT 01 / 10 KLAMPISAN', rt01) : '',
    rt02.length > 0 ? sectionHTML('RT 02 / 10 KLAMPISAN', rt02) : '',
    tambahan.length > 0 ? sectionHTML('PENERIMA TAMBAHAN', tambahan) : '',
    rt00.length > 0 ? sectionHTML('DILUAR RT (RT 00)', rt00) : '',
  ].filter(Boolean).join('');

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Daftar Penerima Daging Kurban</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 8mm 8mm 8mm;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: Arial, sans-serif;
      font-size: 8.5pt;
      color: #000;
      background: #fff;
    }

    .section {
      page-break-after: always;
    }
    .section:last-child {
      page-break-after: avoid;
    }

    .header {
      text-align: center;
      margin-bottom: 6px;
    }
    .title1 {
      font-size: 10pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .title2 {
      font-size: 9.5pt;
      font-weight: bold;
      text-transform: uppercase;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    thead th {
      border: 1.5px solid #333;
      padding: 4px 5px;
      font-weight: bold;
      text-align: center;
      background: #fff;
      font-size: 8.5pt;
    }

    tbody tr {
      page-break-inside: avoid;
    }

    tbody td {
      border: 1px solid #555;
      padding: 3px 5px;
      font-size: 8.5pt;
      vertical-align: middle;
    }

    td.gap, th.gap {
      border: none !important;
      width: 6px;
      padding: 0;
      background: transparent;
    }

    .no  { width: 32px; text-align: center; }
    .nama { }
    .blok { width: 52px; text-align: center; }

    .jumlah {
      margin-top: 5px;
      text-align: right;
      font-size: 8pt;
      font-weight: bold;
    }
  </style>
</head>
<body>
  ${sections}
  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=700');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
};
