import React, { createContext, useContext, useState, ReactNode } from 'react';
import { panitiaData, PanitiaItem } from '@/data/panitiaData';

const BASE_KEY_LIST = 'klampisan_kurban_panitia_list';
const BASE_KEY_HEADER = 'klampisan_kurban_panitia_header';

export interface PanitiaHeaderInfo {
  judulEvent: string;
  waktuSidang: string;
  sekretariat: string;
  legalitas: string;
}

const defaultHeader: PanitiaHeaderInfo = {
  judulEvent: 'Panitia Hari Raya Idul Adha 1447 H & Penyembelihan Hewan Kurban',
  waktuSidang: 'Sabtu, 24 Mei 2026',
  sekretariat: 'Masjid Istiqomah Klampisan',
  legalitas: "Pengurus Ta'mir Masjid",
};

interface PanitiaContextType {
  panitiaList: PanitiaItem[];
  headerInfo: PanitiaHeaderInfo;
  setPanitiaList: (list: PanitiaItem[]) => void;
  updateHeader: (info: PanitiaHeaderInfo) => void;
}

const PanitiaContext = createContext<PanitiaContextType | undefined>(undefined);

export const usePanitia = () => {
  const ctx = useContext(PanitiaContext);
  if (!ctx) throw new Error('usePanitia must be used within PanitiaProvider');
  return ctx;
};

export const PanitiaProvider: React.FC<{ children: ReactNode; year?: string }> = ({
  children,
  year = '2025',
}) => {
  const listKey = `${BASE_KEY_LIST}_${year}`;
  const headerKey = `${BASE_KEY_HEADER}_${year}`;

  const [panitiaList, setPanitiaListState] = useState<PanitiaItem[]>(() => {
    const saved = localStorage.getItem(listKey);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(listKey, JSON.stringify(panitiaData));
    return panitiaData;
  });

  const [headerInfo, setHeaderInfoState] = useState<PanitiaHeaderInfo>(() => {
    const saved = localStorage.getItem(headerKey);
    if (saved) return JSON.parse(saved);
    return defaultHeader;
  });

  const setPanitiaList = (list: PanitiaItem[]) => {
    setPanitiaListState(list);
    localStorage.setItem(listKey, JSON.stringify(list));
  };

  const updateHeader = (info: PanitiaHeaderInfo) => {
    setHeaderInfoState(info);
    localStorage.setItem(headerKey, JSON.stringify(info));
  };

  return (
    <PanitiaContext.Provider value={{ panitiaList, headerInfo, setPanitiaList, updateHeader }}>
      {children}
    </PanitiaContext.Provider>
  );
};
