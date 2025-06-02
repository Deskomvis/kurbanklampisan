
import { useToast } from '@/hooks/use-toast';
import { Transaction } from '@/components/keuangan/types';
import { TransactionFormState } from './useKeuanganState';

interface UseKeuanganHandlersProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  resetForm: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid') => void;
  updateForm: (type: 'pemasukan' | 'pengeluaran' | 'dana-masjid', field: keyof TransactionFormState, value: any) => void;
  setIsSaldoAwalSet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKeuanganHandlers = ({
  transactions,
  setTransactions,
  setEditingId,
  resetForm,
  updateForm,
  setIsSaldoAwalSet
}: UseKeuanganHandlersProps) => {
  const { toast } = useToast();

  const validateAndSave = (
    type: 'pemasukan' | 'pengeluaran' | 'dana-masjid',
    formData: TransactionFormState
  ) => {
    if (!formData.keterangan || formData.jumlah === '0') {
      toast({
        title: "Error",
        description: `Mohon lengkapi semua field ${type}`,
        variant: "destructive",
      });
      return false;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      tanggal: formData.tanggal,
      keterangan: formData.keterangan,
      jumlah: parseFloat(formData.jumlah),
      type: type,
      buktiNota: type === 'pengeluaran' ? formData.buktiNota : undefined
    };

    setTransactions([...transactions, newTransaction]);
    resetForm(type);
    
    toast({
      title: "Berhasil",
      description: `${type} berhasil disimpan`,
    });
    return true;
  };

  const handleEdit = (transaction: Transaction) => {
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
    editingId: number | null,
    formData: TransactionFormState
  ) => {
    if (!editingId) return;

    const updatedTransaction: Transaction = {
      id: editingId,
      tanggal: formData.tanggal,
      keterangan: formData.keterangan,
      jumlah: parseFloat(formData.jumlah),
      type: type,
      buktiNota: type === 'pengeluaran' ? formData.buktiNota : undefined
    };

    setTransactions(transactions.map(t => t.id === editingId ? updatedTransaction : t));
    setEditingId(null);
    resetForm(type);

    toast({
      title: "Berhasil",
      description: "Transaksi berhasil diupdate",
    });
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
      title: "Berhasil",
      description: "Transaksi berhasil dihapus",
    });
  };

  const handleSetSaldoAwal = (saldoAwal: TransactionFormState) => {
    if (!saldoAwal.keterangan || saldoAwal.jumlah === '0') {
      toast({
        title: "Error",
        description: "Mohon lengkapi saldo awal dan keterangan",
        variant: "destructive",
      });
      return false;
    }

    setIsSaldoAwalSet(true);
    toast({
      title: "Berhasil",
      description: "Saldo awal berhasil ditetapkan",
    });
    return true;
  };

  const handleEditSaldoAwal = () => {
    setIsSaldoAwalSet(false);
    toast({
      title: "Info",
      description: "Saldo awal dapat diedit kembali",
    });
  };

  return {
    validateAndSave,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleSetSaldoAwal,
    handleEditSaldoAwal
  };
};
