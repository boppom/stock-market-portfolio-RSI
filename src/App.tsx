import React, { useState, useCallback, useEffect } from 'react';
import { PnlCalculator } from './components/PnlCalculator';
import { PnlResult } from './components/PnlResult';
import { StockRecommendations } from './components/StockRecommendations';
import { PnlInput, PnlResult as PnlResultType, StockRecommendation } from './types';
import { fetchStockRecommendations, fetchCurrentStockPrice } from './services/geminiService';

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

    const pnl = (currentPrice - buyPrice) * quantity;
    const isProfit = pnl >= 0;
    const pnlResult = { pnl, isProfit };
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
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Indian Stock PNL & RSI Advisor
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Calculate your unrealized profit or loss. If you're in a loss, our AI will suggest potential recovery opportunities using RSI analysis.
          </p>
        </header>

        <PnlCalculator 
            input={input}
            onInputChange={handleInputChange}
            onSymbolSelect={handleSymbolSelect}
            onSubmit={handleSubmit}
            isLoading={isLoading && !result}
            isPriceLoading={isPriceLoading}
        />
        
        {priceError && <p className="text-center text-red-400 text-sm mt-4">{priceError}</p>}
        {error && !priceError && <p className="text-center text-red-400 text-sm mt-4">{error}</p>}


        {result && <PnlResult result={result} />}

        {result && !result.isProfit && (
          <StockRecommendations 
            recommendations={recommendations}
            isLoading={isLoading && !result.isProfit}
            error={!priceError ? error : null} // Only show recommendation error if there's no price error
            lossAmount={result.pnl}
          />
        )}
      </main>
    </div>
  );
};

export default App;