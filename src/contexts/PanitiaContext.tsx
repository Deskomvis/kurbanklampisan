import React, { createContext, useContext, useState, ReactNode } from 'react';
import { panitiaData, PanitiaItem } from '@/data/panitiaData';

const BASE_KEY_LIST = 'klampisan_kurban_panitia_list';
const BASE_KEY_HEADER = 'klampisan_kurban_panitia_header';
const BASE_KEY_INFO = 'klampisan_kurban_panitia_info';
const BASE_KEY_PENGESAH = 'klampisan_kurban_panitia_pengesah';

export interface PanitiaHeaderInfo {
  judulEvent: string;
  waktuSidang: string;
  sekretariat: string;
  legalitas: string;
}

export interface InfoDetail {
  label: string;
  value: string;
}

export interface InfoSection {
  title: string;
  color: string;
  details: InfoDetail[];
}

export interface PengesahInfo {
  nama: string;
  jabatan: string;
}

const defaultHeader: PanitiaHeaderInfo = {
  judulEvent: 'Panitia Hari Raya Idul Adha 1447 H & Penyembelihan Hewan Kurban',
  waktuSidang: 'Sabtu, 24 Mei 2026',
  sekretariat: 'Masjid Istiqomah Klampisan',
  legalitas: "Pengurus Ta'mir Masjid",
};

const defaultInfoSections: InfoSection[] = [
  {
    title: 'Pelaksanaan Sholat Idul Adha',
    color: 'blue',
    details: [
      { label: 'Tanggal', value: 'Senin, 15 Juni 2026' },
      { label: 'Imam/Khotib', value: 'Ust. Syukur Prihantoro Al Hafid' },
      { label: 'Bilal', value: 'Sdr. Moch Al Fatih' },
      { label: 'Laporan', value: 'Ust. Andika' },
      { label: 'Kotak Infaq', value: 'Sdr. Nindi & Sdr. Anisa' },
      { label: 'Pelaksana', value: 'TPQ dan Remaja Masjid' },
    ],
  },
  {
    title: 'Malam Takbiran',
    color: 'orange',
    details: [
      { label: 'Penanggung Jawab', value: 'Ust Syukur Prihantoro Al Hafid' },
      { label: 'Tim Pelaksana', value: 'Remaja Masjid dan TPQ' },
    ],
  },
  {
    title: 'Konsumsi & Logistik',
    color: 'emerald',
    details: [
      { label: 'Penanggung Jawab', value: 'Ibu-Ibu Warga Klampisan' },
      { label: 'Area Kerja', value: 'Gedung TPQ & Dapur Masjid' },
    ],
  },
];

const defaultPengesah: PengesahInfo = {
  nama: 'H. Hilman Suyatman',
  jabatan: 'Ketua Takmir Masjid Istiqomah',
};

interface PanitiaContextType {
  panitiaList: PanitiaItem[];
  headerInfo: PanitiaHeaderInfo;
  infoSections: InfoSection[];
  pengesah: PengesahInfo;
  setPanitiaList: (list: PanitiaItem[]) => void;
  updateHeader: (info: PanitiaHeaderInfo) => void;
  updateInfoSections: (sections: InfoSection[]) => void;
  updatePengesah: (info: PengesahInfo) => void;
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
  const infoKey = `${BASE_KEY_INFO}_${year}`;
  const pengesahKey = `${BASE_KEY_PENGESAH}_${year}`;

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

  const [infoSections, setInfoSectionsState] = useState<InfoSection[]>(() => {
    const saved = localStorage.getItem(infoKey);
    if (saved) return JSON.parse(saved);
    return defaultInfoSections;
  });

  const [pengesah, setPengesahState] = useState<PengesahInfo>(() => {
    const saved = localStorage.getItem(pengesahKey);
    if (saved) return JSON.parse(saved);
    return defaultPengesah;
  });

  const setPanitiaList = (list: PanitiaItem[]) => {
    setPanitiaListState(list);
    localStorage.setItem(listKey, JSON.stringify(list));
  };

  const updateHeader = (info: PanitiaHeaderInfo) => {
    setHeaderInfoState(info);
    localStorage.setItem(headerKey, JSON.stringify(info));
  };

  const updateInfoSections = (sections: InfoSection[]) => {
    setInfoSectionsState(sections);
    localStorage.setItem(infoKey, JSON.stringify(sections));
  };

  const updatePengesah = (info: PengesahInfo) => {
    setPengesahState(info);
    localStorage.setItem(pengesahKey, JSON.stringify(info));
  };

  return (
    <PanitiaContext.Provider
      value={{
        panitiaList,
        headerInfo,
        infoSections,
        pengesah,
        setPanitiaList,
        updateHeader,
        updateInfoSections,
        updatePengesah,
      }}
    >
      {children}
    </PanitiaContext.Provider>
  );
};
