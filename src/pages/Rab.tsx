import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRab, RabItem, RabCategory, RabData } from '@/contexts/RabContext';
import { useAuth } from '@/contexts/AuthContext';
import { useYear } from '@/contexts/YearContext';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Check, X, Plus, Trash2, Calculator, RefreshCw } from 'lucide-react';

const uid = () => Math.random().toString(36).slice(2, 9);

const fmtN = (n: number) => n > 0 ? n.toLocaleString('id-ID') : '';

const autoCalc = (vol: string, harga: number): number => {
  const v = parseFloat(vol.replace(',', '.'));
  return !isNaN(v) && harga > 0 ? Math.round(v * harga) : 0;
};

/* ── Editable item row ── */
const EditItemRow = ({
  item,
  rowNo,
  onChange,
  onDelete,
}: {
  item: RabItem;
  rowNo: string;
  onChange: (item: RabItem) => void;
  onDelete: () => void;
}) => {
  const handleVolOrHarga = (field: 'vol' | 'hargaSatuan', value: string | number) => {
    const next: RabItem = { ...item, [field]: value };
    const calc = autoCalc(next.vol, next.hargaSatuan);
    if (calc > 0) next.jumlah = calc;
    onChange(next);
  };

  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-50/50">
      <td className="px-2 py-1.5 text-xs text-gray-500 text-center w-10">{rowNo}</td>
      <td className="px-2 py-1.5">
        <Input
          value={item.uraian}
          onChange={e => onChange({ ...item, uraian: e.target.value })}
          className="h-7 text-sm rounded border-gray-200 min-w-[140px]"
          placeholder="Uraian"
        />
      </td>
      <td className="px-2 py-1.5 w-20">
        <Input
          value={item.vol}
          onChange={e => handleVolOrHarga('vol', e.target.value)}
          className="h-7 text-sm rounded border-gray-200 text-center"
          placeholder="—"
        />
      </td>
      <td className="px-2 py-1.5 w-20">
        <Input
          value={item.satuan}
          onChange={e => onChange({ ...item, satuan: e.target.value })}
          className="h-7 text-sm rounded border-gray-200"
          placeholder="—"
        />
      </td>
      <td className="px-2 py-1.5 w-28">
        <Input
          type="number"
          value={item.hargaSatuan || ''}
          onChange={e => handleVolOrHarga('hargaSatuan', parseInt(e.target.value) || 0)}
          className="h-7 text-sm rounded border-gray-200 text-right"
          placeholder="0"
        />
      </td>
      <td className="px-2 py-1.5 w-28">
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={item.jumlah || ''}
            onChange={e => onChange({ ...item, jumlah: parseInt(e.target.value) || 0 })}
            className="h-7 text-sm rounded border-gray-200 text-right flex-1"
            placeholder="0"
          />
          {item.vol && item.hargaSatuan > 0 && (
            <button
              type="button"
              title="Hitung otomatis (Vol × Harga)"
              onClick={() => onChange({ ...item, jumlah: autoCalc(item.vol, item.hargaSatuan) })}
              className="text-blue-400 hover:text-blue-600 shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>
      </td>
      <td className="px-2 py-1.5 w-8">
        <button onClick={onDelete} className="text-red-400 hover:text-red-600">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
};

const Rab = () => {
  const { rabData, updateRabData } = useRab();
  const { isAuthenticated } = useAuth();
  const { currentYear } = useYear();
  const { toast } = useToast();

  const hijriahYear = parseInt(currentYear) - 579;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<RabData>(rabData);

  // Computed totals (view)
  const totalPemasukan = rabData.pemasukanItems.reduce((s, i) => s + i.jumlah, 0);
  const totalPengeluaran = rabData.pengeluaranCategories.reduce(
    (s, cat) => s + cat.items.reduce((cs, i) => cs + i.jumlah, 0), 0
  );
  const sisa = totalPemasukan - totalPengeluaran;

  // Computed totals (edit)
  const editTotalPemasukan = editData.pemasukanItems.reduce((s, i) => s + i.jumlah, 0);
  const editTotalPengeluaran = editData.pengeluaranCategories.reduce(
    (s, cat) => s + cat.items.reduce((cs, i) => cs + i.jumlah, 0), 0
  );
  const editSisa = editTotalPemasukan - editTotalPengeluaran;

  const startEdit = () => {
    setEditData(JSON.parse(JSON.stringify(rabData)));
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateRabData(editData);
    setIsEditing(false);
    toast({ title: 'Tersimpan', description: 'RAB berhasil diperbarui.' });
  };

  const cancelEdit = () => setIsEditing(false);

  /* ── Edit helpers: pemasukan ── */
  const updatePemasukanItem = (idx: number, item: RabItem) => {
    const next = [...editData.pemasukanItems];
    next[idx] = item;
    setEditData({ ...editData, pemasukanItems: next });
  };
  const deletePemasukanItem = (idx: number) =>
    setEditData({ ...editData, pemasukanItems: editData.pemasukanItems.filter((_, i) => i !== idx) });
  const addPemasukanItem = () =>
    setEditData({
      ...editData,
      pemasukanItems: [...editData.pemasukanItems, { id: uid(), uraian: '', vol: '', satuan: '', hargaSatuan: 0, jumlah: 0 }],
    });

  /* ── Edit helpers: categories ── */
  const updateCategory = (ci: number, cat: RabCategory) => {
    const next = [...editData.pengeluaranCategories];
    next[ci] = cat;
    setEditData({ ...editData, pengeluaranCategories: next });
  };
  const deleteCategory = (ci: number) =>
    setEditData({ ...editData, pengeluaranCategories: editData.pengeluaranCategories.filter((_, i) => i !== ci) });
  const addCategory = () =>
    setEditData({
      ...editData,
      pengeluaranCategories: [
        ...editData.pengeluaranCategories,
        { id: uid(), no: String(editData.pengeluaranCategories.length + 1), nama: '', items: [{ id: uid(), uraian: '', vol: '1,00', satuan: 'Paket', hargaSatuan: 0, jumlah: 0 }] },
      ],
    });
  const updateCategoryItem = (ci: number, ii: number, item: RabItem) => {
    const cats = editData.pengeluaranCategories.map((cat, i) =>
      i === ci ? { ...cat, items: cat.items.map((it, j) => (j === ii ? item : it)) } : cat
    );
    setEditData({ ...editData, pengeluaranCategories: cats });
  };
  const deleteCategoryItem = (ci: number, ii: number) => {
    const cats = editData.pengeluaranCategories.map((cat, i) =>
      i === ci ? { ...cat, items: cat.items.filter((_, j) => j !== ii) } : cat
    );
    setEditData({ ...editData, pengeluaranCategories: cats });
  };
  const addCategoryItem = (ci: number) => {
    const cats = editData.pengeluaranCategories.map((cat, i) =>
      i === ci
        ? { ...cat, items: [...cat.items, { id: uid(), uraian: '', vol: '1,00', satuan: 'Paket', hargaSatuan: 0, jumlah: 0 }] }
        : cat
    );
    setEditData({ ...editData, pengeluaranCategories: cats });
  };

  const colSpan = isEditing ? 7 : 6;
  const data = isEditing ? editData : rabData;
  const tPemasukan = isEditing ? editTotalPemasukan : totalPemasukan;
  const tPengeluaran = isEditing ? editTotalPengeluaran : totalPengeluaran;
  const tSisa = isEditing ? editSisa : sisa;

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
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={cancelEdit} className="flex items-center gap-1.5 border-gray-200">
                <X className="w-4 h-4" /> Batal
              </Button>
              <Button size="sm" onClick={saveEdit} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                <Check className="w-4 h-4" /> Simpan
              </Button>
            </>
          ) : isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={startEdit} className="flex items-center gap-1.5 border-gray-200 text-gray-600 hover:text-gray-900">
              <Pencil className="w-4 h-4" /> Edit RAB
            </Button>
          ) : null}
        </div>
      </div>

      <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
        {/* Document Header */}
        <div className="py-6 px-6 text-center border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Rencana Anggaran dan Biaya</p>
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Pelaksanaan Hari Raya Idul Adha {hijriahYear} H / {currentYear} M
          </p>
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Masjid Istiqomah Klampisan</p>
        </div>

        {/* Edit hint */}
        {isEditing && (
          <div className="px-6 py-2 bg-blue-50 border-b border-blue-100 text-xs text-blue-700 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            Isi Vol dan Harga Satuan lalu klik ikon <RefreshCw className="w-3 h-3 inline" /> di kolom Jumlah untuk menghitung otomatis. Atau isi Jumlah secara manual.
          </div>
        )}

        {/* Table */}
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
                {isEditing && <th className={`${thClass} w-8`}></th>}
              </tr>
            </thead>
            <tbody>
              {/* ── Section I: PEMASUKAN ── */}
              <tr className="bg-gray-50">
                <td className={`${tdClass} text-center font-bold`}>I</td>
                <td className={`${tdClass} font-bold uppercase`} colSpan={isEditing ? 5 : 4}>PEMASUKAN</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {data.pemasukanItems.map((item, idx) =>
                isEditing ? (
                  <EditItemRow
                    key={item.id}
                    item={item}
                    rowNo={String(idx + 1)}
                    onChange={it => updatePemasukanItem(idx, it)}
                    onDelete={() => deletePemasukanItem(idx)}
                  />
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
                    <button onClick={addPemasukanItem} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Tambah baris pemasukan
                    </button>
                  </td>
                </tr>
              )}

              {/* Pemasukan subtotal */}
              <tr className="bg-gray-50 border-t-2 border-gray-400">
                <td className="border border-gray-300" />
                <td className={`${tdClass} font-bold text-center`} colSpan={4}>Jumlah</td>
                <td className={`${tdClass} text-right font-bold`}>{fmtN(tPemasukan)}</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {/* ── Section II: PENGELUARAN ── */}
              <tr className="bg-gray-50">
                <td className={`${tdClass} text-center font-bold`}>II</td>
                <td className={`${tdClass} font-bold uppercase`} colSpan={isEditing ? 5 : 4}>PENGELUARAN</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {data.pengeluaranCategories.map((cat, ci) => {
                const catTotal = cat.items.reduce((s, i) => s + i.jumlah, 0);
                return (
                  <React.Fragment key={cat.id}>
                    {/* Category header */}
                    <tr className="bg-gray-50/80">
                      <td className={`${tdClass} text-center font-semibold text-gray-600`}>
                        {isEditing ? (
                          <Input
                            value={cat.no}
                            onChange={e => updateCategory(ci, { ...cat, no: e.target.value })}
                            className="h-6 w-8 text-xs rounded text-center border-gray-300 p-0"
                          />
                        ) : cat.no}
                      </td>
                      <td className={`${tdClass} font-semibold`} colSpan={isEditing ? 4 : 4}>
                        {isEditing ? (
                          <Input
                            value={cat.nama}
                            onChange={e => updateCategory(ci, { ...cat, nama: e.target.value })}
                            className="h-7 text-sm rounded border-gray-200"
                            placeholder="Nama kategori"
                          />
                        ) : cat.nama}
                      </td>
                      <td className="border border-gray-300" />
                      {isEditing && (
                        <td className="border border-gray-300 px-1">
                          <button onClick={() => deleteCategory(ci)} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>

                    {/* Category items */}
                    {cat.items.map((item, ii) =>
                      isEditing ? (
                        <EditItemRow
                          key={item.id}
                          item={item}
                          rowNo=""
                          onChange={it => updateCategoryItem(ci, ii, it)}
                          onDelete={() => deleteCategoryItem(ci, ii)}
                        />
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
                          <button onClick={() => addCategoryItem(ci)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Tambah baris ke "{cat.nama || 'kategori ini'}"
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {isEditing && (
                <tr>
                  <td colSpan={colSpan} className="border border-gray-200 px-3 py-1.5">
                    <button onClick={addCategory} className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1 font-medium">
                      <Plus className="w-3 h-3" /> Tambah kategori pengeluaran baru
                    </button>
                  </td>
                </tr>
              )}

              {/* Pengeluaran subtotal */}
              <tr className="bg-gray-50 border-t-2 border-gray-400">
                <td className="border border-gray-300" />
                <td className={`${tdClass} font-bold text-center`} colSpan={4}>Jumlah</td>
                <td className={`${tdClass} text-right font-bold`}>{fmtN(tPengeluaran)}</td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>

              {/* ── Section III: SISA ── */}
              <tr className="bg-green-50 border-t-2 border-gray-500">
                <td className={`${tdClass} text-center font-bold text-green-800`}>III</td>
                <td className={`${tdClass} font-bold text-green-800 uppercase`} colSpan={4}>SISA</td>
                <td className={`${tdClass} text-right font-black text-lg ${tSisa >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {tSisa < 0 ? `(${fmtN(Math.abs(tSisa))})` : fmtN(tSisa)}
                </td>
                {isEditing && <td className="border border-gray-300" />}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer note */}
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
