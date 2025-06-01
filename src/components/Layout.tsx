import React, { useState } from 'react';
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
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/panitia', label: 'Panitia', icon: Users },
    { path: '/kelompok-kurban', label: 'Kelompok Kurban', icon: Users },
    { path: '/keuangan', label: 'Keuangan', icon: DollarSign },
    { path: '/penerima-daging', label: 'Penerima Daging', icon: UserCheck },
    { path: '/pembagian-daging', label: 'Pembagian Daging', icon: Share2 },
    { path: '/laporan', label: 'Laporan', icon: FileText },
    { path: '/data-management', label: 'Data', icon: Database },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex items-center justify-between py-3 md:py-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white p-1.5 md:p-2 rounded">
                <FileText className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold">Aplikasi Laporan Kurban</h1>
                <p className="text-xs md:text-sm text-green-100 hidden sm:block">
                  Masjid Istiqomah Klampisan - Kaliancar, Selogiri, Wonogiri
                </p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-green-700"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-3 md:px-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-2 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors rounded ${
                        isActive
                          ? 'bg-green-600 text-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
