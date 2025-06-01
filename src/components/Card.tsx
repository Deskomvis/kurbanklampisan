
import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  className?: string;
}

const Card = ({ title, value, className = '' }: CardProps) => {
  return (
    <div className={`bg-green-600 text-white p-6 rounded-lg ${className}`}>
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="text-green-100">{title}</div>
      </div>
    </div>
  );
};

export default Card;
