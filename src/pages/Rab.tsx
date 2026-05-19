import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRab, RabItem, RabCategory, RabData } from '@/contexts/RabContext';
import { useAuth } from '@/contexts/AuthContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Check, X, Plus, Trash2, Calculator, RefreshCw, ChevronDown } from 'lucide-react';

const uid = () => Math.random().toString(36).slice(2, 9);
const fmtN = (n: number) => n > 0 ? n.toLocaleString('id-ID') : '';
const autoCalc = (vol: string, harga: number) => {
  const v = parseFloat(vol.replace(',', '.'));
  return !isNaN(v) && harga > 0 ? Math.round(v * harga) : 0;
};

/* ── Blank item template ── */
const blankItem = (): RabItem => ({ id: uid(), uraian: '', vol: '', satuan: 'Paket', hargaSatuan: 0, jumlah: 0 });

/* ── Editable item row (full-edit mode) ── */
const EditItemRow = ({
  item, rowNo, onChange, onDelete,
}: { item: RabItem; rowNo: string; onChange: (i: RabItem) => void; onDelete: () => void }) => {
  const handle = (field: 'vol' | 'hargaSatuan', val: string | number) => {
    const next: RabItem = { ...item, [field]: val };
    const c = autoCalc(next.vol, next.hargaSatuan);
    if (c > 0) next.jumlah = c;
    onChange(next);
  };
  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-50/50">
      <td className="px-2 py-1.5 text-xs text-gray-500 text-center w-10">{rowNo}</td>
      <td className="px-2 py-1.5">
        <Input value={item.uraian} onChange={e => onChange({ ...item, uraian: e.target.value })}
          className="h-7 text-sm rounded border-gray-200 min-w-[140px]" placeholder="Uraian" />
      </td>
      <td className="px-2 py-1.5 w-20">
        <Input value={item.vol} onChange={e => handle('vol', e.target.value)}
          className="h-7 text-sm rounded border-gray-200 text-center" placeholder="—" />
      </td>
      <td className="px-2 py-1.5 w-20">
        <Input value={item.satuan} onChange={e => onChange({ ...item, satuan: e.target.value })}
          className="h-7 text-sm rounded border-gray-200" placeholder="—" />
      </td>
      <td className="px-2 py-1.5 w-28">
        <Input type="number" value={item.hargaSatuan || ''}
          onChange={e => handle('hargaSatuan', parseInt(e.target.value) || 0)}
          className="h-7 text-sm rounded border-gray-200 text-right" placeholder="0" />
      </td>
      <td className="px-2 py-1.5 w-28">
        <div className="flex items-center gap-1">
          <Input type="number" value={item.jumlah || ''}
            onChange={e => onChange({ ...item, jumlah: parseInt(e.target.value) || 0 })}
            className="h-7 text-sm rounded border-gray-200 text-right flex-1" placeholder="0" />
          {item.vol && item.hargaSatuan > 0 && (
            <button type="button" title="Hitung otomatis"
              onClick={() => onChange({ ...item, jumlah: autoCalc(item.vol, item.hargaSatuan) })}
              className="text-blue-400 hover:text-blue-600 shrink-0">
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>
      </td>
      <td className="px-2 py-1.5 w-8">
        <button onClick={onDelete} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
      </td>
    </tr>
  );
};

/* ── Quick-add form ── */
const NEW_CAT_SENTINEL = '__new__';

const AddItemForm = ({
  categories,
  onSave,
  onClose,
}: {
  categories: RabCategory[];
  onSave: (section: 'pemasukan' | 'pengeluaran', categoryId: string, newCategoryName: string, item: RabItem) => void;
  onClose: () => void;
}) => {
  const [section, setSection] = useState<'pemasukan' | 'pengeluaran'>('pengeluaran');
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? NEW_CAT_SENTINEL);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [item, setItem] = useState<RabItem>(blankItem());

  const handleVolOrHarga = (field: 'vol' | 'hargaSatuan', val: string | number) => {
    const next: RabItem = { ...item, [field]: val };
    const c = autoCalc(next.vol, next.hargaSatuan);
    if (c > 0) next.jumlah = c;
    setItem(next);
  };

  const isNew = categoryId === NEW_CAT_SENTINEL;

  const handleSave = () => {
    if (!item.uraian.trim()) return;
    if (section === 'pengeluaran' && isNew && !newCategoryName.trim()) return;
    onSave(section, categoryId, newCategoryName.trim(), { ...item, id: uid() });
    setItem(blankItem());
    setNewCategoryName('');
  };

  return (
    <Card className="p-5 rounded-xl border border-green-200 bg-green-50/40 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Plus className="w-4 h-4 text-green-600" /> Tambah Item RAB
          </h4>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
        </div>

        {/* Section toggle */}
        <div className="flex gap-2">
          {(['pemasukan', 'pengeluaran'] as const).map(s => (
            <button
              key={s}
              onClick={() => { setSection(s); if (s === 'pemasukan') setCategoryId(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                section === s
                  ? s === 'pemasukan' ? 'bg-blue-600 text-white border-blue-600' : 'bg-orange-600 text-white border-orange-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {s === 'pemasukan' ? 'I. Pemasukan' : 'II. Pengeluaran'}
            </button>
          ))}
        </div>

        {/* Category selector (Pengeluaran only) */}
        {section === 'pengeluaran' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600">Kategori</label>
            <div className="relative">
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.no}. {cat.nama}</option>
                ))}
                <option value={NEW_CAT_SENTINEL}>➕ Kategori baru...</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            {isNew && (
              <Input
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                placeholder="Nama kategori baru..."
                className="h-9 rounded-lg border-gray-200 text-sm font-medium"
              />
            )}
          </div>
        )}

        {/* Item fields */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600">Detail Item</label>
          <Input
            value={item.uraian}
            onChange={e => setItem({ ...item, uraian: e.target.value })}
            placeholder="Nama / uraian item..."
            className="h-9 rounded-lg border-gray-200 text-sm"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <p className="text-[10px] text-gray-400 mb-1 font-semibold">Vol</p>
              <Input value={item.vol} onChange={e => handleVolOrHarga('vol', e.target.value)}
                placeholder="1,00" className="h-9 rounded-lg border-gray-200 text-sm text-center" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1 font-semibold">Satuan</p>
              <Input value={item.satuan} onChange={e => setItem({ ...item, satuan: e.target.value })}
                placeholder="Paket" className="h-9 rounded-lg border-gray-200 text-sm" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1 font-semibold">Harga Satuan (Rp)</p>
              <Input type="number" value={item.hargaSatuan || ''}
                onChange={e => handleVolOrHarga('hargaSatuan', parseInt(e.target.value) || 0)}
                placeholder="0" className="h-9 rounded-lg border-gray-200 text-sm text-right" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-[10px] text-gray-400 font-semibold">Jumlah (Rp)</p>
                {item.vol && item.hargaSatuan > 0 && (
                  <button type="button" title="Hitung otomatis"
                    onClick={() => setItem({ ...item, jumlah: autoCalc(item.vol, item.hargaSatuan) })}
                    className="text-blue-400 hover:text-blue-600">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>
              <Input type="number" value={item.jumlah || ''}
                onChange={e => setItem({ ...item, jumlah: parseInt(e.target.value) || 0 })}
                placeholder="0" className="h-9 rounded-lg border-gray-200 text-sm text-right" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={onClose} className="flex-1 rounded-lg border-gray-200 text-gray-600 text-sm">
            Batal
          </Button>
          <Button size="sm" onClick={handleSave}
            disabled={!item.uraian.trim() || (section === 'pengeluaran' && isNew && !newCategoryName.trim())}
            className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm">
            <Plus className="w-3.5 h-3.5 mr-1" /> Simpan Item
          </Button>
        </div>
      </div>
    </Card>
  );
};

/* ══════════════════════════════════════════════════════════ */

const Rab = () => {
  const { rabData, updateRabData } = useRab();
  const { isAuthenticated } = useAuth();
  const { currentYear } = useYear();
  const { toast } = useToast();

  const hijriahYear = parseInt(currentYear) - 579;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<RabData>(rabData);
  const [showAddForm, setShowAddForm] = useState(false);

  /* ── Totals ── */
  const total = (d: RabData) => ({
    pemasukan: d.pemasukanItems.reduce((s, i) => s + i.jumlah, 0),
    pengeluaran: d.pengeluaranCategories.reduce((s, c) => s + c.items.reduce((cs, i) => cs + i.jumlah, 0), 0),
  });

  const vTotals = total(rabData);
  const eTotals = total(editData);
  const live = isEditing ? editData : rabData;
  const totals = isEditing ? eTotals : vTotals;
  const sisa = totals.pemasukan - totals.pengeluaran;

  /* ── Quick-add ── */
  const handleQuickAdd = (
    section: 'pemasukan' | 'pengeluaran',
    categoryId: string,
    newCategoryName: string,
    item: RabItem
  ) => {
    const next: RabData = JSON.parse(JSON.stringify(rabData));
    if (section === 'pemasukan') {
      next.pemasukanItems.push(item);
    } else if (categoryId === NEW_CAT_SENTINEL) {
      next.pengeluaranCategories.push({
        id: uid(),
        no: String(next.pengeluaranCategories.length + 1),
        nama: newCategoryName,
        items: [item],
      });
    } else {
      const cat = next.pengeluaranCategories.find(c => c.id === categoryId);
      if (cat) cat.items.push(item);
    }
    updateRabData(next);
    setShowAddForm(false);
    toast({ title: 'Item ditambahkan', description: `"${item.uraian}" berhasil ditambahkan ke RAB.` });
  };

  /* ── Full edit mode ── */
  const startEdit = () => { setEditData(JSON.parse(JSON.stringify(rabData))); setIsEditing(true); setShowAddForm(false); };
  const saveEdit = () => { updateRabData(editData); setIsEditing(false); toast({ title: 'Tersimpan', description: 'RAB berhasil diperbarui.' }); };
  const cancelEdit = () => setIsEditing(false);

  const updPemItem = (idx: number, item: RabItem) => {
    const next = [...editData.pemasukanItems]; next[idx] = item;
    setEditData({ ...editData, pemasukanItems: next });
  };
  const delPemItem = (idx: number) =>
    setEditData({ ...editData, pemasukanItems: editData.pemasukanItems.filter((_, i) => i !== idx) });
  const addPemItem = () =>
    setEditData({ ...editData, pemasukanItems: [...editData.pemasukanItems, blankItem()] });

  const updCat = (ci: number, cat: RabCategory) => {
    const next = [...editData.pengeluaranCategories]; next[ci] = cat;
    setEditData({ ...editData, pengeluaranCategories: next });
  };
  const delCat = (ci: number) =>
    setEditData({ ...editData, pengeluaranCategories: editData.pengeluaranCategories.filter((_, i) => i !== ci) });
  const addCat = () =>
    setEditData({
      ...editData,
      pengeluaranCategories: [
        ...editData.pengeluaranCategories,
        { id: uid(), no: String(editData.pengeluaranCategories.length + 1), nama: '', items: [blankItem()] },
      ],
    });
  const updCatItem = (ci: number, ii: number, item: RabItem) => {
    const cats = editData.pengeluaranCategories.map((c, i) =>
      i === ci ? { ...c, items: c.items.map((it, j) => j === ii ? item : it) } : c
    );
    setEditData({ ...editData, pengeluaranCategories: cats });
  };
  const delCatItem = (ci: number, ii: number) => {
    const cats = editData.pengeluaranCategories.map((c, i) =>
      i === ci ? { ...c, items: c.items.filter((_, j) => j !== ii) } : c
    );
    setEditData({ ...editData, pengeluaranCategories: cats });
  };
  const addCatItem = (ci: number) => {
    const cats = editData.pengeluaranCategories.map((c, i) =>
      i === ci ? { ...c, items: [...c.items, blankItem()] } : c
    );
    setEditData({ ...editData, pengeluaranCategories: cats });
  };

  const colSpan = isEditing ? 7 : 6;
  const thClass = 'border border-gray-400 px-2 py-2 text-center text-xs font-bold text-gray-800 bg-gray-100';
  const tdClass = 'border border-gray-300 px-3 py-1.5 text-sm text-gray-800';

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-green-600" />
            RAB Estimasi
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            Rencana Anggaran dan Biaya kurban {hijriahYear} H / {currentYear} M Masjid Istiqomah Klampisan.
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-2 flex-wrap">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={cancelEdit} className="flex items-center gap-1.5 border-gray-200">
                  <X className="w-4 h-4" /> Batal Edit
                </Button>
                <Button size="sm" onClick={saveEdit} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                  <Check className="w-4 h-4" /> Simpan Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => setShowAddForm(v => !v)}
                  className={`flex items-center gap-1.5 ${showAddForm ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showAddForm ? 'Tutup' : 'Tambah Item'}
                </Button>
                <Button variant="outline" size="sm" onClick={startEdit} className="flex items-center gap-1.5 border-gray-200 text-gray-600 hover:text-gray-900">
                  <Pencil className="w-4 h-4" /> Edit RAB
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Quick-add form */}
      {showAddForm && !isEditing && (
        <AddItemForm
          categories={rabData.pengeluaranCategories}
          onSave={handleQuickAdd}
          onClose={() => setShowAddForm(false)}
        />
      )}

      <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
        {/* Document Header */}
        <div className="py-6 px-6 text-center border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Rencana Anggaran dan Biaya</p>
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Pelaksanaan Hari Raya Idul Adha {hijriahYear} H / {currentYear} M
          </p>
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Masjid Istiqomah Klampisan</p>
        </div>

        {isEditing && (
          <div className="px-6 py-2 bg-blue-50 border-b border-blue-100 text-xs text-blue-700 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            Mode edit penuh — ubah, hapus, tambah baris. Klik ikon <RefreshCw className="w-3 h-3 inline mx-0.5" /> di kolom Jumlah untuk menghitung Vol × Harga otomatis.
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className={`${thClass} w-12`}>No.</th>
                <th className={thClass}>Uraian</th>
                <th className={`${thClass} w-20`}>Vol</th>
                <th className={`${thClass} w-24`}>Satuan</th>
                <th className={`${thClass} w-32`}>Harga Satuan</th>
                <th className={`${thClass} w-32`}>Jumlah</th>
                {isEditing && <th className={`${thClass} w-8`} />}
              </tr>
            </thead>
            <tbody>
              {/* ── I. PEMASUKAN ── */}
              <tr className="bg-gray-50">
                <td className={`${tdClass} text-center font-bold`}>I</td>
                <td className={`${tdClass} font-bold uppercase`} colSpan={isEditing ? 5 : 4}>PEMASUKAN</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {live.pemasukanItems.map((item, idx) =>
                isEditing ? (
                  <EditItemRow key={item.id} item={item} rowNo={String(idx + 1)}
                    onChange={it => updPemItem(idx, it)} onDelete={() => delPemItem(idx)} />
                ) : (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className={`${tdClass} text-center text-gray-500`}>{idx + 1}</td>
                    <td className={tdClass}>{item.uraian}</td>
                    <td className={`${tdClass} text-center`}>{item.vol}</td>
                    <td className={`${tdClass} text-center`}>{item.satuan}</td>
                    <td className={`${tdClass} text-right`}>{fmtN(item.hargaSatuan)}</td>
                    <td className={`${tdClass} text-right font-medium`}>{fmtN(item.jumlah)}</td>
                  </tr>
                )
              )}

              {isEditing && (
                <tr>
                  <td colSpan={colSpan} className="border border-gray-200 px-3 py-1">
                    <button onClick={addPemItem} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Tambah baris pemasukan
                    </button>
                  </td>
                </tr>
              )}

              <tr className="bg-gray-50 border-t-2 border-gray-400">
                <td className="border border-gray-300" />
                <td className={`${tdClass} font-bold text-center`} colSpan={4}>Jumlah</td>
                <td className={`${tdClass} text-right font-bold`}>{fmtN(totals.pemasukan)}</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {/* ── II. PENGELUARAN ── */}
              <tr className="bg-gray-50">
                <td className={`${tdClass} text-center font-bold`}>II</td>
                <td className={`${tdClass} font-bold uppercase`} colSpan={isEditing ? 5 : 4}>PENGELUARAN</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {live.pengeluaranCategories.map((cat, ci) => (
                <React.Fragment key={cat.id}>
                  <tr className="bg-gray-50/80">
                    <td className={`${tdClass} text-center font-semibold text-gray-600`}>
                      {isEditing
                        ? <Input value={cat.no} onChange={e => updCat(ci, { ...cat, no: e.target.value })}
                            className="h-6 w-8 text-xs rounded text-center border-gray-300 p-0" />
                        : cat.no}
                    </td>
                    <td className={`${tdClass} font-semibold`} colSpan={4}>
                      {isEditing
                        ? <Input value={cat.nama} onChange={e => updCat(ci, { ...cat, nama: e.target.value })}
                            className="h-7 text-sm rounded border-gray-200" placeholder="Nama kategori" />
                        : cat.nama}
                    </td>
                    <td className="border border-gray-300" />
                    {isEditing && (
                      <td className="border border-gray-300 px-1">
                        <button onClick={() => delCat(ci)} className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>

                  {cat.items.map((item, ii) =>
                    isEditing ? (
                      <EditItemRow key={item.id} item={item} rowNo=""
                        onChange={it => updCatItem(ci, ii, it)} onDelete={() => delCatItem(ci, ii)} />
                    ) : (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50/50">
                        <td className={`${tdClass} text-center text-gray-400`} />
                        <td className={`${tdClass} pl-6`}>{item.uraian}</td>
                        <td className={`${tdClass} text-center`}>{item.vol}</td>
                        <td className={`${tdClass} text-center`}>{item.satuan}</td>
                        <td className={`${tdClass} text-right`}>{fmtN(item.hargaSatuan)}</td>
                        <td className={`${tdClass} text-right font-medium`}>{fmtN(item.jumlah)}</td>
                      </tr>
                    )
                  )}

                  {isEditing && (
                    <tr>
                      <td colSpan={colSpan} className="border border-gray-200 px-3 py-1">
                        <button onClick={() => addCatItem(ci)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Tambah baris ke "{cat.nama || 'kategori ini'}"
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {isEditing && (
                <tr>
                  <td colSpan={colSpan} className="border border-gray-200 px-3 py-1.5">
                    <button onClick={addCat} className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1 font-medium">
                      <Plus className="w-3 h-3" /> Tambah kategori pengeluaran baru
                    </button>
                  </td>
                </tr>
              )}

              <tr className="bg-gray-50 border-t-2 border-gray-400">
                <td className="border border-gray-300" />
                <td className={`${tdClass} font-bold text-center`} colSpan={4}>Jumlah</td>
                <td className={`${tdClass} text-right font-bold`}>{fmtN(totals.pengeluaran)}</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {/* ── III. SISA ── */}
              <tr className="bg-green-50 border-t-2 border-gray-500">
                <td className={`${tdClass} text-center font-bold text-green-800`}>III</td>
                <td className={`${tdClass} font-bold text-green-800 uppercase`} colSpan={4}>SISA</td>
                <td className={`${tdClass} text-right font-black text-lg ${sisa >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {sisa < 0 ? `(${fmtN(Math.abs(sisa))})` : fmtN(sisa)}
                </td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-400 italic">
            * Angka merupakan estimasi rencana anggaran. Realisasi dapat berbeda sesuai kondisi di lapangan.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Rab;
