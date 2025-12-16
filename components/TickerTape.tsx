import React, { useEffect, useState } from 'react';
import { AssetTicker } from '../types';
import { Icons } from './Icon';

const INITIAL_TICKERS: AssetTicker[] = [
  { symbol: 'BTC/USD', price: 95421.50, change: 1245.20, changePercent: 1.32 },
  { symbol: 'ETH/USD', price: 3450.12, change: -45.30, changePercent: -1.29 },
  { symbol: 'SOL/USD', price: 145.80, change: 5.20, changePercent: 3.70 },
  { symbol: 'BNB/USD', price: 605.15, change: 2.10, changePercent: 0.35 },
  { symbol: 'XRP/USD', price: 0.6234, change: -0.012, changePercent: -1.80 },
  { symbol: 'DOGE/USD', price: 0.1245, change: 0.005, changePercent: 4.10 },
  { symbol: 'ADA/USD', price: 0.45, change: -0.01, changePercent: -2.10 },
  { symbol: 'DOT/USD', price: 7.20, change: 0.15, changePercent: 2.12 },
  { symbol: 'LINK/USD', price: 18.40, change: 0.40, changePercent: 2.22 },
];

export const TickerTape: React.FC = () => {
  // Simulate live price updates
  const [tickers, setTickers] = useState(INITIAL_TICKERS);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: t.price * (1 + (Math.random() * 0.002 - 0.001)), // Random small fluctuation
        changePercent: t.changePercent + (Math.random() * 0.1 - 0.05)
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-cyber-yellow border-b-2 border-cyber-pink h-10 flex items-center overflow-hidden whitespace-nowrap">
      <div className="flex items-center px-4 bg-cyber-black text-cyber-yellow font-black h-full z-10 font-mono text-sm border-r-2 border-cyber-pink cyber-clip-top">
        <Icons.Activity size={16} className="mr-2 animate-pulse text-cyber-blue" />
        NET_MARKETS // LIVE
      </div>
      <div className="flex animate-scroll-left space-x-8 pl-4 items-center bg-cyber-yellow text-black h-full">
        {[...tickers, ...tickers].map((ticker, i) => (
          <div key={`${ticker.symbol}-${i}`} className="flex items-center space-x-2 font-mono text-xs font-bold">
            <span className="text-black">{ticker.symbol}</span>
            <span className="text-black">{ticker.price.toFixed(ticker.price < 1 ? 4 : 2)}</span>
            <span className={ticker.changePercent >= 0 ? 'text-blue-700' : 'text-red-600'}>
              {ticker.changePercent >= 0 ? '▲' : '▼'}{ticker.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};