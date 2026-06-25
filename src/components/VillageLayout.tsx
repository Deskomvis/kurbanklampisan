import { useState, useEffect, useId } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Menu, X, Flag, Beef, MapPin, Mail,
  Newspaper, Store, TrendingUp, Megaphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import klampisanLogo from '@/assets/Logo-klampisan-warna.png';
import klampisanLogoWhite from '@/assets/Logo-klampisan-putih.png';

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
    'flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all',
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
      <div className={cn('text-white py-2 px-4 text-xs font-medium text-center', announcementBg)}>
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
                'md:hidden p-2 rounded-lg transition-colors',
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
              className="p-2 rounded-lg hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
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
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold transition-colors',
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

      {/* Footer */}
      <footer role="contentinfo" className="bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <img src={klampisanLogoWhite} alt="Logo Klampisan" className="h-14 w-auto object-contain mb-4" />
            <p className="text-sm text-stone-400 leading-relaxed">
              Portal informasi dan kegiatan warga yang dikelola secara mandiri oleh pengurus dusun.
              Klampisan, Kelurahan Kaliancar, Kecamatan Selogiri, Kabupaten Wonogiri, Jawa Tengah.
            </p>
          </div>

          <nav aria-label="Footer navigasi">
            <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigasi</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-[280px]">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-stone-400 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400 underline-offset-2 hover:underline block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kontak</h2>
            <address className="not-italic space-y-3 text-sm text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
                Dusun Klampisan, Kelurahan Kaliancar, Kecamatan Selogiri, Kabupaten Wonogiri, Jawa Tengah
              </p>
              <p className="flex items-center gap-2.5">
                <WaIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/6285741813147?text=Halo%20Bp.%20Rezha%2C%20saya%20ingin%20tanya%20info%20Portal%20Desa%20Klampisan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400"
                >
                  Bp. Rezha Adi: +62 857-4181-3147
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
              <p className="flex items-start gap-2.5 pt-3 mt-1 border-t border-stone-700">
                <WaIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <a
                    href="https://wa.me/6282220737323?text=Halo%20Bp.%20Fatkurohman%2C%20saya%20ingin%20tanya%20info%20Portal%20Desa%20Klampisan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400 block"
                  >
                    Bp. Fatkurohman: +62 822-2073-7323
                  </a>
                  <span className="text-xs text-stone-500">Kepala Digitalisasi Dusun Klampisan</span>
                </span>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-stone-800 py-5 text-center">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Dusun Klampisan. Gemah ripah loh jinawi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VillageLayout;
