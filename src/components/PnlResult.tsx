import React from 'react';
import { PnlResult as PnlResultType } from '../types';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Award, ShieldAlert } from 'lucide-react';

interface PnlResultProps {
  result: PnlResultType;
}

export const PnlResult: React.FC<PnlResultProps> = ({ result }) => {
  const { pnl, isProfit, totalCost, currentValue, percentage, symbol } = result;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formattedPnl = formatCurrency(Math.abs(pnl));
  const formattedCost = totalCost ? formatCurrency(totalCost) : null;
  const formattedValue = currentValue ? formatCurrency(currentValue) : null;
  const formattedPercentage = percentage !== undefined ? `${isProfit ? '+' : ''}${percentage.toFixed(2)}%` : null;

  // Aesthetic styling configurations
  const theme = isProfit 
    ? {
        gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/20 text-emerald-300',
        glow: 'shadow-emerald-500/5',
        icon: <TrendingUp className="h-6 w-6 text-emerald-400" />,
        smallIcon: <ArrowUpRight className="h-4 w-4 text-emerald-400" />,
        verdict: 'Excellent Gain',
        verdictDesc: 'Your position is currently outperforming. Great entry timing.',
        verdictBadge: <Award className="h-4 w-4 mr-1 text-emerald-400 animate-bounce" />
      }
    : {
        gradient: 'from-red-500/10 via-red-500/5 to-transparent',
        border: 'border-red-500/30',
        text: 'text-red-400',
        badgeBg: 'bg-red-500/20 text-red-300',
        glow: 'shadow-red-500/5',
        icon: <TrendingDown className="h-6 w-6 text-red-400" />,
        smallIcon: <ArrowDownRight className="h-4 w-4 text-red-400" />,
        verdict: 'Underperforming',
        verdictDesc: 'Position is down. Leverage the AI RSI recovery advisor below to recoup.',
        verdictBadge: <ShieldAlert className="h-4 w-4 mr-1 text-red-400 animate-pulse" />
      };

  return (
    <div className={`mt-8 bg-gradient-to-b ${theme.gradient} border ${theme.border} rounded-2xl p-6 md:p-8 shadow-2xl ${theme.glow} transition-all duration-300`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Main PnL visual */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
              {symbol ? `${symbol} Position PnL` : 'Performance Summary'}
            </span>
            <div className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${theme.badgeBg}`}>
              {theme.smallIcon}
              <span className="ml-1 font-mono">{formattedPercentage}</span>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <h3 className={`text-4xl md:text-5xl font-black tracking-tight ${theme.text} font-mono`}>
              {isProfit ? '' : '-'}{formattedPnl}
            </h3>
            <span className="text-sm text-gray-400 font-medium">Unrealized {isProfit ? 'Profit' : 'Loss'}</span>
          </div>

          <div className="flex items-center text-sm text-gray-300">
            {theme.verdictBadge}
            <span className="font-semibold">{theme.verdict}:&nbsp;</span>
            <span className="text-gray-400 text-xs md:text-sm">{theme.verdictDesc}</span>
          </div>
        </div>

        {/* Breakdown details */}
        {(formattedCost || formattedValue) && (
          <div className="grid grid-cols-2 gap-4 lg:min-w-[320px] bg-slate-950/40 p-4 rounded-xl border border-gray-800/60">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Total Investment</span>
              <p className="text-sm font-semibold text-gray-200 font-mono">{formattedCost}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Current Valuation</span>
              <p className="text-sm font-semibold text-gray-200 font-mono">{formattedValue}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

