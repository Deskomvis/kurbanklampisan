
import { useEffect } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { initialPenerimaData } from '@/utils/initialPenerimaData';
import { useToast } from '@/hooks/use-toast';

export const useInitialData = () => {
  const { penerima, addPenerima } = usePenerima();
  const { toast } = useToast();

  useEffect(() => {
    // Only load initial data if no penerima exist yet
    if (penerima.length === 0) {
      let addedCount = 0;
      let rt01Count = 0;
      let rt02Count = 0;
      
      initialPenerimaData.forEach((penerimaItem) => {
        addPenerima(penerimaItem);
        addedCount++;
        
        if (penerimaItem.rt === '01') {
          rt01Count++;
        } else if (penerimaItem.rt === '02') {
          rt02Count++;
        }
      });

      if (addedCount > 0) {
        toast({
          title: "Data Berhasil Dimuat",
          description: `${addedCount} penerima berhasil ditambahkan (${rt01Count} dari RT 01 dan ${rt02Count} dari RT 02)`,
        });
      }
    }
  }, [penerima.length, addPenerima, toast]);
};
