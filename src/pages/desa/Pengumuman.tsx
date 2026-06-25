import {
  Megaphone,
  AlertTriangle,
  FileText,
  Download,
  Phone,
  Clock,
  Calendar,
  ExternalLink,
  Info,
  ShieldAlert,
} from 'lucide-react';

interface CircularLetter {
  id: number;
  number: string;
  title: string;
  date: string;
  priority: 'Sangat Penting' | 'Penting' | 'Himbauan';
  priorityColor: string;
  excerpt: string;
}

interface TemplateFile {
  id: number;
  title: string;
  format: 'Word' | 'PDF';
  size: string;
}

const circularLetters: CircularLetter[] = [
  {
    id: 1,
    number: '04/SE/RW10/VI/2026',
    title: 'Himbauan Pengamanan Lingkungan & Siskamling RW 10',
    date: '25 Juni 2026',
    priority: 'Sangat Penting',
    priorityColor: 'bg-red-50 text-red-700 border-red-200',
    excerpt: 'Sehubungan dengan maraknya laporan kehilangan di kelurahan tetangga, seluruh kepala keluarga diwajibkan berpartisipasi dalam jadwal ronda malam yang telah disepakati.',
  },
  {
    id: 2,
    number: '03/SE/RW10/V/2026',
    title: 'Iuran Pembangunan Fasilitas Sosial & Pembayaran Makam',
    date: '10 Mei 2026',
    priority: 'Penting',
    priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
    excerpt: 'Penarikan iuran tahunan makam warga dan kas kematian RW akan ditarik serentak melalui dawis RT 01 dan RT 02 masing-masing sebesar Rp 50.000 per KK.',
  },
  {
    id: 3,
    number: '02/SE/RW10/IV/2026',
    title: 'Himbauan Pengolahan Sampah Lingkungan Teratur',
    date: '15 April 2026',
    priority: 'Himbauan',
    priorityColor: 'bg-blue-50 text-blue-700 border-blue-200',
    excerpt: 'Warga dilarang keras membakar sampah plastik di halaman rumah yang mengganggu pernapasan tetangga. Gunakan bak pembuangan sampah berbayar yang diambil mingguan.',
  },
];

const templateFiles: TemplateFile[] = [
  {
    id: 1,
    title: 'Surat Pengantar Pengurusan KTP / KK Baru',
    format: 'Word',
    size: '42 KB',
  },
  {
    id: 2,
    title: 'Surat Keterangan Usaha (SKU) Pengantar RT/RW',
    format: 'Word',
    size: '38 KB',
  },
  {
    id: 3,
    title: 'Surat Keterangan Domisili Warga Sementara',
    format: 'Word',
    size: '40 KB',
  },
  {
    id: 4,
    title: 'Formulir Pendaftaran Data Keluarga Warga Baru RW 10',
    format: 'PDF',
    size: '120 KB',
  },
];

const emergencyContacts = [
  { name: 'Ketua RW 10 (Bp. Moch. Ruri)', number: '+6281329000100', role: 'Pengurus Dusun' },
  { name: 'Ketua RT 01 (Bp. Parjan)', number: '+6285712345678', role: 'Pengurus Dusun' },
  { name: 'Ketua RT 02 (Bp. Tukimo)', number: '+6281298765432', role: 'Pengurus Dusun' },
  { name: 'Polsek Selogiri', number: '(0273) 321301', role: 'Keamanan' },
  { name: 'Puskesmas Selogiri', number: '(0273) 321151', role: 'Kesehatan / Medis' },
  { name: 'Bidan Desa Kaliancar (Ibu Sri)', number: '+6281390908080', role: 'Layanan Ibu & Balita' },
  { name: 'Pemadam Kebakaran Wonogiri', number: '(0273) 321113', role: 'Darurat' },
];

const Pengumuman = () => {
  const handleDownload = (title: string) => {
    alert(`File "${title}" berhasil diunduh ke perangkat Anda.`);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 text-white">
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="pengumuman-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.8" />
              <line x1="5" y1="40" x2="75" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pengumuman-geo)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
              <Megaphone className="w-3.5 h-3.5 text-lime-300" aria-hidden="true" />
              Papan Informasi Resmi Pengurus RW 10
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Pengumuman & Surat Edaran
            </h1>
            <p className="text-emerald-100 text-base md:text-lg max-w-2xl">
              Pemberitahuan penting pengurus warga, himbauan siskamling, surat keputusan, kontak darurat dusun, serta berkas administrasi kelurahan yang dapat diunduh langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Urgent Announcement Alert */}
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 md:p-6 shadow-sm mb-10 flex flex-col sm:flex-row items-start gap-4">
          <span className="p-3 bg-red-100 text-red-700 rounded-2xl shrink-0 mt-0.5" aria-hidden="true">
            <ShieldAlert className="w-6 h-6" />
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold bg-red-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                PENTING
              </span>
              <span className="text-xs text-stone-500 font-semibold">Berlaku mulai: Juni 2026</span>
            </div>
            <h3 className="font-extrabold text-stone-900 text-lg mt-2 leading-snug">
              Waspada Keamanan Lingkungan & Jadwal Ronda Malam Baru
            </h3>
            <p className="text-sm text-stone-750 leading-relaxed mt-2">
              Diharapkan seluruh warga RW 10 Klampisan menaruh perhatian ekstra pada keamanan rumah masing-masing, mengunci pintu gerbang/pagar saat malam hari, dan aktif dalam giliran ronda pos ronda masing-masing RT sesuai jadwal terbaru. Lapor cepat ke pengurus atau babinkamtibmas apabila menjumpai orang asing mencurigakan.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Circular Letters Board */}
          <div className="lg:col-span-8 space-y-6">
            <div className="mb-2">
              <h2 className="text-2xl font-extrabold text-stone-900">
                Surat Edaran Terbaru
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Kumpulan rilis surat edaran dan himbauan pengurus RW 10 Klampisan.
              </p>
            </div>

            <div className="space-y-4">
              {circularLetters.map((letter) => (
                <article
                  key={letter.id}
                  className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                      <span className="text-xs font-bold text-emerald-800 bg-stone-50 border border-stone-150 px-2.5 py-0.5 rounded-md font-mono">
                        No: {letter.number}
                      </span>
                      <div className="flex items-center gap-2.5 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {letter.date}
                        </span>
                        <span className={`font-bold px-2.5 py-0.5 rounded-full border ${letter.priorityColor}`}>
                          {letter.priority}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-stone-900 text-lg leading-snug mb-2.5">
                      {letter.title}
                    </h3>
                    
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {letter.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-stone-400" />
                      Ditandatangani oleh Ketua RW 10 & RT
                    </span>
                    <button
                      onClick={() => alert(`Mengunduh file PDF lengkap untuk surat ${letter.number}...`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:gap-2.5 transition-all"
                    >
                      Unduh Surat Lengkap (PDF) <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Template Files Box */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm mt-8">
              <div className="mb-4">
                <h3 className="font-extrabold text-stone-900 text-lg">
                  Berkas Template Administrasi
                </h3>
                <p className="text-xs text-stone-500">
                  Unduh formulir format Word atau PDF untuk memudahkan pengurusan berkas administrasi.
                </p>
              </div>

              <div className="divide-y divide-stone-100">
                {templateFiles.map((file) => (
                  <div key={file.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true">
                        <FileText className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="font-semibold text-stone-850 text-sm leading-snug">{file.title}</h4>
                        <p className="text-xs text-stone-500 mt-0.5">Format: {file.format} &middot; Ukuran: {file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(file.title)}
                      className="p-2 text-stone-600 hover:bg-stone-50 border border-stone-200 hover:border-emerald-600 hover:text-emerald-800 rounded-xl transition-all flex items-center justify-center shrink-0"
                      aria-label={`Unduh ${file.title}`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Emergency Contacts Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-stone-900 text-base mb-4 flex items-center gap-1.5">
                <Phone className="w-4.5 h-4.5 text-rose-600" /> Kontak Darurat Warga
              </h3>
              
              <div className="space-y-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.name} className="flex flex-col gap-1 border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">
                      {contact.role}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm">{contact.name}</h4>
                    <a
                      href={contact.number.startsWith('+62') ? `https://wa.me/${contact.number.replace('+', '')}` : `tel:${contact.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-850 hover:text-emerald-950 font-semibold flex items-center gap-1 mt-0.5 hover:underline w-fit"
                    >
                      {contact.number} <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 bg-stone-50 border border-stone-150 rounded-xl text-stone-600 text-xs leading-relaxed">
                <strong>Catatan:</strong> Gunakan nomor darurat di atas untuk keperluan mendesak (kesehatan, kebakaran, keamanan, bencana alam, dll).
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Pengumuman;
