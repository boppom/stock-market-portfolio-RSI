import React, { useState } from 'react';
import { StockRecommendation } from '../types';
import { Share2, Sparkles, TrendingUp, TrendingDown, ClipboardCheck } from 'lucide-react';

interface RecommendationCardProps {
    stock: StockRecommendation;
}

const StrategyBadge: React.FC<{ strategy: 'Oversold' | 'Overbought' }> = ({ strategy }) => {
    const isOversold = strategy === 'Oversold';
    const bgColor = isOversold ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    const icon = isOversold ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />;
    
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wider uppercase ${bgColor}`}>
            {icon}
            {strategy}
        </span>
    )
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ stock }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const shareText = `🎯 AI RSI Opportunity (${stock.strategy}): ${stock.company_name} (${stock.stock_symbol}) at ₹${stock.current_price.toFixed(2)}. RSI is ${stock.rsi_value.toFixed(2)}. Sourcing Reason: ${stock.recommendation_reason}`;
        navigator.clipboard.writeText(shareText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Calculate slider percentage for RSI spectrum (0 - 100)
    const rsiPercent = Math.min(Math.max(stock.rsi_value, 0), 100);

    return (
        <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
            
            {/* Ambient hover light effect */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all duration-300"></div>

            <div>
                {/* Header info */}
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-800/40">
                    <div className="min-w-0">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono bg-indigo-500/10 px-2 py-0.5 rounded-md">
                            {stock.stock_symbol}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2 truncate group-hover:text-indigo-200 transition-colors">
                            {stock.company_name}
                        </h3>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-base font-bold text-white font-mono">
                            ₹{stock.current_price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs font-semibold text-cyan-400 mt-1 font-mono">
                            RSI: {stock.rsi_value.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <StrategyBadge strategy={stock.strategy} />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center">
                        <Sparkles className="h-3 w-3 mr-1 text-indigo-400" /> Technical Signal
                    </span>
                </div>

                {/* RSI Spectrum Gauge Slider */}
                <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">
                        <span>Oversold (&lt;30)</span>
                        <span>Neutral</span>
                        <span>Overbought (&gt;70)</span>
                    </div>
                    
                    <div className="relative h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-gray-800/30">
                        {/* Underlay spectrum zones */}
                        <div className="absolute inset-y-0 left-0 w-[30%] bg-emerald-500/20"></div>
                        <div className="absolute inset-y-0 left-[30%] right-[30%] bg-slate-700/10"></div>
                        <div className="absolute inset-y-0 right-0 w-[30%] bg-amber-500/20"></div>

                        {/* Active point indicator on the slider */}
                        <div 
                            className={`absolute top-0 bottom-0 w-2.5 -ml-1 rounded-full border border-white/60 shadow-lg transition-all duration-500 ${
                                stock.rsi_value <= 30 ? 'bg-emerald-400 shadow-emerald-500/50' : stock.rsi_value >= 70 ? 'bg-amber-400 shadow-amber-500/50' : 'bg-indigo-400'
                            }`}
                            style={{ left: `${rsiPercent}%` }}
                        ></div>
                    </div>
                </div>

                {/* Advisory message description */}
                <p className="text-gray-300 mt-5 text-xs leading-relaxed font-sans bg-slate-950/25 p-3.5 rounded-xl border border-gray-800/20 text-justify">
                    {stock.recommendation_reason}
                </p>
            </div>

            {/* Actions panel */}
            <div className="mt-5 pt-4 border-t border-gray-800/30 flex justify-end">
                <button
                    onClick={handleShare}
                    className="flex items-center space-x-1.5 text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                    aria-label="Share recommendation"
                >
                    {copied ? (
                        <>
                            <ClipboardCheck className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied to Clipboard</span>
                        </>
                    ) : (
                        <>
                            <Share2 className="h-3.5 w-3.5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                            <span>Share Signal Details</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

