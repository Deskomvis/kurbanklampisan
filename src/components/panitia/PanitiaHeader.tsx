import React from 'react';
import { MapPin, Calendar, Scroll } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePanitia, PanitiaHeaderInfo } from '@/contexts/PanitiaContext';

interface PanitiaHeaderProps {
  isEditing?: boolean;
  editHeader?: PanitiaHeaderInfo;
  onChangeHeader?: (info: PanitiaHeaderInfo) => void;
}

export const PanitiaHeader: React.FC<PanitiaHeaderProps> = ({
  isEditing = false,
  editHeader,
  onChangeHeader,
}) => {
  const { headerInfo } = usePanitia();
  const display = isEditing ? editHeader! : headerInfo;

  const set = (field: keyof PanitiaHeaderInfo, value: string) => {
    if (editHeader && onChangeHeader) {
      onChangeHeader({ ...editHeader, [field]: value });
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8 pb-10 border-b border-gray-100">
      <div className="space-y-3 w-full max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
          <Scroll className="w-3 h-3" />
          Berita Acara Musyawarah
        </div>
        {isEditing ? (
          <Input
            value={display.judulEvent}
            onChange={(e) => set('judulEvent', e.target.value)}
            className="text-center text-lg font-black text-gray-900 border-gray-200 rounded-xl h-12"
            placeholder="Judul panitia / kegiatan..."
          />
        ) : (
          <h3 className="text-3xl font-black text-gray-900 tracking-tight max-w-2xl mx-auto leading-tight">
            {display.judulEvent}
          </h3>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="w-full text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu Sidang</p>
            {isEditing ? (
              <Input
                value={display.waktuSidang}
                onChange={(e) => set('waktuSidang', e.target.value)}
                className="text-center text-sm font-bold mt-1 h-9 rounded-xl border-gray-200"
                placeholder="Sabtu, 24 Mei 2026"
              />
            ) : (
              <p className="text-sm font-bold text-gray-900">{display.waktuSidang}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="w-full text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sekretariat</p>
            {isEditing ? (
              <Input
                value={display.sekretariat}
                onChange={(e) => set('sekretariat', e.target.value)}
                className="text-center text-sm font-bold mt-1 h-9 rounded-xl border-gray-200"
                placeholder="Tempat..."
              />
            ) : (
              <p className="text-sm font-bold text-gray-900">{display.sekretariat}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
            <Scroll className="w-5 h-5" />
          </div>
          <div className="w-full text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Legalitas</p>
            {isEditing ? (
              <Input
                value={display.legalitas}
                onChange={(e) => set('legalitas', e.target.value)}
                className="text-center text-sm font-bold mt-1 h-9 rounded-xl border-gray-200"
                placeholder="Pihak yang mengesahkan..."
              />
            ) : (
              <p className="text-sm font-bold text-gray-900">{display.legalitas}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
