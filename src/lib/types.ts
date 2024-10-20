export type CoinDescriptionShort = {
  id: string;
  symbol: string;
  name: string;
  image: string;
};

export type CoinDescriptionLong = CoinDescriptionShort & {
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
  current_price: number;
  circulating_supply: number;
  total_supply: number;
};

export type ColorChartSpecs = {
  borderColor: string;
  progressBarBgColor?: string;
  gradientStart: string;
  gradientStop: string;
};
