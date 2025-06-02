
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Edit } from 'lucide-react';

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
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          💰 {isEditing ? 'Edit' : 'Set'} Saldo Awal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SALDO AWAL (RP):
            </label>
            <Input
              type="number"
              value={isEditing ? tempSaldo : saldoAwal}
              onChange={(e) => isEditing ? setTempSaldo(e.target.value) : setSaldoAwal(e.target.value)}
              className="w-full"
              placeholder="Masukkan saldo awal"
            />
          </div>
          <div className="flex items-end gap-2">
            <Button 
              onClick={isEditing ? handleSave : onSetSaldoAwal}
              className="bg-blue-600 hover:bg-blue-700 flex-1"
              disabled={isEditing ? !tempSaldo || tempSaldo === '0' : !saldoAwal || saldoAwal === '0'}
            >
              💾 {isEditing ? 'Simpan' : 'Set'} Saldo Awal
            </Button>
            {isEditing && (
              <Button 
                onClick={handleCancel}
                variant="outline"
                className="border-gray-300"
              >
                Batal
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            💰 Saldo Awal
          </h3>
          <div className="text-sm text-blue-700">
            <strong>Saldo Awal:</strong> {formatRupiah(parseFloat(saldoAwal) || 0)}
          </div>
        </div>
        <Button 
          onClick={handleEdit}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Saldo Awal
        </Button>
      </div>
    </Card>
  );
};
