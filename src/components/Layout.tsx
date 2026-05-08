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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { YearSelector } from '@/components/year/YearSelector';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/panitia', label: 'Panitia', icon: Users },
    { path: '/kelompok-kurban', label: 'Kelompok Kurban', icon: Calendar },
    { path: '/keuangan', label: 'Keuangan', icon: DollarSign },
    { path: '/penerima-daging', label: 'Data Penerima', icon: UserCheck },
    { path: '/pembagian-daging', label: 'Pembagian', icon: Share2 },
    { path: '/laporan', label: 'Laporan', icon: FileText },
    { path: '/data-management', label: 'Manajemen Data', icon: Database },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-green-100 selection:text-green-900">
      {/* Top Banner / Info Bar */}
      <div className="bg-green-700 text-white py-1.5 px-4 text-xs font-medium text-center">
        Panitia Kurban Masjid Istiqomah Klampisan • Tahun 1447 H / 2026 M
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full border-b",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2 border-gray-200" 
          : "bg-white border-gray-100 py-3"
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-green-600 p-2 rounded-lg text-white group-hover:bg-green-700 transition-colors">
                <FileText className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight">
                  Kurban<span className="text-green-600">App</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Istiqomah Klampisan
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-green-600" : "text-gray-500")} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <YearSelector />
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden rounded-lg hover:bg-gray-100"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-white transition-all duration-300 xl:hidden overflow-y-auto",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg text-white">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">Menu Navigasi</span>
            </div>
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
                    <span className="font-medium text-base">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5",
                    isActive ? "text-green-500" : "text-gray-300"
                  )} />
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-gray-500 text-sm">
              &copy; 2026 Panitia Kurban Klampisan
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
    </div>
  );
};

export default Layout;
;
