import React, { useState, useEffect, useRef } from 'react';
import { PnlInput, indianStockList } from '../types';
import { IndianRupee, Loader2, Search, Briefcase, ChevronRight, Hash } from 'lucide-react';
 
interface PnlCalculatorProps {
  input: PnlInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSymbolSelect: (symbol: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isPriceLoading: boolean;
}

// Popular stock picks for rapid testing/ux convenience
const POPULAR_STOCKS = [
  { symbol: 'RELIANCE.NS', name: 'Reliance' },
  { symbol: 'TCS.NS', name: 'TCS' },
  { symbol: 'INFY.NS', name: 'Infosys' },
  { symbol: 'SBIN.NS', name: 'SBI' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' }
];
 
const InputField: React.FC<{
    id: keyof PnlInput;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    type?: string;
    icon?: React.ReactNode;
    autoComplete?: string;
    isLoading?: boolean;
}> = ({ id, label, placeholder, value, onChange, onFocus, type = "text", icon, autoComplete = "off", isLoading = false }) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {label}
        </label>
        <div className="relative rounded-xl transition-all duration-200">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    {icon}
                </div>
            )}
            <input
                type={type}
                name={id}
                id={id}
                className={`block w-full rounded-xl border border-gray-800/80 bg-slate-900/40 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all duration-200 outline-none h-12 ${icon ? 'pl-10' : 'pl-4'} pr-10`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                required
                autoComplete={autoComplete}
            />
            {isLoading && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <Loader2 className="animate-spin h-5 w-5 text-indigo-400" />
                </div>
            )}
        </div>
    </div>
);

export const PnlCalculator: React.FC<PnlCalculatorProps> = ({ input, onInputChange, onSymbolSelect, onSubmit, isLoading, isPriceLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    
    const filteredStocks = searchTerm.length > 0 ? indianStockList.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : indianStockList;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e);
        setSearchTerm(e.target.value);
        if (!isSearchVisible) setIsSearchVisible(true);
    };
    
    const handleSymbolSelect = (symbol: string) => {
        onSymbolSelect(symbol);
        setSearchTerm(symbol);
        setIsSearchVisible(false);
    };

    return (
        <form onSubmit={onSubmit} className="bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-800/80 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 pb-2 border-b border-gray-800/50">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Briefcase className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Investment Analyzer</h2>
                    <p className="text-xs text-gray-400">Enter your holding details to check unrealized PnL</p>
                </div>
            </div>

            <div ref={searchRef} className="relative">
                <InputField 
                    id="symbol"
                    label="Stock Symbol"
                    placeholder="Type to search (e.g., RELIANCE.NS)"
                    value={input.symbol}
                    onChange={handleSymbolChange}
                    onFocus={() => { setSearchTerm(input.symbol); setIsSearchVisible(true); }}
                    autoComplete="off"
                    icon={<Search className="h-4 w-4" />}
                />
                
                {isSearchVisible && (
                     <div className="absolute z-30 mt-2 w-full bg-[#0e1322] border border-gray-800 rounded-xl shadow-2xl max-h-64 overflow-y-auto backdrop-blur-xl">
                        {filteredStocks.length > 0 ? (
                            <ul className="py-1.5 divide-y divide-gray-800/30">
                                {filteredStocks.slice(0, 8).map(stock => (
                                    <li key={stock.symbol}
                                        className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-indigo-600/20 cursor-pointer flex justify-between items-center transition-colors"
                                        onClick={() => handleSymbolSelect(stock.symbol)}>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-white tracking-wide font-mono text-xs">{stock.symbol}</span>
                                            <span className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[240px] md:max-w-xs">{stock.name}</span>
                                        </div>
                                        <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-3.5 text-sm text-gray-400">No matching NSE stocks found.</div>
                        )}
                    </div>
                )}
            </div>

            {/* Quick selectors */}
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Popular Quick Picks</p>
                <div className="flex flex-wrap gap-1.5">
                    {POPULAR_STOCKS.map(stock => (
                        <button
                            key={stock.symbol}
                            type="button"
                            onClick={() => handleSymbolSelect(stock.symbol)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono border transition-all duration-200 cursor-pointer ${
                                input.symbol === stock.symbol 
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10' 
                                : 'bg-slate-800/40 border-gray-800 text-gray-300 hover:bg-slate-800 hover:text-white hover:border-gray-700'
                            }`}
                        >
                            {stock.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <InputField 
                    id="quantity"
                    label="Quantity"
                    placeholder="Enter units"
                    value={input.quantity}
                    onChange={onInputChange}
                    type="number"
                    icon={<Hash className="h-4 w-4" />}
                />
                <InputField 
                    id="buyPrice"
                    label="Avg Buy Price (₹)"
                    placeholder="0.00"
                    value={input.buyPrice}
                    onChange={onInputChange}
                    type="number"
                    icon={<IndianRupee className="h-4 w-4" />}
                />
                <InputField 
                    id="currentPrice"
                    label="Current Price (₹)"
                    placeholder="Auto-fetching..."
                    value={input.currentPrice}
                    onChange={onInputChange}
                    type="number"
                    icon={<IndianRupee className="h-4 w-4" />}
                    isLoading={isPriceLoading}
                />
            </div>
            
            <p className="text-[11px] text-gray-400/80 bg-slate-900/80 p-3 rounded-lg border border-gray-800/40 leading-relaxed">
                <span className="font-semibold text-indigo-400">💡 Tip:</span> Select a stock from the search or quick picks list, and the system will automatically fetch its live market price via AI. You can also modify it manually.
            </p>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center h-12 px-6 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl shadow-indigo-600/25 cursor-pointer transform hover:-translate-y-[1px] active:translate-y-0"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Analyzing Analysis & Sourcing RSI Recommendations...
                    </>
                ) : (
                    'Analyze Performance & Get Advisory'
                )}
            </button>
        </form>
    );
};

