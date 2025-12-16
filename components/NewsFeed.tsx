import React, { useEffect, useState } from 'react';
import { Icons } from './Icon';
import { generateBreakingNews } from '../services/geminiService';
import { NewsItem } from '../types';

export const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([
    { id: '1', time: '10:42:15', source: 'N54 NEWS', headline: 'Arasaka Corp announces record profits despite orbital station damage.', impact: 'HIGH', sentiment: 'BEARISH' },
    { id: '2', time: '10:38:22', source: 'WNS', headline: 'Militech combat AI "Daemon-7" leaked on dark net forums.', impact: 'MED', sentiment: 'BULLISH' },
    { id: '3', time: '10:35:09', source: 'FIXER', headline: 'BioTechnica crop failure in Southern Badlands causes food riots.', impact: 'LOW', sentiment: 'NEUTRAL' },
    { id: '4', time: '10:15:45', source: 'NCPD', headline: 'Cyberpsycho sighting in Watson. Lockdown protocols initiated.', impact: 'HIGH', sentiment: 'BEARISH' },
    { id: '5', time: '09:55:00', source: 'TRAUMA', headline: 'Platinum membership prices hiked by 15% effective immediately.', impact: 'MED', sentiment: 'NEUTRAL' },
  ]);

  useEffect(() => {
    const fetchNews = async () => {
        const newItems = await generateBreakingNews();
        if (newItems.length > 0) {
            setNews(prev => [...newItems, ...prev].slice(0, 20));
        }
    }
  }, []);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-cyber-yellow/30 pb-2">
        <h2 className="text-xl font-black font-mono text-cyber-yellow tracking-[0.2em] italic">
          <Icons.Radio className="inline mr-2 mb-1" size={20}/>
          INTERCEPTED_DATA_STREAM
        </h2>
        <div className="flex gap-2">
           <span className="text-[10px] font-mono text-cyber-black bg-cyber-blue px-2 py-0.5 font-bold">ENCRYPTION: NONE</span>
           <span className="text-[10px] font-mono text-cyber-black bg-cyber-pink px-2 py-0.5 font-bold animate-pulse">LIVE</span>
        </div>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-10">
        {news.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative bg-cyber-black border-l-4 hover:bg-cyber-yellow/5 transition-all duration-300 hud-panel-cut"
            style={{ 
              borderColor: item.impact === 'HIGH' ? '#FF003C' : (item.impact === 'MED' ? '#FCEE0A' : '#00F0FF'),
              marginTop: index === 0 ? '0' : '12px'
            }}
          >
            {/* Top decorative line */}
            <div className="absolute top-0 right-0 w-16 h-[2px] bg-cyber-dim opacity-30 group-hover:bg-cyber-yellow"></div>

            <div className="p-4 flex flex-col gap-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-cyber-dim uppercase tracking-wider">
                <span className="flex items-center gap-2">
                   <span className={item.impact === 'HIGH' ? "text-cyber-pink" : "text-cyber-blue"}>
                     [{item.source}]
                   </span>
                   <span>ID: 0x{item.id.padStart(4, '0')}</span>
                </span>
                <span className="group-hover:text-cyber-yellow">{item.time}</span>
              </div>
              
              <h3 className="text-sm font-mono font-bold text-slate-200 group-hover:text-cyber-yellow transition-colors leading-relaxed mt-1">
                {item.impact === 'HIGH' && <span className="text-cyber-pink mr-2 animate-pulse">⚠ CRITICAL_UPDATE</span>}
                {item.headline}
              </h3>

              <div className="mt-2 flex justify-between items-end opacity-50 group-hover:opacity-100 transition-opacity">
                 <div className="h-1 w-24 bg-cyber-dim/20 overflow-hidden">
                    <div className="h-full bg-cyber-blue animate-[scroll-left_2s_linear_infinite]" style={{width: '50%'}}></div>
                 </div>
                 <span className="text-[10px] font-mono text-cyber-pink">SENTIMENT: {item.sentiment}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* End of Stream Marker */}
        <div className="text-center py-8 opacity-50">
           <p className="font-mono text-[10px] text-cyber-yellow tracking-widest">--- END OF PACKET STREAM ---</p>
        </div>
      </div>
    </div>
  );
};