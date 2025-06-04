
import { useRef, useCallback } from 'react';
import { generateUniqueId } from '@/utils/idGenerator';
import { Penerima } from '@/contexts/PenerimaContext';

export const useStableIds = () => {
  const idMapRef = useRef<Map<string, string>>(new Map());

  const getStableId = useCallback((penerima: Penerima): string => {
    const key = `${penerima.rt}-${penerima.nomorPengambilan}-${penerima.nama}`;
    
    if (!idMapRef.current.has(key)) {
      idMapRef.current.set(key, penerima.id || generateUniqueId());
    }
    
    return idMapRef.current.get(key)!;
  }, []);

  const clearIdMap = useCallback(() => {
    idMapRef.current.clear();
  }, []);

  return { getStableId, clearIdMap };
};
