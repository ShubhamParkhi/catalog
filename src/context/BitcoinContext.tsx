import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type BitcoinData = {
  image: { large: string };
  name: string;
  symbol: string;
  market_data: { 
    current_price: Record<string, number>;
    price_change_24h: string;
    price_change_percentage_24h: string;
    ath: Record<string, number>;
    market_cap: Record<string, number>;
    circulating_supply: string
  };
  hashing_algorithm: string;
  genesis_date: string;
  market_cap_rank: number;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  description: { en: string };
  links: { homepage: string[]; whitepaper: string };
};

type MarketChartData = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

type BitcoinContextType = {
  bitcoinData: BitcoinData | null;
  marketChartData: MarketChartData | null;
  error: { message: string } | null;
  isLoading: boolean;
  time: number;
  setTime: (time: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
};

const BitcoinContext = createContext<BitcoinContextType | undefined>(undefined);

export const BitcoinProvider = ({ children }: { children: ReactNode }) => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [marketChartData, setMarketChartData] = useState<MarketChartData | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [currency, setCurrency] = useState<string>("usd");
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(30);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': import.meta.env.REACT_APP_CG_API_KEY ?? "CG-XcnKmXvKxaX8ZVoNcTWagtoR"
          }
        });
        const data = await response.json();
        setBitcoinData(data);
      } catch (err) {
        setError({ message: (err as Error).message });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${time}&interval=daily`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': import.meta.env.REACT_APP_CG_API_KEY ?? "CG-XcnKmXvKxaX8ZVoNcTWagtoR"
          }
        });
        const data = await response.json();
        setMarketChartData(data);
      } catch (err) {
        setError({ message: (err as Error).message });
      }
    };

    fetchBitcoinData();
    fetchChartData();
    const intervalId = setInterval(fetchChartData, 1000);

    return () => clearInterval(intervalId);
  }, [time, currency]);

  return (
    <BitcoinContext.Provider value={{ bitcoinData, marketChartData, error, isLoading, time, setTime, currency, setCurrency }}>
      {children}
    </BitcoinContext.Provider>
  );
};

export const useBitcoin = () => {
  const context = useContext(BitcoinContext);
  if (context === undefined) {
    throw new Error('useBitcoin must be used within a BitcoinProvider');
  }
  return context;
}; 