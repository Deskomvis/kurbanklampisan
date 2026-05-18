import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Card from '../components/Card';
import { usePenerima } from '@/contexts/PenerimaContext';
import { useKelompokKurban } from '@/contexts/KelompokKurbanContext';
import { useKeuangan } from '@/contexts/KeuanganContext';
import { useInitialData } from '@/hooks/useInitialData';
import { useYear } from '@/contexts/YearContext';
import {
  Beef,
  PawPrint,
  Users,
  UserCheck,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
  useInitialData();
  const { currentYear } = useYear();
  const { penerima } = usePenerima();
  const { getTotalSapi, getTotalKambing } = useKelompokKurban();
  const { getTotalPengeluaran } = useKeuangan();
  
  const sudahMenerima = penerima.filter(p => p.sudahMenerima).length;
  const belumMenerima = penerima.length - sudahMenerima;
  const progressPercentage = penerima.length > 0 ? Math.round((sudahMenerima / penerima.length) * 100) : 0;

  // Carousel Setup
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      containScroll: 'trimSnaps',
      skipSnaps: false
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const slides = [
    { src: "/banner-1.png", alt: "Kegiatan Panitia 1" },
    { src: "/banner-2.png", alt: "Banner Utama Kurban 2026" },
    { src: "/banner-3.png", alt: "Kegiatan Panitia 2" },
    { src: "/banner-2.png", alt: "Banner Utama Kurban 2026 (Loop)" }
  ];
  
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Banner Section - Slider */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing rounded-2xl shadow-md border border-gray-100 bg-white" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <img 
                src={slide.src} 
                alt={slide.alt} 
                className="w-full h-auto block object-cover aspect-[21/9] md:aspect-[3/1]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-green-50', 'flex', 'items-center', 'justify-center', 'aspect-[21/9]');
                  target.parentElement!.innerHTML = `<span class="text-green-600 font-semibold text-sm">${slide.alt}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header Title Section */}
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-green-600 rounded-full hidden md:block"></div>
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard <span className="text-green-600">Kurban {currentYear}</span>
          </h2>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            Ringkasan data operasional dan statistik real-time
          </p>
        </div>
      </div>
      
      {/* Premium Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Hewan Sapi" 
          value={getTotalSapi().toString()} 
          icon={<Beef className="w-6 h-6 text-green-700" />}
          className="bg-green-50 text-green-900 border border-green-100 shadow-sm"
          subtitle="Total ekor sapi"
        />
        <Card 
          title="Hewan Kambing" 
          value={getTotalKambing().toString()} 
          icon={<PawPrint className="w-6 h-6 text-emerald-700" />}
          className="bg-emerald-50 text-emerald-900 border border-emerald-100 shadow-sm"
          subtitle="Total ekor kambing"
        />
        <Card 
          title="Total Pengeluaran" 
          value={formatRupiah(getTotalPengeluaran())} 
          icon={<Wallet className="w-6 h-6 text-blue-700" />}
          className="bg-blue-50 text-blue-900 border border-blue-100 shadow-sm"
          subtitle="Akumulasi biaya operasional"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Target Penerima" 
          value={penerima.length.toString()} 
          icon={<Users className="w-6 h-6 text-gray-700" />}
          subtitle="Total kuota penerima"
        />
        <Card 
          title="Sudah Terdistribusi" 
          value={sudahMenerima.toString()} 
          icon={<UserCheck className="w-6 h-6 text-emerald-600" />}
          subtitle={`${progressPercentage}% dari total target`}
        />
        <Card 
          title="Progress Distribusi" 
          value={`${progressPercentage}%`} 
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          subtitle="Persentase penyelesaian"
        />
      </div>

      {/* Visual Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Distribution Progress Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Analisis Distribusi</h3>
              <p className="text-sm text-gray-500 mt-1">Status pembagian paket daging</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Tingkat Penyelesaian</span>
                <span className="text-sm font-bold text-green-600">{progressPercentage}%</span>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-100">
                <div 
                  style={{ width: `${progressPercentage}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 rounded-full transition-all duration-1000"
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-xs font-semibold text-green-700">Sudah Menerima</p>
                <p className="text-2xl font-bold text-green-900 mt-1">{sudahMenerima}</p>
                <p className="text-xs text-green-600 mt-1">Paket terkirim</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <p className="text-xs font-semibold text-orange-700">Belum Menerima</p>
                <p className="text-2xl font-bold text-orange-900 mt-1">{belumMenerima}</p>
                <p className="text-xs text-orange-600 mt-1">Dalam antrian</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Summary Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Ringkasan Hewan</h3>
              <p className="text-sm text-gray-500 mt-1">Stok hewan kurban tahun ini</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ArrowUpRight className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Beef className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Hewan Sapi</p>
                  <p className="text-xs text-gray-500">Total kelompok aktif</p>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{getTotalSapi()} <span className="text-xs font-normal text-gray-500 ml-1">ekor</span></p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <PawPrint className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Hewan Kambing</p>
                  <p className="text-xs text-gray-500">Total kurban individu</p>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{getTotalKambing()} <span className="text-xs font-normal text-gray-500 ml-1">ekor</span></p>
            </div>

            <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600">Total Akumulasi Hewan</span>
                <span className="px-4 py-1.5 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                  {getTotalSapi() + getTotalKambing()} Ekor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
