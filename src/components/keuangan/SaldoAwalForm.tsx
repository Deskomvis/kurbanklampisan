import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Edit, Save, X, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SaldoAwalFormProps {
  saldoAwal: string;
  setSaldoAwal: (value: string) => void;
  keteranganSaldoAwal: string;
  setKeteranganSaldoAwal: (value: string) => void;
  isSaldoAwalSet: boolean;
  onSetSaldoAwal: () => void;
  onEditSaldoAwal: () => void;
  formatRupiah: (amount: number) => string;
}

export const SaldoAwalForm: React.FC<SaldoAwalFormProps> = ({
  saldoAwal,
  setSaldoAwal,
  isSaldoAwalSet,
  onSetSaldoAwal,
  onEditSaldoAwal,
  formatRupiah
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

  if (!isSaldoAwalSet || isEditing) {
    return (
      <Card className="p-8 rounded-[2.5rem] bg-white border-gray-100 shadow-xl shadow-gray-50 overflow-hidden relative">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <Landmark className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {isEditing ? 'Perbarui' : 'Tentukan'} Saldo Awal
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Nominal Saldo (Rp)
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={isEditing ? tempSaldo : saldoAwal}
                  onChange={(e) => isEditing ? setTempSaldo(e.target.value) : setSaldoAwal(e.target.value)}
                  className="h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all font-black text-lg text-gray-900"
                  placeholder="0"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-300 text-sm">Rp</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={isEditing ? handleSave : onSetSaldoAwal}
                className="h-14 px-8 rounded-2xl bg-gray-900 hover:bg-black text-white font-black flex-1 shadow-lg shadow-gray-200 transition-all active:scale-95"
                disabled={isEditing ? !tempSaldo || tempSaldo === '0' : !saldoAwal || saldoAwal === '0'}
              >
                <Save className="w-5 h-5 mr-2" />
                {isEditing ? 'Simpan Perubahan' : 'Tetapkan Saldo Sekarang'}
              </Button>
              {isEditing && (
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-gray-200 text-gray-500 font-bold hover:bg-gray-50"
                >
                  <X className="w-5 h-5 mr-2" />
                  Batalkan
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </Card>
    );
  }

  return (
    <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 border-gray-100 shadow-xl shadow-gray-50 overflow-hidden relative group">
      <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-[1.5rem] shadow-inner">
            <Landmark className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saldo Awal Terverifikasi</h3>
            </div>
            <div className="text-3xl font-black text-gray-900 tracking-tight">
              {formatRupiah(parseFloat(saldoAwal) || 0)}
            </div>
          </div>
        </div>
        <Button 
          onClick={handleEdit}
          variant="outline"
          className="h-12 px-6 rounded-2xl border-gray-200 text-gray-600 font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Nominal
        </Button>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-green-100/30 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110" />
    </Card>
  );
};
