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