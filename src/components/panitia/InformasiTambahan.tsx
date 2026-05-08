import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Moon, UtensilsCrossed, UserCheck, Pencil, Check, X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePanitia, InfoSection, PengesahInfo } from '@/contexts/PanitiaContext';
import { useToast } from '@/hooks/use-toast';

const COLOR_OPTIONS = ['blue', 'orange', 'emerald', 'purple', 'rose'];

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  orange: 'bg-orange-100 text-orange-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-purple-100 text-purple-700',
  rose: 'bg-rose-100 text-rose-700',
};

const dotClasses: Record<string, string> = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  emerald: 'bg-emerald-500',
  purple: 'bg-purple-500',
  rose: 'bg-rose-500',
};

const SectionIcon: React.FC<{ color: string }> = ({ color }) => {
  if (color === 'blue') return <Sparkles className="w-6 h-6" />;
  if (color === 'orange') return <Moon className="w-6 h-6" />;
  if (color === 'emerald') return <UtensilsCrossed className="w-6 h-6" />;
  return <Sparkles className="w-6 h-6" />;
};

export const InformasiTambahan: React.FC = () => {
  const { infoSections, pengesah, updateInfoSections, updatePengesah } = usePanitia();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editSections, setEditSections] = useState<InfoSection[]>([]);
  const [editPengesah, setEditPengesah] = useState<PengesahInfo>(pengesah);

  const startEdit = () => {
    setEditSections(infoSections.map(s => ({
      ...s,
      details: s.details.map(d => ({ ...d })),
    })));
    setEditPengesah({ ...pengesah });
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateInfoSections(editSections.filter(s => s.title.trim() !== ''));
    updatePengesah(editPengesah);
    setIsEditing(false);
    toast({ title: 'Tersimpan', description: 'Klausul & Informasi berhasil diperbarui.' });
  };

  const cancelEdit = () => setIsEditing(false);

  const updateSection = (i: number, section: InfoSection) => {
    const next = [...editSections];
    next[i] = section;
    setEditSections(next);
  };

  const deleteSection = (i: number) => {
    setEditSections(editSections.filter((_, idx) => idx !== i));
  };

  const addSection = () => {
    setEditSections([...editSections, { title: '', color: 'blue', details: [{ label: '', value: '' }] }]);
  };

  const addDetail = (si: number) => {
    const next = [...editSections];
    next[si] = { ...next[si], details: [...next[si].details, { label: '', value: '' }] };
    setEditSections(next);
  };

  const updateDetail = (si: number, di: number, field: 'label' | 'value', val: string) => {
    const next = [...editSections];
    const details = [...next[si].details];
    details[di] = { ...details[di], [field]: val };
    next[si] = { ...next[si], details };
    setEditSections(next);
  };

  const removeDetail = (si: number, di: number) => {
    const next = [...editSections];
    const details = next[si].details.filter((_, idx) => idx !== di);
    next[si] = { ...next[si], details: details.length > 0 ? details : [{ label: '', value: '' }] };
    setEditSections(next);
  };

  const sections = isEditing ? editSections : infoSections;

  return (
    <div className="space-y-6">
      {/* Edit toggle */}
      <div className="flex justify-end">
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={cancelEdit} className="flex items-center gap-1.5 border-gray-200">
              <X className="w-4 h-4" /> Batal
            </Button>
            <Button size="sm" onClick={saveEdit} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-4 h-4" /> Simpan
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={startEdit} className="flex items-center gap-1.5 border-gray-200 text-gray-600 hover:text-gray-900">
            <Pencil className="w-4 h-4" /> Edit Klausul
          </Button>
        )}
      </div>

      {/* Sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, si) =>
          isEditing ? (
            <Card key={si} className="p-6 rounded-[2rem] border-2 border-dashed border-green-200 bg-white space-y-4">
              {/* Color picker + title */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c}
                      onClick={() => updateSection(si, { ...section, color: c })}
                      className={cn(
                        'w-4 h-4 rounded-full border-2 transition-all',
                        dotClasses[c],
                        section.color === c ? 'border-gray-700 scale-125' : 'border-transparent'
                      )}
                    />
                  ))}
                </div>
                <Input
                  value={section.title}
                  onChange={e => updateSection(si, { ...section, title: e.target.value })}
                  placeholder="Nama kategori..."
                  className="flex-1 h-9 text-sm font-bold rounded-xl border-gray-200"
                />
                <Button size="icon" variant="ghost" onClick={() => deleteSection(si)}
                  className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Details */}
              <div className="space-y-2">
                {section.details.map((detail, di) => (
                  <div key={di} className="flex items-center gap-1.5">
                    <Input
                      value={detail.label}
                      onChange={e => updateDetail(si, di, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-28 h-8 text-xs rounded-lg border-gray-200 shrink-0"
                    />
                    <Input
                      value={detail.value}
                      onChange={e => updateDetail(si, di, 'value', e.target.value)}
                      placeholder="Nilai"
                      className="flex-1 h-8 text-xs rounded-lg border-gray-200"
                    />
                    <Button size="icon" variant="ghost" onClick={() => removeDetail(si, di)}
                      className="h-7 w-7 text-gray-400 hover:text-red-500 shrink-0 rounded-lg">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => addDetail(si)}
                  className="w-full h-7 border border-dashed border-gray-200 text-gray-400 hover:text-green-600 hover:border-green-400 rounded-xl text-xs">
                  <Plus className="w-3 h-3 mr-1" /> Tambah Baris
                </Button>
              </div>
            </Card>
          ) : (
            <Card key={si} className="p-8 rounded-[2.5rem] bg-white border-gray-100 shadow-xl shadow-gray-50 flex flex-col gap-6 group hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500">
              <div className={cn('p-4 rounded-2xl w-fit transition-transform group-hover:scale-110 duration-500', colorClasses[section.color] || colorClasses.blue)}>
                <SectionIcon color={section.color} />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{section.title}</h4>
                <div className="space-y-3">
                  {section.details.map((detail, di) => (
                    <div key={di} className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{detail.label}</p>
                      <p className="text-sm font-bold text-gray-700 leading-tight">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )
        )}
      </div>

      {/* Add section button (edit mode) */}
      {isEditing && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={addSection}
            className="flex items-center gap-2 border-dashed border-gray-300 text-gray-500 hover:text-green-700 hover:border-green-400 h-11 px-6">
            <Plus className="w-4 h-4" /> Tambah Kategori Baru
          </Button>
        </div>
      )}

      {/* Pengesah */}
      <div className="flex justify-center">
        {isEditing ? (
          <div className="bg-gray-900 text-white px-8 py-6 rounded-[2.5rem] shadow-2xl shadow-gray-200 flex items-center gap-6 relative overflow-hidden w-full max-w-md">
            <div className="p-4 bg-white/10 rounded-2xl shrink-0">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Mengesahkan,</p>
              <Input
                value={editPengesah.nama}
                onChange={e => setEditPengesah({ ...editPengesah, nama: e.target.value })}
                placeholder="Nama pengesah..."
                className="h-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 font-black rounded-xl"
              />
              <Input
                value={editPengesah.jabatan}
                onChange={e => setEditPengesah({ ...editPengesah, jabatan: e.target.value })}
                placeholder="Jabatan..."
                className="h-8 bg-white/10 border-white/20 text-green-400 placeholder:text-white/30 text-sm font-bold rounded-xl"
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 text-white px-10 py-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 flex items-center gap-6 relative overflow-hidden group">
            <div className="p-4 bg-white/10 rounded-2xl">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Mengesahkan,</p>
              <h5 className="text-2xl font-black tracking-tight">{pengesah.nama}</h5>
              <p className="text-sm font-bold text-green-400">{pengesah.jabatan}</p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        )}
      </div>
    </div>
  );
};
