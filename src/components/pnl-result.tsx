import React from 'react';
import { PnlResult as PnlResultType } from '../types';
import { TrendUpIcon, TrendDownIcon } from './icons';

interface PnlResultProps {
  result: PnlResultType;
}

export const PnlResult: React.FC<PnlResultProps> = ({ result }) => {
  const { pnl, isProfit } = result;
  const formattedPnl = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(pnl));

  const resultColor = isProfit ? 'text-green-400' : 'text-red-400';
  const bgColor = isProfit ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderColor = isProfit ? 'border-green-500/20' : 'border-red-500/20';

  return (
    <div className={`mt-8 p-6 rounded-xl shadow-lg ${bgColor} border ${borderColor} flex flex-col items-center justify-center text-center`}>
      <div className="flex items-center space-x-4">
        {isProfit ? <TrendUpIcon /> : <TrendDownIcon />}
        <div>
          <p className={`text-lg font-medium text-gray-300`}>
            {isProfit ? 'Unrealized Profit' : 'Unrealized Loss'}
          </p>
          <p className={`text-4xl font-bold ${resultColor}`}>
            {formattedPnl}
          </p>
        </div>
      </div>
    </div>
  );
};
