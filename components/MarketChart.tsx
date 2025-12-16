import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TimeRange } from '../types';

interface DataPoint {
  time: string;
  price: number;
}

const generateData = (points: number): DataPoint[] => {
  const data: DataPoint[] = [];
  let price = 95000;
  const now = new Date();
  for (let i = 0; i < points; i++) {
    const time = new Date(now.getTime() - (points - i) * 60000 * 15); // 15 min candles
    price = price + (Math.random() - 0.5) * 500;
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: price
    });
  }
  return data;
};

export const MarketChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [range, setRange] = useState<TimeRange>(TimeRange.D1);

  useEffect(() => {
    setData(generateData(100));
    
    // Live update simulation
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const newPrice = last.price + (Math.random() - 0.5) * 200;
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: newPrice
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [range]);

  const currentPrice = data.length > 0 ? data[data.length - 1].price : 0;
  const startPrice = data.length > 0 ? data[0].price : 0;
  const isUp = currentPrice >= startPrice;

  // Cyberpunk colors: Cyan for Up, Pink for Down
  const strokeColor = isUp ? "#00F0FF" : "#FF003C";

  return (
    <div className="flex flex-col h-full bg-cyber-panel border-r border-b border-cyber-border relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-yellow z-10"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-blue z-10"></div>

      <div className="flex items-center justify-between p-4 border-b border-cyber-border bg-cyber-black/50 backdrop-blur-sm z-20">
        <div className="flex items-center space-x-4">
          <h2 className="text-cyber-yellow font-mono text-2xl font-black tracking-tighter">BTC_USD</h2>
          <span className={`font-mono text-2xl font-bold ${isUp ? 'text-cyber-blue' : 'text-cyber-pink'} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]`}>
            {currentPrice.toFixed(2)}
          </span>
          <span className="text-xs text-cyber-dim font-mono font-bold tracking-widest">VOL::42.5K</span>
        </div>
        <div className="flex space-x-1">
          {Object.values(TimeRange).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1 text-xs font-mono font-bold transition-all border border-transparent ${
                range === r 
                  ? 'bg-cyber-blue text-black border-cyber-blue shadow-[0_0_10px_#00F0FF]' 
                  : 'text-slate-500 hover:text-cyber-yellow hover:border-cyber-yellow hover:bg-transparent'
              } cyber-clip`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow w-full relative p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" opacity={0.3} />
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d35" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="#4b5563" 
              tick={{fill: '#4b5563', fontSize: 10, fontFamily: 'JetBrains Mono'}}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#4b5563"
              tick={{fill: '#4b5563', fontSize: 10, fontFamily: 'JetBrains Mono'}}
              tickLine={false}
              axisLine={false}
              orientation="right"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050505', borderColor: strokeColor, color: '#fff', boxShadow: `0 0 10px ${strokeColor}` }}
              itemStyle={{ fontFamily: 'JetBrains Mono', color: strokeColor }}
              labelStyle={{ fontFamily: 'JetBrains Mono', color: '#9ca3af' }}
              formatter={(value: number) => [value.toFixed(2), 'PRICE']}
            />
            <ReferenceLine y={startPrice} stroke="#4b5563" strokeDasharray="3 3" />
            <Area 
              type="step" 
              dataKey="price" 
              stroke={strokeColor} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={2}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-0">
          <span className="text-8xl font-black text-transparent stroke-2 stroke-cyber-pink font-sans tracking-tighter" style={{WebkitTextStroke: '2px #333'}}>NIGHT<br/>CITY</span>
        </div>
      </div>
    </div>
  );
};