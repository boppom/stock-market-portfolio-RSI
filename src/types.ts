export interface PnlInput {
  symbol: string;
  quantity: string;
  buyPrice: string;
  currentPrice: string;
}

export interface PnlResult {
  pnl: number;
  isProfit: boolean;
}

export interface StockRecommendation {
  stock_symbol: string;
  company_name: string;
  current_price: number;
  rsi_value: number;
  strategy: 'Oversold' | 'Overbought';
  recommendation_reason: string;
}

export interface StockListItem {
  symbol: string;
  name: string;
}

export const fetchStockRecommendations = async (lossAmount: number): Promise<StockRecommendation[]> => {
  try {
    const response = await fetch("/api/stock/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lossAmount }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch stock recommendations.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching stock recommendations from server:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch stock recommendations from Gemini API.");
  }
};

export const fetchCurrentStockPrice = async (symbol: string): Promise<number> => {
  try {
    const response = await fetch(`/api/stock/price?symbol=${encodeURIComponent(symbol)}`);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to fetch current price for ${symbol}.`);
    }

    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error(`Error fetching price for ${symbol} from server:`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch current price for ${symbol}. Please enter it manually.`);
  }
};