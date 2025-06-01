
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Trash2, Edit } from 'lucide-react';

interface Transaction {
  id: number;
  tanggal: string;
  keterangan: string;
  jumlah: number;
  type: 'pemasukan' | 'pengeluaran';
}

const Keuangan = () => {
  const [tanggalPemasukan, setTanggalPemasukan] = useState('01/06/2025');
  const [keteranganPemasukan, setKeteranganPemasukan] = useState('');
  const [jumlahPemasukan, setJumlahPemasukan] = useState('0');
  
  const [tanggalPengeluaran, setTanggalPengeluaran] = useState('01/06/2025');
  const [keteranganPengeluaran, setKeteranganPengeluaran] = useState('');
  const [jumlahPengeluaran, setJumlahPengeluaran] = useState('0');

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
      type: 'pengeluaran'
    };

    setTransactions([...transactions, newTransaction]);
    setKeteranganPengeluaran('');
    setJumlahPengeluaran('0');
    
    toast({
      title: "Berhasil",
      description: "Pengeluaran berhasil disimpan",
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
    } else {
      setTanggalPengeluaran(transaction.tanggal);
      setKeteranganPengeluaran(transaction.keterangan);
      setJumlahPengeluaran(transaction.jumlah.toString());
    }
  };

  const handleUpdate = (type: 'pemasukan' | 'pengeluaran') => {
    if (!editingId) return;

    const updatedTransaction: Transaction = {
      id: editingId,
      tanggal: type === 'pemasukan' ? tanggalPemasukan : tanggalPengeluaran,
      keterangan: type === 'pemasukan' ? keteranganPemasukan : keteranganPengeluaran,
      jumlah: parseFloat(type === 'pemasukan' ? jumlahPemasukan : jumlahPengeluaran),
      type: type
    };

    setTransactions(transactions.map(t => t.id === editingId ? updatedTransaction : t));
    setEditingId(null);
    
    // Reset forms
    if (type === 'pemasukan') {
      setKeteranganPemasukan('');
      setJumlahPemasukan('0');
    } else {
      setKeteranganPengeluaran('');
      setJumlahPengeluaran('0');
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

  const saldoAkhir = parseFloat(saldoAwal) + totalPemasukan - totalPengeluaran;

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
      
      {/* Saldo Awal */}
      {!isSaldoAwalSet && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            💰 Set Saldo Awal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SALDO AWAL (RP):
              </label>
              <Input
                type="number"
                value={saldoAwal}
                onChange={(e) => setSaldoAwal(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                KETERANGAN:
              </label>
              <Input
                type="text"
                value={keteranganSaldoAwal}
                onChange={(e) => setKeteranganSaldoAwal(e.target.value)}
                placeholder="Keterangan saldo awal"
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSetSaldoAwal}
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                💾 Set Saldo Awal
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Transaksi</TabsTrigger>
          <TabsTrigger value="history">Riwayat Transaksi</TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tambah Pemasukan */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                💰 {editingId && transactions.find(t => t.id === editingId)?.type === 'pemasukan' ? 'Edit' : 'Tambah'} Pemasukan
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TANGGAL:
                  </label>
                  <Input
                    type="text"
                    value={tanggalPemasukan}
                    onChange={(e) => setTanggalPemasukan(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KETERANGAN:
                  </label>
                  <Input
                    type="text"
                    value={keteranganPemasukan}
                    onChange={(e) => setKeteranganPemasukan(e.target.value)}
                    placeholder="Sumber pemasukan"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    JUMLAH (RP):
                  </label>
                  <Input
                    type="number"
                    value={jumlahPemasukan}
                    onChange={(e) => setJumlahPemasukan(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  onClick={editingId && transactions.find(t => t.id === editingId)?.type === 'pemasukan' 
                    ? () => handleUpdate('pemasukan') 
                    : handleSimpanPemasukan
                  }
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  💾 {editingId && transactions.find(t => t.id === editingId)?.type === 'pemasukan' ? 'Update' : 'Simpan'} Pemasukan
                </Button>
                {editingId && transactions.find(t => t.id === editingId)?.type === 'pemasukan' && (
                  <Button 
                    onClick={() => {
                      setEditingId(null);
                      setKeteranganPemasukan('');
                      setJumlahPemasukan('0');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Batal Edit
                  </Button>
                )}
              </div>
            </Card>

            {/* Tambah Pengeluaran */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                💸 {editingId && transactions.find(t => t.id === editingId)?.type === 'pengeluaran' ? 'Edit' : 'Tambah'} Pengeluaran
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TANGGAL:
                  </label>
                  <Input
                    type="text"
                    value={tanggalPengeluaran}
                    onChange={(e) => setTanggalPengeluaran(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KETERANGAN:
                  </label>
                  <Input
                    type="text"
                    value={keteranganPengeluaran}
                    onChange={(e) => setKeteranganPengeluaran(e.target.value)}
                    placeholder="Keperluan pengeluaran"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    JUMLAH (RP):
                  </label>
                  <Input
                    type="number"
                    value={jumlahPengeluaran}
                    onChange={(e) => setJumlahPengeluaran(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  onClick={editingId && transactions.find(t => t.id === editingId)?.type === 'pengeluaran' 
                    ? () => handleUpdate('pengeluaran') 
                    : handleSimpanPengeluaran
                  }
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  💾 {editingId && transactions.find(t => t.id === editingId)?.type === 'pengeluaran' ? 'Update' : 'Simpan'} Pengeluaran
                </Button>
                {editingId && transactions.find(t => t.id === editingId)?.type === 'pengeluaran' && (
                  <Button 
                    onClick={() => {
                      setEditingId(null);
                      setKeteranganPengeluaran('');
                      setJumlahPengeluaran('0');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Batal Edit
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          {/* Ringkasan Keuangan */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
              📊 Ringkasan Keuangan
            </h3>
            
            {isSaldoAwalSet && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700">
                  <strong>Saldo Awal:</strong> {formatRupiah(parseFloat(saldoAwal))} - {keteranganSaldoAwal}
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-600 hover:bg-green-600">
                    <TableHead className="text-white">TANGGAL</TableHead>
                    <TableHead className="text-white">KETERANGAN</TableHead>
                    <TableHead className="text-white">PEMASUKAN</TableHead>
                    <TableHead className="text-white">PENGELUARAN</TableHead>
                    <TableHead className="text-white">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500">
                        Belum ada data transaksi
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.tanggal}</TableCell>
                        <TableCell>{transaction.keterangan}</TableCell>
                        <TableCell>
                          {transaction.type === 'pemasukan' ? formatRupiah(transaction.jumlah) : '-'}
                        </TableCell>
                        <TableCell>
                          {transaction.type === 'pengeluaran' ? formatRupiah(transaction.jumlah) : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(transaction)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(transaction.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {isSaldoAwalSet && (
                <Card className="p-4 bg-blue-600 text-white text-center">
                  <div className="text-xl font-bold">{formatRupiah(parseFloat(saldoAwal))}</div>
                  <div className="text-blue-100">Saldo Awal</div>
                </Card>
              )}
              <Card className="p-4 bg-green-600 text-white text-center">
                <div className="text-xl font-bold">{formatRupiah(totalPemasukan)}</div>
                <div className="text-green-100">Total Pemasukan</div>
              </Card>
              <Card className="p-4 bg-red-600 text-white text-center">
                <div className="text-xl font-bold">{formatRupiah(totalPengeluaran)}</div>
                <div className="text-red-100">Total Pengeluaran</div>
              </Card>
              <Card className={`p-4 text-white text-center ${saldoAkhir >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                <div className="text-xl font-bold">{formatRupiah(saldoAkhir)}</div>
                <div className={`${saldoAkhir >= 0 ? 'text-green-100' : 'text-red-100'}`}>Saldo Akhir</div>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Keuangan;
