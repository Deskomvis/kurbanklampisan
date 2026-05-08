
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  loadTransactions: (loadedTransactions: Transaction[]) => void;
}

const KeuanganContext = createContext<KeuanganContextType | undefined>(undefined);

const BASE_KEY_TRANSACTIONS = 'klampisan_kurban_transactions';
const BASE_KEY_SALDO = 'klampisan_kurban_saldo';
const BASE_KEY_SALDO_SET = 'klampisan_kurban_saldo_set';

export const useKeuangan = () => {
  const context = useContext(KeuanganContext);
  if (!context) {
    throw new Error('useKeuangan must be used within a KeuanganProvider');
  }
  return context;
};

interface KeuanganProviderProps {
  children: ReactNode;
  year?: string;
}

export const KeuanganProvider: React.FC<KeuanganProviderProps> = ({ children, year = '2025' }) => {
  const LOCAL_STORAGE_KEY_TRANSACTIONS = `${BASE_KEY_TRANSACTIONS}_${year}`;
  const LOCAL_STORAGE_KEY_SALDO = `${BASE_KEY_SALDO}_${year}`;
  const LOCAL_STORAGE_KEY_SALDO_SET = `${BASE_KEY_SALDO_SET}_${year}`;

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TRANSACTIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [saldoAwal, setSaldoAwalState] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_SALDO) || '';
  });

  const [isSaldoAwalSet, setIsSaldoAwalSet] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_SALDO_SET) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions, LOCAL_STORAGE_KEY_TRANSACTIONS]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SALDO, saldoAwal);
  }, [saldoAwal, LOCAL_STORAGE_KEY_SALDO]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SALDO_SET, isSaldoAwalSet.toString());
  }, [isSaldoAwalSet, LOCAL_STORAGE_KEY_SALDO_SET]);

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const id = generateUniqueId();
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

  const loadTransactions = (loadedTransactions: Transaction[]) => {
    // Ensure all loaded transactions have unique IDs and standardized types
    const processedTransactions = loadedTransactions.map(t => {
      // Normalize type field - handle both 'danaMasjid' and 'dana-masjid' formats
      let normalizedType = t.type;
      if (normalizedType === 'danaMasjid' as any) {
        normalizedType = 'dana-masjid' as const;
      }
      
      return {
        ...t,
        id: generateUniqueId(),
        type: normalizedType
      };
    });
    setTransactions(processedTransactions);
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
    // Dana masjid now adds to balance instead of subtracting
    return saldoAwalNum + getTotalPemasukan() + getTotalDanaMasjid() - getTotalPengeluaran();
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
      getSaldoAkhir,
      loadTransactions
    }}>
      {children}
    </KeuanganContext.Provider>
  );
};
