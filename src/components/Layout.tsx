import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { UpdateButton } from '@/components/UpdateButton';
import { useYear } from '@/contexts/YearContext';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/auth/LoginDialog';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { currentYear } = useYear();
  const { isAuthenticated, logout } = useAuth();
  const hijriahYear = parseInt(currentYear) - 579;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  if (location.pathname === '/cetak/kartu-daging') {
    return <>{children}</>;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allNavItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/panitia', label: 'Panitia', icon: Users },
    { path: '/kelompok-kurban', label: 'Kelompok Kurban', icon: Calendar },
    { path: '/keuangan', label: 'Keuangan', icon: DollarSign },
    { path: '/penerima-daging', label: 'Data Penerima', icon: UserCheck },
    { path: '/pembagian-daging', label: 'Pembagian', icon: Share2 },
    { path: '/laporan', label: 'Laporan', icon: FileText },
    { path: '/rab', label: 'RAB Estimasi', icon: Calculator },
    { path: '/pasal-musyawarah', label: 'Pasal Musyawarah', icon: Scale },
    { path: '/cetak', label: 'Menu Cetak', icon: Printer, adminOnly: true },
    { path: '/data-management', label: 'Manajemen Data', icon: Database, adminOnly: true },
  ];

  const navItems = allNavItems.filter(item => !item.adminOnly || isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-green-100 selection:text-green-900">
      {/* Top Banner */}
      <div className="bg-green-700 text-white py-1.5 px-4 text-xs font-medium text-center">
        Panitia Kurban Masjid Istiqomah Klampisan • Tahun {hijriahYear} H / {currentYear} M
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full border-b",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-200"
          : "bg-white border-gray-100"
      )}>
        <div className="w-full px-4 md:px-8">

          {/* Row 1: Logo + Controls */}
          <div className={cn(
            "flex items-center justify-between transition-all",
            scrolled ? "py-2" : "py-3"
          )}>
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center group">
                <img
                  src="/logo.png"
                  alt="Masjid Istiqomah Klampisan"
                  className="h-9 md:h-11 w-auto object-contain group-hover:opacity-90 transition-opacity"
                />
              </Link>
              {isAuthenticated && <UpdateButton />}
            </div>

            <div className="flex items-center gap-2">
              <YearSelector />

              {/* Auth section */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 rounded-lg border border-green-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">Pengurus</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="h-8 w-8 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLoginOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 border-gray-200 text-gray-600 hover:text-green-700 hover:border-green-300 h-8 px-3"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Masuk Pengurus</span>
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen
                  ? <X className="w-5 h-5 text-gray-700" />
                  : <Menu className="w-5 h-5 text-gray-700" />}
              </Button>
            </div>
          </div>

          {/* Row 2: Navigation — desktop only, full width */}
          <nav className="hidden lg:flex flex-wrap items-center gap-x-0.5 gap-y-0.5 pb-1.5 border-t border-gray-100 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-green-600" : "text-gray-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
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

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default Layout;
