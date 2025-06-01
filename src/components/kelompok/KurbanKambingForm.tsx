
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

const KurbanKambingForm = () => {
  const { toast } = useToast();
  const { addKurbanKambing } = useKelompokKurban();
  
  const [pemilikKambing, setPemilikKambing] = useState('');

  const simpanKurbanKambing = () => {
    if (pemilikKambing.trim() === '') {
      toast({
        title: "Error",
        description: "Nama pemilik tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    addKurbanKambing({
      pemilik: pemilikKambing.trim()
    });
    setPemilikKambing('');
    
    toast({
      title: "Berhasil",
      description: "Kurban kambing berhasil disimpan"
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        🐐 Tambah Kurban Kambing
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NAMA PEMILIK:
          </label>
          <Input
            type="text"
            value={pemilikKambing}
            onChange={(e) => setPemilikKambing(e.target.value)}
            placeholder="Nama pemilik kambing"
            className="w-full"
            onKeyPress={(e) => e.key === 'Enter' && simpanKurbanKambing()}
          />
        </div>
        
        <Button onClick={simpanKurbanKambing} className="bg-green-600 hover:bg-green-700 w-full">
          💾 Simpan Kurban Kambing
        </Button>
      </div>
    </Card>
  );
};

export default KurbanKambingForm;
