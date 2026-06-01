import React, { createContext, useContext, useState, ReactNode } from 'react';

const BASE_KEY = 'klampisan_kurban_rab_v2';

export interface RabItem {
  id: string;
  uraian: string;
  vol: string;
  satuan: string;
  hargaSatuan: number;
  jumlah: number;
}

export interface RabCategory {
  id: string;
  no: string;
  nama: string;
  items: RabItem[];
}

export interface RabData {
  pemasukanItems: RabItem[];
  pengeluaranCategories: RabCategory[];
}

const uid = () => Math.random().toString(36).slice(2, 9);

export const defaultRabData = (): RabData => ({
  pemasukanItems: [
    { id: uid(), uraian: 'Biaya Operasional Sapi', vol: '7', satuan: 'Ekor', hargaSatuan: 650000, jumlah: 4550000 },
    { id: uid(), uraian: 'Biaya Operasional Kambing', vol: '15', satuan: 'Ekor', hargaSatuan: 75000, jumlah: 1125000 },
  ],
  pengeluaranCategories: [
    {
      id: uid(), no: '1', nama: 'Biaya rapat',
      items: [
        { id: uid(), uraian: 'Panitia kecil', vol: '1', satuan: 'Paket', hargaSatuan: 200000, jumlah: 200000 },
        { id: uid(), uraian: 'Panitia besar', vol: '1', satuan: 'Paket', hargaSatuan: 900000, jumlah: 900000 },
        { id: uid(), uraian: 'Pembubaran panitia', vol: '1', satuan: 'Paket', hargaSatuan: 800000, jumlah: 800000 },
      ],
    },
    {
      id: uid(), no: '2', nama: 'Persiapan',
      items: [
        { id: uid(), uraian: 'Administrasi', vol: '1', satuan: 'Paket', hargaSatuan: 100000, jumlah: 100000 },
        { id: uid(), uraian: 'Snack kerja bakti', vol: '1', satuan: 'Paket', hargaSatuan: 300000, jumlah: 300000 },
        { id: uid(), uraian: 'Peralatan dan perlengkapan', vol: '1', satuan: 'Paket', hargaSatuan: 500000, jumlah: 500000 },
        { id: uid(), uraian: 'MMT', vol: '1', satuan: 'Paket', hargaSatuan: 250000, jumlah: 250000 },
      ],
    },
    {
      id: uid(), no: '3', nama: 'Pelaksanaan',
      items: [
        { id: uid(), uraian: 'Bahan masak dll', vol: '1', satuan: 'Paket', hargaSatuan: 1000000, jumlah: 1000000 },
        { id: uid(), uraian: 'Plastik', vol: '1', satuan: 'Paket', hargaSatuan: 300000, jumlah: 300000 },
        { id: uid(), uraian: 'Tenaga bantu', vol: '1', satuan: 'Paket', hargaSatuan: 300000, jumlah: 300000 },
        { id: uid(), uraian: 'BBM Operasional', vol: '1', satuan: 'Paket', hargaSatuan: 400000, jumlah: 400000 },
      ],
    },
    {
      id: uid(), no: '4', nama: 'Lain-lain',
      items: [
        { id: uid(), uraian: 'Lain-lain', vol: '1', satuan: 'Paket', hargaSatuan: 500000, jumlah: 500000 },
      ],
    },
  ],
});

interface RabContextType {
  rabData: RabData;
  updateRabData: (data: RabData) => void;
}

const RabContext = createContext<RabContextType | undefined>(undefined);

export const useRab = () => {
  const ctx = useContext(RabContext);
  if (!ctx) throw new Error('useRab must be used within RabProvider');
  return ctx;
};

const emptyRabData = (): RabData => ({
  pemasukanItems: [],
  pengeluaranCategories: [],
});

export const RabProvider: React.FC<{ children: ReactNode; year?: string }> = ({
  children,
  year = '2025',
}) => {
  const hasRab = parseInt(year) >= 2026;
  const storageKey = `${BASE_KEY}_${year}`;

  const [rabData, setRabData] = useState<RabData>(() => {
    if (!hasRab) return emptyRabData();
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
    return defaultRabData();
  });

  const updateRabData = (data: RabData) => {
    if (!hasRab) return;
    setRabData(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  return (
    <RabContext.Provider value={{ rabData, updateRabData }}>
      {children}
    </RabContext.Provider>
  );
};
