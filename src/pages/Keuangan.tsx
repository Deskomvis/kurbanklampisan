
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { SaldoAwalForm } from '@/components/keuangan/SaldoAwalForm';
import { TransactionForm } from '@/components/keuangan/TransactionForm';
import { TransactionSummary } from '@/components/keuangan/TransactionSummary';
import { Transaction } from '@/components/keuangan/types';

const Keuangan = () => {
  const [tanggalPemasukan, setTanggalPemasukan] = useState('01/06/2025');
  const [keteranganPemasukan, setKeteranganPemasukan] = useState('');
  const [jumlahPemasukan, setJumlahPemasukan] = useState('0');
  
  const [tanggalPengeluaran, setTanggalPengeluaran] = useState('01/06/2025');
  const [keteranganPengeluaran, setKeteranganPengeluaran] = useState('');
  const [jumlahPengeluaran, setJumlahPengeluaran] = useState('0');
  const [buktiNota, setBuktiNota] = useState<File | null>(null);

  const [tanggalDanaMasjid, setTanggalDanaMasjid] = useState('01/06/2025');
  const [keteranganDanaMasjid, setKeteranganDanaMasjid] = useState('');
  const [jumlahDanaMasjid, setJumlahDanaMasjid] = useState('0');

  const [saldoAwal, setSaldoAwal] = useState('0');
  const [keteranganSaldoAwal, setKeteranganSaldoAwal] = useState('');
  const [isSaldoAwalSet, setIsSaldoAwalSet] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSimpanPemasukan = () => {
    if (!keteranganPemasukan || jumlahPemasukan === '0') {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field pemasukan",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      tanggal: tanggalPemasukan,
      keterangan: keteranganPemasukan,
      jumlah: parseFloat(jumlahPemasukan),
      type: 'pemasukan'
    };

    setTransactions([...transactions, newTransaction]);
    setKeteranganPemasukan('');
    setJumlahPemasukan('0');
    
    toast({
      title: "Berhasil",
      description: "Pemasukan berhasil disimpan",
    });
  };

  const handleSimpanPengeluaran = () => {
    if (!keteranganPengeluaran || jumlahPengeluaran === '0') {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field pengeluaran",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      tanggal: tanggalPengeluaran,
      keterangan: keteranganPengeluaran,
      jumlah: parseFloat(jumlahPengeluaran),
      type: 'pengeluaran',
      buktiNota: buktiNota
    };

    setTransactions([...transactions, newTransaction]);
    setKeteranganPengeluaran('');
    setJumlahPengeluaran('0');
    setBuktiNota(null);
    
    toast({
      title: "Berhasil",
      description: "Pengeluaran berhasil disimpan",
    });
  };

  const handleSimpanDanaMasjid = () => {
    if (!keteranganDanaMasjid || jumlahDanaMasjid === '0') {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field dana masjid",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      tanggal: tanggalDanaMasjid,
      keterangan: keteranganDanaMasjid,
      jumlah: parseFloat(jumlahDanaMasjid),
      type: 'dana-masjid'
    };

    setTransactions([...transactions, newTransaction]);
    setKeteranganDanaMasjid('');
    setJumlahDanaMasjid('0');
    
    toast({
      title: "Berhasil",
      description: "Menggunakan Dana Masjid berhasil disimpan",
    });
  };

  const handleSetSaldoAwal = () => {
    if (!keteranganSaldoAwal || saldoAwal === '0') {
      toast({
        title: "Error",
        description: "Mohon lengkapi saldo awal dan keterangan",
        variant: "destructive",
      });
      return;
    }

    setIsSaldoAwalSet(true);
    toast({
      title: "Berhasil",
      description: "Saldo awal berhasil ditetapkan",
    });
  };

  const handleEditSaldoAwal = () => {
    setIsSaldoAwalSet(false);
    toast({
      title: "Info",
      description: "Saldo awal dapat diedit kembali",
    });
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
      title: "Berhasil",
      description: "Transaksi berhasil dihapus",
    });
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    if (transaction.type === 'pemasukan') {
      setTanggalPemasukan(transaction.tanggal);
      setKeteranganPemasukan(transaction.keterangan);
      setJumlahPemasukan(transaction.jumlah.toString());
    } else if (transaction.type === 'pengeluaran') {
      setTanggalPengeluaran(transaction.tanggal);
      setKeteranganPengeluaran(transaction.keterangan);
      setJumlahPengeluaran(transaction.jumlah.toString());
      setBuktiNota(transaction.buktiNota || null);
    } else if (transaction.type === 'dana-masjid') {
      setTanggalDanaMasjid(transaction.tanggal);
      setKeteranganDanaMasjid(transaction.keterangan);
      setJumlahDanaMasjid(transaction.jumlah.toString());
    }
  };

  const handleUpdate = (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => {
    if (!editingId) return;

    const updatedTransaction: Transaction = {
      id: editingId,
      tanggal: type === 'pemasukan' ? tanggalPemasukan : type === 'pengeluaran' ? tanggalPengeluaran : tanggalDanaMasjid,
      keterangan: type === 'pemasukan' ? keteranganPemasukan : type === 'pengeluaran' ? keteranganPengeluaran : keteranganDanaMasjid,
      jumlah: parseFloat(type === 'pemasukan' ? jumlahPemasukan : type === 'pengeluaran' ? jumlahPengeluaran : jumlahDanaMasjid),
      type: type,
      buktiNota: type === 'pengeluaran' ? buktiNota : undefined
    };

    setTransactions(transactions.map(t => t.id === editingId ? updatedTransaction : t));
    setEditingId(null);
    
    // Reset forms
    if (type === 'pemasukan') {
      setKeteranganPemasukan('');
      setJumlahPemasukan('0');
    } else if (type === 'pengeluaran') {
      setKeteranganPengeluaran('');
      setJumlahPengeluaran('0');
      setBuktiNota(null);
    } else if (type === 'dana-masjid') {
      setKeteranganDanaMasjid('');
      setJumlahDanaMasjid('0');
    }

    toast({
      title: "Berhasil",
      description: "Transaksi berhasil diupdate",
    });
  };

  // Calculate totals
  const totalPemasukan = transactions
    .filter(t => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.jumlah, 0);
  
  const totalPengeluaran = transactions
    .filter(t => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.jumlah, 0);

  const totalDanaMasjid = transactions
    .filter(t => t.type === 'dana-masjid')
    .reduce((sum, t) => sum + t.jumlah, 0);

  const saldoAkhir = parseFloat(saldoAwal) + totalPemasukan + totalDanaMasjid - totalPengeluaran;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Manajemen Keuangan</h2>
      
      <SaldoAwalForm
        saldoAwal={saldoAwal}
        setSaldoAwal={setSaldoAwal}
        keteranganSaldoAwal={keteranganSaldoAwal}
        setKeteranganSaldoAwal={setKeteranganSaldoAwal}
        isSaldoAwalSet={isSaldoAwalSet}
        onSetSaldoAwal={handleSetSaldoAwal}
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
              tanggal={tanggalPemasukan}
              setTanggal={setTanggalPemasukan}
              keterangan={keteranganPemasukan}
              setKeterangan={setKeteranganPemasukan}
              jumlah={jumlahPemasukan}
              setJumlah={setJumlahPemasukan}
              placeholder="Sumber pemasukan"
              onSave={handleSimpanPemasukan}
              onUpdate={() => handleUpdate('pemasukan')}
              onCancelEdit={() => {
                setEditingId(null);
                setKeteranganPemasukan('');
                setJumlahPemasukan('0');
              }}
              editingId={editingId}
              transactions={transactions}
            />

            <TransactionForm
              type="pengeluaran"
              title="Pengeluaran"
              icon="💸"
              tanggal={tanggalPengeluaran}
              setTanggal={setTanggalPengeluaran}
              keterangan={keteranganPengeluaran}
              setKeterangan={setKeteranganPengeluaran}
              jumlah={jumlahPengeluaran}
              setJumlah={setJumlahPengeluaran}
              placeholder="Keperluan pengeluaran"
              onSave={handleSimpanPengeluaran}
              onUpdate={() => handleUpdate('pengeluaran')}
              onCancelEdit={() => {
                setEditingId(null);
                setKeteranganPengeluaran('');
                setJumlahPengeluaran('0');
                setBuktiNota(null);
              }}
              editingId={editingId}
              transactions={transactions}
              buktiNota={buktiNota}
              setBuktiNota={setBuktiNota}
            />

            <TransactionForm
              type="dana-masjid"
              title="Menggunakan Dana Masjid"
              icon="🏛️"
              tanggal={tanggalDanaMasjid}
              setTanggal={setTanggalDanaMasjid}
              keterangan={keteranganDanaMasjid}
              setKeterangan={setKeteranganDanaMasjid}
              jumlah={jumlahDanaMasjid}
              setJumlah={setJumlahDanaMasjid}
              placeholder="Keterangan menggunakan dana masjid"
              onSave={handleSimpanDanaMasjid}
              onUpdate={() => handleUpdate('dana-masjid')}
              onCancelEdit={() => {
                setEditingId(null);
                setKeteranganDanaMasjid('');
                setJumlahDanaMasjid('0');
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
            saldoAwal={saldoAwal}
            isSaldoAwalSet={isSaldoAwalSet}
            totalPemasukan={totalPemasukan}
            totalPengeluaran={totalPengeluaran}
            totalDanaMasjid={totalDanaMasjid}
            saldoAkhir={saldoAkhir}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Keuangan;
