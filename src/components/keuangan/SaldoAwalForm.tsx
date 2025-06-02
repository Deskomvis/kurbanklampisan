
import React from 'react';
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
  if (!isSaldoAwalSet) {
    return (
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          💰 Set Saldo Awal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SALDO AWAL (RP):
            </label>
            <Input
              type="number"
              value={saldoAwal}
              onChange={(e) => setSaldoAwal(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={onSetSaldoAwal}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              💾 Set Saldo Awal
            </Button>
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
          onClick={onEditSaldoAwal}
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
