import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Moon, UtensilsCrossed, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export const InformasiTambahan: React.FC = () => {
  const sections = [
    {
      title: 'Pelaksanaan Sholat Idul Adha',
      icon: Sparkles,
      color: 'blue',
      details: [
        { label: 'Tanggal', value: 'Senin, 15 Juni 2026' },
        { label: 'Imam/Khotib', value: 'Ust. Syukur Prihantoro Al Hafid' },
        { label: 'Bilal', value: 'Sdr. Moch Al Fatih' },
        { label: 'Laporan', value: 'Ust. Andika' },
        { label: 'Kotak Infaq', value: 'Sdr. Nindi & Sdr. Anisa' },
        { label: 'Pelaksana', value: 'TPQ dan Remaja Masjid' }
      ]
    },
    {
      title: 'Malam Takbiran',
      icon: Moon,
      color: 'orange',
      details: [
        { label: 'Penanggung Jawab', value: 'Ust Syukur Prihantoro Al Hafid' },
        { label: 'Tim Pelaksana', value: 'Remaja Masjid dan TPQ' }
      ]
    },
    {
      title: 'Konsumsi & Logistik',
      icon: UtensilsCrossed,
      color: 'emerald',
      details: [
        { label: 'Penanggung Jawab', value: 'Ibu-Ibu Warga Klampisan' },
        { label: 'Area Kerja', value: 'Gedung TPQ & Dapur Masjid' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <Card key={i} className="p-8 rounded-[2.5rem] bg-white border-gray-100 shadow-xl shadow-gray-50 flex flex-col gap-6 group hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500">
            <div className={cn(
              "p-4 rounded-2xl w-fit transition-transform group-hover:scale-110 duration-500",
              section.color === 'blue' ? "bg-blue-100 text-blue-700" : 
              section.color === 'orange' ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
            )}>
              <section.icon className="w-6 h-6" />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-black text-gray-900 tracking-tight leading-tight">
                {section.title}
              </h4>
              <div className="space-y-3">
                {section.details.map((detail, di) => (
                  <div key={di} className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                      {detail.label}
                    </p>
                    <p className="text-sm font-bold text-gray-700 leading-tight">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-900 text-white px-10 py-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 flex items-center gap-6 relative overflow-hidden group">
          <div className="p-4 bg-white/10 rounded-2xl">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Mengesahkan,</p>
            <h5 className="text-2xl font-black tracking-tight">H. Hilman Suyatman</h5>
            <p className="text-sm font-bold text-green-400">Ketua Takmir Masjid Istiqomah</p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
};
