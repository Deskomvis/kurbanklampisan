import merdekaHero from '@/assets/Merdeka-Klampisan-hero.webp';
import bannerWarga from '@/assets/banner agustusan warga.webp';
import bannerRw from '@/assets/banner-agustusan-rw.webp';
import {
  Flag,
  Calendar,
  MapPin,
  Phone,
  ChevronRight,
  Users,
  Wallet,
  ClipboardList,
  Lightbulb,
  Trophy,
  ShieldCheck,
  Crown,
  Award,
  Network,
  Camera,
  Megaphone,
  Settings,
  Utensils,
  Download,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Data ─────────────────────────────────────────────── */

const notulenKeuangan = [
  'Pengumpulan iuran ditarik melalui dawis',
  'Individu langsung ke ketua dawis',
  'Dana eksternal ditanggung pemuda tuek',
  'Patokan per dawis Rp 400.000 × 10 dawis = Rp 4.000.000',
  'Pelaku usaha dihubungi untuk penambahan dana',
];

const notulenLomba = [
  'Jalan sehat: peserta memakai kostum merah putih',
  'Voli geber (antar warga)',
  'Kegiatan lomba bapak-ibu: dilaksanakan Weekend',
];

const notulenUsulan = [
  'Estafet air menggunakan tampah (kategori ibu)',
  'Lomba pemilihan opsi (akan diputuskan pada rapat berikutnya)',
];

const orgChain: { jabatan: string; anggota: string[]; ikon: LucideIcon }[] = [
  { jabatan: 'Pelindung', anggota: ['Bp. Moch. Ruri'], ikon: ShieldCheck },
  { jabatan: 'Penanggung Jawab', anggota: ['Bp. Parjan (RT 01)', 'Bp. Tukimo (RT 02)'], ikon: Award },
  { jabatan: 'Ketua Pelaksana', anggota: ['Bp. Fatkurohman Tri Hadi'], ikon: Crown },
  { jabatan: 'Wakil Ketua', anggota: ['Bp. Unggul Prasetiyo', 'Bp. Eko Rudhi Astanto'], ikon: Users },
  { jabatan: 'Koordinator Pelaksana', anggota: ['Bp. Tarmo', 'Daffa Abid Ash Shidiqiy', 'Elsa Rahmaningrum', 'Yogi Wahid Saputra'], ikon: Network },
];

const orgDivisi: { jabatan: string; anggota: string[]; ikon: LucideIcon }[] = [
  { jabatan: 'Sekretaris', ikon: ClipboardList, anggota: ['Cornelia Mahidara P.M', 'Latifa Salfa Fainaya'] },
  { jabatan: 'Bendahara', ikon: Wallet, anggota: ['Bp. Sakimo', 'Fajarina Nurismawati', 'Yasfi Aaidah', 'Avifahtur Nur', 'Rohma'] },
  { jabatan: 'Humas', ikon: Megaphone, anggota: ['Bp. Dian Tri Widianto', 'Raihan Dzaki Akmal', 'Muhammad Al Fatih', 'Latifa Salfa Fainaya', 'Pratama Dian Sholiqhin'] },
  { jabatan: 'Dokumentasi', ikon: Camera, anggota: ['Bp. Rezha Adi N', 'Ferliano Reza Syaputra', 'Daffa Abid Ash Shidiqiy', 'Kusnan Fahmi Afnizard'] },
  { jabatan: 'Perlengkapan', ikon: Settings, anggota: ['Mufid Akmal Dzaki', 'Ilham Prakoso', 'Sidiq Wahyu Permadi', 'Alvin Teza Firmansyah', 'Yufen Air Langga Putra'] },
  { jabatan: 'Konsumsi', ikon: Utensils, anggota: ['Zullaykha Bunga Avrillea', 'Anindya Hawa Ainul Fanfa', 'Marfelia Cahya Kirani', 'Pandi Aji Firmansyah', 'Rizky Zulfian', 'Rifai Alif Maulana'] },
  { jabatan: 'Keamanan / K3', ikon: ShieldCheck, anggota: ['Damar Ragil Pamungkas', 'Afrian Dede Nawang Kusuma', 'Tri Cahyo Wijanarko'] },
];

const orgSieAcara = {
  koordinator: 'Bp. Sugeng Murjianto',
  divisi: [
    { jabatan: 'Sie Lomba', ikon: Trophy, anggota: ['Bp. Joko Santoso', 'Asyam Waly Maftuh Shubhi', 'Fachri Afnan Aditama', 'Ferliano Reza Syaputra', 'Ayu Ariyani', 'Ayu Ariyana', 'Anindya Hawa Ainul Fanfa', 'Asyifa Rahmawati', 'Fathin Nuha', 'Nova Adelia Thalita', 'Meysya Rahma Nuraini'] },
    { jabatan: 'Sie Jalan Santai', ikon: MapPin, anggota: ['Reza Putra Adiguna', 'Raihan Dzaki Akmal', 'Morel Haryusta', 'Najwa Putri Agustin', 'Alma Rayya Qanitha', 'Almira Oqila Putri', 'Dapri Lamelani'] },
    { jabatan: 'Sie Hiburan', ikon: Flag, anggota: ['Rosyita Siti Azzahra', 'Elvani Nuarita', 'Ilham Prakoso', 'Yogi Wahid Saputra', 'Pratama Dian Sholiqhin', 'Raditya Yudha Pratama'] },
  ],
};

/* ─── Org chart sub-components ─────────────────────────── */

const chainBg = ['bg-red-900', 'bg-red-800', 'bg-red-700', 'bg-red-600', 'bg-rose-600'];

const ChainCard = ({ jabatan, anggota, tier, ikon: Icon }: { jabatan: string; anggota: string[]; tier: number; ikon: LucideIcon }) => (
  <div className={cn('flex-1 min-w-[150px] rounded-2xl px-4 py-4 text-white shadow-md h-full', chainBg[tier])}>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
      <p className="font-extrabold text-sm leading-tight">{jabatan}</p>
    </div>
    <ul className="space-y-1">
      {anggota.map((n, i) => (
        <li key={i} className="flex items-start gap-1.5 text-xs opacity-90">
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold shrink-0 mt-px">{i + 1}</span>
          <span>{n}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HArrow = () => (
  <div className="flex items-center shrink-0 px-1">
    <div className="w-3 h-px bg-red-200" />
    <ChevronRight className="w-3.5 h-3.5 text-red-300 -ml-1" aria-hidden="true" />
  </div>
);

const VLine = ({ color = 'bg-red-200' }: { color?: string }) => (
  <div className={cn('w-px h-8 mx-auto', color)} />
);

const DivisiCard = ({ jabatan, anggota, ikon: Icon }: { jabatan: string; anggota: string[]; ikon: LucideIcon }) => (
  <div className="w-full rounded-xl border border-red-100 bg-white shadow-sm p-3 flex flex-col">
    <div className="flex items-center gap-1.5 mb-2">
      <div className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
      <p className="font-bold text-gray-900 text-xs leading-tight">{jabatan}</p>
    </div>
    <p className="text-[10px] text-red-400 font-semibold mb-1.5">{anggota.length} anggota</p>
    <ul className="space-y-0.5">
      {anggota.map((n, i) => (
        <li key={i} className="flex items-start gap-1 text-[10px] text-gray-600">
          <span className="text-red-300 font-bold shrink-0">{i + 1}.</span>
          <span>{n}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SieCard = ({ jabatan, anggota, ikon: Icon }: { jabatan: string; anggota: string[]; ikon: LucideIcon }) => (
  <div className="w-full rounded-xl border border-amber-200 bg-amber-50 shadow-sm p-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-7 h-7 rounded-lg bg-amber-200 text-amber-700 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-bold text-amber-900 text-sm leading-tight">{jabatan}</p>
        <p className="text-[10px] text-amber-500 font-semibold">{anggota.length} anggota</p>
      </div>
    </div>
    <ul className="space-y-0.5">
      {anggota.map((n, i) => (
        <li key={i} className="flex items-start gap-1 text-xs text-gray-700">
          <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
          <span>{n}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* ─── Helpers ───────────────────────────────────────────── */

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
        <ChevronRight
          className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
          aria-hidden="true"
        />
        {item}
      </li>
    ))}
  </ul>
);

/* ─── Component ─────────────────────────────────────────── */

const Agustusan = () => (
  <div>
    {/* ── Hero ───────────────────────────────────── */}
    <section
      aria-labelledby="agustusan-heading"
      className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-rose-700"
    >
      {/* Geometric pattern */}
      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="agus-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.8" />
            <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
            <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#agus-geo)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold mb-6">
              <Flag className="w-3.5 h-3.5" aria-hidden="true" />
              Semarak Ikut Memeriahkan — Karang Taruna Bhakti & Warga Klampisan
            </div>
            <h1
              id="agustusan-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
            >
              HUT Kemerdekaan RI<br />
              <span className="text-yellow-300">ke-81</span> Tahun 2026
            </h1>
            <p className="text-red-100 text-base md:text-xl leading-relaxed max-w-2xl mb-2">
              "Sehat, Semangat dan Bahagia Bersama.. Merdeka!!"
            </p>
            <p className="text-red-200 text-sm">Ditetapkan di Wonogiri, 17 Juni 2026</p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                10 – 17 Agustus 2026
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Dusun Klampisan, RW 10
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative mt-8 lg:mt-0 flex justify-center">
            <img
              src={merdekaHero}
              alt="HUT Kemerdekaan RI ke-81 Dusun Klampisan"
              className="w-full max-w-lg lg:max-w-full object-contain transform transition duration-500 hover:scale-[1.02]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>

    {/* ── Notulen Rapat ──────────────────────────── */}
    <section
      aria-labelledby="notulen-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20"
    >
      <div className="mb-8">
        <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
          <ClipboardList className="w-4 h-4" aria-hidden="true" />
          Rapat Koordinasi · 23 Juni 2026, 17.11 WIB
        </p>
        <h2
          id="notulen-heading"
          className="text-2xl md:text-4xl font-extrabold text-gray-900"
        >
          Notulen Hasil Rapat
        </h2>
        <p className="text-gray-600 text-sm mt-1">Kesepakatan sementara — masih dapat diperbarui pada rapat berikutnya.</p>
      </div>

      {/* Banner Warga */}
      <div className="mb-10 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white hover:shadow-xl transition-all duration-300">
        <img
          src={bannerWarga}
          alt="Banner Kegiatan Warga 17 Agustus"
          className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Keuangan */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-lg bg-green-50 text-green-700" aria-hidden="true">
              <Wallet className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-gray-900">Keuangan</h3>
          </div>
          <BulletList items={notulenKeuangan} />
        </div>

        {/* Kegiatan Lomba */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-lg bg-red-50 text-red-700" aria-hidden="true">
              <Trophy className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-gray-900">Kegiatan Lomba</h3>
          </div>
          <BulletList items={notulenLomba} />
        </div>

        {/* Usulan Lomba */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-lg bg-amber-50 text-amber-700" aria-hidden="true">
              <Lightbulb className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-gray-900">Usulan Lomba</h3>
          </div>
          <BulletList items={notulenUsulan} />
          <p className="mt-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
            * Akan dikonfirmasi pada rapat berikutnya.
          </p>
        </div>
      </div>
    </section>

    {/* ── Turnamen Antar RW ──────────────────────── */}
    <section
      aria-labelledby="turnamen-heading"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 py-16 md:py-24 border-t border-gray-800"
    >
      {/* Decorative gradient glowing lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Info and Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Turnamen Kelurahan · Juli 2026
            </div>

            <div>
              <h2
                id="turnamen-heading"
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
              >
                Turnamen Antar RW
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Dukung dan saksikan perjuangan kontingen <span className="text-red-400 font-bold">Klampisan RW 10</span> di ajang bergengsi tingkat kelurahan Kaliancar!
              </p>
            </div>

            {/* Cabang Olahraga Cards */}
            <div className="space-y-3">
              {[
                { name: 'Bola Voli', emoji: '🏐', desc: 'Pertandingan voli seru antar RW se-Kelurahan' },
                { name: 'Badminton', emoji: '🏸', desc: 'Kompetisi ganda putra dan ganda campuran' },
                { name: 'Tenis Meja', emoji: '🏓', desc: 'Pertandingan tunggal dan beregu yang dinamis' },
              ].map((c) => (
                <div 
                  key={c.name} 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-red-500/20 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-white/[0.08]"
                >
                  <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" role="img" aria-label={c.name}>{c.emoji}</span>
                  <div>
                    <p className="text-white font-bold text-base">{c.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address & Contacts */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <p className="text-sm font-semibold text-gray-400">Hubungi Panitia & Info Sosial:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/6281215000200?text=Halo%20Soni%2C%20saya%20ingin%20tanya%20info%20kegiatan%20Agustusan%20Klampisan%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white/5 border border-white/10 hover:border-red-500/30 rounded-xl hover:bg-white/[0.08] transition-all duration-300 text-gray-200 hover:text-white"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-red-400" />
                    <span>Soni (Panitia)</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>

                <a
                  href="https://wa.me/6287898213912?text=Halo%20Sakimo%2C%20saya%20ingin%20tanya%20info%20kegiatan%20Agustusan%20Klampisan%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white/5 border border-white/10 hover:border-red-500/30 rounded-xl hover:bg-white/[0.08] transition-all duration-300 text-gray-200 hover:text-white"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-red-400" />
                    <span>Sakimo (Panitia)</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>

                <a
                  href="https://instagram.com/kt.tarunabhaktii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white/5 border border-white/10 hover:border-red-500/30 rounded-xl hover:bg-white/[0.08] transition-all duration-300 text-gray-200 hover:text-white sm:col-span-2"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Flag className="w-4 h-4 text-red-400" />
                    <span>Instagram @kt.tarunabhaktii</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Banner Display */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative group w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-gray-950 p-2 shadow-2xl hover:border-red-500/30 transition-all duration-500 shadow-red-950/20 hover:shadow-red-950/40">
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                src={bannerRw}
                alt="Banner Turnamen Antar RW 2026"
                className="w-full h-auto rounded-xl object-contain transform group-hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Susunan Panitia ────────────────────────── */}
    <section
      aria-labelledby="panitia-heading"
      className="bg-stone-50 px-4 md:px-8 py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
          <Users className="w-4 h-4" aria-hidden="true" />
          SK Karang Taruna · 17 Juni 2026
        </p>
        <h2 id="panitia-heading" className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-1">
          Susunan Panitia
        </h2>
        <p className="text-gray-500 text-sm">
          HUT Kemerdekaan RI ke-81 Tahun 2026 — Ketua KT: <strong className="text-gray-700">Pratama Dian Sholiqhin</strong>
        </p>
      </div>

      {/* ── Leadership chain — 1 baris horizontal ── */}
      <div className="max-w-7xl mx-auto overflow-x-auto pb-1">
        <div className="flex items-stretch gap-0 min-w-max lg:min-w-0 w-full">
          {orgChain.map((pos, i) => (
            <div key={i} className="flex items-center flex-1 min-w-[150px]">
              <ChainCard {...pos} tier={i} />
              {i < orgChain.length - 1 && <HArrow />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Download SK PDF ── */}
      <div className="max-w-7xl mx-auto mt-6 mb-2">
        <div className="rounded-2xl border border-red-100 bg-white shadow-sm px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wide leading-relaxed text-center sm:text-left">
            Download Susunan Pembentukan Panitia Peringatan Hari Ulang Tahun<br className="hidden sm:block" />
            Kemerdekaan Republik Indonesia Ke-81 Tahun 2026
          </p>
          <a
            href="/SK-Panitia-HUT-RI-81-2026.pdf"
            download="SK-Panitia-HUT-RI-81-2026.pdf"
            className="flex items-center gap-2 shrink-0 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download .PDF
          </a>
        </div>
      </div>

      {/* ── Drop ke divisi ── */}
      <div className="flex justify-center"><VLine /></div>

      {/* ── Divisi branch ── */}
      <div className="max-w-7xl mx-auto">
        <div className="hidden lg:block relative">
          <div className="absolute top-0 left-[7%] right-[7%] h-px bg-red-200" />
          <div className="grid grid-cols-7 gap-3">
            {orgDivisi.map((dept, i) => (
              <div key={i} className="flex flex-col items-center">
                <VLine />
                <DivisiCard {...dept} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-2">
          {orgDivisi.map((dept, i) => (
            <DivisiCard key={i} {...dept} />
          ))}
        </div>
      </div>

      {/* ── Sie Acara ── */}
      <div className="flex flex-col items-center mt-2">
        <VLine color="bg-amber-300" />
        <div className="w-full max-w-xs rounded-2xl px-5 py-4 bg-amber-600 text-white shadow-lg text-center">
          <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Sie Acara — Koordinator</p>
          <p className="font-extrabold text-sm">{orgSieAcara.koordinator}</p>
        </div>
        <VLine color="bg-amber-300" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="hidden sm:block relative">
          <div className="absolute top-0 left-[17%] right-[17%] h-px bg-amber-300" />
          <div className="grid grid-cols-3 gap-5">
            {orgSieAcara.divisi.map((sie, i) => (
              <div key={i} className="flex flex-col items-center">
                <VLine color="bg-amber-300" />
                <SieCard {...sie} />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:hidden flex flex-col gap-3">
          {orgSieAcara.divisi.map((sie, i) => (
            <SieCard key={i} {...sie} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Agustusan;
