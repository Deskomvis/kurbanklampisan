
import { Penerima } from '../contexts/PenerimaContext';

export const filterPenerima = (
  penerimaList: Penerima[],
  filters: {
    rt: string;
    search: string;
  }
): Penerima[] => {
  return penerimaList.filter(penerima => {
    const matchesRt = !filters.rt || filters.rt === 'all' || penerima.rt === filters.rt;
    const matchesSearch = !filters.search || 
      penerima.nama.toLowerCase().includes(filters.search.toLowerCase()) ||
      penerima.nomorPengambilan.toLowerCase().includes(filters.search.toLowerCase()) ||
      penerima.blok.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesRt && matchesSearch;
  });
};

export const groupByRt = (penerimaList: Penerima[]): Record<string, Penerima[]> => {
  return penerimaList.reduce((acc, penerima) => {
    if (!acc[penerima.rt]) {
      acc[penerima.rt] = [];
    }
    acc[penerima.rt].push(penerima);
    return acc;
  }, {} as Record<string, Penerima[]>);
};
