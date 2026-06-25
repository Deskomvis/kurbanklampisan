import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  Calendar,
  User,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  ThumbsUp,
  Share2,
  Heart,
  Flag,
  Beef,
} from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: 'Kegiatan' | 'Sosial' | 'Pembangunan' | 'Agenda';
  categoryColor: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  content?: string;
  likes: number;
  comments: number;
  link?: string;
}

const initialArticles: Article[] = [
  {
    id: 1,
    title: 'Persiapan Lomba Agustusan Dimulai oleh Karang Taruna',
    category: 'Kegiatan',
    categoryColor: 'bg-red-100 text-red-700 border-red-200',
    date: '12 Juli 2026',
    author: 'Karang Taruna Bhakti',
    image: 'https://picsum.photos/seed/sport1/600/380',
    summary: 'Panitia mulai merancang jadwal dan lomba untuk peringatan HUT RI ke-81 di lingkungan RW 10 Klampisan. Warga diharapkan berpartisipasi aktif.',
    likes: 24,
    comments: 8,
    link: '/agustusan',
  },
  {
    id: 2,
    title: 'Rapat Koordinasi Panitia Kurban 2026 Berjalan Lancar',
    category: 'Agenda',
    categoryColor: 'bg-green-100 text-green-700 border-green-200',
    date: '28 Mei 2026',
    author: 'Takmir Istiqomah',
    image: 'https://picsum.photos/seed/meeting2/600/380',
    summary: 'Seluruh koordinator RT hadir membahas teknis penyembelihan dan pembagian daging kurban agar teratur, higienis, dan transparan.',
    likes: 18,
    comments: 3,
    link: '/kurban',
  },
  {
    id: 3,
    title: 'Kerja Bakti Akbar Bersih Lingkungan Dusun Menjelang Kemarau',
    category: 'Sosial',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    date: '5 Mei 2026',
    author: 'Pengurus RW 10',
    image: 'https://picsum.photos/seed/gotong3/600/380',
    summary: 'Ratusan warga bergotong-royong membersihkan saluran air, memangkas dahan pohon yang rimbun, dan menata taman demi kenyamanan bersama.',
    likes: 32,
    comments: 5,
  },
  {
    id: 4,
    title: 'Pembangunan Lampu Penerangan Jalan Gang Baru RT 02 Selesai',
    category: 'Pembangunan',
    categoryColor: 'bg-amber-100 text-amber-700 border-amber-200',
    date: '20 April 2026',
    author: 'Ketua RT 02',
    image: 'https://picsum.photos/seed/lamp/600/380',
    summary: 'Dengan dana swadaya dan gotong royong, kini 5 titik strategis gang RT 02 telah dilengkapi lampu LED hemat energi untuk meningkatkan keamanan malam.',
    likes: 41,
    comments: 12,
  },
  {
    id: 5,
    title: 'Pemeriksaan Kesehatan Posyandu Balita & Lansia Rutin Bulanan',
    category: 'Sosial',
    categoryColor: 'bg-rose-100 text-rose-700 border-rose-200',
    date: '15 Maret 2026',
    author: 'Kader PKK Klampisan',
    image: 'https://picsum.photos/seed/health/600/380',
    summary: 'Posyandu kembali melayani tumbuh kembang anak, penimbangan, imunisasi dasar, serta tensi dan konsultasi kesehatan gratis bagi warga lanjut usia.',
    likes: 29,
    comments: 6,
  },
];

const KabarWarga = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const handleLike = (id: number) => {
    setArticles(
      articles.map((art) =>
        art.id === id ? { ...art, likes: art.likes + 1 } : art
      )
    );
  };

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'Semua' || art.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 text-white">
        {/* Geometric Background */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="kabar-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
              <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kabar-geo)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
              <Newspaper className="w-3.5 h-3.5 text-lime-300" aria-hidden="true" />
              Media Informasi Resmi Klampisan
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Kabar & Kegiatan Warga
            </h1>
            <p className="text-emerald-100 text-base md:text-lg max-w-2xl">
              Ikuti kabar terbaru mengenai pembangunan lingkungan, dokumentasi kegiatan sosial, pengumuman rapat, dan catatan sejarah gotong royong warga Dusun Klampisan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Articles List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search and Filters */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Cari kabar atau kegiatan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-800"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-500 flex items-center gap-1.5 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {['Semua', 'Kegiatan', 'Sosial', 'Pembangunan', 'Agenda'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      categoryFilter === cat
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid gap-6">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden grid md:grid-cols-12"
                  >
                    <div className="md:col-span-5 relative h-48 md:h-full min-h-[180px]">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="md:col-span-7 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${art.categoryColor}`}>
                            {art.category}
                          </span>
                          <span className="text-xs text-stone-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {art.date}
                          </span>
                        </div>
                        <h2 className="font-extrabold text-stone-900 text-lg md:text-xl leading-snug mb-2 hover:text-emerald-800 transition-colors">
                          {art.link ? (
                            <Link to={art.link}>{art.title}</Link>
                          ) : (
                            art.title
                          )}
                        </h2>
                        <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                          {art.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-600">
                            <User className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-semibold text-stone-700">{art.author}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleLike(art.id)}
                            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-700 transition-colors font-semibold py-1 px-2 rounded-lg hover:bg-stone-50"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                            <span>{art.likes}</span>
                          </button>
                          {art.link ? (
                            <Link
                              to={art.link}
                              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:gap-2 transition-all"
                            >
                              Selengkapnya <ArrowRight className="w-3 h-3" />
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-850 hover:text-emerald-950 transition-colors"
                            >
                              Baca <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center">
                <Newspaper className="w-12 h-12 text-stone-350 mx-auto mb-4" />
                <h3 className="font-bold text-stone-800 text-lg mb-1">Kabar tidak ditemukan</h3>
                <p className="text-sm text-stone-500">
                  Tidak ada kabar atau kegiatan dengan kata kunci dan kategori tersebut.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick stats / Highlights */}
            <div className="bg-gradient-to-br from-emerald-900 to-green-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-lime-300" /> Info Utama & Agenda
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 border-b border-white/10 pb-3">
                  <span className="text-lg py-1 px-2.5 rounded-lg bg-white/10 font-bold h-fit shrink-0">1</span>
                  <div>
                    <h4 className="text-xs font-bold text-lime-300">Agenda Terdekat</h4>
                    <p className="text-sm font-semibold text-white leading-snug mt-0.5">
                      Perayaan HUT RI Ke-81 RW 10
                    </p>
                    <Link to="/agustusan" className="text-[11px] text-emerald-200 font-bold hover:underline inline-flex items-center gap-1 mt-1">
                      Lihat Notulen Rapat & Panitia <ArrowRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-3">
                  <span className="text-lg py-1 px-2.5 rounded-lg bg-white/10 font-bold h-fit shrink-0">2</span>
                  <div>
                    <h4 className="text-xs font-bold text-lime-300">Laporan Selesai</h4>
                    <p className="text-sm font-semibold text-white leading-snug mt-0.5">
                      Dashboard Administrasi & Transparansi Kurban
                    </p>
                    <Link to="/kurban" className="text-[11px] text-emerald-200 font-bold hover:underline inline-flex items-center gap-1 mt-1">
                      Buka Data Kurban <ArrowRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit News Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-stone-900 text-base mb-3">
                Kirim Kabar/Cerita
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                Punya dokumentasi kegiatan atau kabar lingkungan yang ingin ditampilkan di portal ini? Kirimkan kepada kami.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Kabar Anda telah dikirim dan menunggu verifikasi pengurus RT/RW.'); }} className="space-y-3">
                <div>
                  <label htmlFor="news-title" className="block text-xs font-bold text-stone-600 uppercase mb-1">Judul Kabar</label>
                  <input
                    type="text"
                    id="news-title"
                    required
                    placeholder="Contoh: Kerja bakti RT 01..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 text-stone-850"
                  />
                </div>
                <div>
                  <label htmlFor="news-desc" className="block text-xs font-bold text-stone-600 uppercase mb-1">Keterangan Singkat</label>
                  <textarea
                    id="news-desc"
                    required
                    rows={3}
                    placeholder="Jelaskan isi kegiatan dan tanggal pelaksanaannya..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50 text-stone-850"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  Kirim ke Admin
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default KabarWarga;
