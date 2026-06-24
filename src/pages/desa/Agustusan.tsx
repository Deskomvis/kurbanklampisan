import { Flag, Trophy, CalendarDays, MapPin, Medal } from 'lucide-react';

const lomba = [
  { name: 'Balap Karung', time: '08.00 WIB', loc: 'Lapangan RT 03' },
  { name: 'Makan Kerupuk', time: '09.00 WIB', loc: 'Lapangan RT 03' },
  { name: 'Panjat Pinang', time: '10.00 WIB', loc: 'Lapangan Utama' },
  { name: 'Tarik Tambang', time: '13.00 WIB', loc: 'Lapangan Utama' },
  { name: 'Lomba Kebersihan Antar RT', time: 'Sepekan', loc: 'Seluruh Dusun' },
  { name: 'Malam Tirakatan', time: '19.00 WIB', loc: 'Balai Warga' },
];

const juara = [
  { rt: 'RT 03', poin: 'Juara Umum', medal: 'text-yellow-500' },
  { rt: 'RT 01', poin: 'Runner Up', medal: 'text-gray-400' },
  { rt: 'RT 05', poin: 'Juara 3', medal: 'text-amber-700' },
];

const Agustusan = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src="/banner-1.png" alt="Agustusan" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-800/75 to-red-600/40" />
        <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-24 max-w-5xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-medium mb-4">
            <Flag className="w-3.5 h-3.5" /> Kegiatan Tahunan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Peringatan HUT Kemerdekaan RI
          </h1>
          <p className="mt-4 text-red-50/90 text-base md:text-lg max-w-2xl leading-relaxed">
            Rangkaian lomba, kerja bakti, dan malam tirakatan untuk memperingati hari kemerdekaan
            bersama seluruh warga Dusun Klampisan.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white px-4 py-2 rounded-xl text-sm">
            <CalendarDays className="w-4 h-4" /> 10 – 17 Agustus 2026
          </div>
        </div>
      </section>

      {/* Jadwal Lomba */}
      <section className="container mx-auto px-4 md:px-8 py-14 max-w-6xl">
        <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold text-sm">
          <Trophy className="w-4 h-4" /> Jadwal
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Daftar Lomba &amp; Kegiatan</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lomba.map((l) => (
            <div key={l.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800">{l.name}</h3>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> {l.time}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {l.loc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Juara mockup */}
      <section className="bg-white border-y border-gray-100 py-14">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold text-sm">
            <Medal className="w-4 h-4" /> Hasil
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Klasemen Antar RT (Sementara)</h2>
          <div className="space-y-3">
            {juara.map((j, i) => (
              <div key={j.rt} className="flex items-center gap-4 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                <Medal className={`w-7 h-7 ${j.medal}`} />
                <span className="text-lg font-bold text-gray-800 w-8">{i + 1}</span>
                <span className="flex-1 font-semibold text-gray-700">{j.rt}</span>
                <span className="text-sm font-medium text-red-600">{j.poin}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">* Data merupakan contoh dan akan diperbarui saat kegiatan berlangsung.</p>
        </div>
      </section>
    </div>
  );
};

export default Agustusan;
