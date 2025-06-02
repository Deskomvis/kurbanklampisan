
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: number;
  tanggal: string;
  keterangan: string;
  jumlah: number;
  type: 'pemasukan' | 'pengeluaran' | 'dana-masjid';
  buktiNota?: File;
}

interface KeuanganContextType {
  transactions: Transaction[];
  saldoAwal: string;
  isSaldoAwalSet: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: number) => void;
  setSaldoAwal: (saldo: string) => void;
  resetSaldoAwal: () => void;
  getTotalPengeluaran: () => number;
  getTotalPemasukan: () => number;
  getTotalDanaMasjid: () => number;
  getSaldoAkhir: () => number;
}

const KeuanganContext = createContext<KeuanganContextType | undefined>(undefined);

export const useKeuangan = () => {
  const context = useContext(KeuanganContext);
  if (!context) {
    throw new Error('useKeuangan must be used within a KeuanganProvider');
  }
  return context;
};

interface KeuanganProviderProps {
  children: ReactNode;
}

export const KeuanganProvider: React.FC<KeuanganProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [saldoAwal, setSaldoAwalState] = useState<string>('');
  const [isSaldoAwalSet, setIsSaldoAwalSet] = useState<boolean>(false);

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const id = Date.now();
    setTransactions(prev => [...prev, { ...newTransaction, id }]);
  };

  const updateTransaction = (id: number, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    ));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const setSaldoAwal = (saldo: string) => {
    setSaldoAwalState(saldo);
    if (saldo && saldo !== '0') {
      setIsSaldoAwalSet(true);
    }
  };

  const resetSaldoAwal = () => {
    setSaldoAwalState('');
    setIsSaldoAwalSet(false);
  };

  const getTotalPengeluaran = () => {
    return transactions
      .filter(t => t.type === 'pengeluaran')
      .reduce((total, t) => total + t.jumlah, 0);
  };

  const getTotalPemasukan = () => {
    return transactions
      .filter(t => t.type === 'pemasukan')
      .reduce((total, t) => total + t.jumlah, 0);
  };

  const getTotalDanaMasjid = () => {
    return transactions
      .filter(t => t.type === 'dana-masjid')
      .reduce((total, t) => total + t.jumlah, 0);
  };

  const getSaldoAkhir = () => {
    const saldoAwalNum = parseFloat(saldoAwal) || 0;
    return saldoAwalNum + getTotalPemasukan() - getTotalPengeluaran() - getTotalDanaMasjid();
  };

  return (
    <KeuanganContext.Provider value={{
      transactions,
      saldoAwal,
      isSaldoAwalSet,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setSaldoAwal,
      resetSaldoAwal,
      getTotalPengeluaran,
      getTotalPemasukan,
      getTotalDanaMasjid,
      getSaldoAkhir
    }}>
      {children}
    </KeuanganContext.Provider>
  );
};
