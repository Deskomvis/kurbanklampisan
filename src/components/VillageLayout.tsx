import { useState, useEffect, useId } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, Flag, Beef, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import klampisanLogo from '@/assets/Logo-klampisan-warna.png';
import klampisanLogoWhite from '@/assets/Logo-klampisan-putih.png';

const kegiatanItems = [
  { path: '/agustusan', label: 'Agustusan', icon: Flag, desc: 'Peringatan HUT Kemerdekaan RI' },
  { path: '/kurban', label: 'Kurban', icon: Beef, desc: 'Panitia Kurban Masjid Istiqomah' },
];

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isKegiatan = kegiatanItems.some((i) => location.pathname.startsWith(i.path));

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Skip to main content — WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-green-800 focus-visible:text-white focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-lg focus-visible:text-sm focus-visible:font-semibold focus-visible:shadow-lg focus-visible:outline-none"
      >
        Langsung ke konten utama
      </a>

      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 text-white py-2 px-4 text-xs font-medium text-center">
        🌳 Portal Resmi Dusun Klampisan &mdash; Gemah Ripah Loh Jinawi
      </div>

      {/* Header */}
      <header
        role="banner"
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 w-full border-b',
          scrolled ? 'bg-white/97 backdrop-blur-md shadow-sm border-stone-200' : 'bg-white border-stone-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={cn('flex items-center justify-between transition-all', scrolled ? 'py-2' : 'py-3')}>
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 p-1"
              aria-label="Dusun Klampisan — kembali ke beranda"
            >
              <img
                src={klampisanLogo}
                alt="Logo Klampisan"
                className={cn('w-auto object-contain transition-all group-hover:opacity-90', scrolled ? 'h-10 md:h-12' : 'h-12 md:h-14')}
              />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                aria-current={isHome ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2',
                  isHome
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                )}
              >
                Home
              </Link>

              <Link
                to="/agustusan"
                aria-current={location.pathname.startsWith('/agustusan') ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2',
                  location.pathname.startsWith('/agustusan')
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                )}
              >
                <Flag className="w-4 h-4" aria-hidden="true" />
                Agustusan
              </Link>

              <Link
                to="/kurban"
                aria-current={location.pathname.startsWith('/kurban') ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2',
                  location.pathname.startsWith('/kurban')
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                )}
              >
                <Beef className="w-4 h-4" aria-hidden="true" />
                Kurban
              </Link>
            </nav>

            {/* Mobile menu toggle */}
            <button
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen
                ? <X className="w-5 h-5 text-stone-700" aria-hidden="true" />
                : <Menu className="w-5 h-5 text-stone-700" aria-hidden="true" />}
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
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col min-h-full">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 p-1"
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
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  to="/"
                  aria-current={isHome ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700',
                    isHome ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100' : 'text-stone-700 hover:bg-stone-50'
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/agustusan"
                  aria-current={location.pathname.startsWith('/agustusan') ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700',
                    location.pathname.startsWith('/agustusan') ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100' : 'text-stone-700 hover:bg-stone-50'
                  )}
                >
                  <Flag className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  Agustusan
                </Link>
              </li>
              <li>
                <Link
                  to="/kurban"
                  aria-current={location.pathname.startsWith('/kurban') ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700',
                    location.pathname.startsWith('/kurban') ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100' : 'text-stone-700 hover:bg-stone-50'
                  )}
                >
                  <Beef className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  Kurban
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="bg-stone-900 text-stone-300 mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={klampisanLogoWhite} alt="Logo Klampisan" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Portal informasi dan kegiatan warga yang dikelola secara mandiri
              oleh pengurus dusun. Klampisan adalah lingkungan dusun yang dinamis, ramah, dan aktif di Kelurahan Kaliancar, Kecamatan Selogiri, Kabupaten Wonogiri, Jawa Tengah.
            </p>
          </div>

          <nav aria-label="Footer navigasi">
            <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigasi</h2>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Beranda' },
                { to: '/agustusan', label: 'Agustusan' },
                { to: '/kurban', label: 'Kurban' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-stone-400 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400 underline-offset-2 hover:underline"
                  >
                    {l.label}
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
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <a href="https://wa.me/6285741813147?text=Halo%20Mas%20Rezha%20Klampisan%2C%20%20.." target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400">
                  Admin Web : +6285741813147
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <a href="mailto:info@klampisan.com" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:text-emerald-400">
                  info@klampisan.com
                </a>
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
