
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  updateKurbanKambing: (id: string, kambing: Omit<KurbanKambing, 'id'>) => void;
  deleteKurbanKambing: (id: string) => void;
  reorderKurbanKambing: (fromIndex: number, toIndex: number) => void;
  getTotalSapi: () => number;
  getTotalKambing: () => number;
}

const KelompokKurbanContext = createContext<KelompokKurbanContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_SAPI = 'klampisan_kurban_sapi';
const LOCAL_STORAGE_KEY_KAMBING = 'klampisan_kurban_kambing';

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
  const [kelompokSapi, setKelompokSapi] = useState<KelompokSapi[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SAPI);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [kurbanKambing, setKurbanKambing] = useState<KurbanKambing[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_KAMBING);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SAPI, JSON.stringify(kelompokSapi));
  }, [kelompokSapi]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_KAMBING, JSON.stringify(kurbanKambing));
  }, [kurbanKambing]);

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

  const reorderNumbers = (list: KurbanKambing[]) => {
    return list.map((kambing, index) => ({ ...kambing, nomor: index + 1 }));
  };

  const addKurbanKambing = (newKambing: Omit<KurbanKambing, 'id' | 'nomor'>) => {
    const id = Date.now().toString();
    setKurbanKambing(prev => {
      const newList = [...prev, { ...newKambing, id, nomor: prev.length + 1 }];
      return reorderNumbers(newList);
    });
  };

  const updateKurbanKambing = (id: string, updatedKambing: Omit<KurbanKambing, 'id'>) => {
    setKurbanKambing(prev => {
      const newList = prev.map(k => 
        k.id === id ? { ...k, ...updatedKambing } : k
      );
      return reorderNumbers(newList.sort((a, b) => a.nomor - b.nomor));
    });
  };

  const deleteKurbanKambing = (id: string) => {
    setKurbanKambing(prev => {
      const newList = prev.filter(k => k.id !== id);
      return reorderNumbers(newList);
    });
  };

  const reorderKurbanKambing = (fromIndex: number, toIndex: number) => {
    setKurbanKambing(prev => {
      const newList = [...prev];
      const [movedItem] = newList.splice(fromIndex, 1);
      newList.splice(toIndex, 0, movedItem);
      return reorderNumbers(newList);
    });
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
      reorderKurbanKambing,
      getTotalSapi,
      getTotalKambing
    }}>
      {children}
    </KelompokKurbanContext.Provider>
  );
};
