import React, { createContext, useContext, useState, ReactNode } from 'react';
import { panitiaData, PanitiaItem } from '@/data/panitiaData';
import { panitiaData2026, PANITIA_2026_VERSION } from '@/data/panitiaData2026';

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

const getDefaultHeader = (year: string): PanitiaHeaderInfo => {
  const hijriah = parseInt(year) - 579;
  return {
    judulEvent: `Panitia Hari Raya Idul Adha ${hijriah} H & Penyembelihan Hewan Kurban`,
    waktuSidang: '',
    sekretariat: 'Masjid Istiqomah Klampisan',
    legalitas: "Pengurus Ta'mir Masjid",
  };
};

const getDefaultInfoSections = (year: string): InfoSection[] => {
  const is2026 = year === '2026';
  return [
  {
    title: 'Pelaksanaan Sholat Idul Adha',
    color: 'blue',
    details: [
      { label: 'Tanggal', value: '' },
      { label: 'Imam/Khotib', value: is2026 ? 'Ust. Andika' : 'Ust. Syukur Prihantoro Al Hafid' },
      { label: 'Bilal', value: is2026 ? 'Sdr. Abi' : 'Sdr. Moch Al Fatih' },
      { label: 'Laporan', value: is2026 ? 'Sdr. Moch Al Fatih' : 'Ust. Andika' },
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
]};


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

  const defaultPanitiaList = year === '2026' ? panitiaData2026 : panitiaData;
  const versionKey = year === '2026' ? `${listKey}_ver` : null;

  const [panitiaList, setPanitiaListState] = useState<PanitiaItem[]>(() => {
    // For 2026: force refresh if version doesn't match
    if (versionKey) {
      const savedVer = localStorage.getItem(versionKey);
      if (savedVer !== PANITIA_2026_VERSION) {
        localStorage.setItem(listKey, JSON.stringify(defaultPanitiaList));
        localStorage.setItem(versionKey, PANITIA_2026_VERSION);
        return defaultPanitiaList;
      }
    }
    const saved = localStorage.getItem(listKey);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(listKey, JSON.stringify(defaultPanitiaList));
    return defaultPanitiaList;
  });

  const [headerInfo, setHeaderInfoState] = useState<PanitiaHeaderInfo>(() => {
    const saved = localStorage.getItem(headerKey);
    if (saved) return JSON.parse(saved);
    return getDefaultHeader(year);
  });

  const [infoSections, setInfoSectionsState] = useState<InfoSection[]>(() => {
    const saved = localStorage.getItem(infoKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (year === '2026') {
        const sholatSec = parsed.find((s: any) => s.title === 'Pelaksanaan Sholat Idul Adha');
        if (sholatSec) {
          let updated = false;
          sholatSec.details = sholatSec.details.map((d: any) => {
            if (d.label === 'Imam/Khotib' && d.value !== 'Ust. Andika') {
              d.value = 'Ust. Andika';
              updated = true;
            }
            if (d.label === 'Bilal' && d.value !== 'Sdr. Abi') {
              d.value = 'Sdr. Abi';
              updated = true;
            }
            if (d.label === 'Laporan' && d.value !== 'Sdr. Moch Al Fatih') {
              d.value = 'Sdr. Moch Al Fatih';
              updated = true;
            }
            return d;
          });
          if (updated) {
            localStorage.setItem(infoKey, JSON.stringify(parsed));
          }
        }
      }
      return parsed;
    }
    const defaultSecs = getDefaultInfoSections(year);
    return defaultSecs;
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
