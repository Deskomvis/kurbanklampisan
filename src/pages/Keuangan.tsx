
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SaldoAwalForm } from '@/components/keuangan/SaldoAwalForm';
import { TransactionForm } from '@/components/keuangan/TransactionForm';
import { TransactionSummary } from '@/components/keuangan/TransactionSummary';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { formatRupiah } from '@/utils/keuanganCalculations';

const Keuangan = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    pemasukan: { tanggal: '01/06/2025', keterangan: '', jumlah: '0' },
    pengeluaran: { tanggal: '01/06/2025', keterangan: '', jumlah: '0', buktiNota: null as File | null },
    danaMasjid: { tanggal: '01/06/2025', keterangan: '', jumlah: '0' }
  });

  const {
    transactions,
    saldoAwal,
    isSaldoAwalSet,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setSaldoAwal,
    getTotalPengeluaran,
    getTotalPemasukan,
    getTotalDanaMasjid,
    getSaldoAkhir
  } = useKeuangan();

  const resetForm = (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => {
    const resetState = {
      tanggal: '01/06/2025',
      keterangan: '',
      jumlah: '0'
    };

    setFormData(prev => ({
      ...prev,
      [type]: type === 'pengeluaran' 
        ? { ...resetState, buktiNota: null }
        : resetState
    }));
  };

  const updateForm = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    field: string,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const validateAndSave = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    data: any
  ) => {
    if (!data.keterangan || data.jumlah === '0') {
      alert(`Mohon lengkapi semua field ${type}`);
      return;
    }

    const newTransaction = {
      tanggal: data.tanggal,
      keterangan: data.keterangan,
      jumlah: parseFloat(data.jumlah),
      type: type,
      buktiNota: type === 'pengeluaran' ? data.buktiNota : undefined
    };

    addTransaction(newTransaction);
    resetForm(type);
  };

  const handleEdit = (transaction: any) => {
    setEditingId(transaction.id);
    updateForm(transaction.type, 'tanggal', transaction.tanggal);
    updateForm(transaction.type, 'keterangan', transaction.keterangan);
    updateForm(transaction.type, 'jumlah', transaction.jumlah.toString());
    
    if (transaction.type === 'pengeluaran' && transaction.buktiNota) {
      updateForm('pengeluaran', 'buktiNota', transaction.buktiNota);
    }
  };

  const handleUpdate = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    data: any
  ) => {
    if (!editingId) return;

    const updatedTransaction = {
      tanggal: data.tanggal,
      keterangan: data.keterangan,
      jumlah: parseFloat(data.jumlah),
      type: type,
      buktiNota: type === 'pengeluaran' ? data.buktiNota : undefined
    };

    updateTransaction(editingId, updatedTransaction);
    setEditingId(null);
    resetForm(type);
  };

  const handleSetSaldoAwal = (saldo: string, keterangan: string) => {
    if (!keterangan || saldo === '0') {
      alert('Mohon lengkapi saldo awal dan keterangan');
      return;
    }
    setSaldoAwal(saldo);
  };

  const handleEditSaldoAwal = () => {
    // Reset saldo awal untuk di-edit ulang
    setSaldoAwal('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Manajemen Keuangan</h2>
      
      <SaldoAwalForm
        saldoAwal={saldoAwal}
        setSaldoAwal={(value) => setSaldoAwal(value)}
        keteranganSaldoAwal=""
        setKeteranganSaldoAwal={() => {}}
        isSaldoAwalSet={isSaldoAwalSet}
        onSetSaldoAwal={() => handleSetSaldoAwal(saldoAwal, "Saldo Awal")}
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
              tanggal={formData.pemasukan.tanggal}
              setTanggal={(value) => updateForm('pemasukan', 'tanggal', value)}
              keterangan={formData.pemasukan.keterangan}
              setKeterangan={(value) => updateForm('pemasukan', 'keterangan', value)}
              jumlah={formData.pemasukan.jumlah}
              setJumlah={(value) => updateForm('pemasukan', 'jumlah', value)}
              placeholder="Sumber pemasukan"
              onSave={() => validateAndSave('pemasukan', formData.pemasukan)}
              onUpdate={() => handleUpdate('pemasukan', formData.pemasukan)}
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
              tanggal={formData.pengeluaran.tanggal}
              setTanggal={(value) => updateForm('pengeluaran', 'tanggal', value)}
              keterangan={formData.pengeluaran.keterangan}
              setKeterangan={(value) => updateForm('pengeluaran', 'keterangan', value)}
              jumlah={formData.pengeluaran.jumlah}
              setJumlah={(value) => updateForm('pengeluaran', 'jumlah', value)}
              placeholder="Keperluan pengeluaran"
              onSave={() => validateAndSave('pengeluaran', formData.pengeluaran)}
              onUpdate={() => handleUpdate('pengeluaran', formData.pengeluaran)}
              onCancelEdit={() => {
                setEditingId(null);
                resetForm('pengeluaran');
              }}
              editingId={editingId}
              transactions={transactions}
              buktiNota={formData.pengeluaran.buktiNota}
              setBuktiNota={(value) => updateForm('pengeluaran', 'buktiNota', value)}
            />

            <TransactionForm
              type="dana-masjid"
              title="Menggunakan Dana Masjid"
              icon="🏛️"
              tanggal={formData.danaMasjid.tanggal}
              setTanggal={(value) => updateForm('dana-masjid', 'tanggal', value)}
              keterangan={formData.danaMasjid.keterangan}
              setKeterangan={(value) => updateForm('dana-masjid', 'keterangan', value)}
              jumlah={formData.danaMasjid.jumlah}
              setJumlah={(value) => updateForm('dana-masjid', 'jumlah', value)}
              placeholder="Keterangan menggunakan dana masjid"
              onSave={() => validateAndSave('dana-masjid', formData.danaMasjid)}
              onUpdate={() => handleUpdate('dana-masjid', formData.danaMasjid)}
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
            onDelete={deleteTransaction}
            formatRupiah={formatRupiah}
            saldoAwal={saldoAwal}
            isSaldoAwalSet={isSaldoAwalSet}
            totalPemasukan={getTotalPemasukan()}
            totalPengeluaran={getTotalPengeluaran()}
            totalDanaMasjid={getTotalDanaMasjid()}
            saldoAkhir={getSaldoAkhir()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Keuangan;
