import React, { createContext, useContext, useState, ReactNode } from 'react';

const BASE_KEY = 'klampisan_kurban_rab';

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
    { id: uid(), uraian: 'Sisa kas tahun lalu', vol: '', satuan: '', hargaSatuan: 0, jumlah: 2168000 },
    { id: uid(), uraian: 'Biaya Opr. Sapi', vol: '7,00', satuan: 'Ekor', hargaSatuan: 700000, jumlah: 4900000 },
    { id: uid(), uraian: 'Biaya Opr. Kambing', vol: '15,00', satuan: 'Ekor', hargaSatuan: 50000, jumlah: 750000 },
  ],
  pengeluaranCategories: [
    {
      id: uid(), no: '1', nama: 'Biaya rapat',
      items: [
        { id: uid(), uraian: 'Panitia kecil', vol: '1,00', satuan: 'paket', hargaSatuan: 200000, jumlah: 200000 },
        { id: uid(), uraian: 'Panitia besar', vol: '1,00', satuan: 'paket', hargaSatuan: 900000, jumlah: 900000 },
        { id: uid(), uraian: 'Pembubaran panitia', vol: '1,00', satuan: 'paket', hargaSatuan: 800000, jumlah: 800000 },
      ],
    },
    {
      id: uid(), no: '2', nama: 'Persiapan',
      items: [
        { id: uid(), uraian: 'Administrasi', vol: '1,00', satuan: 'paket', hargaSatuan: 100000, jumlah: 100000 },
        { id: uid(), uraian: 'Snack Kerja Bakti', vol: '1,00', satuan: 'Paket', hargaSatuan: 300000, jumlah: 300000 },
        { id: uid(), uraian: 'Peralatan dan Perlengkapan', vol: '1,00', satuan: 'Paket', hargaSatuan: 500000, jumlah: 500000 },
        { id: uid(), uraian: 'MMT', vol: '1,00', satuan: 'Paket', hargaSatuan: 250000, jumlah: 250000 },
      ],
    },
    {
      id: uid(), no: '3', nama: 'Pelaksanaan',
      items: [
        { id: uid(), uraian: 'Konsumsi siang Masak', vol: '1,00', satuan: 'Paket', hargaSatuan: 1600000, jumlah: 1600000 },
        { id: uid(), uraian: 'Plastik', vol: '1,00', satuan: 'Paket', hargaSatuan: 300000, jumlah: 300000 },
        { id: uid(), uraian: 'Tenaga bantu', vol: '1,00', satuan: 'Paket', hargaSatuan: 300000, jumlah: 300000 },
        { id: uid(), uraian: 'BBM operasional', vol: '1,00', satuan: 'Paket', hargaSatuan: 100000, jumlah: 400000 },
      ],
    },
    {
      id: uid(), no: '4', nama: 'Lain-lain',
      items: [
        { id: uid(), uraian: 'Lain-lain', vol: '1,00', satuan: 'Paket', hargaSatuan: 500000, jumlah: 500000 },
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

export const RabProvider: React.FC<{ children: ReactNode; year?: string }> = ({
  children,
  year = '2025',
}) => {
  const storageKey = `${BASE_KEY}_${year}`;

  const [rabData, setRabData] = useState<RabData>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
    return defaultRabData();
  });

  const updateRabData = (data: RabData) => {
    setRabData(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  return (
    <RabContext.Provider value={{ rabData, updateRabData }}>
      {children}
    </RabContext.Provider>
  );
};
