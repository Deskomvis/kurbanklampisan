import { Link } from 'react-router-dom';
import {
  Flag,
  Beef,
  ArrowRight,
  MapPin,
  Calendar,
  ChevronRight,
  Hospital,
  GraduationCap,
  Car,
  Store,
  Users,
  Heart,
  Clock,
  Building2,
  TreePine,
  Navigation,
  Landmark,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */

const identitas = [
  { label: 'Kelurahan', value: 'Kaliancar' },
  { label: 'Kecamatan', value: 'Selogiri' },
  { label: 'Kabupaten', value: 'Wonogiri' },
  { label: 'Provinsi', value: 'Jawa Tengah' },
  { label: 'Kode Pos', value: '57652' },
  { label: 'Wilayah', value: 'RW 10 · RT 01 & RT 02' },
];

const fasilitasData = [
  {
    kategori: 'Kesehatan',
    ikon: Hospital,
    bg: 'bg-rose-50 text-rose-700',
    items: [
      { nama: 'RS Fitri Candra', rt: 'RT 01' },
      { nama: 'RS Astrini', rt: 'RT 01' },
    ],
  },
  {
    kategori: 'Pendidikan',
    ikon: GraduationCap,
    bg: 'bg-blue-50 text-blue-700',
    items: [
      { nama: 'Junior Modern School / PAUD', rt: 'RT 02' },
      { nama: 'TK/KB Anis', rt: 'RT 01' },
      { nama: 'SMK PGRI 2 Wonogiri', rt: 'RT 01' },
    ],
  },
  {
    kategori: 'Transportasi',
    ikon: Car,
    bg: 'bg-amber-50 text-amber-700',
    items: [
      { nama: 'Garasi & Pool Bus AGRAMAS', rt: 'RT 02' },
      { nama: 'Terminal Lama Wonogiri', rt: 'RT 01' },
    ],
  },
  {
    kategori: 'Rumah Ibadah',
    ikon: Landmark,
    bg: 'bg-green-50 text-green-700',
    items: [
      { nama: 'Masjid Istiqomah', rt: 'RT 01' },
      { nama: 'Masjid Ringin Agung', rt: 'RT 02' },
    ],
  },
];

const umkm = [
  { nama: 'Mie Won Yamin Klampisan', kategori: 'Kuliner', emoji: '🍜' },
  { nama: 'Kebab Araya', kategori: 'Kuliner', emoji: '🌯' },
  { nama: 'Bakmi Kita', kategori: 'Kuliner', emoji: '🍝' },
];

const jenisUsaha = [
  { emoji: '🍽️', label: 'Kuliner & Warung' },
  { emoji: '🛒', label: 'Toko Kelontong' },
  { emoji: '🔧', label: 'Bengkel' },
  { emoji: '📱', label: 'Konter Pulsa / Kuota' },
  { emoji: '✂️', label: 'Jasa & Servis' },
  { emoji: '🏪', label: 'Perdagangan Kecil' },
];

const kegiatanSosial = [
  'Kerja bakti lingkungan',
  'Siskamling dan keamanan warga',
  'Kegiatan PKK',
  'Kegiatan Dawis',
  'Posyandu',
  'Pertemuan RT / RW',
  'Kegiatan keagamaan',
  'Kegiatan Karang Taruna',
  'Gotong royong pembangunan lingkungan',
];

const kegiatanCards = [
  {
    path: '/agustusan',
    title: 'Agustusan',
    tag: 'Tahunan',
    tagColor: 'bg-red-100 text-red-800',
    icon: Flag,
    iconBg: 'bg-red-50 text-red-700',
    desc: 'Rangkaian lomba dan peringatan HUT Kemerdekaan RI bersama seluruh warga dusun.',
    img: 'https://picsum.photos/seed/celebration/800/480',
    imgAlt: 'Warga berkumpul merayakan kemerdekaan Indonesia',
  },
  {
    path: '/kurban',
    title: 'Kurban',
    tag: 'Idul Adha',
    tagColor: 'bg-green-100 text-green-800',
    icon: Beef,
    iconBg: 'bg-green-50 text-green-700',
    desc: 'Pengelolaan data panitia, kelompok kurban, keuangan, dan pembagian daging secara transparan.',
    img: 'https://picsum.photos/seed/mosque/800/480',
    imgAlt: 'Masjid Istiqomah Klampisan, pusat kegiatan kurban',
  },
];

/* ─── Geometric SVG pattern ─────────────────────────────── */

const GeoPattern = ({ id }: { id: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 w-full h-full opacity-[0.06]"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="5" fill="none" stroke="white" strokeWidth="0.8" />
        <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
        <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

/* ─── Component ─────────────────────────────────────────── */

const Home = () => (
  <div>

    {/* ── 1. Hero ──────────────────────────────────────────── */}
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800"
    >
      <GeoPattern id="hero-geo" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Selogiri, Wonogiri, Jawa Tengah
          </div>
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Selamat Datang di<br />
            <span className="text-lime-300">Portal Informasi</span><br />
            Lingkungan Klampisan
          </h1>
          <p className="mt-5 text-emerald-100 text-base md:text-lg leading-relaxed max-w-2xl">
            Klampisan adalah lingkungan hunian yang dinamis, ramah, dan aktif di Kelurahan Kaliancar.
            Berada di jalur utama Wonogiri–Sukoharjo/Solo dengan kehidupan warga yang guyub dan
            kegiatan sosial yang menjadi kekuatan utama lingkungan.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/agustusan"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-5 py-3 rounded-xl hover:bg-emerald-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 text-sm shadow-md"
            >
              <Flag className="w-4 h-4" aria-hidden="true" /> Agustusan 2026
            </Link>
            <Link
              to="/kurban"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 text-sm"
            >
              <Beef className="w-4 h-4" aria-hidden="true" /> Data Kurban 2026
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── 2. Identitas Wilayah ─────────────────────────────── */}
    <section aria-labelledby="identitas-heading" className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <h2
          id="identitas-heading"
          className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-5"
        >
          Identitas Wilayah
        </h2>
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {identitas.map((item) => (
            <div
              key={item.label}
              className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-3"
            >
              <dt className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                {item.label}
              </dt>
              <dd className="text-sm font-bold text-gray-900">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* ── 3. Tentang & Sejarah ─────────────────────────────── */}
    <section
      aria-labelledby="tentang-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">

        {/* Tentang */}
        <div>
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3">Tentang Klampisan</p>
          <h2 id="tentang-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Lingkungan Semi-Perkotaan yang Guyub dan Aktif
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Klampisan merupakan lingkungan di Kelurahan Kaliancar, Kecamatan Selogiri, Kabupaten
            Wonogiri, Provinsi Jawa Tengah. Berada di jalur utama Wonogiri–Sukoharjo/Solo, kawasan
            ini memiliki akses yang mudah menuju pusat kabupaten maupun wilayah sekitarnya.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Dengan karakter semi-perkotaan, Klampisan tumbuh sebagai hunian yang dinamis dengan
            kehidupan warga yang guyub, fasilitas publik yang mendukung, potensi ekonomi lokal, serta
            kegiatan sosial kemasyarakatan yang kuat.
          </p>

          <div className="mt-6 flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <Navigation className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm text-emerald-800">
              <strong>Akses strategis:</strong> Dilalui jalur utama Wonogiri–Sukoharjo/Solo,
              menjadikan Klampisan sebagai salah satu titik lintasan penting di Kecamatan Selogiri.
            </p>
          </div>
        </div>

        {/* Sejarah Singkat */}
        <div>
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3">Sejarah Singkat</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Asal-Usul dan Catatan Historis
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span
                className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <Building2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Terminal Klampisan</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Klampisan dikenal sebagai kawasan lama di jalur masuk utara Wonogiri. Dahulu terdapat
                  Terminal Giri Adipura yang dikenal masyarakat sebagai <em>Terminal Klampisan</em>,
                  menjadikannya kawasan transit aktif. Setelah terminal dipindah ke Krisak, Klampisan
                  tetap berkembang sebagai kawasan hunian, perdagangan, dan jasa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span
                className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <TreePine className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Asal Nama Klampisan</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Secara kultural, nama Klampisan dikaitkan dengan riwayat lokal mengenai pohon
                  <em> Klampis</em> yang dahulu banyak tumbuh di kawasan ini. Cerita ini menjadi
                  bagian dari ingatan warga dan narasi sejarah lingkungan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── 4. Fasilitas Umum ────────────────────────────────── */}
    <section
      aria-labelledby="fasilitas-heading"
      className="bg-stone-50 border-y border-stone-100 py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-2">Infrastruktur</p>
          <h2 id="fasilitas-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Fasilitas Umum
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fasilitasData.map((f) => {
            const Icon = f.ikon;
            return (
              <article key={f.kategori} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={`p-2.5 rounded-xl ${f.bg} shrink-0`} aria-hidden="true">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">{f.kategori}</h3>
                </div>
                <ul className="space-y-2.5">
                  {f.items.map((item) => (
                    <li key={item.nama} className="flex items-start justify-between gap-2">
                      <span className="text-sm text-gray-700 leading-snug">{item.nama}</span>
                      <span className="shrink-0 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        {item.rt}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── 5. UMKM & Kegiatan Sosial ────────────────────────── */}
    <section
      aria-labelledby="umkm-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">

        {/* UMKM */}
        <div>
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3">Potensi Ekonomi</p>
          <h2 id="umkm-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            UMKM Lokal Klampisan
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Klampisan memiliki potensi ekonomi lokal yang cukup baik dengan berbagai kegiatan usaha
            di sepanjang kawasan utama dan permukiman warga.
          </p>

          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Kuliner Terkenal</h3>
          <ul className="space-y-2 mb-6">
            {umkm.map((u) => (
              <li key={u.nama} className="flex items-center gap-3 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
                <span className="text-xl" role="img" aria-label={u.kategori}>{u.emoji}</span>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{u.nama}</span>
                  <span className="block text-xs text-gray-500">{u.kategori}</span>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Jenis Usaha Lainnya</h3>
          <div className="grid grid-cols-2 gap-2">
            {jenisUsaha.map((j) => (
              <div key={j.label} className="flex items-center gap-2 text-sm text-gray-700 bg-stone-50 border border-stone-100 rounded-lg px-3 py-2">
                <span role="img" aria-label={j.label} className="text-base">{j.emoji}</span>
                {j.label}
              </div>
            ))}
          </div>
        </div>

        {/* Kegiatan Sosial */}
        <div>
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3">Kehidupan Warga</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Kegiatan Sosial Kemasyarakatan
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Kekuatan utama Klampisan adalah kehidupan warga yang guyub dan aktif dalam berbagai
            kegiatan sosial, keagamaan, dan gotong royong.
          </p>
          <ul className="space-y-2">
            {kegiatanSosial.map((k) => (
              <li key={k} className="flex items-center gap-3 text-sm text-gray-700">
                <span
                  className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Heart className="w-3 h-3" />
                </span>
                {k}
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <p className="text-sm text-emerald-800 leading-relaxed">
              <strong>Dokumentasi kegiatan</strong> warga penting untuk memperkuat identitas
              Klampisan sebagai lingkungan yang rukun, aktif, dan peduli kemajuan bersama.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── 6. Kegiatan Warga ────────────────────────────────── */}
    <section
      aria-labelledby="kegiatan-heading"
      className="bg-stone-50 border-y border-stone-100 py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" /> Agenda
            </p>
            <h2 id="kegiatan-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Kegiatan Warga
            </h2>
          </div>
          <p className="text-gray-600 text-sm max-w-xs hidden sm:block text-right">
            Dua kegiatan tahunan yang melibatkan seluruh warga Klampisan
          </p>
        </div>

        <ul className="grid md:grid-cols-2 gap-6 md:gap-8">
          {kegiatanCards.map((k) => {
            const Icon = k.icon;
            return (
              <li key={k.path}>
                <Link
                  to={k.path}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={k.img}
                      alt={k.imgAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="800"
                      height="480"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${k.tagColor}`}>
                      {k.tag}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className={`p-2 rounded-lg ${k.iconBg}`} aria-hidden="true">
                        <Icon className="w-4 h-4" />
                      </span>
                      <h3 className="text-xl font-extrabold text-gray-900">{k.title}</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed flex-1">{k.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 group-hover:gap-3 transition-all">
                      Selengkapnya <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>

    {/* ── 7. Arah Pengembangan ─────────────────────────────── */}
    <section
      aria-labelledby="pengembangan-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3">Ke Depan</p>
          <h2 id="pengembangan-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Arah Pengembangan Lingkungan
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ke depan, Klampisan dapat dikembangkan sebagai kawasan hunian yang tertata, aktif secara
            sosial, dan kuat secara ekonomi lokal. Website ini akan menjadi pusat informasi resmi
            yang memuat profil wilayah, kegiatan warga, layanan, serta direktori UMKM.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Dengan dukungan warga, pengurus RT/RW, tokoh masyarakat, dan pelaku UMKM, portal
            Klampisan akan semakin bermanfaat bagi warga maupun masyarakat luas.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-4">Struktur Portal yang Direncanakan</h3>
          <ul className="space-y-2">
            {[
              { ikon: '🏠', label: 'Beranda', desc: 'Profil, foto, highlight kegiatan' },
              { ikon: '🗺️', label: 'Profil Wilayah', desc: 'Sejarah, identitas, peta' },
              { ikon: '👥', label: 'Pemerintahan', desc: 'Pengurus RT/RW, PKK, Karang Taruna' },
              { ikon: '📋', label: 'Layanan Warga', desc: 'Surat pengantar, pengumuman, kontak' },
              { ikon: '🛒', label: 'UMKM Klampisan', desc: 'Kuliner, toko, jasa, usaha warga' },
              { ikon: '📷', label: 'Galeri Kegiatan', desc: 'Foto kerja bakti, posyandu, acara' },
              { ikon: '📰', label: 'Berita & Pengumuman', desc: 'Agenda rapat, himbauan warga' },
              { ikon: '📞', label: 'Kontak', desc: 'Alamat, WhatsApp admin, peta' },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 text-sm bg-stone-50 border border-stone-100 rounded-xl px-4 py-3"
              >
                <span role="img" aria-label={item.label} className="text-lg shrink-0">{item.ikon}</span>
                <span>
                  <strong className="text-gray-900">{item.label}</strong>
                  <span className="text-gray-600"> — {item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* ── 8. Berita Terbaru ────────────────────────────────── */}
    <section
      aria-labelledby="berita-heading"
      className="bg-stone-50 border-t border-stone-100 py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <p className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" aria-hidden="true" /> Informasi
          </p>
          <h2 id="berita-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Kabar Terbaru
          </h2>
        </div>

        <ul className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Persiapan Lomba Agustusan Dimulai',
              tanggal: '2026-07-12', label: '12 Juli 2026',
              kategori: 'Agustusan', kategoriBg: 'bg-red-100 text-red-700',
              img: 'https://picsum.photos/seed/sport1/600/380',
              imgAlt: 'Panitia menyiapkan perlengkapan lomba agustusan',
              excerpt: 'Panitia mulai merancang jadwal dan lomba untuk peringatan HUT RI ke-81.',
            },
            {
              title: 'Rapat Koordinasi Panitia Kurban 2026',
              tanggal: '2026-05-28', label: '28 Mei 2026',
              kategori: 'Kurban', kategoriBg: 'bg-green-100 text-green-700',
              img: 'https://picsum.photos/seed/meeting2/600/380',
              imgAlt: 'Panitia kurban sedang rapat koordinasi',
              excerpt: 'Seluruh koordinator RT hadir membahas teknis penyembelihan dan pembagian daging.',
            },
            {
              title: 'Kerja Bakti Bersih Lingkungan Dusun',
              tanggal: '2026-05-05', label: '5 Mei 2026',
              kategori: 'Sosial', kategoriBg: 'bg-blue-100 text-blue-700',
              img: 'https://picsum.photos/seed/gotong3/600/380',
              imgAlt: 'Warga bergotong royong membersihkan lingkungan',
              excerpt: 'Ratusan warga bersama membersihkan saluran air dan taman lingkungan.',
            },
          ].map((b) => (
            <li key={b.title}>
              <article className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <img
                  src={b.img}
                  alt={b.imgAlt}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                  width="600"
                  height="380"
                />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${b.kategoriBg}`}>
                      {b.kategori}
                    </span>
                    <time dateTime={b.tanggal} className="text-xs text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {b.label}
                    </time>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">{b.excerpt}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:underline underline-offset-4 w-fit"
                  >
                    Baca selengkapnya <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* ── 9. CTA ───────────────────────────────────────────── */}
    <section
      aria-labelledby="cta-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-green-800 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row md:items-center gap-8 shadow-xl shadow-emerald-900/20">
        <GeoPattern id="cta-geo" />
        <div className="relative z-10 flex-1">
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
            Punya informasi untuk warga Klampisan?
          </h2>
          <p className="text-emerald-100 text-base leading-relaxed">
            Hubungi pengurus untuk mengirimkan pengumuman, laporan kegiatan, atau informasi UMKM.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="mailto:info@klampisan.com"
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 text-sm shadow-md"
          >
            Hubungi Kami
          </a>
          <Link
            to="/kurban"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 text-sm"
          >
            Data Kurban <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

  </div>
);

export default Home;
