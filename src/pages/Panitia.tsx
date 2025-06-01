
import React from 'react';
import { Card } from '@/components/ui/card';

const Panitia = () => {
  const panitiaData = [
    {
      jabatan: "Pelindung",
      nama: ["Takmir Masjid Istiqomah Klampisan"]
    },
    {
      jabatan: "Penasehat",
      nama: ["H. Sugiarto", "H. Sumarno", "H. Wagiman"]
    },
    {
      jabatan: "Ketua",
      nama: ["Mulyono"]
    },
    {
      jabatan: "Wakil Ketua",
      nama: ["Sukamto"]
    },
    {
      jabatan: "Sekretaris",
      nama: ["Slamet Riyadi", "Teguh Prakoso"]
    },
    {
      jabatan: "Bendahara",
      nama: ["Edy Susanto", "Suroto"]
    },
    {
      jabatan: "Sie. Konsumsi",
      nama: ["Suratno", "Sutrisno", "Warsito", "Mujiono", "Sukardi", "Supriyana"]
    },
    {
      jabatan: "Sie. Pemotongan dan Pembagian Daging",
      nama: ["Sutrisno", "Wagiran", "Suparno", "Wahyu Kristianto", "Edi Suyanto", "Suratno", "Dwi Nugroho", "Teguh Prakoso"]
    },
    {
      jabatan: "Sie. Acara",
      nama: ["Mulyono", "Sukamto", "Slamet Riyadi"]
    },
    {
      jabatan: "Sie. Keamanan dan Parkir",
      nama: ["Wagiman", "Sukardi", "Supriyana", "Mujiono"]
    },
    {
      jabatan: "Sie. Dokumentasi",
      nama: ["Teguh Prakoso", "Dwi Nugroho"]
    },
    {
      jabatan: "Sie. Perlengkapan",
      nama: ["Edy Susanto", "Suroto", "Wahyu Kristianto", "Edi Suyanto"]
    },
    {
      jabatan: "Sie. Kebersihan",
      nama: ["Warsito", "Wagiran", "Suparno"]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Struktur Organisasi Panitia Kurban 2025</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          Masjid Istiqomah Klampisan - Kaliancar, Selogiri, Wonogiri
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {panitiaData.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700 mb-2">{item.jabatan}</h4>
                <div className="space-y-1">
                  {item.nama.map((nama, namaIndex) => (
                    <div key={namaIndex} className="text-sm text-gray-700">
                      {namaIndex + 1}. {nama}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-700 mb-2">Informasi Kegiatan</h4>
        <div className="text-sm text-blue-600 space-y-1">
          <div><strong>Tanggal:</strong> Jumat, 06 Juni 2025</div>
          <div><strong>Tempat:</strong> Masjid Istiqomah Klampisan</div>
          <div><strong>Imam/Khotib:</strong> Ust. Syukur Prihantoro Al Hafid</div>
        </div>
      </div>
    </div>
  );
};

export default Panitia;
