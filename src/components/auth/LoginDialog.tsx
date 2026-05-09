import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, Delete } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const { login } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleDigit = (d: string) => {
    if (pin.length >= 6) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 6) {
      setTimeout(() => {
        const ok = login(next);
        if (ok) {
          setPin('');
          setError(false);
          onClose();
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => { setShake(false); setPin(''); }, 600);
        }
      }, 120);
    }
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError(false);
  };

  const handleClose = () => {
    setPin('');
    setError(false);
    onClose();
  };

  const DIGITS = ['1','2','3','4','5','6','7','8','9','0'];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xs p-0 overflow-hidden rounded-3xl">
        <div className="bg-gradient-to-b from-green-600 to-green-700 px-8 pt-8 pb-6 text-white text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-white/20 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-black">Masuk Pengurus</DialogTitle>
          </DialogHeader>
          <p className="text-green-100 text-sm mt-1">Masukkan PIN 6 digit</p>

          {/* PIN dots */}
          <div className={`flex justify-center gap-3 mt-6 ${shake ? 'animate-bounce' : ''}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                  i < pin.length
                    ? error ? 'bg-red-300 border-red-300' : 'bg-white border-white'
                    : 'bg-transparent border-white/50'
                }`}
              />
            ))}
          </div>
          {error && <p className="text-red-200 text-xs mt-3 font-semibold">PIN salah, coba lagi</p>}
        </div>

        {/* Numpad */}
        <div className="bg-white px-6 pb-6 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {DIGITS.slice(0, 9).map(d => (
              <button
                key={d}
                onClick={() => handleDigit(d)}
                className="h-14 rounded-2xl bg-gray-50 hover:bg-green-50 active:bg-green-100 text-gray-800 font-black text-xl transition-all active:scale-95 border border-gray-100"
              >
                {d}
              </button>
            ))}
            {/* Bottom row: empty, 0, delete */}
            <div />
            <button
              onClick={() => handleDigit('0')}
              className="h-14 rounded-2xl bg-gray-50 hover:bg-green-50 active:bg-green-100 text-gray-800 font-black text-xl transition-all active:scale-95 border border-gray-100"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="h-14 rounded-2xl bg-gray-50 hover:bg-red-50 active:bg-red-100 text-gray-500 hover:text-red-500 transition-all active:scale-95 border border-gray-100 flex items-center justify-center"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
