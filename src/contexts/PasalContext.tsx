import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Ayat {
  id: number;
  nomor: number;
  text: string;
  tahun: string;
}

export interface Pasal {
  id: number;
  nomor: number;
  bab: string;
  ayat: Ayat[];
}

interface PasalContextType {
  pasalList: Pasal[];
  setPasalList: (list: Pasal[]) => void;
  addPasal: (bab: string) => void;
  updatePasal: (id: number, bab: string) => void;
  deletePasal: (id: number) => void;
  addAyat: (pasalId: number, text: string, tahun: string) => void;
  updateAyat: (pasalId: number, ayatId: number, text: string, tahun: string) => void;
  deleteAyat: (pasalId: number, ayatId: number) => void;
}

const LOCAL_STORAGE_KEY = 'klampisan_pasal_musyawarah';

const DEFAULT_PASAL: Pasal[] = [
  {
    id: 1, nomor: 1, bab: 'Khas Keuangan',
    ayat: [
      { id: 1, nomor: 1, text: 'Setiap tahun akan dilaksanakan pemasukan dan pengeluaran saldo khas akhir menjadi = Rp. 0 setiap tahun.', tahun: '2026' },
    ],
  },
  {
    id: 2, nomor: 2, bab: 'Daging Sohibul Kurban',
    ayat: [
      { id: 1, nomor: 1, text: 'Daging pengembalian ke sohibul kurban disama ratakan = 4,5 Kg/orang.', tahun: '2026' },
    ],
  },
  {
    id: 3, nomor: 3, bab: 'Kupon Pengambilan',
    ayat: [
      { id: 1, nomor: 1, text: 'Jika ada masyarakat/pribadi yang mendapatkan kupon lebih dari 1 karena jasa/penghargaan/prestasi akan dibatasi tidak lebih dari = 2 kupon.', tahun: '2026' },
      { id: 2, nomor: 2, text: 'Untuk ketentuan pembagian kupon adalah 1 kupon per rumah, dengan penambahan 1 kupon tambahan jika jumlah anggota keluarga berjumlah lebih dari = 7 orang.', tahun: '2026' },
    ],
  },
  {
    id: 4, nomor: 4, bab: 'Toleransi',
    ayat: [
      { id: 1, nomor: 1, text: 'Jika ada masyarakat/pribadi yang Non-Muslim, tetap akan mendapat pembagian daging sebagai bentuk toleransi dan bagian dari syiar agama Islam.', tahun: '2026' },
    ],
  },
];

const PasalContext = createContext<PasalContextType | undefined>(undefined);

export const usePasal = () => {
  const ctx = useContext(PasalContext);
  if (!ctx) throw new Error('usePasal must be used within PasalProvider');
  return ctx;
};

export const PasalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pasalList, setPasalListState] = useState<Pasal[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PASAL;
    } catch {
      return DEFAULT_PASAL;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pasalList));
  }, [pasalList]);

  const setPasalList = (list: Pasal[]) => setPasalListState(list);

  const addPasal = (bab: string) => {
    setPasalListState(prev => {
      const nextNomor = prev.length > 0 ? Math.max(...prev.map(p => p.nomor)) + 1 : 1;
      const nextId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      return [...prev, { id: nextId, nomor: nextNomor, bab, ayat: [] }];
    });
  };

  const updatePasal = (id: number, bab: string) => {
    setPasalListState(prev => prev.map(p => p.id === id ? { ...p, bab } : p));
  };

  const deletePasal = (id: number) => {
    setPasalListState(prev => {
      const filtered = prev.filter(p => p.id !== id);
      return filtered.map((p, i) => ({ ...p, nomor: i + 1 }));
    });
  };

  const addAyat = (pasalId: number, text: string, tahun: string) => {
    setPasalListState(prev => prev.map(p => {
      if (p.id !== pasalId) return p;
      const nextNomor = p.ayat.length > 0 ? Math.max(...p.ayat.map(a => a.nomor)) + 1 : 1;
      const nextId = p.ayat.length > 0 ? Math.max(...p.ayat.map(a => a.id)) + 1 : 1;
      return { ...p, ayat: [...p.ayat, { id: nextId, nomor: nextNomor, text, tahun }] };
    }));
  };

  const updateAyat = (pasalId: number, ayatId: number, text: string, tahun: string) => {
    setPasalListState(prev => prev.map(p => {
      if (p.id !== pasalId) return p;
      return { ...p, ayat: p.ayat.map(a => a.id === ayatId ? { ...a, text, tahun } : a) };
    }));
  };

  const deleteAyat = (pasalId: number, ayatId: number) => {
    setPasalListState(prev => prev.map(p => {
      if (p.id !== pasalId) return p;
      const filtered = p.ayat.filter(a => a.id !== ayatId);
      return { ...p, ayat: filtered.map((a, i) => ({ ...a, nomor: i + 1 })) };
    }));
  };

  return (
    <PasalContext.Provider value={{ pasalList, setPasalList, addPasal, updatePasal, deletePasal, addAyat, updateAyat, deleteAyat }}>
      {children}
    </PasalContext.Provider>
  );
};
