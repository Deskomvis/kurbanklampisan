import React, { createContext, useContext, useState, ReactNode } from 'react';

const BASE_KEY = 'klampisan_kurban_realisasi_v1';

export interface RealisasiItem {
  id: string;
  uraian: string;
  vol: string;
  satuan: string;
  hargaSatuan: number;
  jumlah: number;
}

export interface RealisasiData {
  pemasukanItems: RealisasiItem[];
  pengeluaranItems: RealisasiItem[];
  /** true = user has saved a custom edit; false = fallback to live keuangan data */
  isCustomized: boolean;
}

const emptyRealisasi = (): RealisasiData => ({
  pemasukanItems: [],
  pengeluaranItems: [],
  isCustomized: false,
});

interface RealisasiContextType {
  realisasiData: RealisasiData;
  updateRealisasiData: (data: RealisasiData) => void;
  resetRealisasi: () => void;
}

const RealisasiContext = createContext<RealisasiContextType | undefined>(undefined);

export const useRealisasi = () => {
  const ctx = useContext(RealisasiContext);
  if (!ctx) throw new Error('useRealisasi must be used within RealisasiProvider');
  return ctx;
};

export const RealisasiProvider: React.FC<{ children: ReactNode; year?: string }> = ({
  children,
  year = '2025',
}) => {
  const hasRealisasi = parseInt(year) >= 2026;
  const storageKey = `${BASE_KEY}_${year}`;

  const [realisasiData, setRealisasiData] = useState<RealisasiData>(() => {
    if (!hasRealisasi) return emptyRealisasi();
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
    return emptyRealisasi();
  });

  const updateRealisasiData = (data: RealisasiData) => {
    if (!hasRealisasi) return;
    setRealisasiData(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const resetRealisasi = () => {
    const empty = emptyRealisasi();
    setRealisasiData(empty);
    localStorage.removeItem(storageKey);
  };

  return (
    <RealisasiContext.Provider value={{ realisasiData, updateRealisasiData, resetRealisasi }}>
      {children}
    </RealisasiContext.Provider>
  );
};
