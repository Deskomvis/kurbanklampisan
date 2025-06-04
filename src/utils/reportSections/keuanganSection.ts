
export const generateKeuanganSection = (saldoAwal: string, getTotalPemasukan: () => number, getTotalPengeluaran: () => number, transactions: any[], formatRupiah: (amount: number) => string): string => {
  const totalPemasukan = getTotalPemasukan();
  const totalPengeluaran = getTotalPengeluaran();
  const saldoAkhir = parseFloat(saldoAwal) + totalPemasukan - totalPengeluaran;
  
  return `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">💰 Laporan Keuangan</h2>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 15px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; border: 1px solid #16a34a;">
          <h3 style="color: #16a34a; margin: 0 0 8px 0; font-size: 12px;">💵 Saldo Awal</h3>
          <div style="font-size: 14px; font-weight: bold; color: #16a34a;">${formatRupiah(parseFloat(saldoAwal))}</div>
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; border: 1px solid #16a34a;">
          <h3 style="color: #16a34a; margin: 0 0 8px 0; font-size: 12px;">💰 Total Pemasukan</h3>
          <div style="font-size: 14px; font-weight: bold; color: #16a34a;">${formatRupiah(totalPemasukan)}</div>
        </div>
        <div style="background: #fef2f2; padding: 12px; border-radius: 6px; border: 1px solid #ef4444;">
          <h3 style="color: #ef4444; margin: 0 0 8px 0; font-size: 12px;">💸 Total Pengeluaran</h3>
          <div style="font-size: 14px; font-weight: bold; color: #ef4444;">${formatRupiah(totalPengeluaran)}</div>
        </div>
        <div style="background: #eff6ff; padding: 12px; border-radius: 6px; border: 1px solid #3b82f6;">
          <h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 12px;">💳 Saldo Akhir</h3>
          <div style="font-size: 14px; font-weight: bold; color: #3b82f6;">${formatRupiah(saldoAkhir)}</div>
        </div>
      </div>

      <h3 style="color: #16a34a; margin-bottom: 8px; font-size: 12px;">📊 Rincian Transaksi</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9px;">
        <thead>
          <tr style="background: #16a34a; color: white;">
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 15%;">Tanggal</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left;">Keterangan</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: left; width: 20%;">Jenis</th>
            <th style="border: 1px solid #ddd; padding: 6px; text-align: right; width: 20%;">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          ${transactions.map((t, index) => `
            <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 6px;">${t.tanggal}</td>
              <td style="border: 1px solid #ddd; padding: 6px; word-wrap: break-word;">${t.keterangan}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">
                <span style="background: ${t.type === 'pemasukan' ? '#16a34a' : t.type === 'dana-masjid' ? '#3b82f6' : '#ef4444'}; color: white; padding: 1px 4px; border-radius: 3px; font-size: 8px;">
                  ${t.type === 'pemasukan' ? '💰 Pemasukan' : t.type === 'dana-masjid' ? '🏛️ Dana Masjid' : '💸 Pengeluaran'}
                </span>
              </td>
              <td style="border: 1px solid #ddd; padding: 6px; text-align: right; color: ${t.type === 'pemasukan' || t.type === 'dana-masjid' ? '#16a34a' : '#ef4444'}; font-weight: bold;">
                ${t.type === 'pengeluaran' ? '-' : '+'}${formatRupiah(t.jumlah)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};
