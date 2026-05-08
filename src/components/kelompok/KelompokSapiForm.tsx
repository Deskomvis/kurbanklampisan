import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { Plus, UserPlus, Trash2, Save, Beef } from 'lucide-react';
import { cn } from '@/lib/utils';

const KelompokSapiForm = () => {
  const { toast } = useToast();
  const { kelompokSapi, addKelompokSapi } = useKelompokKurban();
  
  const [kelompokSapiForm, setKelompokSapiForm] = useState('');
  const [anggotaSapi, setAnggotaSapi] = useState('');
  const [daftarAnggotaSapi, setDaftarAnggotaSapi] = useState<string[]>([]);

  const tambahAnggotaSapi = () => {
    if (anggotaSapi.trim() === '') {
      toast({
        title: "Input Kosong",
        description: "Mohon masukkan nama anggota",
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
        title: "Data Belum Lengkap",
        description: "Nomor kelompok tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }
    
    if (daftarAnggotaSapi.length === 0) {
      toast({
        title: "Anggota Kosong",
        description: "Minimal harus ada 1 anggota dalam kelompok",
        variant: "destructive"
      });
      return;
    }

    const sudahAda = kelompokSapi.some(k => k.nomor === kelompokSapiForm.trim());
    if (sudahAda) {
      toast({
        title: "Data Sudah Ada",
        description: "Nomor kelompok tersebut sudah terdaftar",
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
      title: "Penyimpanan Berhasil",
      description: "Data kelompok sapi baru telah disimpan"
    });
  };

  return (
    <Card className="rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Nomor Kelompok Sapi
            </label>
            <div className="relative">
              <Input
                type="text"
                value={kelompokSapiForm}
                onChange={(e) => setKelompokSapiForm(e.target.value)}
                placeholder="Contoh: 1"
                className="h-12 px-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white focus:ring-orange-500 transition-all font-semibold text-base text-gray-900"
              />
              <Beef className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Daftar Nama Anggota Kelompok
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={anggotaSapi}
                  onChange={(e) => setAnggotaSapi(e.target.value)}
                  placeholder="Masukkan nama anggota..."
                  className="h-12 pl-10 pr-4 rounded-lg bg-gray-50 border-gray-200 focus:bg-white focus:ring-green-500 transition-all font-semibold text-gray-900"
                  onKeyPress={(e) => e.key === 'Enter' && tambahAnggotaSapi()}
                />
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <Button 
                onClick={tambahAnggotaSapi} 
                className="h-12 px-5 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            
            {daftarAnggotaSapi.length > 0 ? (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                {daftarAnggotaSapi.map((anggota, index) => (
                  <div key={index} className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex-1 h-10 flex items-center px-4 bg-white rounded-lg border border-gray-200 shadow-sm font-semibold text-gray-800">
                      <span className="text-sm text-gray-400 mr-3">{index + 1}.</span>
                      {anggota}
                    </div>
                    <Button 
                      onClick={() => hapusAnggotaSapi(index)} 
                      variant="ghost" 
                      size="icon"
                      className="h-10 w-10 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 p-6 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400">
                <UserPlus className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">Belum ada anggota ditambahkan</p>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={simpanKelompokSapi} 
          className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg text-white font-semibold text-base transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Simpan Seluruh Kelompok
        </Button>
      </div>
    </Card>
  );
};

export default KelompokSapiForm;
