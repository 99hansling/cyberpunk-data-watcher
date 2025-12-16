export interface MarketDataPoint {
  time: string;
  price: number;
  volume: number;
}

export interface NewsItem {
  id: string;
  time: string;
  source: string;
  headline: string;
  impact: 'HIGH' | 'MED' | 'LOW';
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export interface AssetTicker {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface AIAnalysisResult {
  summary: string;
  keyLevels: {
    support: string;
    resistance: string;
  };
  sentimentScore: number; // 0 to 100
}

export enum TimeRange {
  H1 = '1H',
  D1 = '1D',
  W1 = '1W',
  M1 = '1M',
  Y1 = '1Y'
}