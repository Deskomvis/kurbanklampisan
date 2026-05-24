import React, { useState } from 'react';
import { usePasal, Pasal, Ayat } from '@/contexts/PasalContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Scale, Plus, Pencil, Trash2, Check, X, ChevronRight, BookOpen
} from 'lucide-react';

const PasalMusyawarah: React.FC = () => {
  const { pasalList, addPasal, updatePasal, deletePasal, addAyat, updateAyat, deleteAyat } = usePasal();
  const { isAuthenticated } = useAuth();

  const [editingPasalId, setEditingPasalId] = useState<number | null>(null);
  const [editingPasalBab, setEditingPasalBab] = useState('');
  const [addingPasal, setAddingPasal] = useState(false);
  const [newPasalBab, setNewPasalBab] = useState('');

  const [editingAyat, setEditingAyat] = useState<{ pasalId: number; ayatId: number } | null>(null);
  const [editAyatText, setEditAyatText] = useState('');
  const [editAyatTahun, setEditAyatTahun] = useState('');

  const [addingAyatPasalId, setAddingAyatPasalId] = useState<number | null>(null);
  const [newAyatText, setNewAyatText] = useState('');
  const [newAyatTahun, setNewAyatTahun] = useState(new Date().getFullYear().toString());

  const startEditPasal = (p: Pasal) => {
    setEditingPasalId(p.id);
    setEditingPasalBab(p.bab);
  };

  const savePasal = (id: number) => {
    if (editingPasalBab.trim()) updatePasal(id, editingPasalBab.trim());
    setEditingPasalId(null);
  };

  const saveNewPasal = () => {
    if (newPasalBab.trim()) { addPasal(newPasalBab.trim()); }
    setAddingPasal(false);
    setNewPasalBab('');
  };

  const startEditAyat = (pasalId: number, a: Ayat) => {
    setEditingAyat({ pasalId, ayatId: a.id });
    setEditAyatText(a.text);
    setEditAyatTahun(a.tahun);
  };

  const saveAyat = () => {
    if (!editingAyat || !editAyatText.trim()) return;
    updateAyat(editingAyat.pasalId, editingAyat.ayatId, editAyatText.trim(), editAyatTahun.trim());
    setEditingAyat(null);
  };

  const saveNewAyat = (pasalId: number) => {
    if (newAyatText.trim()) addAyat(pasalId, newAyatText.trim(), newAyatTahun.trim());
    setAddingAyatPasalId(null);
    setNewAyatText('');
    setNewAyatTahun(new Date().getFullYear().toString());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-6 h-6 text-green-700" />
            <h1 className="text-2xl font-bold text-gray-900">Pasal Musyawarah</h1>
          </div>
          <p className="text-sm text-gray-500">
            Pokok-pokok peraturan kurban hasil musyawarah panitia Masjid Istiqomah Klampisan
          </p>
        </div>
        {isAuthenticated && (
          <Button
            size="sm"
            onClick={() => setAddingPasal(true)}
            className="bg-green-600 hover:bg-green-700 text-white shrink-0 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Tambah Pasal
          </Button>
        )}
      </div>

      {/* Add new pasal form */}
      {addingPasal && (
        <div className="border border-green-200 rounded-xl p-4 bg-green-50 space-y-3">
          <p className="text-sm font-semibold text-green-800">Pasal {pasalList.length + 1} — Bab baru</p>
          <Input
            placeholder="Nama bab, contoh: Kupon Pengambilan"
            value={newPasalBab}
            onChange={e => setNewPasalBab(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveNewPasal(); if (e.key === 'Escape') setAddingPasal(false); }}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={saveNewPasal} className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-3.5 h-3.5 mr-1" /> Simpan
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setAddingPasal(false); setNewPasalBab(''); }}>
              <X className="w-3.5 h-3.5 mr-1" /> Batal
            </Button>
          </div>
        </div>
      )}

      {/* Pasal list */}
      {pasalList.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Belum ada pasal. Tambahkan pasal pertama.</p>
        </div>
      )}

      <div className="space-y-5">
        {pasalList.map(pasal => (
          <div key={pasal.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Pasal header */}
            <div className="flex items-center justify-between px-5 py-4 bg-green-700 text-white">
              {editingPasalId === pasal.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-bold whitespace-nowrap">Pasal {pasal.nomor} —</span>
                  <Input
                    className="h-7 text-sm bg-white text-gray-900 border-0 flex-1"
                    value={editingPasalBab}
                    onChange={e => setEditingPasalBab(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') savePasal(pasal.id); if (e.key === 'Escape') setEditingPasalId(null); }}
                    autoFocus
                  />
                  <button onClick={() => savePasal(pasal.id)} className="text-white hover:text-green-200">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingPasalId(null)} className="text-white hover:text-green-200">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <ChevronRight className="w-4 h-4 opacity-70" />
                  <span className="font-bold text-sm sm:text-base">
                    Pasal {pasal.nomor} — Bab. {pasal.bab}
                  </span>
                </div>
              )}
              {isAuthenticated && editingPasalId !== pasal.id && (
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={() => startEditPasal(pasal)}
                    className="p-1 rounded hover:bg-green-600 text-white/80 hover:text-white transition-colors"
                    title="Edit pasal"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { if (confirm(`Hapus Pasal ${pasal.nomor}?`)) deletePasal(pasal.id); }}
                    className="p-1 rounded hover:bg-red-500 text-white/80 hover:text-white transition-colors"
                    title="Hapus pasal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Ayat list */}
            <div className="divide-y divide-gray-100">
              {pasal.ayat.map(ayat => (
                <div key={ayat.id} className="px-5 py-4">
                  {editingAyat?.pasalId === pasal.id && editingAyat?.ayatId === ayat.id ? (
                    <div className="space-y-2">
                      <Textarea
                        className="text-sm resize-none"
                        rows={3}
                        value={editAyatText}
                        onChange={e => setEditAyatText(e.target.value)}
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 whitespace-nowrap">Tahun berlaku:</span>
                        <Input
                          className="h-7 text-xs w-24"
                          value={editAyatTahun}
                          onChange={e => setEditAyatTahun(e.target.value)}
                        />
                        <Button size="sm" onClick={saveAyat} className="h-7 bg-green-600 hover:bg-green-700 text-white text-xs">
                          <Check className="w-3 h-3 mr-1" /> Simpan
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingAyat(null)}>
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 group">
                      <span className="text-green-700 font-bold text-sm shrink-0 mt-0.5">{ayat.nomor}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-relaxed">{ayat.text}</p>
                        <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {ayat.tahun}
                        </span>
                      </div>
                      {isAuthenticated && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={() => startEditAyat(pasal.id, ayat)}
                            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => { if (confirm('Hapus ayat ini?')) deleteAyat(pasal.id, ayat.id); }}
                            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Add ayat form */}
              {addingAyatPasalId === pasal.id ? (
                <div className="px-5 py-4 bg-gray-50 space-y-2">
                  <Textarea
                    className="text-sm resize-none"
                    rows={3}
                    placeholder="Tulis isi ayat..."
                    value={newAyatText}
                    onChange={e => setNewAyatText(e.target.value)}
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">Tahun berlaku:</span>
                    <Input
                      className="h-7 text-xs w-24"
                      value={newAyatTahun}
                      onChange={e => setNewAyatTahun(e.target.value)}
                    />
                    <Button size="sm" onClick={() => saveNewAyat(pasal.id)} className="h-7 bg-green-600 hover:bg-green-700 text-white text-xs">
                      <Check className="w-3 h-3 mr-1" /> Tambah
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => { setAddingAyatPasalId(null); setNewAyatText(''); }}>
                      Batal
                    </Button>
                  </div>
                </div>
              ) : isAuthenticated ? (
                <button
                  onClick={() => { setAddingAyatPasalId(pasal.id); setNewAyatText(''); }}
                  className="w-full flex items-center gap-2 px-5 py-3 text-sm text-gray-400 hover:text-green-700 hover:bg-green-50 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Tambah ayat
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasalMusyawarah;
