import React from 'react';
import { Card } from '@/components/ui/card';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { FileText, Award, Calendar, MapPin, Printer, Download, Beef, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Laporan = () => {
  const { getTotalSapi, getTotalKambing } = useKelompokKurban();
  
  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="relative pb-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              Laporan Resmi
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl">
              Dokumen pertanggungjawaban panitia kurban 1447 H / 2026 M Masjid Istiqomah Klampisan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 rounded-lg border-gray-200 font-semibold flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Cetak PDF
            </Button>
            <Button className="h-10 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" />
              Unduh Laporan
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white relative">
        {/* Document Header Decor */}
        <div className="h-2 bg-green-600 w-full" />
        
        <div className="p-6 md:p-10 space-y-10">
          {/* Section 1: Pendahuluan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">I</div>
              <h3 className="text-xl font-bold text-gray-800">Pendahuluan</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 italic">
              <p className="text-gray-700 leading-relaxed text-sm">
                "Segala puji bagi Allah yang telah memberikan kemudahan dalam pelaksanaan ibadah Idul Adha Tahun 1447 H / 2026 M, yang meliputi 
                pelaksanaan sholat Idul Adha kemudian dilanjutkan dengan pemotongan hewan kurban serta pendistribusian daging kurban sehingga 
                berjalan dengan lancar sebagaimana mestinya."
              </p>
            </div>
          </div>

          {/* Section 2: Pelaksanaan */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">II</div>
              <h3 className="text-xl font-bold text-gray-800">Pelaksanaan Kegiatan</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Waktu Pelaksanaan</p>
                  <p className="text-base font-bold text-gray-800">Senin, 15 Juni 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Lokasi Kegiatan</p>
                  <p className="text-base font-bold text-gray-800">Masjid Istiqomah Klampisan</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-600 ml-1">Statistik Hewan Kurban</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-xl bg-green-50 text-green-800 border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <Beef className="w-6 h-6 text-green-600" />
                    <span className="px-2 py-1 bg-white rounded text-xs font-semibold border border-green-200">Data Sapi</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{getTotalSapi()}</div>
                  <div className="text-sm font-semibold text-green-700">Ekor Sapi</div>
                </div>
                <div className="p-6 rounded-xl bg-blue-50 text-blue-800 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <PawPrint className="w-6 h-6 text-blue-600" />
                    <span className="px-2 py-1 bg-white rounded text-xs font-semibold border border-blue-200">Data Kambing</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{getTotalKambing()}</div>
                  <div className="text-sm font-semibold text-blue-700">Ekor Kambing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Keuangan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">III</div>
              <h3 className="text-xl font-bold text-gray-800">Rincian Keuangan</h3>
            </div>
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Award className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Rincian tabel keuangan sedang disiapkan secara otomatis dari sistem manajemen dana.</p>
            </div>
          </div>

          {/* Section 4: Penutup */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">IV</div>
              <h3 className="text-xl font-bold text-gray-800">Penutup</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              Demikian laporan pertanggungjawaban ini kami susun, saran dan kritik yang membangun sangat kami nantikan. Semoga dengan laporan 
              pertanggungjawaban ini dapat dijadikan bahan evaluasi dan acuan kegiatan di masa-masa mendatang.
            </p>
            
            <div className="flex justify-end pt-8">
              <div className="text-center space-y-16 min-w-[250px]">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Wonogiri, Juni 2026</p>
                  <p className="text-base font-bold text-gray-800">Ketua Panitia Kurban</p>
                </div>
                <div className="space-y-2">
                  <div className="h-px bg-gray-400 w-full" />
                  <p className="font-bold text-gray-800 text-sm">Panitia Idul Qurban 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Seal Decor */}
        <div className="absolute left-6 bottom-6 opacity-5 pointer-events-none">
          <Award className="w-24 h-24" />
        </div>
      </Card>
    </div>
  );
};

export default Laporan;
