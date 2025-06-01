
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface KelompokSapi {
  id: string;
  nomor: string;
  anggota: string[];
}

export interface KurbanKambing {
  id: string;
  nomor: number;
  pemilik: string;
}

interface KelompokKurbanContextType {
  kelompokSapi: KelompokSapi[];
  kurbanKambing: KurbanKambing[];
  addKelompokSapi: (kelompok: Omit<KelompokSapi, 'id'>) => void;
  updateKelompokSapi: (id: string, kelompok: Omit<KelompokSapi, 'id'>) => void;
  deleteKelompokSapi: (id: string) => void;
  addKurbanKambing: (kambing: Omit<KurbanKambing, 'id' | 'nomor'>) => void;
  updateKurbanKambing: (id: string, kambing: Omit<KurbanKambing, 'id' | 'nomor'>) => void;
  deleteKurbanKambing: (id: string) => void;
  getTotalSapi: () => number;
  getTotalKambing: () => number;
}

const KelompokKurbanContext = createContext<KelompokKurbanContextType | undefined>(undefined);

export const useKelompokKurban = () => {
  const context = useContext(KelompokKurbanContext);
  if (!context) {
    throw new Error('useKelompokKurban must be used within a KelompokKurbanProvider');
  }
  return context;
};

interface KelompokKurbanProviderProps {
  children: ReactNode;
}

export const KelompokKurbanProvider: React.FC<KelompokKurbanProviderProps> = ({ children }) => {
  const [kelompokSapi, setKelompokSapi] = useState<KelompokSapi[]>([]);
  const [kurbanKambing, setKurbanKambing] = useState<KurbanKambing[]>([]);

  const addKelompokSapi = (newKelompok: Omit<KelompokSapi, 'id'>) => {
    const id = Date.now().toString();
    setKelompokSapi(prev => [...prev, { ...newKelompok, id }]);
  };

  const updateKelompokSapi = (id: string, updatedKelompok: Omit<KelompokSapi, 'id'>) => {
    setKelompokSapi(prev => prev.map(k => 
      k.id === id ? { ...k, ...updatedKelompok } : k
    ));
  };

  const deleteKelompokSapi = (id: string) => {
    setKelompokSapi(prev => prev.filter(k => k.id !== id));
  };

  const addKurbanKambing = (newKambing: Omit<KurbanKambing, 'id' | 'nomor'>) => {
    const id = Date.now().toString();
    const nomor = kurbanKambing.length + 1;
    setKurbanKambing(prev => [...prev, { ...newKambing, id, nomor }]);
  };

  const updateKurbanKambing = (id: string, updatedKambing: Omit<KurbanKambing, 'id' | 'nomor'>) => {
    setKurbanKambing(prev => prev.map(k => 
      k.id === id ? { ...k, ...updatedKambing } : k
    ));
  };

  const deleteKurbanKambing = (id: string) => {
    const newKurbanKambing = kurbanKambing.filter(k => k.id !== id);
    // Update nomor urut setelah penghapusan
    const updatedKurbanKambing = newKurbanKambing.map((k, index) => ({ ...k, nomor: index + 1 }));
    setKurbanKambing(updatedKurbanKambing);
  };

  const getTotalSapi = () => kelompokSapi.length;
  const getTotalKambing = () => kurbanKambing.length;

  return (
    <KelompokKurbanContext.Provider value={{
      kelompokSapi,
      kurbanKambing,
      addKelompokSapi,
      updateKelompokSapi,
      deleteKelompokSapi,
      addKurbanKambing,
      updateKurbanKambing,
      deleteKurbanKambing,
      getTotalSapi,
      getTotalKambing
    }}>
      {children}
    </KelompokKurbanContext.Provider>
  );
};
