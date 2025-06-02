
import React from 'react';
import { TransactionForm } from './TransactionForm';
import { Transaction } from '@/contexts/KeuanganContext';

interface TransactionInputTabProps {
  formData: {
    pemasukan: { tanggal: string; keterangan: string; jumlah: string };
    pengeluaran: { tanggal: string; keterangan: string; jumlah: string; buktiNota: File | null };
    danaMasjid: { tanggal: string; keterangan: string; jumlah: string };
  };
  updateForm: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', field: string, value: any) => void;
  validateAndSave: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', data: any) => void;
  handleUpdate: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', data: any) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  resetForm: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => void;
  transactions: Transaction[];
}

export const TransactionInputTab: React.FC<TransactionInputTabProps> = ({
  formData,
  updateForm,
  validateAndSave,
  handleUpdate,
  editingId,
  setEditingId,
  resetForm,
  transactions
}) => {
  return (
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
  );
};
