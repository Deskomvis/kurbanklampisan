import React, { createContext, useContext, useState, ReactNode } from 'react';

const CURRENT_YEAR_KEY = 'klampisan_kurban_current_year';
const YEARS_KEY = 'klampisan_kurban_years';

// Base localStorage keys (legacy — without year suffix)
const BASE_KEYS = {
  penerima: 'klampisan_kurban_penerima',
  sapi: 'klampisan_kurban_sapi',
  kambing: 'klampisan_kurban_kambing',
  transactions: 'klampisan_kurban_transactions',
  saldo: 'klampisan_kurban_saldo',
  saldoSet: 'klampisan_kurban_saldo_set',
};

export const yearKey = (base: string, year: string) => `${base}_${year}`;

// One-time migration: copy legacy (non-year) keys to year-scoped keys
const migrateLegacyData = (year: string) => {
  Object.values(BASE_KEYS).forEach((key) => {
    const scoped = yearKey(key, year);
    const legacy = localStorage.getItem(key);
    if (legacy && !localStorage.getItem(scoped)) {
      localStorage.setItem(scoped, legacy);
    }
  });
};

const getSaldoAkhir = (year: string): number => {
  const saldo = parseFloat(localStorage.getItem(yearKey(BASE_KEYS.saldo, year)) || '0') || 0;
  const transStr = localStorage.getItem(yearKey(BASE_KEYS.transactions, year));
  if (!transStr) return saldo;
  const transactions: { type: string; jumlah: number }[] = JSON.parse(transStr);
  return transactions.reduce((acc, t) => {
    if (t.type === 'pemasukan' || t.type === 'dana-masjid') return acc + t.jumlah;
    if (t.type === 'pengeluaran') return acc - t.jumlah;
    return acc;
  }, saldo);
};

interface YearContextType {
  currentYear: string;
  availableYears: string[];
  switchYear: (year: string) => void;
  createNewYear: (newYear: string) => void;
}

const YearContext = createContext<YearContextType | undefined>(undefined);

export const useYear = () => {
  const ctx = useContext(YearContext);
  if (!ctx) throw new Error('useYear must be used within YearProvider');
  return ctx;
};

export const YearProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableYears, setAvailableYears] = useState<string[]>(() => {
    const saved = localStorage.getItem(YEARS_KEY);
    if (saved) return JSON.parse(saved);
    // First run: migrate legacy data to 2025-scoped keys
    migrateLegacyData('2025');
    const initial = ['2025'];
    localStorage.setItem(YEARS_KEY, JSON.stringify(initial));
    return initial;
  });

  const [currentYear, setCurrentYear] = useState<string>(() => {
    return localStorage.getItem(CURRENT_YEAR_KEY) || '2025';
  });

  const switchYear = (year: string) => {
    localStorage.setItem(CURRENT_YEAR_KEY, year);
    setCurrentYear(year);
  };

  const createNewYear = (newYear: string) => {
    // Copy penerima from current year (reset sudahMenerima)
    const oldPenerima = localStorage.getItem(yearKey(BASE_KEYS.penerima, currentYear));
    if (oldPenerima) {
      const parsed = JSON.parse(oldPenerima);
      const reset = parsed.map((p: Record<string, unknown>) => ({ ...p, sudahMenerima: false }));
      localStorage.setItem(yearKey(BASE_KEYS.penerima, newYear), JSON.stringify(reset));
    }

    // Saldo awal = saldo akhir tahun berjalan
    const saldoAkhir = getSaldoAkhir(currentYear);
    localStorage.setItem(yearKey(BASE_KEYS.saldo, newYear), String(Math.max(0, saldoAkhir)));
    localStorage.setItem(yearKey(BASE_KEYS.saldoSet, newYear), 'true');

    // Kelompok & transaksi mulai kosong
    localStorage.setItem(yearKey(BASE_KEYS.sapi, newYear), JSON.stringify([]));
    localStorage.setItem(yearKey(BASE_KEYS.kambing, newYear), JSON.stringify([]));
    localStorage.setItem(yearKey(BASE_KEYS.transactions, newYear), JSON.stringify([]));

    const newYears = [...availableYears, newYear];
    setAvailableYears(newYears);
    localStorage.setItem(YEARS_KEY, JSON.stringify(newYears));
    switchYear(newYear);
  };

  return (
    <YearContext.Provider value={{ currentYear, availableYears, switchYear, createNewYear }}>
      {children}
    </YearContext.Provider>
  );
};
