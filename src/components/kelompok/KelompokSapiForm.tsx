
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

const KelompokSapiForm = () => {
  const { toast } = useToast();
  const { kelompokSapi, addKelompokSapi } = useKelompokKurban();
  
  const [kelompokSapiForm, setKelompokSapiForm] = useState('');
  const [anggotaSapi, setAnggotaSapi] = useState('');
  const [daftarAnggotaSapi, setDaftarAnggotaSapi] = useState<string[]>([]);

  const tambahAnggotaSapi = () => {
    if (anggotaSapi.trim() === '') {
      toast({
        title: "Error",
        description: "Nama anggota tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }
    
    setDaftarAnggotaSapi([...daftarAnggotaSapi, anggotaSapi.trim()]);
    setAnggotaSapi('');
  };

  const hapusAnggotaSapi = (index: number) => {
    const newDaftar = daftarAnggotaSapi.filter((_, i) => i !== index);
    setDaftarAnggotaSapi(newDaftar);
  };

  const simpanKelompokSapi = () => {
    if (kelompokSapiForm.trim() === '') {
      toast({
        title: "Error",
        description: "Nomor kelompok tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }
    
    if (daftarAnggotaSapi.length === 0) {
      toast({
        title: "Error",
        description: "Minimal harus ada 1 anggota kelompok",
        variant: "destructive"
      });
      return;
    }

    const sudahAda = kelompokSapi.some(k => k.nomor === kelompokSapiForm.trim());
    if (sudahAda) {
      toast({
        title: "Error",
        description: "Nomor kelompok sudah ada",
        variant: "destructive"
      });
      return;
    }

    addKelompokSapi({
      nomor: kelompokSapiForm.trim(),
      anggota: [...daftarAnggotaSapi]
    });
    
    setKelompokSapiForm('');
    setDaftarAnggotaSapi([]);
    
    toast({
      title: "Berhasil",
      description: "Kelompok sapi berhasil disimpan"
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        🐄 Tambah Kelompok Sapi
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NOMOR KELOMPOK:
          </label>
          <Input
            type="text"
            value={kelompokSapiForm}
            onChange={(e) => setKelompokSapiForm(e.target.value)}
            placeholder="1"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anggota Kelompok:
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={anggotaSapi}
              onChange={(e) => setAnggotaSapi(e.target.value)}
              placeholder="Nama anggota"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && tambahAnggotaSapi()}
            />
            <Button onClick={tambahAnggotaSapi} variant="secondary" className="bg-gray-500 hover:bg-gray-600 text-white">
              + Tambah
            </Button>
          </div>
          
          {daftarAnggotaSapi.length > 0 && (
            <div className="mt-3 space-y-2">
              {daftarAnggotaSapi.map((anggota, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={anggota}
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => hapusAnggotaSapi(index)} 
                    variant="destructive" 
                    size="sm"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-2 mt-3">
            <Button onClick={simpanKelompokSapi} className="bg-green-600 hover:bg-green-700">
              💾 Simpan Kelompok
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default KelompokSapiForm;
