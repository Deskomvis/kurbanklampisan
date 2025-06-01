
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Eye } from 'lucide-react';
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
  const handleViewReceipt = (transaction: Transaction) => {
    if (transaction.buktiNota) {
      const url = URL.createObjectURL(transaction.buktiNota);
      window.open(url, '_blank');
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
                  <TableCell>{transaction.tanggal}</TableCell>
                  <TableCell>{transaction.keterangan}</TableCell>
                  <TableCell>
                    {transaction.type === 'pemasukan' ? formatRupiah(transaction.jumlah) : '-'}
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'pengeluaran' ? formatRupiah(transaction.jumlah) : '-'}
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'dana-masjid' ? formatRupiah(transaction.jumlah) : '-'}
                  </TableCell>
                  <TableCell>
                    {transaction.buktiNota ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewReceipt(transaction)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(transaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(transaction.id)}
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
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
