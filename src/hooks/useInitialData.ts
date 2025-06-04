
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
      
      initialPenerimaData.forEach((penerimaItem) => {
        addPenerima(penerimaItem);
        addedCount++;
      });

      if (addedCount > 0) {
        toast({
          title: "Data Berhasil Dimuat",
          description: `${addedCount} penerima daging telah ditambahkan ke sistem`,
        });
      }
    }
  }, [penerima.length, addPenerima, toast]);
};
