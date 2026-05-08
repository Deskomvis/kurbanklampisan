
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { generateUniqueId } from '@/utils/idGenerator';

export interface Penerima {
  id: string;
  nomorPengambilan: string;
  nama: string;
  rt: string;
  blok: string;
  sudahMenerima: boolean;
}

interface PenerimaContextType {
  penerima: Penerima[];
  addPenerima: (penerima: Omit<Penerima, 'id' | 'sudahMenerima'>) => void;
  updatePenerima: (id: string, penerima: Omit<Penerima, 'id'>) => void;
  deletePenerima: (id: string) => void;
  toggleSudahMenerima: (id: string) => void;
  resetPembagian: () => void;
  markAllSudahMenerima: () => void;
  setPenerimaList: (list: Penerima[]) => void;
}

const PenerimaContext = createContext<PenerimaContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'klampisan_kurban_penerima';

export const usePenerima = () => {
  const context = useContext(PenerimaContext);
  if (!context) {
    throw new Error('usePenerima must be used within a PenerimaProvider');
  }
  return context;
};

interface PenerimaProviderProps {
  children: ReactNode;
}

export const PenerimaProvider: React.FC<PenerimaProviderProps> = ({ children }) => {
  const [penerima, setPenerima] = useState<Penerima[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(penerima));
  }, [penerima]);

  const addPenerima = useCallback((newPenerima: Omit<Penerima, 'id' | 'sudahMenerima'>) => {
    const id = generateUniqueId();
    const penerimaWithId = { ...newPenerima, id, sudahMenerima: false };
    
    setPenerima(prev => {
      // Check if penerima already exists to prevent duplicates
      const exists = prev.some(p => 
        p.nomorPengambilan === newPenerima.nomorPengambilan && 
        p.rt === newPenerima.rt &&
        p.nama === newPenerima.nama
      );
      
      if (exists) {
        console.warn('Penerima with same details already exists');
        return prev;
      }
      
      return [...prev, penerimaWithId];
    });
  }, []);

  const updatePenerima = useCallback((id: string, updatedPenerima: Omit<Penerima, 'id'>) => {
    setPenerima(prev => prev.map(p => 
      p.id === id ? { ...p, ...updatedPenerima } : p
    ));
  }, []);

  const deletePenerima = useCallback((id: string) => {
    setPenerima(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleSudahMenerima = useCallback((id: string) => {
    setPenerima(prev => prev.map(p => 
      p.id === id ? { ...p, sudahMenerima: !p.sudahMenerima } : p
    ));
  }, []);

  const resetPembagian = useCallback(() => {
    setPenerima(prev => prev.map(p => ({ ...p, sudahMenerima: false })));
  }, []);

  const markAllSudahMenerima = useCallback(() => {
    setPenerima(prev => prev.map(p => ({ ...p, sudahMenerima: true })));
  }, []);

  const setPenerimaList = useCallback((list: Penerima[]) => {
    // Ensure all items have valid IDs
    const listWithIds = list.map(item => ({
      ...item,
      id: item.id || generateUniqueId()
    }));
    setPenerima(listWithIds);
  }, []);

  return (
    <PenerimaContext.Provider value={{
      penerima,
      addPenerima,
      updatePenerima,
      deletePenerima,
      toggleSudahMenerima,
      resetPembagian,
      markAllSudahMenerima,
      setPenerimaList
    }}>
      {children}
    </PenerimaContext.Provider>
  );
};
