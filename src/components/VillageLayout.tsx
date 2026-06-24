import { useState, useEffect, useId } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { CalendarDays, ChevronDown, Menu, X, Flag, Beef, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DesaLogo from './DesaLogo';

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
    <div className="min-h-screen flex flex-col bg-white selection:bg-green-100 selection:text-green-900">
      {/* Skip to main content — WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-green-800 focus-visible:text-white focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-lg focus-visible:text-sm focus-visible:font-semibold focus-visible:shadow-lg focus-visible:outline-none"
      >
        Langsung ke konten utama
      </a>

      {/* Announcement bar */}
      <div className="bg-green-800 text-white py-2 px-4 text-xs font-medium text-center">
        Portal Resmi Dusun Klampisan &mdash; Warga bisa mengakses informasi kegiatan kapan saja dan di mana saja
      </div>

      {/* Header */}
      <header
        role="banner"
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 w-full border-b',
          scrolled ? 'bg-white/97 backdrop-blur-md shadow-sm border-gray-200' : 'bg-white border-gray-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={cn('flex items-center justify-between transition-all', scrolled ? 'py-2' : 'py-3')}>
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 p-1"
              aria-label="Dusun Klampisan — kembali ke beranda"
            >
              <DesaLogo className="w-9 h-9 md:w-11 md:h-11 text-green-700 group-hover:text-green-800 transition-colors shrink-0" />
              <div className="leading-tight">
                <span className="block text-sm md:text-base font-bold text-gray-900 group-hover:text-green-800 transition-colors">
                  Dusun Klampisan
                </span>
                <span className="block text-[10px] md:text-xs text-green-700 font-medium">
                  Portal Informasi Warga
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                aria-current={isHome ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2',
                  isHome
                    ? 'bg-green-50 text-green-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-expanded={undefined}
                    aria-haspopup="menu"
                    className={cn(
                      'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2',
                      isKegiatan
                        ? 'bg-green-50 text-green-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <CalendarDays className="w-4 h-4" aria-hidden="true" />
                    Kegiatan
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-1">
                  {kegiatanItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname.startsWith(item.path);
                    return (
                      <DropdownMenuItem key={item.path} asChild className="cursor-pointer rounded-lg focus:bg-green-50">
                        <Link
                          to={item.path}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-start gap-3 py-2.5 px-2"
                        >
                          <span
                            className="mt-0.5 p-1.5 rounded-md bg-green-50 text-green-700"
                            aria-hidden="true"
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                            <span className="text-xs text-gray-600">{item.desc}</span>
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Mobile menu toggle */}
            <button
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen
                ? <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
                : <Menu className="w-5 h-5 text-gray-700" aria-hidden="true" />}
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
              className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 p-1"
            >
              <DesaLogo className="w-9 h-9 text-green-700 shrink-0" />
              <span className="font-bold text-gray-900">Dusun Klampisan</span>
            </Link>
            <button
              aria-label="Tutup menu"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navigasi mobile">
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  to="/"
                  aria-current={isHome ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700',
                    isHome ? 'bg-green-50 text-green-800 ring-1 ring-green-100' : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <p className="px-4 pt-5 pb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Kegiatan
                </p>
                <ul className="flex flex-col gap-1">
                  {kegiatanItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname.startsWith(item.path);
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700',
                            active ? 'bg-green-50 text-green-800 ring-1 ring-green-100' : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          <Icon className="w-5 h-5 text-green-600" aria-hidden="true" />
                          {item.label}
                          <span className="ml-auto text-xs text-gray-500 font-normal">{item.desc}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
      <footer role="contentinfo" className="bg-gray-900 text-gray-300 mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <DesaLogo className="w-10 h-10 text-green-400 shrink-0" />
              <div>
                <span className="block font-bold text-white text-sm">Dusun Klampisan</span>
                <span className="block text-xs text-gray-400">Portal Informasi Warga</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal informasi dan kegiatan warga yang dikelola secara mandiri
              oleh pengurus dusun.
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
                    className="text-gray-400 hover:text-green-400 transition-colors focus-visible:outline-none focus-visible:text-green-400 underline-offset-2 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kontak</h2>
            <address className="not-italic space-y-3 text-sm text-gray-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                Klampisan, Jawa Timur, Indonesia
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" />
                <a href="tel:+6281234567890" className="hover:text-green-400 transition-colors focus-visible:outline-none focus-visible:text-green-400">
                  0812-3456-7890
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" />
                <a href="mailto:info@klampisan.com" className="hover:text-green-400 transition-colors focus-visible:outline-none focus-visible:text-green-400">
                  info@klampisan.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 py-5 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Dusun Klampisan. Dibuat dengan semangat gotong royong.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VillageLayout;
