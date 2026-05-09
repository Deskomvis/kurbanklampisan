import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Edit, Save, X, Landmark } from 'lucide-react';

interface SaldoAwalFormProps {
  saldoAwal: string;
  setSaldoAwal: (value: string) => void;
  keteranganSaldoAwal: string;
  setKeteranganSaldoAwal: (value: string) => void;
  isSaldoAwalSet: boolean;
  onSetSaldoAwal: () => void;
  onEditSaldoAwal: () => void;
  formatRupiah: (amount: number) => string;
  isAuthenticated?: boolean;
}

export const SaldoAwalForm: React.FC<SaldoAwalFormProps> = ({
  saldoAwal,
  setSaldoAwal,
  isSaldoAwalSet,
  onSetSaldoAwal,
  formatRupiah,
  isAuthenticated = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempSaldo, setTempSaldo] = useState(saldoAwal);

  const handleEdit = () => {
    setTempSaldo(saldoAwal);
    setIsEditing(true);
  };

  const handleSave = () => {
    setSaldoAwal(tempSaldo);
    setIsEditing(false);
    onSetSaldoAwal();
  };

  const handleCancel = () => {
    setTempSaldo(saldoAwal);
    setIsEditing(false);
  };

  // Input/edit form — only for authenticated users
  if (isAuthenticated && (!isSaldoAwalSet || isEditing)) {
    return (
      <Card className="p-6 rounded-2xl bg-white border-gray-100 shadow-sm overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Landmark className="w-4 h-4 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              {isEditing ? 'Perbarui' : 'Tentukan'} Saldo Awal
            </h3>
          </div>

          <div className="relative">
            <Input
              type="number"
              value={isEditing ? tempSaldo : saldoAwal}
              onChange={(e) => isEditing ? setTempSaldo(e.target.value) : setSaldoAwal(e.target.value)}
              className="h-11 pl-10 pr-4 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-blue-500 font-semibold text-gray-900"
              placeholder="0"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">Rp</span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={isEditing ? handleSave : onSetSaldoAwal}
              className="h-10 flex-1 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-sm"
              disabled={isEditing ? !tempSaldo || tempSaldo === '0' : !saldoAwal || saldoAwal === '0'}
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isEditing ? 'Simpan' : 'Tetapkan'}
            </Button>
            {isEditing && (
              <Button
                onClick={handleCancel}
                variant="outline"
                className="h-10 px-4 rounded-xl border-gray-200 text-gray-500 font-semibold text-sm"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Read-only display (shown to all users when saldo is set, or to non-authenticated always)
  return (
    <Card className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-gray-100 shadow-sm overflow-hidden relative group">
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl shrink-0">
            <Landmark className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {isSaldoAwalSet ? 'Saldo Awal Terverifikasi' : 'Saldo Awal'}
              </p>
            </div>
            <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">
              {isSaldoAwalSet ? formatRupiah(parseFloat(saldoAwal) || 0) : '—'}
            </p>
          </div>
        </div>
        {isAuthenticated && isSaldoAwalSet && (
          <Button
            onClick={handleEdit}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-xl border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shrink-0"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-100/30 rounded-full blur-3xl" />
    </Card>
  );
};
