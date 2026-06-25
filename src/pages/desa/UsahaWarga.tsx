import { useState } from 'react';
import {
  Store,
  Search,
  Filter,
  Phone,
  MapPin,
  Clock,
  Plus,
  MessageCircle,
  Tag,
  Star,
} from 'lucide-react';

interface Business {
  id: number;
  name: string;
  category: 'Kuliner' | 'Toko Kelontong' | 'Bengkel' | 'Jasa & Servis' | 'Perdagangan';
  rt: 'RT 01' | 'RT 02';
  whatsapp: string;
  hours: string;
  rating: number;
  image: string;
  description: string;
  featuredProduct?: string;
  icon: string;
}

const initialBusinesses: Business[] = [
  {
    id: 1,
    name: 'Mie Won Yamin Klampisan',
    category: 'Kuliner',
    rt: 'RT 01',
    whatsapp: '6285741813147',
    hours: '11:00 - 21:00 WIB',
    rating: 4.8,
    image: 'https://picsum.photos/seed/noodle/600/380',
    description: 'Menyajikan Mie Yamin Wonogiri khas dengan bumbu racikan tradisional yang gurih manis dan bakso buatan sendiri yang kenyal lezat.',
    featuredProduct: 'Mie Yamin Komplet Bakso Pangsit',
    icon: '🍜',
  },
  {
    id: 2,
    name: 'Kebab Araya',
    category: 'Kuliner',
    rt: 'RT 01',
    whatsapp: '6281234567890',
    hours: '16:00 - 22:00 WIB',
    rating: 4.7,
    image: 'https://picsum.photos/seed/kebab/600/380',
    description: 'Kebab khas Arab dengan daging sapi pilihan melimpah yang dipanggang sempurna, dipadu saus rahasia dan sayuran segar.',
    featuredProduct: 'Kebab Beef Cheese Large',
    icon: '🌯',
  },
  {
    id: 3,
    name: 'Bakmi Kita Klampisan',
    category: 'Kuliner',
    rt: 'RT 02',
    whatsapp: '6289876543210',
    hours: '17:00 - 23:00 WIB',
    rating: 4.6,
    image: 'https://picsum.photos/seed/pasta/600/380',
    description: 'Bakmi Jawa goreng dan godhog dengan cita rasa otentik bumbu kemiri, dimasak menggunakan anglo arang tradisional.',
    featuredProduct: 'Bakmi Jawa Goreng Spesial Telur Bebek',
    icon: '🍝',
  },
  {
    id: 4,
    name: 'Toko Kelontong & Sembako Bu Parman',
    category: 'Toko Kelontong',
    rt: 'RT 02',
    whatsapp: '628111222333',
    hours: '06:00 - 21:00 WIB',
    rating: 4.9,
    image: 'https://picsum.photos/seed/grocery/600/380',
    description: 'Menyediakan kebutuhan pokok warga mulai dari beras, gula, minyak goreng, tabung gas LPG, galon air mineral hingga kebutuhan harian lainnya dengan harga terjangkau.',
    icon: '🛒',
  },
  {
    id: 5,
    name: 'Bengkel Motor Klampisan Jaya',
    category: 'Bengkel',
    rt: 'RT 01',
    whatsapp: '628444555666',
    hours: '08:00 - 17:00 WIB',
    rating: 4.5,
    image: 'https://picsum.photos/seed/motorcycle/600/380',
    description: 'Jasa servis motor berkala, ganti oli, tune up, tambal ban, serta penjualan suku cadang berkualitas untuk segala jenis merk motor.',
    featuredProduct: 'Servis Ringan + Tune Up Karburator/Injeksi',
    icon: '🔧',
  },
  {
    id: 6,
    name: 'Konter Pulsa & Kuota Klampisan Cell',
    category: 'Jasa & Servis',
    rt: 'RT 02',
    whatsapp: '628777888999',
    hours: '08:00 - 22:00 WIB',
    rating: 4.7,
    image: 'https://picsum.photos/seed/phone/600/380',
    description: 'Pusat penjualan pulsa elektrik semua operator, paket data internet terlengkap, token listrik PLN, top-up e-wallet dan pembayaran tagihan bulanan.',
    featuredProduct: 'Paket Data Internet Unlimited',
    icon: '📱',
  },
];

const UsahaWarga = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [rtFilter, setRtFilter] = useState('Semua');

  const filteredBusinesses = initialBusinesses.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()) ||
      (b.featuredProduct && b.featuredProduct.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === 'Semua' || b.category === categoryFilter;
    const matchesRt = rtFilter === 'Semua' || b.rt === rtFilter;
    return matchesSearch && matchesCategory && matchesRt;
  });

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
            <pattern id="usaha-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
              <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#usaha-geo)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
              <Store className="w-3.5 h-3.5 text-lime-300" aria-hidden="true" />
              Pusat Ekonomi Kreatif Klampisan
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Direktori Usaha & UMKM Warga
            </h1>
            <p className="text-emerald-100 text-base md:text-lg max-w-2xl">
              Dukung perekonomian lokal dengan membeli produk dan menggunakan jasa dari tetangga sendiri. Temukan kuliner lezat, toko kebutuhan harian, dan jasa terpercaya di Klampisan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Search, Category Filters, and RT Filters */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 md:p-6 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" aria-hidden="true" />
            <label htmlFor="usaha-search" className="sr-only">Cari usaha, produk unggulan, atau jasa</label>
            <input
              id="usaha-search"
              type="text"
              placeholder="Cari usaha, produk unggulan, atau jasa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-800"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-bold text-stone-600 flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5" aria-hidden="true" /> Kategori:
              </span>
              {['Semua', 'Kuliner', 'Toko Kelontong', 'Bengkel', 'Jasa & Servis'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  aria-pressed={categoryFilter === cat}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all min-h-[44px] ${
                    categoryFilter === cat
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* RT Filter */}
            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
              <span className="text-sm font-bold text-stone-600 flex items-center gap-1 mr-1">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> Wilayah:
              </span>
              {['Semua', 'RT 01', 'RT 02'].map((rt) => (
                <button
                  key={rt}
                  onClick={() => setRtFilter(rt)}
                  aria-pressed={rtFilter === rt}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all min-h-[44px] ${
                    rtFilter === rt
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {rt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 text-xl bg-white/90 backdrop-blur-sm w-9 h-9 rounded-xl flex items-center justify-center shadow-sm">
                    {b.icon}
                  </span>
                  <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm">
                    {b.rt}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-200 text-stone-600 bg-stone-50 uppercase">
                        {b.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {b.rating}
                      </div>
                    </div>

                    <h2 className="font-extrabold text-stone-900 text-lg leading-snug mb-2 hover:text-emerald-800 transition-colors">
                      {b.name}
                    </h2>

                    <p className="text-base text-stone-600 leading-relaxed mb-4">
                      {b.description}
                    </p>

                    {b.featuredProduct && (
                      <div className="bg-stone-50 border border-stone-100 rounded-xl p-3 mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Menu/Produk Unggulan:</h4>
                        <p className="text-sm font-semibold text-stone-800 mt-0.5">{b.featuredProduct}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                      <span>{b.hours}</span>
                    </div>

                    <a
                      href={`https://wa.me/${b.whatsapp}?text=Halo%20${encodeURIComponent(b.name)}%2C%20saya%20tertarik%20dengan%20produk%2Fjasa%20Anda...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Hubungi ${b.name} via WhatsApp`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-800 text-white text-base font-bold rounded-xl hover:bg-emerald-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" aria-hidden="true" /> Hubungi via WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center">
            <Store className="w-12 h-12 text-stone-350 mx-auto mb-4" />
            <h3 className="font-bold text-stone-800 text-lg mb-1">Usaha tidak ditemukan</h3>
            <p className="text-base text-stone-500">
              Tidak ada pelaku UMKM dengan kriteria pencarian dan kategori tersebut.
            </p>
          </div>
        )}

        {/* Register Business CTA Banner */}
        <div className="mt-12 bg-gradient-to-br from-emerald-900 to-green-800 text-white rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl md:text-2xl font-extrabold mb-2">
              Punya Usaha di Lingkungan Klampisan?
            </h3>
            <p className="text-base text-emerald-100 leading-relaxed">
              Daftarkan usaha kuliner, toko kelontong, jasa, bengkel, atau perdagangan Anda secara gratis di portal web resmi warga ini agar lebih dikenal dan mudah dihubungi oleh tetangga sekitar.
            </p>
          </div>
          <button
            onClick={() => alert('Formulir pendaftaran usaha dikirim ke Admin RT/RW. Siapkan data berupa Foto Usaha, Alamat RT, WhatsApp, dan Keterangan Ringkas.')}
            className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold px-6 py-3.5 rounded-xl transition-colors shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-emerald-900 min-h-[44px]"
          >
            <Plus className="w-4 h-4" /> Daftarkan Usaha Sekarang
          </button>
        </div>

      </section>
    </div>
  );
};

export default UsahaWarga;
