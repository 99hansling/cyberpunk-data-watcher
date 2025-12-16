import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { getMarketSentiment } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

export const TerminalAI: React.FC = () => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>(['> BIOS_CHECK... OK', '> CONNECTING_NEURAL_NET... OK', '> AWAITING_INPUT...']);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial analysis
    handleAnalyze('General Market Overview');
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  const handleAnalyze = async (query: string) => {
    setLoading(true);
    addLog(`RUN_PROTOCOL: analyze --context "${query}"`);
    addLog('DECRYPTING_DATA_STREAMS...');
    
    try {
      const result = await getMarketSentiment(query);
      setAnalysis(result);
      addLog('ANALYSIS_COMPLETE. RENDER_TARGET_ACQUIRED.');
    } catch (e) {
      addLog('ERROR: CONNECTION_SEVERED_BY_NETWATCH.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleAnalyze(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-cyber-black border-t border-r border-cyber-border text-xs font-mono relative">
        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
        </div>

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-cyber-dark border-b border-cyber-pink/50">
        <div className="flex items-center gap-2 text-cyber-pink">
          <Icons.Cpu size={14} className="animate-spin-slow" />
          <span className="font-bold tracking-widest text-shadow-pink">NETRUNNER_INTERFACE v2.77</span>
        </div>
        <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-cyber-yellow animate-ping"></div>
           <span className="text-cyber-yellow text-[10px]">CONNECTED</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 z-10">
        {/* Analysis Output */}
        {analysis && !loading && (
          <div className="border-l-4 border-cyber-yellow bg-cyber-yellow/5 p-4 relative cyber-clip">
             <h3 className="text-cyber-yellow text-sm font-bold mb-2 uppercase tracking-[0.2em] flex items-center gap-2">
                <Icons.Terminal size={12}/> INTELLIGENCE_SYNTHESIS
             </h3>
             <p className="text-cyber-blue mb-4 leading-relaxed font-mono text-xs shadow-black drop-shadow-md">{analysis.summary}</p>
             
             <div className="grid grid-cols-2 gap-4 mb-4 border-t border-cyber-border/50 pt-2">
               <div>
                 <span className="text-cyber-dim block mb-1 text-[10px]">SUPPORT_VECTOR</span>
                 <span className="text-cyber-blue text-lg font-bold">{analysis.keyLevels.support}</span>
               </div>
               <div>
                 <span className="text-cyber-dim block mb-1 text-[10px]">RESISTANCE_VECTOR</span>
                 <span className="text-cyber-pink text-lg font-bold">{analysis.keyLevels.resistance}</span>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <span className="text-cyber-dim text-[10px]">MARKET_MOOD:</span>
               <div className="flex-1 h-3 bg-gray-900 border border-cyber-dim skew-x-[-10deg]">
                 <div 
                   className={`h-full transition-all duration-1000 ${analysis.sentimentScore > 50 ? 'bg-cyber-blue box-shadow-blue' : 'bg-cyber-pink box-shadow-pink'}`}
                   style={{ width: `${analysis.sentimentScore}%`, boxShadow: analysis.sentimentScore > 50 ? '0 0 10px #00F0FF' : '0 0 10px #FF003C' }}
                 ></div>
               </div>
               <span className="text-white font-bold">{analysis.sentimentScore}</span>
             </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-8 space-y-2 text-cyber-yellow">
             <Icons.Zap className="animate-bounce" size={24} />
             <span className="animate-pulse tracking-widest text-xs">UPLOADING_DAEMON...</span>
          </div>
        )}

        {/* Console Logs */}
        <div className="text-slate-500 space-y-1 font-mono text-[10px]">
          {logs.map((log, i) => (
            <div key={i} className="opacity-70 hover:opacity-100 hover:text-cyber-blue transition-colors cursor-text">{log}</div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* Input Line */}
      <div className="p-2 border-t border-cyber-border flex items-center bg-black/80 backdrop-blur">
        <span className="text-cyber-pink mr-2 font-bold">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="EXECUTE_COMMAND..."
          className="bg-transparent border-none outline-none text-cyber-yellow w-full placeholder-gray-700 uppercase font-bold tracking-wider"
        />
      </div>
    </div>
  );
};