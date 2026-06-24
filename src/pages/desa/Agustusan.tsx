import {
  Flag,
  Calendar,
  MapPin,
  Phone,
  Instagram,
  ChevronRight,
  Users,
  Wallet,
  ClipboardList,
  Lightbulb,
  Trophy,
  ShieldCheck,
  Utensils,
  Camera,
  Megaphone,
  Settings,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const susunanPanitia = [
  { jabatan: 'Pelindung', ikon: ShieldCheck, anggota: ['Bp. Moch. Ruri'] },
  {
    jabatan: 'Penanggung Jawab',
    ikon: ShieldCheck,
    anggota: ['Bp. Parjan (RT 01)', 'Bp. Tukimo (RT 02)'],
  },
  { jabatan: 'Ketua Pelaksana', ikon: Users, anggota: ['Bp. Fatkurohman Tri Hadi'] },
  {
    jabatan: 'Wakil Ketua',
    ikon: Users,
    anggota: ['Bp. Unggul Prasetiyo', 'Bp. Eko Rudhi Astanto'],
  },
  {
    jabatan: 'Koordinator Pelaksana',
    ikon: Settings,
    anggota: ['Bp. Tarmo', 'Daffa Abid Ash Shidiqiy', 'Elsa Rahmaningrum', 'Yogi Wahid Saputra'],
  },
  {
    jabatan: 'Sekretaris',
    ikon: ClipboardList,
    anggota: ['Cornelia Mahidara P.M', 'Latifa Salfa Fainaya'],
  },
  {
    jabatan: 'Bendahara',
    ikon: Wallet,
    anggota: ['Bp. Sakimo', 'Fajarina Nurismawati', 'Yasfi Aaidah', 'Avifahtur Nur', 'Rohma'],
  },
  {
    jabatan: 'Humas',
    ikon: Megaphone,
    anggota: [
      'Bp. Dian Tri Widianto',
      'Raihan Dzaki Akmal',
      'Muhammad Al Fatih',
      'Latifa Salfa Fainaya',
      'Pratama Dian Sholiqhin',
    ],
  },
  {
    jabatan: 'Dokumentasi',
    ikon: Camera,
    anggota: [
      'Bp. Rezha Adi N',
      'Ferliano Reza Syaputra',
      'Daffa Abid Ash Shidiqiy',
      'Kusnan Fahmi Afnizard',
    ],
  },
  {
    jabatan: 'Perlengkapan',
    ikon: Settings,
    anggota: [
      'Mufid Akmal Dzaki',
      'Ilham Prakoso',
      'Sidiq Wahyu Permadi',
      'Alvin Teza Firmansyah',
      'Yufen Air Langga Putra',
    ],
  },
  {
    jabatan: 'Konsumsi',
    ikon: Utensils,
    anggota: [
      'Zullaykha Bunga Avrillea',
      'Anindya Hawa Ainul Fanfa',
      'Marfelia Cahya Kirani',
      'Pandi Aji Firmansyah',
      'Rizky Zulfian',
      'Rifai Alif Maulana',
    ],
  },
  {
    jabatan: 'Keamanan / K3',
    ikon: ShieldCheck,
    anggota: ['Damar Ragil Pamungkas', 'Afrian Dede Nawang Kusuma', 'Tri Cahyo Wijanarko'],
  },
  {
    jabatan: 'Sie Acara — Koordinator',
    ikon: Trophy,
    anggota: ['Bp. Sugeng Murjianto'],
  },
  {
    jabatan: 'Sie Acara — Lomba',
    ikon: Trophy,
    anggota: [
      'Bp. Joko Santoso',
      'Asyam Waly Maftuh Shubhi',
      'Fachri Afnan Aditama',
      'Ferliano Reza Syaputra',
      'Ayu Ariyani',
      'Ayu Ariyana',
      'Anindya Hawa Ainul Fanfa',
      'Asyifa Rahmawati',
      'Fathin Nuha',
      'Nova Adelia Thalita',
      'Meysya Rahma Nuraini',
    ],
  },
  {
    jabatan: 'Sie Acara — Jalan Santai',
    ikon: Trophy,
    anggota: [
      'Reza Putra Adiguna',
      'Raihan Dzaki Akmal',
      'Morel Haryusta',
      'Najwa Putri Agustin',
      'Alma Rayya Qanitha',
      'Almira Oqila Putri',
      'Dapri Lamelani',
    ],
  },
  {
    jabatan: 'Sie Acara — Hiburan',
    ikon: Trophy,
    anggota: [
      'Rosyita Siti Azzahra',
      'Elvani Nuarita',
      'Ilham Prakoso',
      'Yogi Wahid Saputra',
      'Pratama Dian Sholiqhin',
      'Raditya Yudha Pratama',
    ],
  },
];

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

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold mb-6">
          <Flag className="w-3.5 h-3.5" aria-hidden="true" />
          Karang Taruna "Taruna Bhakti" Klampisan
        </div>
        <h1
          id="agustusan-heading"
          className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
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
      className="bg-gray-900 py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold mb-4 uppercase tracking-wider">
              Juli 2026
            </div>
            <h2
              id="turnamen-heading"
              className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3"
            >
              Turnamen Antar RW 2026
            </h2>
            <p className="text-gray-300 text-base mb-2">
              Se-Kelurahan Kaliancar, Kecamatan Selogiri
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Semarakkan pertandingan, raih kemenangan, dan junjung tinggi sportivitas.<br />
              <strong className="text-red-400">Dukung &amp; Saksikan Kontingen Klampisan RW 10!</strong>
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { emoji: '🏐', name: 'Bola Voli' },
                { emoji: '🏸', name: 'Badminton' },
                { emoji: '🏓', name: 'Tenis Meja' },
              ].map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-xl"
                >
                  <span role="img" aria-label={s.name} className="text-xl">{s.emoji}</span>
                  <span className="text-white font-semibold text-sm">{s.name}</span>
                </div>
              ))}
            </div>

            <address className="not-italic space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                Soni: <a href="tel:081215000200" className="hover:text-white transition-colors">081215000200</a>
                &nbsp;/&nbsp;
                Sakimo: <a href="tel:087898213912" className="hover:text-white transition-colors">087898213912</a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
                <a
                  href="https://instagram.com/kt.tarunabhaktii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @kt.tarunabhaktii
                </a>
              </p>
            </address>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <h3 className="text-white font-bold text-lg mb-4">Cabang Olahraga</h3>
            <div className="space-y-3">
              {[
                { name: 'Bola Voli', emoji: '🏐', desc: 'Antar tim RW se-kelurahan' },
                { name: 'Badminton', emoji: '🏸', desc: 'Ganda putra dan ganda campuran' },
                { name: 'Tenis Meja', emoji: '🏓', desc: 'Turnamen individu dan beregu' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3">
                  <span className="text-2xl" role="img" aria-label={c.name}>{c.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{c.name}</p>
                    <p className="text-gray-400 text-xs">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Susunan Panitia ────────────────────────── */}
    <section
      aria-labelledby="panitia-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20"
    >
      <div className="mb-8">
        <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" aria-hidden="true" />
          SK Karang Taruna · 17 Juni 2026
        </p>
        <h2
          id="panitia-heading"
          className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-1"
        >
          Susunan Panitia
        </h2>
        <p className="text-gray-600 text-sm">
          Panitia Peringatan HUT Kemerdekaan RI ke-81 Tahun 2026 —
          Ketua Karang Taruna: <strong>Pratama Dian Sholiqhin</strong>
        </p>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {susunanPanitia.map((pos, i) => {
          const Icon = pos.ikon;
          return (
            <AccordionItem
              key={i}
              value={`pos-${i}`}
              className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline [&>svg]:text-gray-400 text-left">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{pos.jabatan}</span>
                    <span className="block text-xs text-gray-500 font-normal">
                      {pos.anggota.length} anggota
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-1">
                <ul className="space-y-1.5">
                  {pos.anggota.map((nama, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span
                        className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        {j + 1}
                      </span>
                      {nama}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  </div>
);

export default Agustusan;
