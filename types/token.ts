export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  category: TokenCategory;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  pairAddress: string;
  previousPrice?: number;
}

