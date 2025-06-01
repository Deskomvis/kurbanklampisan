
import React from 'react';
import { Card } from '@/components/ui/card';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';

const Laporan = () => {
  const { getTotalSapi, getTotalKambing } = useKelompokKurban();
  
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">Laporan Pertanggungjawaban</h2>
        <p className="text-sm text-gray-600">Kurban 2025 - Masjid Istiqomah Klampisan</p>
      </div>
      
      <Card className="p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          {/* I. Pendahuluan */}
          <div className="border-l-4 border-green-500 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-green-700 mb-2">I. Pendahuluan</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              Segala puji bagi Allah yang telah memberikan kemudahan dalam pelaksanaan ibadah Idul Adha Tahun 1446 H / 2025 M, yang meliputi 
              pelaksanaan sholat Idul Adha kemudian dilanjutkan dengan pemotongan hewan qurban serta pendistribusian daging qurban sehingga 
              berjalan dengan lancar sebagaimana mestinya.
            </p>
          </div>

          {/* II. Pelaksanaan Kegiatan */}
          <div className="border-l-4 border-green-500 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-green-700 mb-2">II. Pelaksanaan Kegiatan</h3>
            <div className="space-y-2 text-xs md:text-sm">
              <div><strong>Tanggal:</strong> Jumat, 06 Juni 2025</div>
              <div><strong>Tempat:</strong> Masjid Istiqomah Klampisan, Kaliancar, Selogiri, Wonogiri</div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-sm md:text-base">Hewan Kurban:</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 md:p-3 text-left">Hewan Kurban Sapi</th>
                      <th className="border border-gray-300 p-2 md:p-3 text-left">{getTotalSapi()} ekor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 md:p-3">Hewan Kurban Kambing</td>
                      <td className="border border-gray-300 p-2 md:p-3">{getTotalKambing()} ekor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* III. Rincian Keuangan */}
          <div className="border-l-4 border-green-500 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-green-700 mb-2">III. Rincian Keuangan</h3>
            <p className="text-xs md:text-sm text-gray-700">
              Data keuangan akan muncul setelah input data pada tab Keuangan.
            </p>
          </div>

          {/* IV. Penutup */}
          <div className="border-l-4 border-green-500 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-green-700 mb-2">IV. Penutup</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              Demikian laporan pertanggungjawaban ini kami susun, saran dan kritik yang membangun sangat kami nantikan. Semoga dengan laporan 
              pertanggungjawaban ini dapat dijadikan bahan evaluasi dan acuan kegiatan di masa-masa mendatang.
            </p>
            
            <div className="mt-4 md:mt-6 text-right">
              <div className="text-xs md:text-sm">
                <div>Klampisan, Juli 2025</div>
                <div className="mt-4 md:mt-8">Hormat Kami,</div>
                <div className="mt-8 md:mt-16">
                  <div className="font-semibold">Panitia Idul Qurban 1446 H / 2025 M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Laporan;
