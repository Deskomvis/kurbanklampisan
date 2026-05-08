import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { Save, PawPrint, User } from 'lucide-react';

const KurbanKambingForm = () => {
  const { toast } = useToast();
  const { addKurbanKambing } = useKelompokKurban();
  
  const [pemilikKambing, setPemilikKambing] = useState('');

  const simpanKurbanKambing = () => {
    if (pemilikKambing.trim() === '') {
      toast({
        title: "Input Kosong",
        description: "Mohon masukkan nama pemilik kambing",
        variant: "destructive"
      });
      return;
    }

    addKurbanKambing({
      pemilik: pemilikKambing.trim()
    });
    setPemilikKambing('');
    
    toast({
      title: "Pendaftaran Berhasil",
      description: "Data kurban kambing telah terdaftar"
    });
  };

  return (
    <Card className="rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Nama Lengkap Pemilik Kambing
            </label>
            <div className="relative">
              <Input
                type="text"
                value={pemilikKambing}
                onChange={(e) => setPemilikKambing(e.target.value)}
                placeholder="Contoh: Bapak Ahmad"
                className="h-12 px-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white focus:ring-blue-500 transition-all font-semibold text-gray-900"
                onKeyPress={(e) => e.key === 'Enter' && simpanKurbanKambing()}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
            <div className="p-2 bg-white rounded-md shadow-sm">
              <PawPrint className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-blue-700 font-medium leading-relaxed">
              Pendaftaran kurban kambing akan langsung tercatat dalam daftar laporan pembagian daging.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={simpanKurbanKambing} 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-base transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Daftarkan Kurban Kambing
        </Button>
      </div>
    </Card>
  );
};

export default KurbanKambingForm;
