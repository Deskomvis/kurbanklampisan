
import { Penerima } from '@/contexts/PenerimaContext';

export const generatePembagianSection = (sudahMenerima: number, penerima: Penerima[], progressPercentage: number): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📦 Status Pembagian Daging</h2>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${sudahMenerima}</div>
          <div style="color: #666; font-size: 10px;">✅ Sudah Menerima</div>
        </div>
        <div style="background: #fffbeb; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #f59e0b;">
          <div style="font-size: 18px; font-weight: bold; color: #f59e0b;">${penerima.length - sudahMenerima}</div>
          <div style="color: #666; font-size: 10px;">⏳ Belum Menerima</div>
        </div>
        <div style="background: #eff6ff; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #3b82f6;">
          <div style="font-size: 18px; font-weight: bold; color: #3b82f6;">${progressPercentage}%</div>
          <div style="color: #666; font-size: 10px;">📈 Progress</div>
        </div>
      </div>
      
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #16a34a;">
        <div style="background: #e5e7eb; height: 12px; border-radius: 6px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%); height: 100%; width: ${progressPercentage}%; border-radius: 6px; transition: width 0.3s ease;"></div>
        </div>
        <div style="text-align: center; margin-top: 8px; font-weight: bold; color: #16a34a; font-size: 11px;">Progress Pembagian: ${progressPercentage}%</div>
      </div>
    </div>
  `;
};
