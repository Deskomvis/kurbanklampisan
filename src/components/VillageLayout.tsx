import { useState, useEffect, useId } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Menu, X, Flag, Beef, MapPin, Mail,
  Newspaper, Store, TrendingUp, Megaphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import klampisanLogo from '@/assets/Logo-klampisan-warna.png';
import klampisanLogoWhite from '@/assets/Logo-klampisan-putih.png';
import chatWidgetImg from '@/assets/chat-widget.webp';

const navigationItems = [
  { path: '/', label: 'Home', icon: null },
  { path: '/kabar-warga', label: 'Kabar Warga', icon: Newspaper },
  { path: '/usaha-warga', label: 'Usaha Warga', icon: Store },
  { path: '/rencana-warga', label: 'Rencana Warga', icon: TrendingUp },
  { path: '/pengumuman', label: 'Pengumuman', icon: Megaphone },
  { path: '/agustusan', label: 'Agustusan', icon: Flag },
  { path: '/kurban', label: 'Kurban', icon: Beef },
];

const WaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nama: '', hp: '', kategori: 'Pengaduan', pesan: '' });

  const buildWaUrl = () => {
    const lines = [
      `Halo Bp. Rezha, saya *${form.nama || 'pengunjung'}* dari Portal Klampisan.`,
      '',
      `*Kategori:* ${form.kategori}`,
      '',
      `*Pesan:*`,
      form.pesan || '(tidak ada pesan)',
    ];
    if (form.hp) lines.push('', `*No. HP:* ${form.hp}`);
    return `https://wa.me/6285741813147?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Tutup chat' : 'Kirim pesan / pengaduan'}
        className={cn(
          'fixed bottom-4 right-4 z-[80] transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500',
          open ? 'scale-90 opacity-80' : 'hover:scale-105 animate-float',
        )}
      >
        {open ? (
          <div className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center shadow-lg">
            <X className="w-5 h-5 text-white" />
          </div>
        ) : (
          <img
            src={chatWidgetImg}
            alt="Klik WhatsApp Disini"
            className="w-28 h-auto drop-shadow-xl"
            draggable={false}
          />
        )}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Kirim Pesan / Pengaduan"
        className={cn(
          'fixed bottom-36 right-4 z-[80] w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 origin-bottom-right',
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none',
        )}
      >
        {/* Header */}
        <div className="bg-emerald-800 rounded-t-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <WaIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">Kirim Pesan / Pengaduan</p>
            <p className="text-emerald-300 text-sm">Portal Dusun Klampisan</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-5 space-y-3">
          <div>
            <label htmlFor="chat-nama" className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
            <input
              id="chat-nama"
              type="text"
              placeholder="Nama Anda"
              value={form.nama}
              onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="chat-kategori" className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
            <select
              id="chat-kategori"
              value={form.kategori}
              onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
            >
              {['Pengaduan', 'Kirim Info', 'Tanya-tanya', 'UMKM & Usaha', 'Lainnya'].map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="chat-pesan" className="block text-sm font-semibold text-gray-700 mb-1">Pesan / Keterangan</label>
            <textarea
              id="chat-pesan"
              rows={3}
              placeholder="Tulis pesan Anda di sini..."
              value={form.pesan}
              onChange={(e) => setForm((f) => ({ ...f, pesan: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder:text-gray-400 resize-none"
            />
          </div>

          <div>
            <label htmlFor="chat-hp" className="block text-sm font-semibold text-gray-700 mb-1">No. HP <span className="text-gray-500 font-normal">(opsional)</span></label>
            <input
              id="chat-hp"
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={form.hp}
              onChange={(e) => setForm((f) => ({ ...f, hp: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          <a
            href={buildWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1eb554] text-white font-bold py-3.5 rounded-xl transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 mt-1 min-h-[44px]"
          >
            <WaIcon className="w-4 h-4" />
            Kirim via WhatsApp
          </a>
          <p className="text-center text-xs text-gray-500">Pesan akan dikirim langsung ke admin Klampisan</p>
        </div>
      </div>
    </>
  );
};

const VillageLayout = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Kartu daging = fullscreen print, skip semua chrome
  if (location.pathname === '/kurban/cetak/kartu-daging') {
    return <Outlet />;
  }

  // ── Theme detection ──────────────────────────────────────
  const isAgustusan = location.pathname.startsWith('/agustusan');
  // Halaman yang punya hero gelap (header transparan di atas hero)
// Header "gelap" = ketika di atas hero atau setelah scroll
// Announcement bar
  const announcementBg = isAgustusan
    ? 'bg-gradient-to-r from-red-950 via-red-900 to-rose-900'
    : 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800';

  // Header background: putih normal, hitam transparan 50% saat scroll
  const headerBg = scrolled
    ? 'bg-black/50 backdrop-blur-md shadow-md border-white/10'
    : 'bg-white/50 backdrop-blur-sm border-gray-200/60';

  const getLinkCls = (isActive: boolean) => cn(
    'flex items-center gap-1 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all min-h-[44px]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-emerald-400',
    isActive
      ? scrolled
        ? 'bg-white/15 text-white ring-1 ring-white/25'
        : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
      : scrolled
        ? 'text-white/90 hover:text-white hover:bg-white/10'
        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* WCAG 2.4.1 skip link */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-green-800 focus-visible:text-white focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-lg focus-visible:text-sm focus-visible:font-semibold focus-visible:shadow-lg focus-visible:outline-none"
      >
        Langsung ke konten utama
      </a>

      {/* Announcement bar */}
      <div className={cn('text-white py-2 px-4 text-sm font-medium text-center', announcementBg)}>
        🌳 Portal Resmi Dusun Klampisan &mdash; Gemah Ripah Loh Jinawi
      </div>

      {/* Header */}
      <header
        role="banner"
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 w-full border-b',
          headerBg,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={cn('flex items-center justify-between', scrolled ? 'py-2' : 'py-3')}>

            {/* Brand */}
            <Link
              to="/"
              className={cn(
                'flex items-center group rounded-lg p-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400',
              )}
              aria-label="Dusun Klampisan — kembali ke beranda"
            >
              <img
                src={scrolled ? klampisanLogoWhite : klampisanLogo}
                alt="Logo Klampisan"
                className={cn(
                  'w-auto object-contain transition-all group-hover:opacity-90',
                  scrolled ? 'h-10 md:h-11' : 'h-12 md:h-14',
                )}
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-0.5 xl:gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={getLinkCls(isActive)}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile toggle */}
            <button
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className={cn(
                'md:hidden p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400',
                scrolled ? 'hover:bg-white/15' : 'hover:bg-gray-100',
              )}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen
                ? <X className={cn('w-5 h-5', scrolled ? 'text-white' : 'text-gray-700')} aria-hidden="true" />
                : <Menu className={cn('w-5 h-5', scrolled ? 'text-white' : 'text-gray-700')} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id={mobileMenuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={cn(
          'fixed inset-0 z-[60] bg-white transition-all duration-300 md:hidden overflow-y-auto',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col min-h-full">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 p-1"
            >
              <img src={klampisanLogo} alt="Logo Klampisan" className="h-12 w-auto object-contain" />
            </Link>
            <button
              aria-label="Tutup menu"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-lg hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navigasi mobile">
            <ul className="flex flex-col gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors min-h-[44px]',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700',
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100/50'
                          : 'text-stone-700 hover:bg-stone-50',
                      )}
                    >
                      {Icon
                        ? <Icon className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                        : <span className="w-5 h-5 flex items-center justify-center text-xs text-emerald-600 font-bold" aria-hidden="true">H</span>}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Floating chat widget */}
      <ChatWidget />

      {/* Footer */}
      <footer role="contentinfo" className="bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <img src={klampisanLogoWhite} alt="Logo Klampisan" className="h-14 w-auto object-contain mb-4" />
            <p className="text-base text-stone-400 leading-relaxed">
              Portal informasi dan kegiatan warga yang dikelola secara mandiri oleh pengurus dusun.
              Klampisan, Kelurahan Kaliancar, Kecamatan Selogiri, Kabupaten Wonogiri, Jawa Tengah.
            </p>
          </div>

          <nav aria-label="Footer navigasi">
            <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigasi</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-base max-w-[280px]">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-stone-400 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400 underline-offset-2 hover:underline block py-1.5 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kontak</h2>
            <address className="not-italic space-y-3 text-base text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
                Dusun Klampisan, Kelurahan Kaliancar, Kecamatan Selogiri, Kabupaten Wonogiri, Jawa Tengah
              </p>
              <p className="flex items-center gap-2.5">
                <WaIcon className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/6285741813147?text=Halo%20Bp.%20Rezha%2C%20saya%20ingin%20tanya%20info%20Portal%20Desa%20Klampisan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400"
                >
                  <span>
                    Bp. Rezha Adi: +62 857-4181-3147
                  </span>
                  <span className="text-xs text-stone-500 block">Kepala Digitalisasi Dusun Klampisan</span>
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@klampisan.com"
                  className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400"
                >
                  info@klampisan.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-stone-800 py-5 text-center">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Dusun Klampisan. Gemah ripah loh jinawi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VillageLayout;
