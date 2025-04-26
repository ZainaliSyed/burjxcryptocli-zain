import { Coin, SimplifiedCoin, BurjxCoin, OHLCData } from '../types/coin';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const BASE_BURJX_URL = 'https://coingeko.burjx.com';

export const fetchTopCoins = async (
  order: string,
  limit: number
): Promise<Coin[] | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=${order}&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
    );
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data: Coin[] = await response.json();
    return data.map((coin): Coin => ({
      id: coin.id,
      productId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      sparkline:[],
    }));
  } catch (error) {
    console.error('Could not fetch coins:', error);
    return null;
  }
};

export const fetchAllCoins = async (page: number, pageSize: number): Promise<BurjxCoin[] | null> => {
    try {
        const response = await fetch(`${BASE_BURJX_URL}/coin-prices-all?currency=usd&page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        const data: BurjxCoin[] = await response.json();
        return data;
    } catch (error) {
        console.error('Could not fetch all coins:', error);
        return null;
    }
};

export const fetchCoinOHLC = async (
    productId: string,
    days: string
  ): Promise<OHLCData[] | null> => {
    try {
      const response = await fetch(
        `${BASE_BURJX_URL}/coin-ohlc?productId=${productId}&days=${days}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        console.error('Error fetching OHLC data:', response.status);
        return null;
      }
      const data: OHLCData[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching OHLC data:', error);
      return null;
    }
  };
