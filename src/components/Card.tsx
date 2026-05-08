import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

const Card = ({ title, value, icon, subtitle, className }: CardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden p-6 rounded-xl transition-all duration-200 border border-gray-200 bg-white shadow-sm hover:shadow-md",
      className
    )}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-lg bg-white/50 mix-blend-multiply">
            {icon}
          </div>
        </div>
        
        <div className="mt-2">
          <h3 className="text-sm font-semibold mb-1 opacity-80">
            {title}
          </h3>
          <p className="text-2xl font-bold tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs mt-1 font-medium opacity-70">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
