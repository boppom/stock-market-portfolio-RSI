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

export const indianStockList: StockListItem[] = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd.' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services Ltd.' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd.' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever Ltd.' },
  { symbol: 'INFY.NS', name: 'Infosys Ltd.' },
  { symbol: 'SBIN.NS', name: 'State Bank of India' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Ltd.' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Ltd.' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank Ltd.' },
  { symbol: 'WIPRO.NS', name: 'Wipro Ltd.' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies Ltd.' },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints Ltd.' },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India Ltd.' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro Ltd.' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank Ltd.' },
  { symbol: 'TITAN.NS', name: 'Titan Company Ltd.' },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement Ltd.' },
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries Ltd.' },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises Ltd.' },
  { symbol: 'ITC.NS', name: 'ITC Ltd.' },
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv Ltd.' },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India Ltd.' },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra Ltd.' },
  { symbol: 'NTPC.NS', name: 'NTPC Ltd.' },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation of India Ltd.' },
  { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank Ltd.' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel Ltd.' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Ltd.' },
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel Ltd.' },
  { symbol: 'TECHM.NS', name: 'Tech Mahindra Ltd.' },
  { symbol: 'GRASIM.NS', name: 'Grasim Industries Ltd.' },
  { symbol: 'CIPLA.NS', name: 'Cipla Ltd.' },
  { symbol: 'DRREDDY.NS', name: 'Dr. Reddy\'s Laboratories Ltd.' },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports and Special Economic Zone Ltd.' },
  { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance Company Ltd.' },
  { symbol: 'SBILIFE.NS', name: 'SBI Life Insurance Company Ltd.' },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto Ltd.' },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp Ltd.' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors Ltd.' },
  { symbol: 'TATACONSUM.NS', name: 'Tata Consumer Products Ltd.' },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries Ltd.' },
  { symbol: 'UPL.NS', name: 'UPL Ltd.' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries Ltd.' },
  { symbol: 'COALINDIA.NS', name: 'Coal India Ltd.' },
  { symbol: 'ONGC.NS', name: 'Oil & Natural Gas Corporation Ltd.' },
  { symbol: 'BPCL.NS', name: 'Bharat Petroleum Corporation Ltd.' },
  { symbol: 'IOC.NS', name: 'Indian Oil Corporation Ltd.' },
  { symbol: 'SHREECEM.NS', name: 'Shree Cement Ltd.' },
  { symbol: 'DIVISLAB.NS', name: 'Divi\'s Laboratories Ltd.' },
  { symbol: 'LTIM.NS', name: 'LTIMindtree Ltd.' },
  { symbol: 'ZOMATO.NS', name: 'Zomato Ltd.' },
  { symbol: 'PAYTM.NS', name: 'One 97 Communications Ltd.' },
  { symbol: 'POLICYBZR.NS', name: 'PB Fintech Ltd.' },
  { symbol: 'NYKAA.NS', name: 'FSN E-Commerce Ventures Ltd.' },
  { symbol: 'DMART.NS', name: 'Avenue Supermarts Ltd.' },
  { symbol: 'PIDILITIND.NS', name: 'Pidilite Industries Ltd.' },
  { symbol: 'HAVELLS.NS', name: 'Havells India Ltd.' },
  { symbol: 'ICICIPRULI.NS', name: 'ICICI Prudential Life Insurance Company Ltd.' },
  { symbol: 'BERGEPAINT.NS', name: 'Berger Paints India Ltd.' },
  { symbol: 'SIEMENS.NS', name: 'Siemens Ltd.' },
  { symbol: 'DLF.NS', name: 'DLF Ltd.' },
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy Ltd.' },
  { symbol: 'ADANITRANS.NS', name: 'Adani Transmission Ltd.' },
  { symbol: 'BANKBARODA.NS', name: 'Bank of Baroda' },
  { symbol: 'PNB.NS', name: 'Punjab National Bank' },
  { symbol: 'IDFCFIRSTB.NS', name: 'IDFC First Bank Ltd.' },
  { symbol: 'SAIL.NS', name: 'Steel Authority of India Ltd.' },
  { symbol: 'GAIL.NS', name: 'GAIL (India) Ltd.' },
  { symbol: 'LUPIN.NS', name: 'Lupin Ltd.' },
  { symbol: 'TORNTPHARM.NS', name: 'Torrent Pharmaceuticals Ltd.' },
  { symbol: 'AUROPHARMA.NS', name: 'Aurobindo Pharma Ltd.' },
  { symbol: 'GODREJCP.NS', name: 'Godrej Consumer Products Ltd.' },
  { symbol: 'DABUR.NS', name: 'Dabur India Ltd.' },
  { symbol: 'MARICO.NS', name: 'Marico Ltd.' },
  { symbol: 'VEDL.NS', name: 'Vedanta Ltd.' },
  { symbol: 'BANDHANBNK.NS', name: 'Bandhan Bank Ltd.' },
  { symbol: 'YESBANK.NS', name: 'Yes Bank Ltd.' },
  { symbol: 'AMBUJACEM.NS', name: 'Ambuja Cements Ltd.' },
  { symbol: 'ACC.NS', name: 'ACC Ltd.' },
  { symbol: 'IRCTC.NS', name: 'Indian Railway Catering & Tourism Corporation Ltd.' },
  { symbol: 'BOSCHLTD.NS', name: 'Bosch Ltd.' },
  { symbol: 'COLPAL.NS', name: 'Colgate-Palmolive (India) Ltd.' },
  { symbol: 'PFC.NS', name: 'Power Finance Corporation Ltd.' },
  { symbol: 'RECLTD.NS', name: 'REC Ltd.' },
  { 'symbol': 'MCDOWELL-N.NS', 'name': 'United Spirits Ltd.' },
  { 'symbol': 'UBL.NS', 'name': 'United Breweries Ltd.' },
  { 'symbol': 'IGL.NS', 'name': 'Indraprastha Gas Ltd.' },
  { 'symbol': 'CONCOR.NS', 'name': 'Container Corporation of India Ltd.' },
  { 'symbol': 'MRF.NS', 'name': 'MRF Ltd.' },
  { 'symbol': 'APOLLOHOSP.NS', 'name': 'Apollo Hospitals Enterprise Ltd.' },
  { 'symbol': 'JUBLFOOD.NS', 'name': 'Jubilant FoodWorks Ltd.' },
  { 'symbol': 'TATACHEM.NS', 'name': 'Tata Chemicals Ltd.' },
  { 'symbol': 'TATAPOWER.NS', 'name': 'Tata Power Company Ltd.' },
  { 'symbol': 'PETRONET.NS', 'name': 'Petronet LNG Ltd.' },
  { 'symbol': 'HINDPETRO.NS', 'name': 'Hindustan Petroleum Corporation Ltd.' },
  { 'symbol': 'MOTHERSON.NS', 'name': 'Samvardhana Motherson International Ltd.' },
  { 'symbol': 'CHOLAFIN.NS', 'name': 'Cholamandalam Investment and Finance Company Ltd.' },
  { 'symbol': 'SRF.NS', 'name': 'SRF Ltd.' },
  { 'symbol': 'MUTHOOTFIN.NS', 'name': 'Muthoot Finance Ltd.' },
  { 'symbol': 'BIOCON.NS', 'name': 'Biocon Ltd.' },
  { 'symbol': 'ASHOKLEY.NS', 'name': 'Ashok Leyland Ltd.' },
  { 'symbol': 'BHARATFORG.NS', 'name': 'Bharat Forge Ltd.' },
  { 'symbol': 'LICHSGFIN.NS', 'name': 'LIC Housing Finance Ltd.' },
  { 'symbol': 'INDIGO.NS', 'name': 'InterGlobe Aviation Ltd.' },
  { 'symbol': 'FEDERALBNK.NS', 'name': 'The Federal Bank Ltd.' },
  { symbol: 'ADANIPOWER.NS', name: 'Adani Power Ltd.' },
  { symbol: 'AMARAJABAT.NS', name: 'Amara Raja Batteries Ltd.' },
  { symbol: 'APOLLOTYRE.NS', name: 'Apollo Tyres Ltd.' },
  { symbol: 'AUBANK.NS', name: 'AU Small Finance Bank Ltd.' },
  { symbol: 'BAJAJHLDNG.NS', name: 'Bajaj Holdings & Investment Ltd.' },
  { symbol: 'BALKRISIND.NS', name: 'Balkrishna Industries Ltd.' },
  { symbol: 'BANKINDIA.NS', name: 'Bank of India' },
  { symbol: 'BHEL.NS', name: 'Bharat Heavy Electricals Ltd.' },
  { symbol: 'CANBK.NS', name: 'Canara Bank' },
  { symbol: 'CGPOWER.NS', name: 'CG Power and Industrial Solutions Ltd.' },
  { symbol: 'CUMMINSIND.NS', name: 'Cummins India Ltd.' },
  { symbol: 'ESCORTS.NS', name: 'Escorts Kubota Ltd.' },
  { symbol: 'EXIDEIND.NS', name: 'Exide Industries Ltd.' },
  { symbol: 'GLAND.NS', name: 'Gland Pharma Ltd.' },
  { symbol: 'GODREJPROP.NS', name: 'Godrej Properties Ltd.' },
  { symbol: 'HDFCAMC.NS', name: 'HDFC Asset Management Company Ltd.' },
  { symbol: 'HINDCOPPER.NS', name: 'Hindustan Copper Ltd.' },
  { symbol: 'HINDPETRO.NS', name: 'Hindustan Petroleum Corporation Ltd.' },
  { symbol: 'HINDZINC.NS', name: 'Hindustan Zinc Ltd.' },
  { symbol: 'ICICIGI.NS', name: 'ICICI Lombard General Insurance Company Ltd.' },
  { symbol: 'IDBI.NS', name: 'IDBI Bank Ltd.' },
  { symbol: 'IDEA.NS', name: 'Vodafone Idea Ltd.' },
  { symbol: 'INDIANB.NS', name: 'Indian Bank' },
  { symbol: 'INDHOTEL.NS', name: 'The Indian Hotels Company Ltd.' },
  { symbol: 'INDUSTOWER.NS', name: 'Indus Towers Ltd.' },
  { symbol: 'IOB.NS', name: 'Indian Overseas Bank' },
  { symbol: 'IPCALAB.NS', name: 'IPCA Laboratories Ltd.' },
  { symbol: 'JINDALSTEL.NS', name: 'Jindal Steel & Power Ltd.' },
  { symbol: 'JKCEMENT.NS', name: 'J.K. Cement Ltd.' },
  { symbol: 'JSWENERGY.NS', name: 'JSW Energy Ltd.' },
  { symbol: 'L&TFH.NS', name: 'L&T Finance Holdings Ltd.' },
  { symbol: 'LODHA.NS', name: 'Macrotech Developers Ltd.' },
  { symbol: 'MANAPPURAM.NS', name: 'Manappuram Finance Ltd.' },
  { symbol: 'MFSL.NS', name: 'Max Financial Services Ltd.' },
  { symbol: 'MPHASIS.NS', name: 'Mphasis Ltd.' },
  { symbol: 'NAUKRI.NS', name: 'Info Edge (India) Ltd.' },
  { symbol: 'NMDC.NS', name: 'NMDC Ltd.' },
  { symbol: 'OBEROIRLTY.NS', name: 'Oberoi Realty Ltd.' },
  { symbol: 'OFSS.NS', name: 'Oracle Financial Services Software Ltd.' },
  { symbol: 'PAGEIND.NS', name: 'Page Industries Ltd.' },
  { symbol: 'PERSISTENT.NS', name: 'Persistent Systems Ltd.' },
  { symbol: 'PIIND.NS', name: 'PI Industries Ltd.' },
  { symbol: 'POLYCAB.NS', name: 'Polycab India Ltd.' },
  { symbol: 'PVRINOX.NS', name: 'PVR INOX Ltd.' },
  { symbol: 'RBLBANK.NS', name: 'RBL Bank Ltd.' },
  { symbol: 'SJVN.NS', name: 'SJVN Ltd.' },
  { symbol: 'SOLARINDS.NS', name: 'Solar Industries India Ltd.' },
  { symbol: 'SRTRANSFIN.NS', name: 'Shriram Transport Finance Company Ltd.' },
  { symbol: 'STAR.NS', name: 'Strides Pharma Science Ltd.' },
  { symbol: 'SYNGENE.NS', name: 'Syngene International Ltd.' },
  { symbol: 'TATACOMM.NS', name: 'Tata Communications Ltd.' },
  { symbol: 'TATAELXSI.NS', name: 'Tata Elxsi Ltd.' },
  { symbol: 'TATAMTRDVR.NS', name: 'Tata Motors Ltd. - DVR' },
  { symbol: 'TORNTPOWER.NS', name: 'Torrent Power Ltd.' },
  { symbol: 'TRENT.NS', 'name': 'Trent Ltd.' },
  { symbol: 'TVSMOTOR.NS', name: 'TVS Motor Company Ltd.' },
  { symbol: 'UNIONBANK.NS', name: 'Union Bank of India' },
  { symbol: 'VBL.NS', name: 'Varun Beverages Ltd.' },
  { symbol: 'VOLTAS.NS', name: 'Voltas Ltd.' },
  { symbol: 'WHIRLPOOL.NS', name: 'Whirlpool of India Ltd.' },
  { symbol: 'ZEEL.NS', name: 'Zee Entertainment Enterprises Ltd.' },
  { symbol: 'ZYDUSLIFE.NS', name: 'Zydus Lifesciences Ltd.' },
  { symbol: 'ABB.NS', name: 'ABB India Ltd.' },
  { symbol: 'ALKEM.NS', name: 'Alkem Laboratories Ltd.' },
  { symbol: 'BEL.NS', name: 'Bharat Electronics Ltd.' },
  { symbol: 'COROMANDEL.NS', name: 'Coromandel International Ltd.' },
  { symbol: 'GMRINFRA.NS', name: 'GMR Airports Infrastructure Ltd.' },
  { symbol: 'HPN.NS', name: 'Hindustan Petroleum Corporation Ltd.' },
  { symbol: 'ISEC.NS', name: 'ICICI Securities Ltd.' },
  { symbol: 'JIOFIN.NS', name: 'Jio Financial Services Ltd.' },
  { symbol: 'LAURUSLABS.NS', name: 'Laurus Labs Ltd.' },
  { symbol: 'MRPL.NS', name: 'Mangalore Refinery and Petrochemicals Ltd.' },
  { symbol: 'NATIONALUM.NS', name: 'National Aluminium Company Ltd.' },
  { symbol: 'NHPC.NS', name: 'NHPC Ltd.' },
  { symbol: 'OIL.NS', name: 'Oil India Ltd.' },
  { symbol: 'PRESTIGE.NS', name: 'Prestige Estates Projects Ltd.' },
  { symbol: 'RAMCOEM.NS', name: 'The Ramco Cements Ltd.' },
  { symbol: 'SBICARD.NS', name: 'SBI Cards and Payment Services Ltd.' },
  { symbol: 'SUPREMEIND.NS', name: 'Supreme Industries Ltd.' },
  { symbol: 'THERMAX.NS', name: 'Thermax Ltd.' },
  { symbol: 'TIINDIA.NS', name: 'Tube Investments of India Ltd.' },
  { symbol: 'UCOBANK.NS', name: 'UCO Bank' },
];

export interface StockListItem {
  symbol: string;
  name: string;
}

const API_BASE = window.location.hostname.includes("github.io")
  ? "https://stock-market-portfolio-rsi.onrender.com"
  : "";

export const fetchStockRecommendations = async (lossAmount: number): Promise<StockRecommendation[]> => {
  try {
    const response = await fetch(`${API_BASE}/api/stock/recommendations`, {
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
    const response = await fetch(`${API_BASE}/api/stock/price?symbol=${encodeURIComponent(symbol)}`);

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