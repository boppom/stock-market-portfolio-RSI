import React, { useState, useEffect, useRef } from 'react';
import { PnlInput } from '../types';
import { RupeeIcon, SpinnerIcon } from './Icons';
import { indianStockList } from '../data/Stocks';

interface PnlCalculatorProps {
  input: PnlInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSymbolSelect: (symbol: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isPriceLoading: boolean;
}

const InputField: React.FC<{
    id: keyof PnlInput;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    type?: string;
    hasIcon?: boolean;
    autoComplete?: string;
    isLoading?: boolean;
}> = ({ id, label, placeholder, value, onChange, onFocus, type = "text", hasIcon = false, autoComplete = "off", isLoading = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300">
            {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
            {hasIcon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RupeeIcon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                type={type}
                name={id}
                id={id}
                className={`block w-full rounded-md border-gray-600 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${hasIcon ? 'pl-10' : 'pl-3'}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                required
                autoComplete={autoComplete}
            />
            {isLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <SpinnerIcon className="h-5 w-5 text-gray-400" />
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
    ) : indianStockList; // Show all stocks if search term is empty

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
        <form onSubmit={onSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-center text-white">Analyze Your Holding</h2>
            <div ref={searchRef} className="relative">
                <InputField 
                    id="symbol"
                    label="Stock Symbol"
                    placeholder="Search Indian stocks..."
                    value={input.symbol}
                    onChange={handleSymbolChange}
                    onFocus={() => { setSearchTerm(input.symbol); setIsSearchVisible(true); }}
                    autoComplete="off"
                />
                {isSearchVisible && (
                     <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredStocks.length > 0 ? (
                            <ul>
                                {filteredStocks.slice(0, 10).map(stock => (
                                    <li key={stock.symbol}
                                        className="px-4 py-2 text-sm text-white hover:bg-indigo-500 cursor-pointer"
                                        onClick={() => handleSymbolSelect(stock.symbol)}>
                                        <span className="font-bold">{stock.symbol}</span> - <span>{stock.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-400">No stocks found.</div>
                        )}
                    </div>
                )}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField 
                    id="quantity"
                    label="Quantity"
                    placeholder=""
                    value={input.quantity}
                    onChange={onInputChange}
                    type="number"
                />
                <InputField 
                    id="buyPrice"
                    label="Average Buy Price"
                    placeholder=""
                    value={input.buyPrice}
                    onChange={onInputChange}
                    type="number"
                    hasIcon
                />
                <InputField 
                    id="currentPrice"
                    label="Current Market Price"
                    placeholder=""
                    value={input.currentPrice}
                    onChange={onInputChange}
                    type="number"
                    hasIcon
                    isLoading={isPriceLoading}
                />
            </div>
            <p className="text-xs text-center text-gray-500 !-mt-2">
                Current price is fetched by AI and may have a slight delay.
            </p>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
                {isLoading ? 'Analyzing...' : 'Analyze & Get Recommendations'}
            </button>
        </form>
    );
};
