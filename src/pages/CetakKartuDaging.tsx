import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Printer, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const CetakKartuDaging = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const fromNum = parseInt(searchParams.get('from') || '1') || 1;
  const toNum = parseInt(searchParams.get('to') || '345') || 345;

  // Generate numbers array
  const numbers = [];
  for (let i = fromNum; i <= toNum; i++) {
    numbers.push(i);
  }

  // Format number to 3-digit padding (e.g. 001, 012, 345)
  const padNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  // Group into pages of 12 cards (4 columns x 3 rows)
  const CARDS_PER_PAGE = 12;
  const pages: number[][] = [];
  for (let i = 0; i < numbers.length; i += CARDS_PER_PAGE) {
    pages.push(numbers.slice(i, i + CARDS_PER_PAGE));
  }

  // Auto trigger browser print dialog on page load
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        window.print();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    window.close();
  };

  // Security Check: Access Denied if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center space-y-4 border border-gray-200">
          <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Akses Ditolak</h2>
          <p className="text-sm text-gray-500">
            Anda harus masuk sebagai Pengurus untuk mencetak kartu pengambilan daging.
          </p>
          <button
            onClick={handleClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-lg"
          >
            Tutup Halaman
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white text-gray-800 antialiased">
      {/* Dynamic inline styles for printing precision */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-page {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 10mm 5mm !important;
            width: 210mm !important;
            height: 297mm !important;
            page-break-after: always !important;
            box-sizing: border-box !important;
            background: white !important;
          }
          .print-card-grid {
            gap: 6mm !important;
          }
          .print-card {
            border: 2px solid #000000 !important;
          }
        }
        @page {
          size: A4 portrait;
          margin: 0;
        }
        .print-page {
          width: 210mm;
          height: 297mm;
          margin: 20px auto;
          background: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          border: 1px solid #ddd;
          box-sizing: border-box;
          padding: 10mm 5mm;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          page-break-inside: avoid;
        }
        .print-card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 6mm;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .print-card {
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 3mm 1mm;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          box-sizing: border-box;
          background: white;
          height: 80mm;
          width: 46mm;
          margin: 0 auto;
          position: relative;
        }
      `}} />

      {/* Floating control bar (hidden in print) */}
      <div className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-700">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm md:text-base">Pratinjau Cetak Kartu Pengambilan Daging</h1>
            <p className="text-xs text-gray-500">
              Menampilkan {numbers.length} kartu (Total {pages.length} Halaman A4)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 text-[11px] rounded-lg border border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Setel margin <strong>"Minimum" / "None"</strong> & matikan <strong>"Header & Footer"</strong> saat print.</span>
          </div>

          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Cetak Sekarang
          </Button>

          <Button
            variant="outline"
            onClick={handleClose}
            className="border-gray-300 text-gray-700 font-semibold text-xs py-2 px-3 rounded-lg flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Tutup
          </Button>
        </div>
      </div>

      {/* Printable Pages */}
      <div className="py-4 print:py-0">
        {pages.map((pageCards, pageIndex) => (
          <div key={pageIndex} className="print-page">
            <div className="print-card-grid">
              {pageCards.map((cardNum) => (
                <div key={cardNum} className="print-card">
                  {/* Header: Logo & Masjid Info */}
                  <div className="w-full flex flex-col items-center">
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="h-10 w-auto object-contain mb-1" 
                    />
                    <h2 className="font-black text-[10px] tracking-tight leading-none text-gray-900 uppercase">
                      Masjid Al Istiqomah
                    </h2>
                    <p className="font-extrabold text-[8px] tracking-widest leading-none text-gray-600 uppercase mt-1">
                      Dusun Klampisan
                    </p>
                  </div>

                  {/* Divider line */}
                  <div className="w-full border-b border-black my-1"></div>

                  {/* Title Label */}
                  <div className="w-full">
                    <span className="font-black text-[9px] text-gray-800 tracking-widest leading-none block">
                      NOMOR PENGAMBILAN
                    </span>
                    <span className="font-black text-[9px] text-gray-800 tracking-widest leading-none block mt-0.5">
                      DAGING KURBAN
                    </span>
                  </div>

                  {/* Huge bold ticket number - Maximized left/right space */}
                  <div className="font-black text-[72px] leading-none text-gray-950 tracking-tighter my-1 w-full text-center">
                    {padNumber(cardNum)}
                  </div>

                  {/* Modern QR Code for instant mobile scanning */}
                  <div className="my-1 print:my-0.5 flex justify-center items-center">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${padNumber(cardNum)}`} 
                      alt={`QR-${padNumber(cardNum)}`} 
                      className="h-14 w-14 border border-gray-300 rounded p-0.5 bg-white object-contain" 
                    />
                  </div>

                  {/* Footer Text */}
                  <div className="w-full">
                    <div className="w-full border-b border-dashed border-gray-400 mb-1"></div>
                    <p className="text-[7.5px] font-extrabold text-gray-700 italic leading-none">
                      * Harap kartu ini dibawa saat pengambilan daging
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CetakKartuDaging;
