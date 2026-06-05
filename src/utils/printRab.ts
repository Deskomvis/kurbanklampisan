import { RabData } from '@/contexts/RabContext';
import { RealisasiData } from '@/contexts/RealisasiContext';

const fmtN = (n: number) => n > 0 ? n.toLocaleString('id-ID') : '-';
const fmtSelisih = (s: number) => `${s >= 0 ? '+' : '-'}${Math.abs(s).toLocaleString('id-ID')}`;

const thStyle = 'border:1.5px solid #333;padding:5px 6px;font-size:9pt;font-weight:bold;background:#f0f0f0;text-align:center;';
const tdStyle = 'border:1px solid #555;padding:3px 6px;font-size:9pt;vertical-align:top;';

const rabTable = (rabData: RabData, year: string, hijriah: number): string => {
  const totalPemasukan = rabData.pemasukanItems.reduce((s, i) => s + i.jumlah, 0);
  const totalPengeluaran = rabData.pengeluaranCategories.reduce((s, c) => s + c.items.reduce((cs, i) => cs + i.jumlah, 0), 0);
  const sisa = totalPemasukan - totalPengeluaran;

  const pemRows = rabData.pemasukanItems.map((item, idx) => `
    <tr style="background:${idx % 2 === 0 ? '#f9f9f9' : '#fff'}">
      <td style="${tdStyle}text-align:center">${idx + 1}</td>
      <td style="${tdStyle}">${item.uraian}</td>
      <td style="${tdStyle}text-align:center">${item.vol}</td>
      <td style="${tdStyle}text-align:center">${item.satuan}</td>
      <td style="${tdStyle}text-align:right">${fmtN(item.hargaSatuan)}</td>
      <td style="${tdStyle}text-align:right;font-weight:500">${fmtN(item.jumlah)}</td>
    </tr>`).join('');

  const pelRows = rabData.pengeluaranCategories.map(cat => {
    const catHeader = `<tr style="background:#f0f0f0">
      <td style="${tdStyle}text-align:center;font-weight:600">${cat.no}</td>
      <td style="${tdStyle}font-weight:600" colspan="5">${cat.nama}</td>
    </tr>`;
    const items = cat.items.map((item, ii) => `
      <tr style="background:${ii % 2 === 0 ? '#f9f9f9' : '#fff'}">
        <td style="${tdStyle}text-align:center;color:#aaa"></td>
        <td style="${tdStyle}padding-left:16px">${item.uraian}</td>
        <td style="${tdStyle}text-align:center">${item.vol}</td>
        <td style="${tdStyle}text-align:center">${item.satuan}</td>
        <td style="${tdStyle}text-align:right">${fmtN(item.hargaSatuan)}</td>
        <td style="${tdStyle}text-align:right;font-weight:500">${fmtN(item.jumlah)}</td>
      </tr>`).join('');
    return catHeader + items;
  }).join('');

  return `
    <div style="margin-bottom:16px">
      <div style="text-align:center;margin-bottom:8px">
        <p style="font-size:10pt;font-weight:bold;text-transform:uppercase">Rencana Anggaran dan Biaya</p>
        <p style="font-size:9.5pt;font-weight:bold;text-transform:uppercase">Pelaksanaan Hari Raya Idul Adha ${hijriah} H / ${year} M</p>
        <p style="font-size:9.5pt;font-weight:bold;text-transform:uppercase">Masjid Istiqomah Klampisan</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="${thStyle}width:28px">No.</th>
            <th style="${thStyle}">Uraian</th>
            <th style="${thStyle}width:36px">Vol</th>
            <th style="${thStyle}width:52px">Satuan</th>
            <th style="${thStyle}width:90px">Harga Satuan</th>
            <th style="${thStyle}width:90px">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#222;color:#fff">
            <td style="${tdStyle}text-align:center;font-weight:bold">I</td>
            <td style="${tdStyle}font-weight:bold;text-transform:uppercase" colspan="5">PEMASUKAN</td>
          </tr>
          ${pemRows}
          <tr style="background:#e8e8e8;border-top:2px solid #333">
            <td style="${tdStyle}"></td>
            <td style="${tdStyle}font-weight:bold;text-align:center" colspan="4">Jumlah</td>
            <td style="${tdStyle}text-align:right;font-weight:bold">${fmtN(totalPemasukan)}</td>
          </tr>
          <tr style="background:#222;color:#fff">
            <td style="${tdStyle}text-align:center;font-weight:bold">II</td>
            <td style="${tdStyle}font-weight:bold;text-transform:uppercase" colspan="5">PENGELUARAN</td>
          </tr>
          ${pelRows}
          <tr style="background:#e8e8e8;border-top:2px solid #333">
            <td style="${tdStyle}"></td>
            <td style="${tdStyle}font-weight:bold;text-align:center" colspan="4">Jumlah</td>
            <td style="${tdStyle}text-align:right;font-weight:bold">${fmtN(totalPengeluaran)}</td>
          </tr>
          <tr style="background:#d4edda;border-top:2px solid #555">
            <td style="${tdStyle}text-align:center;font-weight:bold;color:#155724">III</td>
            <td style="${tdStyle}font-weight:bold;text-transform:uppercase;color:#155724" colspan="4">SISA</td>
            <td style="${tdStyle}text-align:right;font-weight:900;font-size:10pt;color:${sisa >= 0 ? '#155724' : '#721c24'}">${sisa < 0 ? `(${fmtN(Math.abs(sisa))})` : fmtN(sisa)}</td>
          </tr>
        </tbody>
      </table>
    </div>`;
};

const realisasiTable = (data: RealisasiData, year: string, hijriah: number): string => {
  const totalPemasukan = data.pemasukanItems.reduce((s, i) => s + i.jumlah, 0);
  const totalPengeluaran = data.pengeluaranItems.reduce((s, i) => s + i.jumlah, 0);
  const saldo = totalPemasukan - totalPengeluaran;

  const pemRows = data.pemasukanItems.map((item, idx) => `
    <tr style="background:${idx % 2 === 0 ? '#f9f9f9' : '#fff'}">
      <td style="${tdStyle}text-align:center">${idx + 1}</td>
      <td style="${tdStyle}">${item.uraian}</td>
      <td style="${tdStyle}text-align:center">${item.vol}</td>
      <td style="${tdStyle}text-align:center">${item.satuan}</td>
      <td style="${tdStyle}text-align:right">${fmtN(item.hargaSatuan)}</td>
      <td style="${tdStyle}text-align:right;font-weight:500">${fmtN(item.jumlah)}</td>
    </tr>`).join('') || `<tr><td colspan="6" style="${tdStyle}text-align:center;color:#888">Belum ada data</td></tr>`;

  const pelRows = data.pengeluaranItems.map((item, idx) => `
    <tr style="background:${idx % 2 === 0 ? '#f9f9f9' : '#fff'}">
      <td style="${tdStyle}text-align:center">${idx + 1}</td>
      <td style="${tdStyle}">${item.uraian}</td>
      <td style="${tdStyle}text-align:center">${item.vol}</td>
      <td style="${tdStyle}text-align:center">${item.satuan}</td>
      <td style="${tdStyle}text-align:right">${fmtN(item.hargaSatuan)}</td>
      <td style="${tdStyle}text-align:right;font-weight:500">${fmtN(item.jumlah)}</td>
    </tr>`).join('') || `<tr><td colspan="6" style="${tdStyle}text-align:center;color:#888">Belum ada data</td></tr>`;

  return `
    <div style="margin-bottom:16px;page-break-before:always">
      <div style="text-align:center;margin-bottom:8px">
        <p style="font-size:10pt;font-weight:bold;text-transform:uppercase">Realisasi Anggaran dan Belanja</p>
        <p style="font-size:9.5pt;font-weight:bold;text-transform:uppercase">Pelaksanaan Hari Raya Idul Adha ${hijriah} H / ${year} M</p>
        <p style="font-size:9.5pt;font-weight:bold;text-transform:uppercase">Masjid Istiqomah Klampisan</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="${thStyle}width:28px">No.</th>
            <th style="${thStyle}">Uraian</th>
            <th style="${thStyle}width:36px">Vol</th>
            <th style="${thStyle}width:52px">Satuan</th>
            <th style="${thStyle}width:90px">Harga Satuan</th>
            <th style="${thStyle}width:90px">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#222;color:#fff">
            <td style="${tdStyle}text-align:center;font-weight:bold">I</td>
            <td style="${tdStyle}font-weight:bold;text-transform:uppercase" colspan="5">PEMASUKAN</td>
          </tr>
          ${pemRows}
          <tr style="background:#e8e8e8;border-top:2px solid #333">
            <td style="${tdStyle}"></td>
            <td style="${tdStyle}font-weight:bold;text-align:center" colspan="4">Jumlah</td>
            <td style="${tdStyle}text-align:right;font-weight:bold">${fmtN(totalPemasukan)}</td>
          </tr>
          <tr style="background:#222;color:#fff">
            <td style="${tdStyle}text-align:center;font-weight:bold">II</td>
            <td style="${tdStyle}font-weight:bold;text-transform:uppercase" colspan="5">PENGELUARAN</td>
          </tr>
          ${pelRows}
          <tr style="background:#e8e8e8;border-top:2px solid #333">
            <td style="${tdStyle}"></td>
            <td style="${tdStyle}font-weight:bold;text-align:center" colspan="4">Jumlah</td>
            <td style="${tdStyle}text-align:right;font-weight:bold">${fmtN(totalPengeluaran)}</td>
          </tr>
          <tr style="background:#d4edda;border-top:2px solid #555">
            <td style="${tdStyle}text-align:center;font-weight:bold;color:#155724">III</td>
            <td style="${tdStyle}font-weight:bold;text-transform:uppercase;color:#155724" colspan="4">SALDO</td>
            <td style="${tdStyle}text-align:right;font-weight:900;font-size:10pt;color:${saldo >= 0 ? '#155724' : '#721c24'}">${saldo < 0 ? `(${fmtN(Math.abs(saldo))})` : fmtN(saldo)}</td>
          </tr>
        </tbody>
      </table>
    </div>`;
};

const perbandinganTable = (rabData: RabData, realisasiData: RealisasiData, year: string): string => {
  const rabPem = rabData.pemasukanItems.reduce((s, i) => s + i.jumlah, 0);
  const rabPel = rabData.pengeluaranCategories.reduce((s, c) => s + c.items.reduce((cs, i) => cs + i.jumlah, 0), 0);
  const rabSisa = rabPem - rabPel;
  const realPem = realisasiData.pemasukanItems.reduce((s, i) => s + i.jumlah, 0);
  const realPel = realisasiData.pengeluaranItems.reduce((s, i) => s + i.jumlah, 0);
  const realSisa = realPem - realPel;

  const selPem = realPem - rabPem;
  const selPel = rabPel - realPel;
  const selSisa = realSisa - rabSisa;
  const pctHemat = rabPel > 0 ? Math.round(Math.abs(selPel) / rabPel * 100) : 0;
  const hemat = selPel >= 0;

  const colCell = (s: number, bold = false) =>
    `<td style="${tdStyle}text-align:right;color:${s >= 0 ? '#155724' : '#721c24'};${bold ? 'font-weight:bold' : ''}">${fmtSelisih(s)}</td>`;

  return `
    <div style="margin-bottom:12px">
      <p style="font-size:10pt;font-weight:bold;text-transform:uppercase;margin-bottom:6px;border-bottom:1px solid #333;padding-bottom:4px">
        Perbandingan RAB vs Realisasi ${year}
      </p>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="${thStyle}">Uraian</th>
            <th style="${thStyle}width:120px">RAB (Rp)</th>
            <th style="${thStyle}width:120px">Realisasi (Rp)</th>
            <th style="${thStyle}width:120px">Selisih (Rp)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#f9f9f9">
            <td style="${tdStyle}font-weight:600">Pemasukan</td>
            <td style="${tdStyle}text-align:right">${fmtN(rabPem)}</td>
            <td style="${tdStyle}text-align:right">${fmtN(realPem)}</td>
            ${colCell(selPem)}
          </tr>
          <tr>
            <td style="${tdStyle}font-weight:600">Pengeluaran</td>
            <td style="${tdStyle}text-align:right">${fmtN(rabPel)}</td>
            <td style="${tdStyle}text-align:right">${fmtN(realPel)}</td>
            ${colCell(selPel)}
          </tr>
          <tr style="background:#d4edda;border-top:2px solid #333">
            <td style="${tdStyle}font-weight:bold;color:#155724">Saldo / Sisa</td>
            <td style="${tdStyle}text-align:right;font-weight:bold">${fmtN(rabSisa)}</td>
            <td style="${tdStyle}text-align:right;font-weight:bold">${fmtN(realSisa)}</td>
            ${colCell(selSisa, true)}
          </tr>
        </tbody>
      </table>
      <p style="margin-top:5px;font-size:8.5pt;font-style:italic;color:#444">
        * Realisasi pengeluaran tahun ${year} ${hemat
          ? `dapat menghemat ${pctHemat}% dari RAB pengeluaran tahun ini dengan selisih (Rp ${Math.abs(selPel).toLocaleString('id-ID')}). Saldo Realisasi sisa tahun ini (Rp ${realSisa.toLocaleString('id-ID')}).`
          : `melebihi RAB sebesar ${pctHemat}% dengan selisih (Rp ${Math.abs(selPel).toLocaleString('id-ID')}).`}
        Dengan catatan: Donasi dari para donatur tidak dimasukkan ke laporan pengeluaran.
      </p>
    </div>`;
};

export const printRab = (rabData: RabData, realisasiData: RealisasiData, year: string) => {
  const hijriah = parseInt(year) - 579;

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>RAB & Realisasi Kurban ${year}</title>
  <style>
    @page { size: A4 portrait; margin: 10mm 10mm 10mm 12mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 9pt; color: #000; }
    tr { page-break-inside: avoid; }
  </style>
</head>
<body>
  ${rabTable(rabData, year, hijriah)}
  ${realisasiTable(realisasiData, year, hijriah)}
  ${perbandinganTable(rabData, realisasiData, year)}
  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=700');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
};
