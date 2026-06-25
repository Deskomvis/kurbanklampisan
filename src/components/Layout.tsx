import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Home,
  Users,
  DollarSign,
  UserCheck,
  Share2,
  FileText,
  Menu,
  X,
  Database,
  Calendar,
  ChevronRight,
  ShieldCheck,
  LogOut,
  KeyRound,
  Calculator,
  Printer,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { YearSelector } from '@/components/year/YearSelector';
import { useYear } from '@/contexts/YearContext';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/auth/LoginDialog';

const Layout = () => {
  const location = useLocation();
  const { currentYear } = useYear();
  const { isAuthenticated, logout } = useAuth();
  const hijriahYear = parseInt(currentYear) - 579;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  if (location.pathname === '/kurban/cetak/kartu-daging') {
    return <Outlet />;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allNavItems = [
    { path: '/kurban', label: 'Dashboard', icon: Home },
    { path: '/kurban/panitia', label: 'Panitia', icon: Users },
    { path: '/kurban/kelompok-kurban', label: 'Kelompok Kurban', icon: Calendar },
    { path: '/kurban/keuangan', label: 'Keuangan', icon: DollarSign },
    { path: '/kurban/penerima-daging', label: 'Data Penerima', icon: UserCheck },
    { path: '/kurban/pembagian-daging', label: 'Pembagian', icon: Share2 },
    { path: '/kurban/laporan', label: 'Laporan', icon: FileText },
    { path: '/kurban/rab', label: 'RAB Estimasi', icon: Calculator },
    { path: '/kurban/pasal-musyawarah', label: 'Pasal Musyawarah', icon: Scale },
    { path: '/kurban/cetak', label: 'Menu Cetak', icon: Printer, adminOnly: true },
    { path: '/kurban/data-management', label: 'Manajemen Data', icon: Database, adminOnly: true },
  ];

  const navItems = allNavItems.filter(item => !item.adminOnly || isAuthenticated);

  return (
    <>
      {/* Kurban sub-banner */}
      <div className="bg-green-700 text-white py-1.5 px-4 text-xs font-medium text-center">
        Panitia Kurban Masjid Istiqomah Klampisan &bull; Tahun {hijriahYear} H / {currentYear} M
      </div>

      {/* Kurban sub-header — 1 baris di desktop */}
      <header className="w-full border-b bg-white border-gray-100">
        <div className="w-full px-4 md:px-6 flex items-center gap-3 h-12">

          {/* Logo */}
          <Link to="/kurban" className="shrink-0 flex items-center group">
            <img
              src="/logo.png"
              alt="Masjid Istiqomah Klampisan"
              className="h-7 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Divider */}
          <div className="hidden lg:block w-px h-5 bg-gray-200 shrink-0" />

          {/* Desktop nav — tengah, scrollable horizontal jika perlu */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls — kanan */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            <YearSelector />

            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-green-50 rounded-md border border-green-200">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Pengurus</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="h-7 w-7 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50"
                  title="Keluar"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLoginOpen(true)}
                className="hidden sm:flex items-center gap-1 border-gray-200 text-gray-500 hover:text-green-700 hover:border-green-300 h-7 px-2.5 text-xs"
              >
                <KeyRound className="w-3 h-3" />
                Masuk Pengurus
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-7 w-7 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen
                ? <X className="w-4 h-4 text-gray-700" />
                : <Menu className="w-4 h-4 text-gray-700" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-white transition-all duration-300 lg:hidden overflow-y-auto",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <img src="/logo.png" alt="Masjid Istiqomah Klampisan" className="h-9 w-auto object-contain" />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-500" />
            </Button>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    isActive
                      ? "bg-green-50 text-green-800 border border-green-100"
                      : "bg-white text-gray-700 border border-transparent hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5", isActive ? "text-green-600" : "text-gray-400")} />
                    <span className="font-medium text-base">{item.label}</span>
                  </div>
                  <ChevronRight className={cn("w-5 h-5", isActive ? "text-green-500" : "text-gray-300")} />
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Mode Pengurus Aktif</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Keluar
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 border-gray-200 text-gray-600"
                onClick={() => { setIsMobileMenuOpen(false); setLoginOpen(true); }}
              >
                <KeyRound className="w-4 h-4" /> Masuk Pengurus
              </Button>
            )}
            <p className="text-center text-gray-400 text-xs">
              &copy; {currentYear} Panitia Kurban Klampisan
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-6 md:py-8 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Layout;
