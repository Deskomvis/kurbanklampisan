import { Transaction } from '@/contexts/KeuanganContext';

const fmtRp = (n: number) => n.toLocaleString('id-ID');
const fmtDate = (s: string) => s || '-';

const tableRows = (items: Transaction[], startNo: number = 1): string => {
  if (items.length === 0) {
    return `<tr><td colspan="4" style="text-align:center;color:#888;padding:6px;">Tidak ada data</td></tr>`;
  }
  return items.map((t, i) => `
    <tr style="background:${i % 2 === 0 ? '#f9f9f9' : '#fff'}">
      <td class="no">${startNo + i}</td>
      <td class="tgl">${fmtDate(t.tanggal)}</td>
      <td class="ket">${t.keterangan}</td>
      <td class="jml">Rp ${fmtRp(t.jumlah)}</td>
    </tr>`).join('');
};

export const printKeuangan = (
  transactions: Transaction[],
  saldoAwal: string,
  isSaldoAwalSet: boolean,
  year: string
) => {
  const hijriah = parseInt(year) - 579;
  const saldoAwalNum = isSaldoAwalSet ? parseFloat(saldoAwal) || 0 : 0;

  const pemasukan = transactions.filter(t => t.type === 'pemasukan');
  const pengeluaran = transactions.filter(t => t.type === 'pengeluaran');
  const danaMasjid = transactions.filter(t => t.type === 'dana-masjid');

  const totalPemasukan = pemasukan.reduce((s, t) => s + t.jumlah, 0);
  const totalPengeluaran = pengeluaran.reduce((s, t) => s + t.jumlah, 0);
  const totalDanaMasjid = danaMasjid.reduce((s, t) => s + t.jumlah, 0);
  const saldoAkhir = saldoAwalNum + totalPemasukan + totalDanaMasjid - totalPengeluaran;

  const danaMasjidSection = danaMasjid.length > 0 ? `
    <!-- DANA MASJID -->
    <tr class="section-header">
      <td class="no">III</td>
      <td colspan="3" class="section-title">PINJAM DANA MASJID</td>
    </tr>
    ${tableRows(danaMasjid)}
    <tr class="subtotal-row">
      <td class="no"></td>
      <td colspan="2" class="subtotal-label">Jumlah Dana Masjid</td>
      <td class="jml"><strong>Rp ${fmtRp(totalDanaMasjid)}</strong></td>
    </tr>` : '';

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Laporan Keuangan Kurban ${year}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 12mm 12mm 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 9.5pt; color: #000; }

    .doc-title { text-align: center; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 8px; }
    .doc-title p { font-size: 10.5pt; font-weight: bold; text-transform: uppercase; line-height: 1.6; }

    table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
    th { border: 1.5px solid #333; padding: 5px 6px; font-size: 9.5pt; text-align: center; background: #f0f0f0; }
    td { border: 1px solid #555; padding: 3px 6px; font-size: 9pt; vertical-align: top; }

    tr { page-break-inside: avoid; }

    .no  { width: 28px; text-align: center; }
    .tgl { width: 72px; text-align: center; }
    .ket { }
    .jml { width: 110px; text-align: right; white-space: nowrap; }

    .section-header td { background: #222; color: #fff; font-weight: bold; padding: 5px 6px; }
    .section-title { font-size: 9.5pt; }
    .subtotal-row td { background: #e8e8e8; font-size: 9.5pt; }
    .subtotal-label { text-align: right; font-weight: bold; }

    .saldo-table { margin-top: 10px; }
    .saldo-table td { padding: 4px 8px; border: 1px solid #555; }
    .saldo-label { font-weight: bold; width: 200px; }
    .saldo-val { text-align: right; font-weight: bold; width: 130px; }
    .saldo-akhir td { background: #d4edda; font-size: 10pt; }
  </style>
</head>
<body>

  <div class="doc-title">
    <p>LAPORAN KEUANGAN</p>
    <p>PELAKSANAAN HARI RAYA IDUL ADHA ${hijriah} H / ${year} M</p>
    <p>MASJID ISTIQOMAH KLAMPISAN</p>
  </div>

  <table>
    <thead>
      <tr>
        <th class="no">No</th>
        <th class="tgl">Tanggal</th>
        <th class="ket">Keterangan</th>
        <th class="jml">Jumlah (Rp)</th>
      </tr>
    </thead>
    <tbody>

      <!-- PEMASUKAN -->
      <tr class="section-header">
        <td class="no">I</td>
        <td colspan="3" class="section-title">PEMASUKAN</td>
      </tr>
      ${isSaldoAwalSet && saldoAwalNum > 0 ? `
      <tr style="background:#f9f9f9">
        <td class="no">*</td>
        <td class="tgl">-</td>
        <td class="ket">Saldo Awal</td>
        <td class="jml">Rp ${fmtRp(saldoAwalNum)}</td>
      </tr>` : ''}
      ${tableRows(pemasukan)}
      <tr class="subtotal-row">
        <td class="no"></td>
        <td colspan="2" class="subtotal-label">Jumlah Pemasukan</td>
        <td class="jml"><strong>Rp ${fmtRp(totalPemasukan + (isSaldoAwalSet ? saldoAwalNum : 0))}</strong></td>
      </tr>

      <!-- PENGELUARAN -->
      <tr class="section-header">
        <td class="no">II</td>
        <td colspan="3" class="section-title">PENGELUARAN</td>
      </tr>
      ${tableRows(pengeluaran)}
      <tr class="subtotal-row">
        <td class="no"></td>
        <td colspan="2" class="subtotal-label">Jumlah Pengeluaran</td>
        <td class="jml"><strong>Rp ${fmtRp(totalPengeluaran)}</strong></td>
      </tr>

      ${danaMasjidSection}

    </tbody>
  </table>

  <!-- RINGKASAN SALDO -->
  <table class="saldo-table">
    <tbody>
      ${isSaldoAwalSet ? `
      <tr>
        <td class="saldo-label">Saldo Awal</td>
        <td class="saldo-val">Rp ${fmtRp(saldoAwalNum)}</td>
      </tr>` : ''}
      <tr>
        <td class="saldo-label">Total Pemasukan</td>
        <td class="saldo-val">Rp ${fmtRp(totalPemasukan)}</td>
      </tr>
      <tr>
        <td class="saldo-label">Total Pengeluaran</td>
        <td class="saldo-val">Rp ${fmtRp(totalPengeluaran)}</td>
      </tr>
      ${danaMasjid.length > 0 ? `
      <tr>
        <td class="saldo-label">Pinjam Dana Masjid</td>
        <td class="saldo-val">Rp ${fmtRp(totalDanaMasjid)}</td>
      </tr>` : ''}
      <tr class="saldo-akhir">
        <td class="saldo-label">SALDO AKHIR</td>
        <td class="saldo-val">Rp ${fmtRp(saldoAkhir)}</td>
      </tr>
    </tbody>
  </table>

  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=700');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
};
