
import { Penerima } from '@/contexts/PenerimaContext';

export const generateDashboardSection = (getTotalSapi: () => number, getTotalKambing: () => number, penerima: Penerima[], sudahMenerima: number, progressPercentage: number): string => {
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h2 style="color: #16a34a; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px; font-size: 14px;">📊 Dashboard & Statistik</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${getTotalSapi()}</div>
          <div style="color: #666; font-size: 10px;">🐄 Hewan Sapi</div>
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${getTotalKambing()}</div>
          <div style="color: #666; font-size: 10px;">🐐 Hewan Kambing</div>
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; border: 1px solid #16a34a;">
          <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${penerima.length}</div>
          <div style="color: #666; font-size: 10px;">👥 Penerima Daging</div>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #16a34a;">
        <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 12px;">Status Pembagian Daging</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 10px;">
          <span>Sudah Menerima: <strong style="color: #16a34a;">${sudahMenerima} orang</strong></span>
          <span>Belum Menerima: <strong style="color: #f59e0b;">${penerima.length - sudahMenerima} orang</strong></span>
        </div>
        <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="background: #16a34a; height: 100%; width: ${progressPercentage}%; border-radius: 4px;"></div>
        </div>
        <div style="text-align: center; margin-top: 4px; font-weight: bold; color: #16a34a; font-size: 11px;">${progressPercentage}% Progress</div>
      </div>
    </div>
  `;
};
