import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Data = {
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

type ContextType = {
  data: Data | null;
  marketChartData: MarketChartData | null;
  error: { message: string } | null;
  isLoading: boolean;
  time: number;
  setTime: (time: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  coin: string;
  setCoin: (coin: string) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Data | null>(null);
  const [marketChartData, setMarketChartData] = useState<MarketChartData | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [currency, setCurrency] = useState<string>("usd");
  const [coin, setCoin] = useState<string>("bitcoin");
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': import.meta.env.REACT_APP_CG_API_KEY ?? "CG-XcnKmXvKxaX8ZVoNcTWagtoR"
          }
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError({ message: (err as Error).message });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${time}&interval=daily`, {
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

    fetchData();
    fetchChartData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [coin, time, currency]);

  return (
    <Context.Provider value={{ data, marketChartData, error, isLoading, time, setTime, coin, setCoin, currency, setCurrency }}>
      {children}
    </Context.Provider>
  );
};

export const useCoin = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useCoin must be used within a CoinProvider');
  }
  return context;
}; 