
import { useState } from 'react';
import { useKeuangan } from '@/contexts/KeuanganContext';

export const useKeuanganHandlers = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    pemasukan: { tanggal: '01/06/2025', keterangan: '', jumlah: '0' },
    pengeluaran: { tanggal: '01/06/2025', keterangan: '', jumlah: '0', buktiNota: null as File | null },
    'dana-masjid': { tanggal: '01/06/2025', keterangan: '', jumlah: '0' }
  });

  const {
    addTransaction,
    updateTransaction,
    setSaldoAwal,
    resetSaldoAwal
  } = useKeuangan();

  const resetForm = (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => {
    const resetState = {
      tanggal: '01/06/2025',
      keterangan: '',
      jumlah: '0'
    };

    if (type === 'pengeluaran') {
      setFormData(prev => ({
        ...prev,
        pengeluaran: { ...resetState, buktiNota: null }
      }));
    } else if (type === 'dana-masjid') {
      setFormData(prev => ({
        ...prev,
        'dana-masjid': resetState
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        pemasukan: resetState
      }));
    }
  };

  const updateForm = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    field: string,
    value: any
  ) => {
    console.log('Updating form:', { type, field, value });
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const validateAndSave = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    data: any
  ) => {
    console.log('Validating and saving:', { type, data });
    
    if (!data.keterangan || data.keterangan.trim() === '') {
      alert(`Mohon masukkan keterangan untuk ${type}`);
      return;
    }
    
    if (!data.jumlah || data.jumlah === '0' || parseFloat(data.jumlah) <= 0) {
      alert(`Mohon masukkan jumlah yang valid untuk ${type}`);
      return;
    }

    const newTransaction = {
      tanggal: data.tanggal,
      keterangan: data.keterangan.trim(),
      jumlah: parseFloat(data.jumlah),
      type: type,
      buktiNota: type === 'pengeluaran' ? data.buktiNota : undefined
    };

    console.log('Adding transaction:', newTransaction);
    addTransaction(newTransaction);
    resetForm(type);
    alert(`Data ${type} berhasil disimpan!`);
  };

  const handleEdit = (transaction: any) => {
    console.log('Editing transaction:', transaction);
    setEditingId(transaction.id);
    
    // Use the transaction's actual type
    const transactionType = transaction.type;
    
    updateForm(transactionType, 'tanggal', transaction.tanggal);
    updateForm(transactionType, 'keterangan', transaction.keterangan);
    updateForm(transactionType, 'jumlah', transaction.jumlah.toString());
    
    if (transactionType === 'pengeluaran' && transaction.buktiNota) {
      updateForm('pengeluaran', 'buktiNota', transaction.buktiNota);
    }
  };

  const handleUpdate = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    data: any
  ) => {
    if (!editingId) return;

    console.log('Updating transaction:', { editingId, type, data });

    if (!data.keterangan || data.keterangan.trim() === '') {
      alert(`Mohon masukkan keterangan untuk ${type}`);
      return;
    }
    
    if (!data.jumlah || data.jumlah === '0' || parseFloat(data.jumlah) <= 0) {
      alert(`Mohon masukkan jumlah yang valid untuk ${type}`);
      return;
    }

    const updatedTransaction = {
      tanggal: data.tanggal,
      keterangan: data.keterangan.trim(),
      jumlah: parseFloat(data.jumlah),
      type: type,
      buktiNota: type === 'pengeluaran' ? data.buktiNota : undefined
    };

    updateTransaction(editingId, updatedTransaction);
    setEditingId(null);
    resetForm(type);
    alert(`Data ${type} berhasil diperbarui!`);
  };

  const handleSetSaldoAwal = () => {
    alert('Saldo awal berhasil disimpan!');
  };

  const handleEditSaldoAwal = () => {
    resetSaldoAwal();
  };

  return {
    editingId,
    setEditingId,
    formData,
    resetForm,
    updateForm,
    validateAndSave,
    handleEdit,
    handleUpdate,
    handleSetSaldoAwal,
    handleEditSaldoAwal
  };
};
