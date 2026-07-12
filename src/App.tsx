import React, { useState, useCallback, useEffect } from 'react';
import { PnlCalculator } from './components/PnlCalculator';
import { PnlResult } from './components/PnlResult';
import { StockRecommendations } from './components/StockRecommendations';
import { PnlInput, PnlResult as PnlResultType, StockRecommendation, fetchStockRecommendations, fetchCurrentStockPrice } from './types';
import { Sparkles, Activity, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState<PnlInput>({
    symbol: '',
    quantity: '',
    buyPrice: '',
    currentPrice: '',
  });

  const [result, setResult] = useState<PnlResultType | null>(null);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPriceLoading, setIsPriceLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);


  const fetchPriceForSymbol = useCallback(async (symbol: string) => {
    if (!symbol || !symbol.includes('.NS')) {
        return;
    }
    setIsPriceLoading(true);
    setPriceError(null);
    try {
        const price = await fetchCurrentStockPrice(symbol);
        setInput(prev => ({...prev, currentPrice: price.toFixed(2).toString()}));
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            setPriceError(err.message);
        }
        setInput(prev => ({...prev, currentPrice: ''}));
    } finally {
        setIsPriceLoading(false);
    }
  }, []);

  useEffect(() => {
    const symbol = input.symbol;
    // Debounce the price fetch when user is typing
    if (symbol && symbol.includes('.NS') && symbol.length > 4) {
      const debounceTimer = setTimeout(() => {
        fetchPriceForSymbol(symbol);
      }, 800);

      return () => clearTimeout(debounceTimer);
    }
  }, [input.symbol, fetchPriceForSymbol]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSymbolSelect = (symbol: string) => {
    setInput(prevInput => ({
      ...prevInput,
      symbol: symbol,
      currentPrice: '', // Clear previous price
    }));
    fetchPriceForSymbol(symbol); // Fetch price immediately on selection
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setRecommendations([]);
    setError(null);
    setPriceError(null);
    setIsLoading(true);

    const quantity = parseFloat(input.quantity);
    const buyPrice = parseFloat(input.buyPrice);
    const currentPrice = parseFloat(input.currentPrice);

    if (isNaN(quantity) || isNaN(buyPrice) || isNaN(currentPrice) || !input.symbol) {
      setError("Please fill all fields with valid values.");
      setIsLoading(false);
      return;
    }

    if (quantity <= 0 || buyPrice <= 0 || currentPrice <= 0) {
        setError("Numerical values must be positive.");
        setIsLoading(false);
        return;
    }

    const totalCost = buyPrice * quantity;
    const currentValue = currentPrice * quantity;
    const pnl = currentValue - totalCost;
    const isProfit = pnl >= 0;
    const percentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;
    const pnlResult = { 
      pnl, 
      isProfit,
      totalCost,
      currentValue,
      percentage,
      symbol: input.symbol
    };
    setResult(pnlResult);

    if (!isProfit) {
      try {
        const recs = await fetchStockRecommendations(pnl);
        setRecommendations(recs);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred while fetching recommendations.");
        }
      }
    }
    
    setIsLoading(false);
  }, [input]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 relative z-10 space-y-10">
        
        {/* Top Header Bar */}
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/20 shadow-lg shadow-indigo-600/5">
            <Activity className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            <span>NSE MARKET INTELLIGENCE ENGAGED</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-2 flex-wrap">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500">
                Indian Stock PNL &amp; RSI Advisor
              </span>
            </h1>
            <p className="max-w-2xl text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mx-auto">
              Calculate your unrealized holding gains/losses. In the event of a loss, our AI scanning engine crawls overbought/oversold RSI thresholds to source elite recovery setups.
            </p>
          </div>
        </header>

        {/* Form and Quick Picks */}
        <div className="max-w-4xl mx-auto">
          <PnlCalculator 
              input={input}
              onInputChange={handleInputChange}
              onSymbolSelect={handleSymbolSelect}
              onSubmit={handleSubmit}
              isLoading={isLoading && !result}
              isPriceLoading={isPriceLoading}
          />
          
          {/* Enhanced Error Alerts */}
          {(priceError || (error && !priceError)) && (
            <div className="mt-4 p-4 bg-red-900/15 border border-red-900/40 rounded-xl text-red-300 flex items-start space-x-3 text-xs sm:text-sm">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-red-200">Alert Notification</p>
                <p className="text-red-400/90 font-mono leading-relaxed">{priceError || error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results and Recommendations Dashboard */}
        <div className="max-w-4xl mx-auto space-y-8">
          {result && <PnlResult result={result} />}

          {result && !result.isProfit && (
            <StockRecommendations 
              recommendations={recommendations}
              isLoading={isLoading && !result.isProfit}
              error={!priceError ? error : null} 
              lossAmount={result.pnl}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;