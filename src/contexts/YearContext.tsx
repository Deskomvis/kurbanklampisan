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

const PANITIA_KEYS = {
  list: 'klampisan_kurban_panitia_list',
  header: 'klampisan_kurban_panitia_header',
  info: 'klampisan_kurban_panitia_info',
  pengesah: 'klampisan_kurban_panitia_pengesah',
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

// One-time: mark all penerima for a past year as sudahMenerima=true
const markAllPenerimaReceived = (year: string) => {
  const flagKey = `klampisan_kurban_dist_done_${year}`;
  if (localStorage.getItem(flagKey)) return;
  const data = localStorage.getItem(yearKey(BASE_KEYS.penerima, year));
  if (data) {
    const parsed: Record<string, unknown>[] = JSON.parse(data);
    const marked = parsed.map((p) => ({ ...p, sudahMenerima: true }));
    localStorage.setItem(yearKey(BASE_KEYS.penerima, year), JSON.stringify(marked));
  }
  localStorage.setItem(flagKey, 'true');
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
    if (saved) {
      // Still run mark-received migration on every boot (idempotent via flag)
      markAllPenerimaReceived('2025');
      return JSON.parse(saved);
    }
    // First run: migrate legacy data to 2025-scoped keys, then add 2026
    migrateLegacyData('2025');
    markAllPenerimaReceived('2025');
    const initial = ['2025', '2026'];
    localStorage.setItem(YEARS_KEY, JSON.stringify(initial));
    return initial;
  });

  const [currentYear, setCurrentYear] = useState<string>(() => {
    const saved = localStorage.getItem(CURRENT_YEAR_KEY);
    if (saved) return saved;
    // Default to latest available year on fresh device
    try {
      const yearsRaw = localStorage.getItem(YEARS_KEY);
      if (yearsRaw) {
        const years: string[] = JSON.parse(yearsRaw);
        return [...years].sort().at(-1) || '2026';
      }
    } catch {}
    return '2026';
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

    // Copy panitia list & header from current year (user can edit for new year)
    const oldPanitiaList = localStorage.getItem(`${PANITIA_KEYS.list}_${currentYear}`);
    if (oldPanitiaList) {
      localStorage.setItem(`${PANITIA_KEYS.list}_${newYear}`, oldPanitiaList);
    }
    const oldPanitiaHeader = localStorage.getItem(`${PANITIA_KEYS.header}_${currentYear}`);
    if (oldPanitiaHeader) {
      localStorage.setItem(`${PANITIA_KEYS.header}_${newYear}`, oldPanitiaHeader);
    }
    const oldPanitiaInfo = localStorage.getItem(`${PANITIA_KEYS.info}_${currentYear}`);
    if (oldPanitiaInfo) {
      localStorage.setItem(`${PANITIA_KEYS.info}_${newYear}`, oldPanitiaInfo);
    }
    const oldPengesah = localStorage.getItem(`${PANITIA_KEYS.pengesah}_${currentYear}`);
    if (oldPengesah) {
      localStorage.setItem(`${PANITIA_KEYS.pengesah}_${newYear}`, oldPengesah);
    }

    // Copy RAB data from current year (user can update estimates for new year)
    const oldRab = localStorage.getItem(`klampisan_kurban_rab_${currentYear}`);
    if (oldRab) {
      localStorage.setItem(`klampisan_kurban_rab_${newYear}`, oldRab);
    }

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
