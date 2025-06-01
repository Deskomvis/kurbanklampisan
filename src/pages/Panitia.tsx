import React from 'react';
import { Card } from '@/components/ui/card';

const Panitia = () => {
  const panitiaData = [
    {
      jabatan: "Penanggung Jawab",
      nama: ["Takmir Masjid Istiqomah Klampisan"]
    },
    {
      jabatan: "Penasehat/Pelindung",
      nama: ["Bp. Moch Ruri", "Bp. Parjan", "Bp. Tukimo", "Bp. Sukiyatno"]
    },
    {
      jabatan: "Ketua",
      nama: ["Bp. Dian Tri Widianto", "Ust. Andhika Bagas"]
    },
    {
      jabatan: "Sekretaris",
      nama: ["Bp. Reza Adi Nugroho", "Sdr. Al Fatih"]
    },
    {
      jabatan: "Bendahara",
      nama: ["Bp. Surono", "Bp. Sunarno"]
    },
    {
      jabatan: "Pengawas Umum",
      nama: ["Bp. Moch Ruri", "Bp. Sukiyatno", "Bp. Parjan", "Bp. Tukimo", "Bp. H. Hilman Suyatman", "Bp. H. Syamsuri", "Bp. H. Antok Srihono", "Bp. H. Sudarno", "Bp. Fatkurrohman", "Bp. Wito", "Ust. Syukur Prihantoro", "Bp. H. Daroji"]
    },
    {
      jabatan: "Pembantu Umum",
      nama: ["Bp. Andri", "Bp. Triyatno", "Bp. Yuliadi", "Bp. Sugeng Murjianto"]
    },
    {
      jabatan: "Koordinator Takbiran",
      nama: ["Pengurus TPQ (Sdri. Nindi, Sdri. Ersya, Sdri. Anis)"]
    },
    {
      jabatan: "Koordinator Shalat Idul Adha",
      nama: ["Ust. Syukur Prihantoro Al Hafid"]
    },
    {
      jabatan: "Koordinator Pelaksanaan Kurban",
      nama: ["Bp. Surono", "Ust. Andhika"]
    },
    {
      jabatan: "Memberi dan Mengantar Hewan Qurban",
      nama: ["Bp. Andri S", "Bp. Suparjo", "Pengawas: Bp. Annas Abhi Hamzah", "Bp. H. Hilman Suyatman"]
    },
    {
      jabatan: "Penanggung Jawab Motong Hewan Kurban",
      nama: ["Bp. H. Hilman Suyatman"]
    },
    {
      jabatan: "Dibantu",
      nama: ["Bp. Moch Ruri", "Bp. Yusuf CP", "Bp. Rahmat", "Bp. Sakimo"]
    },
    {
      jabatan: "Seksi Kupas Kulit",
      nama: ["Bp. Tukiran", "Bp. Parno T", "Bp. Jumar", "Bp. Tukimin", "Bp. Satiman", "Pengawas: Bp. H. Antok Srihono"]
    },
    {
      jabatan: "Seksi Timbang Daging",
      nama: ["I. Hewan Nomor 1 & 4 & 7& 10 & 13: Bp. Andi Baroto, Bp. Iksan, Sdr. Andre", "II. Hewan Nomor 2 & 5 & 8 & 11 & 14: Bp. Sunardi (Mejik), Bp. Nangkulo, Bp. Andi", "III. Hewan Nomor 3 & 6 & 9& 12 & 15: Bp. Sunarno, Bp. Reza AN, Bp. Parjo", "Pengawas: Ust. Syukur Prihantoro Al Hafid"]
    },
    {
      jabatan: "Ngusung Daging",
      nama: ["Bp. Fatkurrohman", "Bp. Eko Nur H", "Bp. Soni", "Bp. Wito", "Bp. Agus Sudaryanto"]
    },
    {
      jabatan: "Iris-iris Daging",
      nama: ["Ibu-Ibu warga Klampisan", "Koordinator: Ibu Ruri, Ibu Parjan, Ibu Tukimo"]
    },
    {
      jabatan: "Pengembalian Daging kepada yang Qurban",
      nama: ["Bp. Yuliadi", "Bp. Ust. Gimin", "Bp. Andi Baroto", "Bp. Eko Rudhi Astanto", "Bp. Triyatno", "Pengawas: Ust. Syukur Prihantoro Al Hafid"]
    },
    {
      jabatan: "Pengusung Hewan Setelah Disembelih",
      nama: ["Bp. Sakimo", "Sdr. Damar", "Sdr. Yola", "Sdr. Dede", "Sdr. Bagas", "Aris", "Rahmat", "Remaja Karang Taruna", "Gotong Royong", "Pengawas: Bp. Moch Ruri, Bp. H. Hilman Suyatman"]
    },
    {
      jabatan: "Seksi Potong Tulang Pakai Mesin",
      nama: ["Bp. Edi (Tono)", "Bp. Sarto (Bagong)", "Pengawas: Bp. H. Sudarno"]
    },
    {
      jabatan: "Seksi Pecah Kepala Sapi",
      nama: ["Bp. H. Parno", "Bp. Sugeng Haryanto", "Bp. Satiman", "Pengawas: Bp. Sulardi Glinding"]
    },
    {
      jabatan: "Mengumpulkan Kulit Sapi dan Kambing",
      nama: ["Bp. Soni", "Bp. Wito", "Bp. Agus Sudaryanto"]
    },
    {
      jabatan: "Mengumpulkan Kepala Sapi, Kambing dan Kikil",
      nama: ["Bp. Satimin", "Sdr. Legowo", "Pengawas: Bp. H. Syamsuri"]
    },
    {
      jabatan: "Seksi Jerohan",
      nama: ["Bp. Yulianto", "Bp. Joko Mulyo", "Bp. Danang", "Bp. Eko", "Bp. Agus Sulistyo", "Karang Taruna", "Pengawas: Bp. Parjan"]
    },
    {
      jabatan: "Seksi Pengambilan Daging untuk Dimasak",
      nama: ["Bp. Andi Baroto", "Bp. Dian Tri Widianto", "Pengawas: Ust. Syukur Prihantoro Al Hafid"]
    },
    {
      jabatan: "Seksi Pramuladi",
      nama: ["Remaja Masjid", "Karang Taruna", "Koordinator: Sdri. Nindi, Sdri. Anisa"]
    },
    {
      jabatan: "Seksi Penerimaan Hewan Kurban",
      nama: ["Bp. H. Hilman Suyatman", "Ust. Syukur Prihantoro Al Hafid", "Ust. Andika", "Bp. Surono"]
    },
    {
      jabatan: "Seksi Jaga Malam",
      nama: ["Bp. Tono Cipto", "Ust. Andika"]
    },
    {
      jabatan: "Seksi Penerangan dan Sound",
      nama: ["Bp. Sakimo", "Bp. Yatno", "Bp. Wiyono", "Bp. Madi", "Karang Taruna"]
    },
    {
      jabatan: "Seksi Kebersihan",
      nama: ["Bp. Sunarno", "Bp. Surono", "Bp. Satimin", "Bp. Sukir", "Bp. Samidi", "Bp. Tono Cipto", "Bp. Ngatimin", "Bp. Widodo", "Pengawas: Bp. Sukiyatno, Bp. Priyono"]
    },
    {
      jabatan: "Persiapan Tempat Penyembelihan",
      nama: ["Bp. Priyono CV", "Bp. Moch Ruri", "Bp. H. Hilman Suyatman", "Bp. Tukimo", "Sedoyo wargo", "(tanah Bp. H. Syamsuri sebelah gedung TPQ)"]
    },
    {
      jabatan: "Seksi Pembagian Girik Daging",
      nama: ["Ust. Gimin", "Remaja Masjid", "Karang Taruna", "(pembagian girik daging berdasarkan rumah) dan Pengambilan daging oleh warga"]
    },
    {
      jabatan: "Seksi Pemberian Daging Tamu tak Terduga",
      nama: ["Bp. Parjan"]
    },
    {
      jabatan: "Perlengkapan",
      nama: ["Bp. Suyatno", "Bp. Tono Cipto"]
    },
    {
      jabatan: "Seksi Pengambilan Daging oleh Warga",
      nama: ["Remaja Masjid", "Karang Taruna"]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Hasil Musyawarah Panitia Kecil</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            HASIL MUSYAWARAH PANITIA KECIL
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>PADA HARI SABTU, 24 Mei 2025</div>
            <div>PENGURUS MASJID ISTIQOMAH KLAMPISAN</div>
            <div>KEL. KALIANCAR, KEC. SELOGIRI, KAB. WONOGIRI</div>
            <div>Alamat : Jl. Klampisan, Kec. Selogiri, Kab. Wonogiri</div>
          </div>
          <div className="mt-4 pt-4 border-t-2 border-gray-300">
            <h4 className="font-semibold text-green-700">
              PANITIA HARI RAYA IDUL ADHA 1446 H / 2025 M
            </h4>
            <h4 className="font-semibold text-green-700">
              DAN PENYEMBELIHAN HEWAN QURBAN
            </h4>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {panitiaData.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700 mb-2">{item.jabatan}</h4>
                <div className="space-y-1">
                  {item.nama.map((nama, namaIndex) => (
                    <div key={namaIndex} className="text-sm text-gray-700">
                      {item.nama.length > 1 ? `${namaIndex + 1}. ` : ""}{nama}
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
        <h4 className="font-semibold text-blue-700 mb-2">Pelaksanaan Sholat Idul Adha</h4>
        <div className="text-sm text-blue-600 space-y-1">
          <div><strong>Tanggal:</strong> Jumat, 06 Juni 2025</div>
          <div><strong>Imam/Khotib:</strong> Ust. Syukur Prihantoro Al Hafid</div>
          <div><strong>Bilal:</strong> Sdr. Moch Al Fatih</div>
          <div><strong>Laporan Hasil Qurban:</strong> Ust. Andika</div>
          <div><strong>Kotak Infaq:</strong> Penanggung jawab - Sdr. Nindi (Ketua TPQ), Sdr. Anisa (Penasehat TPQ)</div>
          <div><strong>Pelaksana:</strong> TPQ dan Remaja Masjid</div>
        </div>
      </div>

      {/* Malam Takbiran */}
      <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
        <h4 className="font-semibold text-amber-700 mb-2">Malam Takbiran</h4>
        <div className="text-sm text-amber-600 space-y-1">
          <div><strong>Penanggung jawab:</strong> Ust Syukur Prihantoro Al Hafid, Ust. Reza (Pondok)</div>
          <div><strong>Pelaksana:</strong> Bp. Warto, Ust. Andika, Moch Al Fatih, Remaja Masjid dan TPQ</div>
        </div>
      </div>

      {/* Konsumsi */}
      <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
        <h4 className="font-semibold text-emerald-700 mb-2">Konsumsi Malam Takbiran dan Penyembelihan Hewan Qurban</h4>
        <div className="text-sm text-emerald-600">
          <div><strong>Tempat:</strong> Ibu-Ibu warga Klampisan dan Remas - Area Gedung TPQ</div>
        </div>
      </div>

      {/* Tanda Tangan */}
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <div className="text-sm text-gray-600 mb-2">Ketua Takmir Masjid</div>
        <div className="font-semibold text-gray-800 text-lg">H. Hilman Suyatman</div>
      </div>
    </div>
  );
};

export default Panitia;
