import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePenerima, Penerima } from '@/contexts/PenerimaContext';

interface QrScannerModalProps {
  onClose: () => void;
}

type ScanState = 'scanning' | 'success' | 'warning' | 'error';

export const QrScannerModal: React.FC<QrScannerModalProps> = ({ onClose }) => {
  const { penerima, toggleSudahMenerima } = usePenerima();
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [matchedPenerima, setMatchedPenerima] = useState<Penerima | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  // Keep a live ref to penerima and toggleSudahMenerima so the scanner
  // callback always sees fresh data without needing to restart the camera
  const penerimaRef = useRef(penerima);
  const toggleRef = useRef(toggleSudahMenerima);
  useEffect(() => { penerimaRef.current = penerima; }, [penerima]);
  useEffect(() => { toggleRef.current = toggleSudahMenerima; }, [toggleSudahMenerima]);

  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  const playWarningSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  };

  // Start camera once on mount, never restart on data change
  useEffect(() => {
    const scannerId = "qr-video-container";
    const html5QrCode = new Html5Qrcode(scannerId);
    html5QrCodeRef.current = html5QrCode;
    setIsCameraActive(true);

    const config = {
      fps: 15,
      qrbox: (width: number, height: number) => {
        const size = Math.min(width, height) * 0.7;
        return { width: size, height: size };
      }
    };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        const ticketNum = decodedText.trim();

        const paddedTicket = ticketNum.padStart(3, '0');
        const match = penerimaRef.current.find(
          p => p.nomorPengambilan.padStart(3, '0') === paddedTicket
        );

        if (match) {
          setMatchedPenerima(match);
          if (match.sudahMenerima) {
            setScanState('warning');
            playWarningSound();
          } else {
            toggleRef.current(match.id);
            setScanState('success');
            playSuccessSound();
          }
        } else {
          setScanState('error');
          setErrorMessage(`Nomor pengambilan "${ticketNum}" tidak terdaftar di sistem.`);
          playWarningSound();
        }
        // No auto-resume — user must press "Scan Selanjutnya"
      },
      () => {} // silent scan errors
    ).catch((err) => {
      console.error("Camera startup failed:", err);
      setCameraError(
        "Gagal mengakses kamera. Pastikan izin kamera telah diberikan di browser Anda."
      );
      setIsCameraActive(false);
    });

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []); // mount only

  const resumeScan = () => {
    isProcessingRef.current = false;
    setScanState('scanning');
    setMatchedPenerima(null);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanLineAnim {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
        .scanning-laser {
          position: absolute;
          left: 5%;
          width: 90%;
          height: 3px;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: scanLineAnim 2.5s linear infinite;
        }
      `}} />

      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col border border-gray-100 animate-scale-up">
        {/* Header */}
        <div className="bg-gray-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-green-500 animate-pulse" />
            <div>
              <h2 className="font-bold text-sm md:text-base leading-none">Scanner Kamera QR</h2>
              <p className="text-[10px] text-gray-400 mt-1 leading-none">Arahkan kamera ke QR Code kartu daging</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Area */}
        <div className="relative bg-gray-950 aspect-square w-full flex items-center justify-center overflow-hidden">
          <div
            id="qr-video-container"
            className="w-full h-full object-cover [&_video]:object-cover [&_video]:w-full [&_video]:h-full"
          />

          {/* Scan frame overlay */}
          {scanState === 'scanning' && isCameraActive && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative w-[70%] aspect-square border-2 border-green-500/80 rounded-xl shadow-[0_0_0_2000px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-green-400 -mt-[2px] -ml-[2px] rounded-tl-md"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-green-400 -mt-[2px] -mr-[2px] rounded-tr-md"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-green-400 -mb-[2px] -ml-[2px] rounded-bl-md"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-green-400 -mb-[2px] -mr-[2px] rounded-br-md"></div>
                <div className="scanning-laser" />
              </div>
            </div>
          )}

          {/* Camera error */}
          {cameraError && (
            <div className="absolute inset-0 bg-gray-900 text-white p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-3 bg-red-900/40 text-red-500 rounded-full border border-red-800">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-sm">Kamera Gagal Dimuat</h3>
              <p className="text-xs text-gray-400 max-w-xs">{cameraError}</p>
              <Button
                onClick={onClose}
                className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Kembali
              </Button>
            </div>
          )}

          {/* Result overlay — stays until user presses button */}
          {scanState !== 'scanning' && (
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-gray-950/80 backdrop-blur-sm animate-fade-in">
              {scanState === 'success' && matchedPenerima && (
                <div className="bg-white rounded-2xl p-6 text-center shadow-2xl border border-green-200 max-w-xs w-full flex flex-col items-center space-y-3 animate-scale-up">
                  <div className="p-3 bg-green-100 text-green-600 rounded-full shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-extrabold text-green-700 text-base leading-none">BERHASIL DIAMBIL</h3>
                  <div className="w-full border-b border-gray-100 my-1"></div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider leading-none">Penerima Kurban</p>
                    <p className="text-gray-900 font-extrabold text-lg tracking-tight">{matchedPenerima.nama}</p>
                    <div className="flex gap-2 justify-center mt-1 text-xs">
                      <span className="bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded">RT {matchedPenerima.rt}</span>
                      <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">No. {matchedPenerima.nomorPengambilan}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Status diubah menjadi sudah menerima daging.</p>
                </div>
              )}

              {scanState === 'warning' && matchedPenerima && (
                <div className="bg-white rounded-2xl p-6 text-center shadow-2xl border border-amber-200 max-w-xs w-full flex flex-col items-center space-y-3 animate-scale-up">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-full shadow-inner">
                    <AlertTriangle className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-extrabold text-amber-600 text-base leading-none">SUDAH PERNAH DIAMBIL</h3>
                  <div className="w-full border-b border-gray-100 my-1"></div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider leading-none">Penerima Kurban</p>
                    <p className="text-gray-900 font-extrabold text-lg tracking-tight">{matchedPenerima.nama}</p>
                    <div className="flex gap-2 justify-center mt-1 text-xs">
                      <span className="bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded">RT {matchedPenerima.rt}</span>
                      <span className="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded">No. {matchedPenerima.nomorPengambilan}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-red-500 font-medium leading-relaxed">
                    Warga ini sudah terdaftar telah mengambil daging kurban sebelumnya!
                  </p>
                </div>
              )}

              {scanState === 'error' && (
                <div className="bg-white rounded-2xl p-6 text-center shadow-2xl border border-red-200 max-w-xs w-full flex flex-col items-center space-y-3 animate-scale-up">
                  <div className="p-3 bg-red-100 text-red-600 rounded-full shadow-inner">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-extrabold text-red-600 text-base leading-none">KARTU TIDAK TERDAFTAR</h3>
                  <div className="w-full border-b border-gray-100 my-1"></div>
                  <p className="text-gray-800 text-sm font-semibold">{errorMessage}</p>
                  <p className="text-[10px] text-gray-400">Pastikan scan QR yang dikeluarkan oleh sistem panitia kurban.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-4 flex items-center justify-between border-t border-gray-100">
          {scanState !== 'scanning' ? (
            <Button
              onClick={resumeScan}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Scan Selanjutnya
            </Button>
          ) : (
            <div className="text-center w-full">
              <span className="text-[11px] text-gray-500 font-medium animate-pulse">
                Menunggu scan QR...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
