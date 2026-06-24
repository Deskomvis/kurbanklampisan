import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Printer, Ticket, Info, AlertTriangle, Palette, ExternalLink, BookOpen, FolderOpen, Image } from 'lucide-react';
import { PrintReportsPanel } from '@/components/data/PrintReportsPanel';
import { useAuth } from '@/contexts/AuthContext';

const Cetak = () => {
  const { isAuthenticated } = useAuth();
  const [fromNum, setFromNum] = useState<number>(1);
  const [toNum, setToNum] = useState<number>(345);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="p-4 bg-amber-100 rounded-full text-amber-600">
          <AlertTriangle className="w-12 h-12 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Akses Ditolak</h2>
        <p className="text-gray-500 max-w-md">Halaman Cetak ini hanya dapat diakses oleh Pengurus yang telah login.</p>
      </div>
    );
  }

  const handleOpenPrintCards = () => {
    const url = `/kurban/cetak/kartu-daging?from=${fromNum}&to=${toNum}`;
    window.open(url, '_blank');
  };

  // Estimate total pages (12 cards per page)
  const totalCards = Math.max(0, toNum - fromNum + 1);
  const estimatedPages = Math.ceil(totalCards / 12);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl">
            <Printer className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Menu Cetak & Laporan</h1>
            <p className="text-gray-500 text-sm mt-1">
              Pusat pencetakan dokumen, kartu operasional kurban, dan laporan resmi Masjid Istiqomah Klampisan.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Interactive Printing Tools (Local App Tools) */}
        <div className="space-y-8">
          {/* Card 1: Cetak Kartu Pengambilan Daging */}
          <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50/50 to-emerald-50/20 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Operasional Kurban
                </span>
                <Ticket className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 mt-3 flex items-center gap-2">
                🎫 Cetak Kartu Pengambilan Daging
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                Mencetak nomor antrean pengambilan daging kurban untuk warga. Didesain presisi untuk kertas A4.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Form Configurator */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromNum" className="text-gray-700 font-medium text-xs sm:text-sm">Mulai Dari Nomor</Label>
                  <Input
                    id="fromNum"
                    type="number"
                    min={1}
                    value={fromNum}
                    onChange={(e) => setFromNum(Math.max(1, parseInt(e.target.value) || 1))}
                    className="border-gray-200 focus:ring-green-500 focus:border-green-500 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toNum" className="text-gray-700 font-medium text-xs sm:text-sm">Sampai Nomor</Label>
                  <Input
                    id="toNum"
                    type="number"
                    min={fromNum}
                    value={toNum}
                    onChange={(e) => setToNum(Math.max(fromNum, parseInt(e.target.value) || fromNum))}
                    className="border-gray-200 focus:ring-green-500 focus:border-green-500 rounded-lg"
                  />
                </div>
              </div>

              {/* Print Info Alert */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
                <div className="flex gap-2 items-start text-emerald-800">
                  <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Informasi Cetak:</h4>
                    <ul className="text-xs space-y-1 mt-1 text-emerald-700 list-disc list-inside">
                      <li>Kartu berukuran presisi ± <strong>5cm x 8cm</strong>.</li>
                      <li>Satu lembar kertas A4 portrait memuat **12 kartu** (4 kolom x 3 baris).</li>
                      <li>
                        Mencetak nomor {fromNum} s.d {toNum} ({totalCards} kartu) akan menghabiskan sekitar <strong>{estimatedPages} lembar A4</strong>.
                      </li>
                      <li>Sistem otomatis memberikan jeda halaman (*page break*) setiap 12 kartu agar tidak terpotong.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <Button
                onClick={handleOpenPrintCards}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <Printer className="w-5 h-5" />
                Buka Halaman & Cetak Kartu
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Print Reports Panel */}
          <div className="space-y-6">
            <PrintReportsPanel />
          </div>
        </div>

        {/* Right Column: Graphic Design & Publication Templates (External Assets) */}
        <div className="space-y-8">
          {/* Card 1: Cetak Template Daftar Kelompok Kurban (Canva Link) */}
          <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/20 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Template Publikasi
                </span>
                <Palette className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 mt-3 flex items-center gap-2">
                📋 Cetak Template Daftar Kelompok Kurban
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                Akses template desain premium di Canva untuk mencetak lembar daftar kelompok kurban secara profesional.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-2">
                <div className="flex gap-2 items-start text-blue-800">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Petunjuk Penggunaan:</h4>
                    <ul className="text-xs space-y-1 mt-1 text-blue-700 list-disc list-inside">
                      <li>Klik tombol di bawah untuk membuka tautan template resmi di <strong>Canva</strong>.</li>
                      <li>Anda dapat menyesuaikan nama-nama mudhohi (pekurban) sesuai data tahun ini.</li>
                      <li>Desain telah disesuaikan dengan tema visual **Masjid Istiqomah Klampisan**.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => window.open('https://canva.link/myuz03f04g18wz6', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <ExternalLink className="w-5 h-5" />
                Buka Template Canva
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Template Laporan Pertanggungjawaban (Canva Link) */}
          <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-amber-50/50 to-orange-50/20 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Publikasi & LPJ
                </span>
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 mt-3 flex items-center gap-2">
                📄 Template Laporan Pertanggungjawaban (LPJ)
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                Akses template desain premium di Canva untuk menyusun Laporan Pertanggungjawaban (LPJ) kurban secara lengkap dan formal.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
                <div className="flex gap-2 items-start text-amber-800">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Petunjuk Penggunaan:</h4>
                    <ul className="text-xs space-y-1 mt-1 text-amber-700 list-disc list-inside">
                      <li>Klik tombol di bawah untuk membuka template LPJ resmi di <strong>Canva</strong>.</li>
                      <li>Format laporan telah dilengkapi bab pendahuluan, data kepanitiaan, rekapitulasi, dan dokumentasi.</li>
                      <li>Sangat ideal untuk di-print atau dibagikan secara digital kepada jamaah & donatur.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => window.open('https://canva.link/ngwyp036bg2muti', '_blank')}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <ExternalLink className="w-5 h-5" />
                Buka Template LPJ Canva
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Google Drive Graphic Assets Folder */}
          <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-cyan-50/50 to-sky-50/20 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Arsip Desain & Gambar
                </span>
                <FolderOpen className="w-5 h-5 text-cyan-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 mt-3 flex items-center gap-2">
                📁 Aset Desain & Logo Google Drive
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                Folder penyimpanan cloud berisi logo resmi, ikon, dokumentasi kurban, dan materi grafis pendukung lainnya.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl space-y-2">
                <div className="flex gap-2 items-start text-cyan-800">
                  <Image className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Isi Folder Aset:</h4>
                    <ul className="text-xs space-y-1 mt-1 text-cyan-700 list-disc list-inside">
                      <li>Logo resmi **Masjid Istiqomah Klampisan** (Format resolusi tinggi).</li>
                      <li>Desain pamflet, spanduk, dan baliho publikasi Idul Adha.</li>
                      <li>Kumpulan aset gambar pelengkap untuk kebutuhan cetak panitia.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => window.open('https://drive.google.com/drive/folders/1l41TDLs89QA4rg3CwphzPFQODyOMRrqp?usp=sharing', '_blank')}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <ExternalLink className="w-5 h-5" />
                Buka Folder Google Drive
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cetak;
