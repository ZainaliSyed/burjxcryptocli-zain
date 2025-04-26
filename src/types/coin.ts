export interface BurjxCoin {
    productId: number;
    id: string;
    name: string;
    image: string;
    currentPrice: number;
    priceChangePercentage24h: number | null;
    sparkline: number[];
    marketCap: number;
    tradingVolume: number;
    symbol: string;
  }

export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | {
      times: number;
      currency: string;
      percentage: number;
    };
    last_updated: string;
    price_change_percentage_1h_in_currency?: number;
  }
  export interface SimplifiedCoin {
    id: string;
    productId: number;
    name: string;
    symbol: string;
    image: string;
    currentPrice: number;
    marketCap: number;
    tradingVolume: number;
    priceChangePercentage24h: number;
    sparkline: number[];
  }
export interface OHLCDataPoint {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
}
  export const transformOHLC = (data: any[]): OHLCDataPoint[] => {
    return data.map(item => ({
      timestamp: item.date,
      open: item.usd.open,
      high: item.usd.high,
      low: item.usd.low,
      close: item.usd.close,
    }));
  };
  export interface OHLCData {
    date: number;
    usd: {
      open: number;
      high: number;
      low: number;
      close: number;
    };
    aed: {
      open: number;
      high: number;
      low: number;
      close: number;
    };
  }