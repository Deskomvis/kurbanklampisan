import { PanitiaItem } from '@/data/panitiaData';
import { PanitiaHeaderInfo } from '@/contexts/PanitiaContext';

/* Split nama array into two columns for numbered lists */
const splitColumns = (names: string[]): string => {
  if (names.length === 0) return '';
  if (names.length <= 2) {
    return `<ol class="nama-list">${names.map(n => `<li>${n}</li>`).join('')}</ol>`;
  }
  const half = Math.ceil(names.length / 2);
  const left = names.slice(0, half);
  const right = names.slice(half);
  const rows = Array.from({ length: half }, (_, i) => `
    <tr>
      <td class="col-no">${i + 1}.</td><td class="col-nama">${left[i] || ''}</td>
      ${right[i] !== undefined ? `<td class="col-no2">${half + i + 1}.</td><td class="col-nama">${right[i]}</td>` : '<td></td><td></td>'}
    </tr>`).join('');
  return `<table class="two-col"><tbody>${rows}</tbody></table>`;
};

/* Render a single panitia row */
const renderRow = (no: number, item: PanitiaItem): string => {
  const { jabatan, nama } = item;

  // Detect pengawas pattern: last name(s) starting with "Pengawas"
  const pengawasIdx = nama.findIndex(n => n.startsWith('Pengawas'));
  const mainNames = pengawasIdx >= 0 ? nama.slice(0, pengawasIdx) : nama;
  const pengawasNames = pengawasIdx >= 0 ? nama.slice(pengawasIdx) : [];

  // Detect sub-sections (items starting with I. / II. / III. or bold-like sub headers)
  const hasSubSections = mainNames.some(n => /^(I{1,3}V?|IV|V?I{0,3})\.\s/.test(n));

  let contentHtml = '';

  if (hasSubSections) {
    // Group by sub-section headers
    let currentGroup: { header: string; items: string[] } | null = null;
    const groups: { header: string; items: string[] }[] = [];
    for (const n of mainNames) {
      if (/^(I{1,3}V?|IV|V?I{0,3})\.\s/.test(n)) {
        currentGroup = { header: n, items: [] };
        groups.push(currentGroup);
      } else if (currentGroup) {
        currentGroup.items.push(n);
      }
    }
    contentHtml = groups.map(g => `
      <div class="sub-section">
        <div class="sub-header"><em>${g.header}</em></div>
        <ol class="nama-list">${g.items.map(i => `<li>${i}</li>`).join('')}</ol>
      </div>`).join('');
  } else if (mainNames.length === 1) {
    contentHtml = `<span>${mainNames[0]}</span>`;
  } else {
    contentHtml = splitColumns(mainNames);
  }

  const pengawasHtml = pengawasNames.length > 0
    ? `<div class="pengawas">${pengawasNames.join('<br>')}</div>`
    : '';

  return `
    <tr class="panitia-row">
      <td class="td-no">${no}.</td>
      <td class="td-jabatan">${jabatan}${pengawasHtml}</td>
      <td class="td-sep">:</td>
      <td class="td-isi">${contentHtml}</td>
    </tr>`;
};

export const printPanitia = (panitiaList: PanitiaItem[], headerInfo: PanitiaHeaderInfo, year: string) => {
  const hijriah = parseInt(year) - 579;

  // Penanggung Jawab & Penasehat → compact header rows (not numbered)
  // Ketua, Sekretaris, Bendahara, and the rest → numbered body table
  const compactJabatan = ['Penanggung Jawab', 'Penasehat/Pelindung'];
  const headerItems = panitiaList.filter(p => compactJabatan.includes(p.jabatan));
  const bodyItems = panitiaList.filter(p => !compactJabatan.includes(p.jabatan));

  const headerRows = headerItems.map(item => `
    <tr class="header-row">
      <td class="td-jabatan-h" colspan="2"><strong>${item.jabatan}</strong></td>
      <td class="td-sep-h">:</td>
      <td class="td-isi-h">${item.nama.join(', ')}</td>
    </tr>`).join('');

  const bodyRows = bodyItems.map((item, i) => renderRow(i + 1, item)).join('');

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Susunan Panitia Kurban ${year}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 12mm 15mm 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 9.5pt; color: #000; }

    .doc-title {
      text-align: center;
      margin-bottom: 10px;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
    }
    .doc-title p { font-size: 10.5pt; font-weight: bold; text-transform: uppercase; line-height: 1.5; }

    /* Header panitia inti (PJ, Penasehat, Ketua, dll) */
    .header-table { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
    .header-row td { padding: 2px 4px; vertical-align: top; font-size: 9.5pt; }
    .td-jabatan-h { width: 130px; }
    .td-sep-h { width: 12px; text-align: center; }
    .td-isi-h { }

    /* Separator */
    .divider { border-top: 1px solid #000; margin: 6px 0; }

    /* Body panitia (numbered) */
    .body-table { width: 100%; border-collapse: collapse; }
    .panitia-row td { border: 1px solid #555; padding: 4px 6px; vertical-align: top; font-size: 9.5pt; }
    .panitia-row { page-break-inside: avoid; }
    .td-no { width: 22px; text-align: center; font-weight: bold; white-space: nowrap; }
    .td-jabatan { width: 160px; font-weight: bold; }
    .td-sep { width: 10px; text-align: center; }
    .td-isi { }

    .pengawas { font-style: italic; font-weight: normal; font-size: 8.5pt; margin-top: 2px; }

    /* Two-column name layout */
    .two-col { border-collapse: collapse; width: 100%; }
    .two-col td { padding: 0 3px 0 0; vertical-align: top; font-size: 9.5pt; }
    .col-no  { width: 18px; white-space: nowrap; }
    .col-no2 { width: 18px; white-space: nowrap; padding-left: 12px; }
    .col-nama { }

    /* Single-column numbered list */
    .nama-list { margin: 0; padding-left: 18px; }
    .nama-list li { margin-bottom: 1px; }

    /* Sub-section (timbang daging, etc.) */
    .sub-section { margin-bottom: 4px; }
    .sub-header { font-style: italic; margin-bottom: 2px; }
  </style>
</head>
<body>
  <div class="doc-title">
    <p>SUSUNAN PANITIA PELAKSANA</p>
    <p>HARI RAYA IDUL ADHA ${hijriah} H / ${year} M</p>
    <p>MASJID ISTIQOMAH KLAMPISAN</p>
  </div>

  <!-- Header: PJ, Penasehat, Ketua, Sekretaris, Bendahara -->
  <table class="header-table">
    <tbody>${headerRows}</tbody>
  </table>

  <div class="divider"></div>

  <!-- Body: numbered seksi-seksi -->
  <table class="body-table">
    <tbody>${bodyRows}</tbody>
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
