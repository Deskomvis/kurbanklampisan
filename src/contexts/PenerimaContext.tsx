
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

const PenerimaContext = createContext<PenerimaContextType | undefined>(undefined);

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
  const [penerima, setPenerima] = useState<Penerima[]>([]);

  const addPenerima = (newPenerima: Omit<Penerima, 'id' | 'sudahMenerima'>) => {
    const id = Date.now().toString();
    setPenerima(prev => [...prev, { ...newPenerima, id, sudahMenerima: false }]);
  };

  const updatePenerima = (id: string, updatedPenerima: Omit<Penerima, 'id'>) => {
    setPenerima(prev => prev.map(p => 
      p.id === id ? { ...p, ...updatedPenerima } : p
    ));
  };

  const deletePenerima = (id: string) => {
    setPenerima(prev => prev.filter(p => p.id !== id));
  };

  const toggleSudahMenerima = (id: string) => {
    setPenerima(prev => prev.map(p => 
      p.id === id ? { ...p, sudahMenerima: !p.sudahMenerima } : p
    ));
  };

  const resetPembagian = () => {
    setPenerima(prev => prev.map(p => ({ ...p, sudahMenerima: false })));
  };

  const markAllSudahMenerima = () => {
    setPenerima(prev => prev.map(p => ({ ...p, sudahMenerima: true })));
  };

  return (
    <PenerimaContext.Provider value={{
      penerima,
      addPenerima,
      updatePenerima,
      deletePenerima,
      toggleSudahMenerima,
      resetPembagian,
      markAllSudahMenerima
    }}>
      {children}
    </PenerimaContext.Provider>
  );
};
