
import { useEffect } from 'react';
import { usePenerima } from '@/contexts/PenerimaContext';
import { initialPenerimaData } from '@/utils/initialPenerimaData';
import { useToast } from '@/hooks/use-toast';
import { generateUniqueId } from '@/utils/idGenerator';

export const useInitialData = () => {
  const { penerima, setPenerimaList } = usePenerima();
  const { toast } = useToast();

  useEffect(() => {
    // Only load initial data if no penerima exist yet
    if (penerima.length === 0) {
      let rt01Count = 0;
      let rt02Count = 0;
      
      // Convert initial data to proper format with unique IDs
      const processedData = initialPenerimaData.map((penerimaItem) => {
        const processedItem = {
          ...penerimaItem,
          id: generateUniqueId(),
          sudahMenerima: false
        };
        
        if (penerimaItem.rt === '01') {
          rt01Count++;
        } else if (penerimaItem.rt === '02') {
          rt02Count++;
        }
        
        return processedItem;
      });

      // Set all data at once to prevent individual additions
      setPenerimaList(processedData);

      if (processedData.length > 0) {
        toast({
          title: "Data Berhasil Dimuat",
          description: `${processedData.length} penerima berhasil ditambahkan (${rt01Count} dari RT 01 dan ${rt02Count} dari RT 02)`,
        });
      }
    }
  }, [penerima.length, setPenerimaList, toast]);
};
