import { Link } from 'react-router-dom';
import {
  Flag,
  Beef,
  ArrowRight,
  Users,
  Home as HomeIcon,
  Landmark,
  Leaf,
  ChevronRight,
  Calendar,
  MapPin,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */

const stats = [
  { label: 'Jumlah Warga', value: '1.240', icon: Users },
  { label: 'Kepala Keluarga', value: '382', icon: HomeIcon },
  { label: 'RT / RW', value: '8 / 3', icon: Landmark },
  { label: 'Luas Wilayah', value: '46 Ha', icon: Leaf },
];

const kegiatan = [
  {
    path: '/agustusan',
    title: 'Agustusan',
    tag: 'Tahunan',
    tagColor: 'bg-red-100 text-red-800',
    icon: Flag,
    iconBg: 'bg-red-50 text-red-700',
    accent: 'from-red-700 to-rose-600',
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
    accent: 'from-green-700 to-emerald-600',
    desc: 'Pengelolaan data panitia, kelompok kurban, keuangan, dan pembagian daging secara transparan.',
    img: 'https://picsum.photos/seed/mosque/800/480',
    imgAlt: 'Masjid Istiqomah Klampisan, pusat kegiatan kurban',
  },
];

const berita = [
  {
    title: 'Persiapan Lomba Agustusan Dimulai',
    tanggal: '12 Juli 2026',
    kategori: 'Agustusan',
    kategoriBg: 'bg-red-100 text-red-700',
    img: 'https://picsum.photos/seed/sport1/600/380',
    imgAlt: 'Anak-anak berlatih untuk lomba agustusan',
    excerpt: 'Panitia mulai merancang jadwal dan lomba untuk peringatan kemerdekaan ke-81.',
  },
  {
    title: 'Rapat Koordinasi Panitia Kurban 2026',
    tanggal: '28 Mei 2026',
    kategori: 'Kurban',
    kategoriBg: 'bg-green-100 text-green-700',
    img: 'https://picsum.photos/seed/meeting2/600/380',
    imgAlt: 'Panitia kurban sedang rapat koordinasi',
    excerpt: 'Seluruh koordinator RT hadir membahas teknis penyembelihan dan pembagian daging.',
  },
  {
    title: 'Kerja Bakti Bersih Lingkungan Dusun',
    tanggal: '5 Mei 2026',
    kategori: 'Sosial',
    kategoriBg: 'bg-blue-100 text-blue-700',
    img: 'https://picsum.photos/seed/gotong3/600/380',
    imgAlt: 'Warga bergotong royong membersihkan lingkungan dusun',
    excerpt: 'Ratusan warga bersama membersihkan saluran air dan taman lingkungan.',
  },
];

const program = [
  { icon: '🏫', title: 'Pendidikan', desc: 'Beasiswa anak berprestasi dari warga kurang mampu' },
  { icon: '🌿', title: 'Lingkungan', desc: 'Program penghijauan dan kebersihan lingkungan' },
  { icon: '🤝', title: 'Sosial', desc: 'Santunan lansia dan warga membutuhkan' },
  { icon: '📡', title: 'Digitalisasi', desc: 'Informasi kegiatan dusun secara online' },
];

/* ─── Hero geometric SVG pattern ──────────────────────── */

const GeometricPattern = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 w-full h-full opacity-[0.07]"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="5" fill="none" stroke="white" strokeWidth="0.8" />
        <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
        <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
        <line x1="15.1" y1="15.1" x2="64.9" y2="64.9" stroke="white" strokeWidth="0.3" />
        <line x1="64.9" y1="15.1" x2="15.1" y2="64.9" stroke="white" strokeWidth="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geo)" />
  </svg>
);

/* ─── Component ─────────────────────────────────────────── */

const Home = () => (
  <div>
    {/* ── Hero ─────────────────────────────────────── */}
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-800"
    >
      <GeometricPattern />

      {/* Radial glow accent */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-600/20 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-28 md:pt-28 md:pb-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Klampisan, Jawa Timur
          </div>

          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Selamat Datang di<br />
            <span className="text-emerald-300">Dusun Klampisan</span>
          </h1>

          <p className="mt-5 text-green-100 text-base md:text-xl leading-relaxed max-w-2xl">
            Portal informasi resmi warga Dusun Klampisan. Satu tempat untuk semua
            kegiatan, pengumuman, dan informasi lingkungan.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/kurban"
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-800 text-sm shadow-lg shadow-black/20"
            >
              <Beef className="w-4 h-4" aria-hidden="true" />
              Data Kurban 2026
            </Link>
            <Link
              to="/agustusan"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-800 text-sm"
            >
              <Flag className="w-4 h-4" aria-hidden="true" />
              Agustusan 2026
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── Stats ────────────────────────────────────── */}
    <section aria-label="Statistik dusun" className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-10">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-black/5 p-5 md:p-6"
            >
              <dt className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                {s.label}
              </dt>
              <dd className="text-2xl md:text-3xl font-extrabold text-gray-900">{s.value}</dd>
            </div>
          );
        })}
      </dl>
    </section>

    {/* ── About ────────────────────────────────────── */}
    <section aria-labelledby="about-heading" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-3">Tentang Klampisan</p>
          <h2
            id="about-heading"
            className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5"
          >
            Lingkungan Guyub,<br />Penuh Gotong Royong
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
            Dusun Klampisan adalah lingkungan pemukiman yang menjunjung tinggi nilai
            kebersamaan. Warga aktif terlibat dalam berbagai kegiatan sosial, keagamaan,
            dan kemasyarakatan.
          </p>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            Melalui portal ini, setiap pengumuman, kegiatan, dan laporan keuangan dapat
            diakses oleh seluruh warga secara terbuka dan transparan.
          </p>
          <Link
            to="/agustusan"
            className="inline-flex items-center gap-1.5 mt-7 text-green-700 font-bold text-sm hover:text-green-800 hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:underline underline-offset-4"
          >
            Lihat kegiatan <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative">
          {/* Decorative frame */}
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-green-100 border border-green-200 -z-10"
          />
          <img
            src="https://picsum.photos/seed/indonesiavillage/800/560"
            alt="Pemandangan lingkungan Dusun Klampisan yang asri dengan rumah-rumah warga"
            className="w-full rounded-2xl object-cover shadow-lg aspect-[4/3]"
            loading="lazy"
            width="800"
            height="560"
          />
        </div>
      </div>
    </section>

    {/* ── Program ──────────────────────────────────── */}
    <section
      aria-labelledby="program-heading"
      className="bg-gradient-to-br from-green-900 to-emerald-800 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider mb-3">Program Dusun</p>
          <h2
            id="program-heading"
            className="text-2xl md:text-4xl font-extrabold text-white"
          >
            Bersama Membangun Dusun
          </h2>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {program.map((p) => (
            <li
              key={p.title}
              className="bg-white/10 border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors"
            >
              <span className="text-4xl mb-4 block" role="img" aria-label={p.title}>
                {p.icon}
              </span>
              <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
              <p className="text-green-200 text-sm leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* ── Kegiatan ─────────────────────────────────── */}
    <section
      aria-labelledby="kegiatan-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            Agenda
          </p>
          <h2
            id="kegiatan-heading"
            className="text-2xl md:text-4xl font-extrabold text-gray-900"
          >
            Kegiatan Warga
          </h2>
        </div>
        <p className="text-gray-600 text-sm max-w-sm text-right hidden sm:block">
          Dua kegiatan tahunan yang melibatkan seluruh warga Dusun Klampisan
        </p>
      </div>

      <ul className="grid md:grid-cols-2 gap-6 md:gap-8">
        {kegiatan.map((k) => {
          const Icon = k.icon;
          return (
            <li key={k.path}>
              <Link
                to={k.path}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                {/* Image */}
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

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`p-2 rounded-lg ${k.iconBg}`} aria-hidden="true">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900">{k.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1">{k.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-green-700 group-hover:gap-3 transition-all">
                    Selengkapnya <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>

    {/* ── Berita ───────────────────────────────────── */}
    <section
      aria-labelledby="berita-heading"
      className="bg-gray-50 border-t border-gray-100 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-2">Informasi</p>
          <h2
            id="berita-heading"
            className="text-2xl md:text-4xl font-extrabold text-gray-900"
          >
            Kabar Terbaru
          </h2>
        </div>

        <ul className="grid md:grid-cols-3 gap-6">
          {berita.map((b) => (
            <li key={b.title}>
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
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
                    <time
                      dateTime={b.tanggal}
                      className="text-xs text-gray-600 flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {b.tanggal}
                    </time>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug mb-2 text-base">{b.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">{b.excerpt}</p>
                  <button
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:gap-2 transition-all focus-visible:outline-none focus-visible:underline underline-offset-4 w-fit"
                    type="button"
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

    {/* ── CTA ──────────────────────────────────────── */}
    <section
      aria-labelledby="cta-heading"
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
    >
      <div className="bg-gradient-to-br from-green-800 to-emerald-700 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row md:items-center gap-8 shadow-xl shadow-green-900/20 relative overflow-hidden">
        <GeometricPattern />
        <div className="relative z-10 flex-1">
          <h2
            id="cta-heading"
            className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3"
          >
            Ada informasi yang ingin disampaikan?
          </h2>
          <p className="text-green-100 text-base leading-relaxed">
            Hubungi pengurus dusun untuk pengumuman, laporan, atau informasi kegiatan.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="mailto:info@klampisan.com"
            className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-800 text-sm shadow-md"
          >
            Hubungi Kami
          </a>
          <Link
            to="/kurban"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-800 text-sm"
          >
            Lihat Data Kurban
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
