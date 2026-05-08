
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Eye, Upload } from 'lucide-react';
import { Transaction } from './types';

interface TransactionSummaryProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
  formatRupiah: (amount: number) => string;
  saldoAwal: string;
  isSaldoAwalSet: boolean;
  totalPemasukan: number;
  totalPengeluaran: number;
  totalDanaMasjid: number;
  saldoAkhir: number;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  transactions,
  onEdit,
  onDelete,
  formatRupiah,
  saldoAwal,
  isSaldoAwalSet,
  totalPemasukan,
  totalPengeluaran,
  totalDanaMasjid,
  saldoAkhir
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<{
    tanggal: string;
    keterangan: string;
    jumlah: string;
    buktiNota?: File | null;
  }>({
    tanggal: '',
    keterangan: '',
    jumlah: '',
    buktiNota: null
  });

  const handleViewReceipt = (transaction: Transaction) => {
    if (transaction.buktiNota) {
      // Create a URL for the file and open it
      const url = URL.createObjectURL(transaction.buktiNota);
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Bukti Nota - ${transaction.keterangan}</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0;">
              <img src="${url}" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Bukti Nota" />
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  const handleEditClick = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditFormData({
      tanggal: transaction.tanggal,
      keterangan: transaction.keterangan,
      jumlah: transaction.jumlah.toString(),
      buktiNota: transaction.buktiNota || null
    });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    
    const originalTransaction = transactions.find(t => t.id === editingId);
    if (!originalTransaction) return;

    // Validate form data
    if (!editFormData.keterangan.trim()) {
      alert('Keterangan tidak boleh kosong');
      return;
    }

    if (!editFormData.jumlah || parseFloat(editFormData.jumlah) <= 0) {
      alert('Jumlah harus lebih besar dari 0');
      return;
    }

    const updatedTransaction: Transaction = {
      id: editingId,
      tanggal: editFormData.tanggal,
      keterangan: editFormData.keterangan.trim(),
      jumlah: parseFloat(editFormData.jumlah),
      type: originalTransaction.type,
      buktiNota: editFormData.buktiNota
    };

    onEdit(updatedTransaction);
    setEditingId(null);
    setEditFormData({ tanggal: '', keterangan: '', jumlah: '', buktiNota: null });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ tanggal: '', keterangan: '', jumlah: '', buktiNota: null });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditFormData(prev => ({ ...prev, buktiNota: file }));
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      onDelete(id);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        📊 Ringkasan Keuangan
      </h3>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-600 hover:bg-green-600">
              <TableHead className="text-white">TANGGAL</TableHead>
              <TableHead className="text-white">KETERANGAN</TableHead>
              <TableHead className="text-white">PEMASUKAN</TableHead>
              <TableHead className="text-white">PENGELUARAN</TableHead>
              <TableHead className="text-white">DANA MASJID</TableHead>
              <TableHead className="text-white">BUKTI</TableHead>
              <TableHead className="text-white">AKSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  Belum ada data transaksi
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {editingId === transaction.id ? (
                      <Input
                        type="text"
                        value={editFormData.tanggal}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, tanggal: e.target.value }))}
                        className="w-full"
                      />
                    ) : (
                      transaction.tanggal
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === transaction.id ? (
                      <Input
                        type="text"
                        value={editFormData.keterangan}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, keterangan: e.target.value }))}
                        className="w-full"
                      />
                    ) : (
                      transaction.keterangan
                    )}
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'pemasukan' ? (
                      editingId === transaction.id ? (
                        <Input
                          type="number"
                          value={editFormData.jumlah}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, jumlah: e.target.value }))}
                          className="w-full"
                        />
                      ) : (
                        formatRupiah(transaction.jumlah)
                      )
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'pengeluaran' ? (
                      editingId === transaction.id ? (
                        <Input
                          type="number"
                          value={editFormData.jumlah}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, jumlah: e.target.value }))}
                          className="w-full"
                        />
                      ) : (
                        formatRupiah(transaction.jumlah)
                      )
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'dana-masjid' ? (
                      editingId === transaction.id ? (
                        <Input
                          type="number"
                          value={editFormData.jumlah}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, jumlah: e.target.value }))}
                          className="w-full"
                        />
                      ) : (
                        formatRupiah(transaction.jumlah)
                      )
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {editingId === transaction.id && transaction.type === 'pengeluaran' ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="w-32"
                        />
                        <Upload className="h-4 w-4 text-gray-500" />
                      </div>
                    ) : transaction.buktiNota ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewReceipt(transaction)}
                        title="Lihat bukti nota"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {editingId === transaction.id ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          className="bg-green-600 hover:bg-green-700"
                          title="Simpan perubahan"
                        >
                          💾
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          title="Batal edit"
                        >
                          ❌
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(transaction)}
                          title="Edit transaksi"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteClick(transaction.id)}
                          title="Hapus transaksi"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
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
        <Card className="p-4 bg-orange-600 text-white text-center">
          <div className="text-xl font-bold">{formatRupiah(totalDanaMasjid)}</div>
          <div className="text-orange-100">Total Dana Masjid</div>
        </Card>
        <Card className={`p-4 text-white text-center ${saldoAkhir >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
          <div className="text-xl font-bold">{formatRupiah(saldoAkhir)}</div>
          <div className={`${saldoAkhir >= 0 ? 'text-green-100' : 'text-red-100'}`}>Saldo Akhir</div>
        </Card>
      </div>
    </Card>
  );
};
