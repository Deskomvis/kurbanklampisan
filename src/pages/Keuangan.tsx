
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SaldoAwalForm } from '@/components/keuangan/SaldoAwalForm';
import { TransactionForm } from '@/components/keuangan/TransactionForm';
import { TransactionSummary } from '@/components/keuangan/TransactionSummary';
import { Transaction } from '@/components/keuangan/types';
import { useKeuanganState } from '@/hooks/useKeuanganState';
import { useKeuanganHandlers } from '@/hooks/useKeuanganHandlers';
import { calculateTotals, calculateSaldoAkhir, formatRupiah } from '@/utils/keuanganCalculations';

const Keuangan = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    pemasukan,
    pengeluaran,
    danaMasjid,
    saldoAwal,
    isSaldoAwalSet,
    setPemasukan,
    setPengeluaran,
    setDanaMasjid,
    setSaldoAwal,
    setIsSaldoAwalSet,
    resetForm,
    updateForm
  } = useKeuanganState();

  const {
    validateAndSave,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleSetSaldoAwal,
    handleEditSaldoAwal
  } = useKeuanganHandlers({
    transactions,
    setTransactions,
    setEditingId,
    resetForm,
    updateForm,
    setIsSaldoAwalSet
  });

  const { totalPemasukan, totalPengeluaran, totalDanaMasjid } = calculateTotals(transactions);
  const saldoAkhirValue = calculateSaldoAkhir(saldoAwal.jumlah, totalPemasukan, totalPengeluaran, totalDanaMasjid);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Manajemen Keuangan</h2>
      
      <SaldoAwalForm
        saldoAwal={saldoAwal.jumlah}
        setSaldoAwal={(value) => setSaldoAwal(prev => ({ ...prev, jumlah: value }))}
        keteranganSaldoAwal={saldoAwal.keterangan}
        setKeteranganSaldoAwal={(value) => setSaldoAwal(prev => ({ ...prev, keterangan: value }))}
        isSaldoAwalSet={isSaldoAwalSet}
        onSetSaldoAwal={() => handleSetSaldoAwal(saldoAwal)}
        onEditSaldoAwal={handleEditSaldoAwal}
        formatRupiah={formatRupiah}
      />

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Transaksi</TabsTrigger>
          <TabsTrigger value="history">Riwayat Transaksi</TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TransactionForm
              type="pemasukan"
              title="Pemasukan"
              icon="💰"
              tanggal={pemasukan.tanggal}
              setTanggal={(value) => updateForm('pemasukan', 'tanggal', value)}
              keterangan={pemasukan.keterangan}
              setKeterangan={(value) => updateForm('pemasukan', 'keterangan', value)}
              jumlah={pemasukan.jumlah}
              setJumlah={(value) => updateForm('pemasukan', 'jumlah', value)}
              placeholder="Sumber pemasukan"
              onSave={() => validateAndSave('pemasukan', pemasukan)}
              onUpdate={() => handleUpdate('pemasukan', editingId, pemasukan)}
              onCancelEdit={() => {
                setEditingId(null);
                resetForm('pemasukan');
              }}
              editingId={editingId}
              transactions={transactions}
            />

            <TransactionForm
              type="pengeluaran"
              title="Pengeluaran"
              icon="💸"
              tanggal={pengeluaran.tanggal}
              setTanggal={(value) => updateForm('pengeluaran', 'tanggal', value)}
              keterangan={pengeluaran.keterangan}
              setKeterangan={(value) => updateForm('pengeluaran', 'keterangan', value)}
              jumlah={pengeluaran.jumlah}
              setJumlah={(value) => updateForm('pengeluaran', 'jumlah', value)}
              placeholder="Keperluan pengeluaran"
              onSave={() => validateAndSave('pengeluaran', pengeluaran)}
              onUpdate={() => handleUpdate('pengeluaran', editingId, pengeluaran)}
              onCancelEdit={() => {
                setEditingId(null);
                resetForm('pengeluaran');
              }}
              editingId={editingId}
              transactions={transactions}
              buktiNota={pengeluaran.buktiNota}
              setBuktiNota={(value) => updateForm('pengeluaran', 'buktiNota', value)}
            />

            <TransactionForm
              type="dana-masjid"
              title="Menggunakan Dana Masjid"
              icon="🏛️"
              tanggal={danaMasjid.tanggal}
              setTanggal={(value) => updateForm('dana-masjid', 'tanggal', value)}
              keterangan={danaMasjid.keterangan}
              setKeterangan={(value) => updateForm('dana-masjid', 'keterangan', value)}
              jumlah={danaMasjid.jumlah}
              setJumlah={(value) => updateForm('dana-masjid', 'jumlah', value)}
              placeholder="Keterangan menggunakan dana masjid"
              onSave={() => validateAndSave('dana-masjid', danaMasjid)}
              onUpdate={() => handleUpdate('dana-masjid', editingId, danaMasjid)}
              onCancelEdit={() => {
                setEditingId(null);
                resetForm('dana-masjid');
              }}
              editingId={editingId}
              transactions={transactions}
            />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <TransactionSummary
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            formatRupiah={formatRupiah}
            saldoAwal={saldoAwal.jumlah}
            isSaldoAwalSet={isSaldoAwalSet}
            totalPemasukan={totalPemasukan}
            totalPengeluaran={totalPengeluaran}
            totalDanaMasjid={totalDanaMasjid}
            saldoAkhir={saldoAkhirValue}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Keuangan;
