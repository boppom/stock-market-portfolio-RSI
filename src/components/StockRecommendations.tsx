import React, { useState, useMemo } from 'react';
import { StockRecommendation } from '../types';
import { RecommendationCard } from './RecommendationCard';
import { Lightbulb, Info, Sparkles, Filter, RefreshCcw } from 'lucide-react';

interface StockRecommendationsProps {
  recommendations: StockRecommendation[];
  isLoading: boolean;
  error: string | null;
  lossAmount: number;
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-12 space-y-4">
    <div className="relative flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 animate-spin"></div>
      <RefreshCcw className="absolute h-5 w-5 text-indigo-400 animate-pulse" />
    </div>
    <div className="text-center space-y-1">
      <p className="text-sm font-bold text-white tracking-wide">Scanning Indian Markets via AI...</p>
      <p className="text-xs text-gray-400">Fetching live RSI indicators and assessing recovery models</p>
    </div>
  </div>
);

export const StockRecommendations: React.FC<StockRecommendationsProps> = ({ recommendations, isLoading, error, lossAmount }) => {
  const [filter, setFilter] = useState<'All' | 'Oversold' | 'Overbought'>('All');

  const filteredRecs = useMemo(() => {
    if (filter === 'All') return recommendations;
    return recommendations.filter(rec => rec.strategy === filter);
  }, [recommendations, filter]);

  if (isLoading) {
    return (
        <div className="mt-8 p-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-gray-800/80">
            <LoadingSpinner />
        </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-900/20 text-red-300 rounded-2xl border border-red-900/40 text-center space-y-2">
        <p className="font-bold">Recommendation Sourcing Problem</p>
        <p className="text-xs text-red-400">{error}</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }
  
  const formattedLoss = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Math.abs(lossAmount));

  return (
    <div className="mt-12 space-y-8">
        
        {/* Section Header */}
        <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <Lightbulb className="h-5 w-5 text-amber-400 fill-amber-400/20" />
                    AI-Powered Portfolio Advisor
                </h2>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    Based on your unrealized loss of <span className="font-semibold text-red-400">{formattedLoss}</span>, these high-probability rebound candidates were sourced using RSI technical parameters.
                </p>
            </div>
            
            {/* Dynamic Filter Controls */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-gray-800/80 shrink-0 self-end md:self-auto">
                {(['All', 'Oversold', 'Overbought'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            filter === type 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                            : 'text-gray-400 hover:text-white hover:bg-slate-900/50'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        {/* RSI Parameters Cheat Sheet / Educational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/20 p-4 rounded-xl border border-gray-800/40">
            <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-emerald-500/15 rounded-lg mt-0.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Oversold Recovery Sourcing (RSI &lt; 30)</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        Stocks under heavy selling pressure where supply is exhausted. Sourcing these can lead to violent short-term trend reversals or "mean-reversion" rebounds.
                    </p>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-amber-500/15 rounded-lg mt-0.5">
                    <Info className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide font-sans">Overbought Momentum Sourcing (RSI &gt; 70)</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-sans">
                        Stocks with heavy bullish momentum. Useful for breakout scalping but carries structural correction risks. Always practice rigorous stop-loss disciplines.
                    </p>
                </div>
            </div>
        </div>

        {/* Grid List */}
        {filteredRecs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecs.map((stock) => (
                    <RecommendationCard key={stock.stock_symbol} stock={stock} />
                ))}
            </div>
        ) : (
            <div className="bg-slate-900/40 border border-gray-800/80 p-12 text-center rounded-2xl">
                <Filter className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-400">No {filter} advisory signals sourced in current session scan.</p>
                <button 
                    onClick={() => setFilter('All')} 
                    className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                >
                    Reset Filter to All
                </button>
            </div>
        )}

         <div className="text-center max-w-xl mx-auto space-y-1.5 pt-4">
             <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
                 Disclaimer: Educational Tool Only. Sourced ideas are not professional financial advice. All stock values, indicators, and predictions are produced using statistical AI models.
             </p>
         </div>
    </div>
  );
};

