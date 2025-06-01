import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

const KelompokKurban = () => {
  const { toast } = useToast();
  const {
    kelompokSapi,
    kurbanKambing,
    addKelompokSapi,
    updateKelompokSapi,
    deleteKelompokSapi,
    addKurbanKambing,
    updateKurbanKambing,
    deleteKurbanKambing
  } = useKelompokKurban();
  
  // State untuk form kelompok sapi
  const [kelompokSapiForm, setKelompokSapiForm] = useState('');
  const [anggotaSapi, setAnggotaSapi] = useState('');
  const [daftarAnggotaSapi, setDaftarAnggotaSapi] = useState<string[]>([]);
  
  // State untuk form kurban kambing
  const [pemilikKambing, setPemilikKambing] = useState('');
  
  // State untuk editing
  const [editingSapi, setEditingSapi] = useState<string | null>(null);
  const [editingKambing, setEditingKambing] = useState<string | null>(null);
  const [editNomorSapi, setEditNomorSapi] = useState('');
  const [editAnggotaSapi, setEditAnggotaSapi] = useState<string[]>([]);
  const [editPemilikKambing, setEditPemilikKambing] = useState('');

  // Fungsi untuk menambah anggota sapi
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

  // Fungsi untuk menghapus anggota sapi
  const hapusAnggotaSapi = (index: number) => {
    const newDaftar = daftarAnggotaSapi.filter((_, i) => i !== index);
    setDaftarAnggotaSapi(newDaftar);
  };

  // Fungsi untuk menyimpan kelompok sapi
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

    // Cek apakah nomor kelompok sudah ada
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
    
    // Reset form
    setKelompokSapiForm('');
    setDaftarAnggotaSapi([]);
    
    toast({
      title: "Berhasil",
      description: "Kelompok sapi berhasil disimpan"
    });
  };

  // Fungsi untuk menyimpan kurban kambing
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

  // Fungsi untuk mulai edit kelompok sapi
  const mulaiEditSapi = (kelompok: any) => {
    setEditingSapi(kelompok.id);
    setEditNomorSapi(kelompok.nomor);
    setEditAnggotaSapi([...kelompok.anggota]);
  };

  // Fungsi untuk menyimpan edit kelompok sapi
  const simpanEditSapi = (id: string) => {
    if (editNomorSapi.trim() === '') {
      toast({
        title: "Error",
        description: "Nomor kelompok tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    // Cek apakah nomor kelompok sudah ada (kecuali untuk kelompok yang sedang diedit)
    const sudahAda = kelompokSapi.some(k => k.nomor === editNomorSapi.trim() && k.id !== id);
    if (sudahAda) {
      toast({
        title: "Error",
        description: "Nomor kelompok sudah ada",
        variant: "destructive"
      });
      return;
    }

    updateKelompokSapi(id, {
      nomor: editNomorSapi.trim(),
      anggota: [...editAnggotaSapi]
    });
    
    setEditingSapi(null);
    
    toast({
      title: "Berhasil",
      description: "Kelompok sapi berhasil diupdate"
    });
  };

  // Fungsi untuk mulai edit kurban kambing
  const mulaiEditKambing = (kambing: any) => {
    setEditingKambing(kambing.id);
    setEditPemilikKambing(kambing.pemilik);
  };

  // Fungsi untuk menyimpan edit kurban kambing
  const simpanEditKambing = (id: string) => {
    if (editPemilikKambing.trim() === '') {
      toast({
        title: "Error",
        description: "Nama pemilik tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    updateKurbanKambing(id, {
      pemilik: editPemilikKambing.trim()
    });
    
    setEditingKambing(null);
    
    toast({
      title: "Berhasil",
      description: "Kurban kambing berhasil diupdate"
    });
  };

  // Fungsi untuk hapus kelompok sapi
  const hapusKelompokSapi = (id: string) => {
    deleteKelompokSapi(id);
    toast({
      title: "Berhasil",
      description: "Kelompok sapi berhasil dihapus"
    });
  };

  // Fungsi untuk hapus kurban kambing
  const hapusKurbanKambing = (id: string) => {
    deleteKurbanKambing(id);
    toast({
      title: "Berhasil",
      description: "Kurban kambing berhasil dihapus"
    });
  };

  // Fungsi untuk menambah anggota saat edit
  const tambahAnggotaEdit = () => {
    setEditAnggotaSapi([...editAnggotaSapi, '']);
  };

  // Fungsi untuk mengupdate anggota saat edit
  const updateAnggotaEdit = (index: number, value: string) => {
    const newAnggota = [...editAnggotaSapi];
    newAnggota[index] = value;
    setEditAnggotaSapi(newAnggota);
  };

  // Fungsi untuk hapus anggota saat edit
  const hapusAnggotaEdit = (index: number) => {
    const newAnggota = editAnggotaSapi.filter((_, i) => i !== index);
    setEditAnggotaSapi(newAnggota);
  };

  // Sort data berdasarkan nomor
  const sortedKelompokSapi = [...kelompokSapi].sort((a, b) => {
    const nomorA = parseInt(a.nomor) || 0;
    const nomorB = parseInt(b.nomor) || 0;
    return nomorA - nomorB;
  });

  const sortedKurbanKambing = [...kurbanKambing].sort((a, b) => a.nomor - b.nomor);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Kelompok Kurban 2025</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tambah Kelompok Sapi */}
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
              
              {/* Display added members */}
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

        {/* Tambah Kurban Kambing */}
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
      </div>

      {/* Display existing data tables */}
      <div className="space-y-4">
        {/* Daftar Kelompok Sapi */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            📋 Daftar Kelompok Sapi ({sortedKelompokSapi.length} kelompok)
          </h3>
          
          {sortedKelompokSapi.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Kelompok</TableHead>
                  <TableHead>Anggota</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedKelompokSapi.map((kelompok) => (
                  <TableRow key={kelompok.id}>
                    <TableCell>
                      {editingSapi === kelompok.id ? (
                        <Input
                          value={editNomorSapi}
                          onChange={(e) => setEditNomorSapi(e.target.value)}
                          className="w-20"
                        />
                      ) : (
                        kelompok.nomor
                      )}
                    </TableCell>
                    <TableCell>
                      {editingSapi === kelompok.id ? (
                        <div className="space-y-2">
                          {editAnggotaSapi.map((anggota, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={anggota}
                                onChange={(e) => updateAnggotaEdit(index, e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                onClick={() => hapusAnggotaEdit(index)}
                                variant="destructive"
                                size="sm"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                          <Button
                            onClick={tambahAnggotaEdit}
                            variant="secondary"
                            size="sm"
                            className="w-full"
                          >
                            + Tambah Anggota
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {kelompok.anggota.map((anggota, index) => (
                            <div key={index} className="text-sm">
                              {index + 1}. {anggota}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{kelompok.anggota.length} orang</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {editingSapi === kelompok.id ? (
                          <>
                            <Button
                              onClick={() => simpanEditSapi(kelompok.id)}
                              variant="default"
                              size="sm"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => setEditingSapi(null)}
                              variant="secondary"
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => mulaiEditSapi(kelompok)}
                              variant="secondary"
                              size="sm"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => hapusKelompokSapi(kelompok.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center py-4">Belum ada kelompok sapi yang tersimpan</p>
          )}
        </Card>

        {/* Daftar Kurban Kambing */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            📋 Daftar Kurban Kambing ({sortedKurbanKambing.length} kambing)
          </h3>
          
          {sortedKurbanKambing.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Nama Pemilik</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedKurbanKambing.map((kambing) => (
                  <TableRow key={kambing.id}>
                    <TableCell>{kambing.nomor}</TableCell>
                    <TableCell>
                      {editingKambing === kambing.id ? (
                        <Input
                          value={editPemilikKambing}
                          onChange={(e) => setEditPemilikKambing(e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        kambing.pemilik
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {editingKambing === kambing.id ? (
                          <>
                            <Button
                              onClick={() => simpanEditKambing(kambing.id)}
                              variant="default"
                              size="sm"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => setEditingKambing(null)}
                              variant="secondary"
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => mulaiEditKambing(kambing)}
                              variant="secondary"
                              size="sm"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => hapusKurbanKambing(kambing.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-center py-4">Belum ada kurban kambing yang tersimpan</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default KelompokKurban;
