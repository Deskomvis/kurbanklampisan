
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

const Card = ({ title, value, icon, subtitle }: CardProps) => {
  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs md:text-sm font-medium text-gray-600 truncate">{title}</h3>
        {icon && <div className="text-gray-400 flex-shrink-0 ml-2">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-lg md:text-2xl font-bold text-gray-900 leading-none">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default Card;
