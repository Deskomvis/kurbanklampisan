import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  FileText,
  MessageSquare,
} from 'lucide-react';

interface TimelineItem {
  id: number;
  quarter: string;
  title: string;
  status: 'Selesai' | 'Dalam Proses' | 'Direncanakan';
  statusColor: string;
  rt: string;
  description: string;
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Rapat Warga' | 'Kerja Bakti' | 'Kesehatan' | 'Keagamaan';
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    quarter: 'Kuartal I - 2026',
    title: 'Renovasi Pos Kamling RT 01',
    status: 'Selesai',
    statusColor: 'bg-green-100 text-green-700 border-green-200',
    rt: 'RT 01',
    description: 'Pengecatan ulang, perbaikan atap bocor, penyediaan meja ronda, pemasangan sirine darurat, dan kelengkapan P3K ronda malam.',
  },
  {
    id: 2,
    quarter: 'Kuartal II - 2026',
    title: 'Pengaspalan & Paving Jalan Gang RT 02',
    status: 'Selesai',
    statusColor: 'bg-green-100 text-green-700 border-green-200',
    rt: 'RT 02',
    description: 'Perbaikan jalan lingkungan berlubang dengan aspal dan penataan paving block di bagian gang sempit agar lebih rapi dan bersih.',
  },
  {
    id: 3,
    quarter: 'Kuartal III - 2026',
    title: 'Pemasangan PJU LED Tambahan RW 10',
    status: 'Dalam Proses',
    statusColor: 'bg-amber-100 text-amber-700 border-amber-200',
    rt: 'RT 01 & 02',
    description: 'Pemasangan Penerangan Jalan Umum (PJU) bertenaga hemat LED di 8 titik jalan utama dusun yang rawan gelap saat malam hari.',
  },
  {
    id: 4,
    quarter: 'Kuartal IV - 2026',
    title: 'Program Penghijauan & Apotek Hidup Lingkungan',
    status: 'Direncanakan',
    statusColor: 'bg-blue-100 text-blue-700 border-blue-200',
    rt: 'RW 10',
    description: 'Penanaman bibit buah dan tanaman obat keluarga (TOGA) di lahan kosong di pinggir gang untuk menciptakan lingkungan asri dan berdaya.',
  },
];

const eventData: EventItem[] = [
  {
    id: 1,
    title: 'Kerja Bakti Bersih Lingkungan Menyambut Agustusan',
    date: 'Ahad, 2 Agustus 2026',
    time: '07:00 - selesai',
    location: 'Lingkungan RW 10 Klampisan',
    category: 'Kerja Bakti',
    color: 'bg-red-50 text-red-700 border-red-100',
  },
  {
    id: 2,
    title: 'Rapat Persiapan Pembentukan Panitia HUT RI ke-81',
    date: 'Sabtu, 11 Juli 2026',
    time: '19:30 WIB',
    location: 'Rumah Ketua RW 10 (Bp. Moch. Ruri)',
    category: 'Rapat Warga',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    id: 3,
    title: 'Pemeriksaan Posyandu Lansia & Balita Rutin RW 10',
    date: 'Rabu, 15 Juli 2026',
    time: '08:30 - 11:30 WIB',
    location: 'Pos Ronda RT 01 Klampisan',
    category: 'Kesehatan',
    color: 'bg-rose-50 text-rose-700 border-rose-100',
  },
  {
    id: 4,
    title: 'Pengajian Rutin Bulanan Warga Klampisan',
    date: 'Kamis malam, 16 Juli 2026',
    time: '19:45 WIB - selesai',
    location: 'Masjid Istiqomah Klampisan',
    category: 'Keagamaan',
    color: 'bg-green-50 text-green-700 border-green-100',
  },
];

const RencanaWarga = () => {
  const [usulan, setUsulan] = useState('');
  const [namaUsul, setNamaUsul] = useState('');
  const [rtUsul, setRtUsul] = useState('RT 01');

  const handleSubmitUsulan = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih ${namaUsul}, usulan rencana pembangunan Anda telah dicatat untuk dibahas pada rapat RT/RW berikutnya.`);
    setUsulan('');
    setNamaUsul('');
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 text-white">
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="rencana-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
              <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rencana-geo)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
              <TrendingUp className="w-3.5 h-3.5 text-lime-300" aria-hidden="true" />
              Rencana Pembangunan & Agenda Sosial
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Rencana Pembangunan Lingkungan
            </h1>
            <p className="text-emerald-100 text-base md:text-lg max-w-2xl">
              Transparansi arah pembangunan dusun Klampisan. Lihat roadmap infrastruktur fisik, agenda posyandu, jadwal rapat koordinasi warga, dan sampaikan usulan demi kemajuan bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Roadmap Timeline & Agenda */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Timeline Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Roadmap Pembangunan Tahun 2026
                </h2>
                <p className="text-base text-stone-600 mt-1">
                  Realisasi rencana fisik dan program pemberdayaan warga Klampisan RW 10.
                </p>
              </div>

              <div className="relative border-l border-stone-200 ml-4 space-y-8">
                {timelineData.map((item) => (
                  <div key={item.id} className="relative pl-6">
                    {/* Circle Node */}
                    <span className="absolute -left-[9px] top-1.5 bg-white border-2 border-emerald-700 rounded-full w-4.5 h-4.5 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                    </span>
                    
                    <div className="bg-white border border-stone-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                        <span className="text-xs font-bold text-emerald-850 uppercase tracking-wide">
                          {item.quarter}
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-stone-500 bg-stone-50 border border-stone-150 px-2 py-0.5 rounded-full">
                            {item.rt}
                          </span>
                          <span className={`font-bold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-stone-900 text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-base text-stone-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda/Events Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Agenda & Kegiatan Warga Terdekat
                </h2>
                <p className="text-base text-stone-600 mt-1">
                  Jadwal rapat warga, posyandu, kerja bakti, dan keagamaan di Klampisan.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {eventData.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-50 border border-stone-150 text-stone-600 uppercase mb-3">
                        {ev.category}
                      </span>
                      <h3 className="font-extrabold text-stone-900 text-base leading-snug mb-3">
                        {ev.title}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-stone-600 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-stone-700">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                        <span className="line-clamp-1">{ev.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Usulan Form */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box info usulan */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-stone-900 text-base mb-2">
                Saluran Ide & Usulan
              </h3>
              <p className="text-base text-stone-600 leading-relaxed">
                Tiap masukan, kritik konstruktif, atau usulan perbaikan fasilitas lingkungan Anda sangat berarti. Pengurus RW 10 secara teratur meninjau ide dari portal ini untuk dijadikan prioritas agenda rapat bulanan.
              </p>
            </div>

            {/* Form Usulan */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-stone-900 text-base mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-4.5 h-4.5 text-emerald-800" /> Tulis Usulan Anda
              </h3>
              <form onSubmit={handleSubmitUsulan} className="space-y-4">
                <div>
                  <label htmlFor="usul-nama" className="block text-sm font-bold text-stone-600 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    id="usul-nama"
                    value={namaUsul}
                    onChange={(e) => setNamaUsul(e.target.value)}
                    required
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 text-stone-800"
                  />
                </div>

                <div>
                  <label htmlFor="usul-rt" className="block text-sm font-bold text-stone-600 uppercase mb-1">Asal Wilayah</label>
                  <select
                    id="usul-rt"
                    value={rtUsul}
                    onChange={(e) => setRtUsul(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 text-stone-800 font-semibold"
                  >
                    <option value="RT 01">RT 01 Klampisan</option>
                    <option value="RT 02">RT 02 Klampisan</option>
                    <option value="Luar RW 10">Warga Luar RW 10</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="usul-detail" className="block text-sm font-bold text-stone-600 uppercase mb-1">Rincian Usulan</label>
                  <textarea
                    id="usul-detail"
                    required
                    rows={4}
                    value={usulan}
                    onChange={(e) => setUsulan(e.target.value)}
                    placeholder="Tuliskan detail usulan program pembangunan, perbaikan fasilitas, atau kegiatan sosial..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 text-stone-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 text-white text-base font-bold rounded-xl hover:bg-emerald-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                >
                  Kirim Usulan Rencana
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default RencanaWarga;
