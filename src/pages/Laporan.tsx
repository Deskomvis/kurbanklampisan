
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Laporan = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Laporan Pertanggungjawaban Kurban 2025</h2>
      
      <Card className="p-6">
        <div className="space-y-6">
          {/* I. Pendahuluan */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-green-700 mb-2">I. Pendahuluan</h3>
            <p className="text-sm text-gray-700">
              Segala puji bagi Allah yang telah memberikan kemudahan dalam pelaksanaan ibadah Idul Adha Tahun 1446 H / 2025 M, yang meliputi 
              pelaksanaan sholat Idul Adha kemudian dilanjutkan dengan pemotongan hewan qurban serta pendistribusian daging qurban sehingga 
              berjalan dengan lancar sebagaimana mestinya.
            </p>
          </div>

          {/* II. Pelaksanaan Kegiatan */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-green-700 mb-2">II. Pelaksanaan Kegiatan</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Tanggal:</strong> Jumat, 06 Juni 2025</div>
              <div><strong>Tempat:</strong> Masjid Istiqomah Klampisan, Kaliancar, Selogiri, Wonogiri</div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Hewan Kurban:</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">Hewan Kurban Sapi</th>
                      <th className="border border-gray-300 p-2 text-left">0 ekor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Hewan Kurban Kambing</td>
                      <td className="border border-gray-300 p-2">0 ekor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* III. Rincian Keuangan */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-green-700 mb-2">III. Rincian Keuangan</h3>
            <p className="text-sm text-gray-700">
              Data keuangan akan muncul setelah input data pada tab Keuangan.
            </p>
          </div>

          {/* IV. Penutup */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-green-700 mb-2">IV. Penutup</h3>
            <p className="text-sm text-gray-700">
              Demikian laporan pertanggungjawaban ini kami susun, saran dan kritik yang membangun sangat kami nantikan. Semoga dengan laporan 
              pertanggungjawaban ini dapat dijadikan bahan evaluasi dan acuan kegiatan di masa-masa mendatang.
            </p>
            
            <div className="mt-6 text-right">
              <div className="text-sm">
                <div>Klampisan, Juli 2025</div>
                <div className="mt-8">Hormat Kami,</div>
                <div className="mt-16">
                  <div className="font-semibold">Panitia Idul Qurban 1446 H / 2025 M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="bg-green-600 hover:bg-green-700">
          📄 Cetak Laporan
        </Button>
        <Button variant="secondary">
          📊 Export Data
        </Button>
      </div>
    </div>
  );
};

export default Laporan;
