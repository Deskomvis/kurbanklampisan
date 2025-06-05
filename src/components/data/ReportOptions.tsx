
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Users, DollarSign, UserCheck, Share2, Beef, Rabbit } from 'lucide-react';

export interface ReportOption {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  checked: boolean;
}

export const defaultReportOptions: ReportOption[] = [
  { id: 'dashboard', label: 'Dashboard & Statistik', icon: FileText, checked: true },
  { id: 'kelompok-sapi', label: 'Data Kelompok Sapi', icon: Beef, checked: true },
  { id: 'kelompok-kambing', label: 'Data Kurban Kambing', icon: Rabbit, checked: true },
  { id: 'penerima', label: 'Daftar Penerima Daging', icon: UserCheck, checked: true },
  { id: 'pembagian', label: 'Status Pembagian Daging', icon: Share2, checked: true },
  { id: 'keuangan', label: 'Laporan Keuangan', icon: DollarSign, checked: true },
  { id: 'laporan', label: 'Laporan Pertanggungjawaban', icon: FileText, checked: true },
];

interface ReportOptionsProps {
  reportOptions: ReportOption[];
  onCheckboxChange: (id: string, checked: boolean) => void;
}

export const ReportOptions: React.FC<ReportOptionsProps> = ({
  reportOptions,
  onCheckboxChange
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-800">Pilih Laporan:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                id={option.id}
                checked={option.checked}
                onCheckedChange={(checked) => onCheckboxChange(option.id, checked as boolean)}
              />
              <Icon className="w-4 h-4 text-green-600" />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
