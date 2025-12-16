import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

// Visual component for the "Code/Data" rain effect
const DataRain = () => {
    return (
        <div className="font-mono text-[8px] leading-3 text-cyber-dim opacity-40 overflow-hidden h-full break-all select-none">
            {Array.from({length: 40}).map((_, i) => (
                <div key={i} className="whitespace-nowrap animate-pulse" style={{animationDuration: `${Math.random() * 2 + 1}s`}}>
                    0F 2A 5C 99 1B {Math.random().toString(16).substr(2, 8).toUpperCase()} 00 11 FF A2
                </div>
            ))}
        </div>
    )
}

export const LeftPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-4">
       {/* Code Block */}
       <div className="border border-cyber-dim/30 bg-black p-2 h-64 relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-cyber-pink text-black text-[10px] font-bold px-1">DEBUG_LOG</div>
          <DataRain />
       </div>

       {/* Faction/Logo Area */}
       <div className="flex-1 border border-cyber-pink/50 flex flex-col items-center justify-center relative bg-cyber-pink/5 hud-panel-cut-bottom-left">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyber-pink">IDENTITY_VERIFIED</div>
          <div className="w-24 h-24 border-4 border-cyber-pink rounded-full flex items-center justify-center relative animate-pulse-fast">
             <div className="absolute w-20 h-20 border-t-4 border-b-4 border-cyber-pink rounded-full animate-spin"></div>
             <Icons.Aperture size={48} className="text-cyber-pink" />
          </div>
          <div className="mt-4 text-center">
             <div className="text-2xl font-black font-mono text-cyber-pink tracking-tighter">ARASAKA</div>
             <div className="text-[10px] text-cyber-dim tracking-[0.5em]">CORPORATION</div>
          </div>
       </div>
    </div>
  );
};

export const RightPanel: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const dateStr = time.toISOString().split('T')[0].replace(/-/g, '/');
    const timeStr = time.toLocaleTimeString('en-GB');

    return (
      <div className="h-full flex flex-col gap-2 font-mono">
         {/* Clock Module */}
         <div className="border-r-4 border-cyber-yellow bg-cyber-black p-4 text-right mb-4">
            <div className="text-cyber-yellow font-bold text-lg tracking-widest">{dateStr}</div>
            <div className="text-cyber-blue font-black text-3xl tracking-wider text-shadow-blue">{timeStr}</div>
         </div>

         {/* Device Overview */}
         <div className="border border-cyber-blue p-1 flex-1 relative">
            <div className="bg-cyber-blue text-black text-xs font-bold px-2 py-1 mb-2">DEVICE_OVERVIEW:</div>
            
            <div className="space-y-4 px-2 text-[10px] text-cyber-blue">
                <div>
                    <div className="mb-1 text-cyber-dim">--TERMINAL--</div>
                    <div className="flex justify-between"><span>STATUS:</span> <span className="text-cyber-yellow">ONLINE</span></div>
                    <div className="flex justify-between"><span>CATEGORY:</span> <span>MAINFRAME</span></div>
                    <div className="flex justify-between"><span>USER:</span> <span>V.0.1</span></div>
                </div>

                <div>
                    <div className="mb-1 text-cyber-dim">--SECURITY--</div>
                    <div className="flex justify-between"><span>FIREWALL:</span> <span className="text-cyber-yellow">ENGAGED</span></div>
                    <div className="flex justify-between"><span>TRACE:</span> <span>0%</span></div>
                    <div className="w-full bg-cyber-dim/20 h-1 mt-1">
                        <div className="bg-cyber-yellow h-full w-[0%]"></div>
                    </div>
                </div>

                <div>
                    <div className="mb-1 text-cyber-dim">--NETWORK--</div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="h-8 bg-cyber-blue/20 border border-cyber-blue"></div>
                        <div className="h-8 bg-cyber-blue/20 border border-cyber-blue"></div>
                        <div className="h-8 bg-cyber-blue/40 border border-cyber-blue"></div>
                        <div className="h-8 bg-cyber-blue/60 border border-cyber-blue animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Graphic */}
            <div className="absolute bottom-2 right-2">
                 <Icons.QrCode size={48} className="text-cyber-dim opacity-50" />
            </div>
         </div>
         
         <div className="h-24 bg-cyber-yellow text-black flex items-center justify-center font-black text-xl italic tracking-tighter hud-panel-cut">
             SERVER INFILTRATED
         </div>
      </div>
    );
  };