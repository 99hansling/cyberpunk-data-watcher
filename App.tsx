import React from 'react';
import { TickerTape } from './components/TickerTape';
import { NewsFeed } from './components/NewsFeed';
import { LeftPanel, RightPanel } from './components/SystemPanel';
import { Icons } from './components/Icon';

const App: React.FC = () => {
  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col p-2 relative">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[size:20px_20px] bg-dot-pattern opacity-20 pointer-events-none"></div>

      {/* Main HUD Frame */}
      <div className="flex-1 border-2 border-cyber-dim relative flex flex-col overflow-hidden bg-black/80 backdrop-blur-sm z-10"
           style={{
             clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
           }}>
           
        {/* Decorative Top Corners */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-cyber-blue rounded-tl-3xl z-20 pointer-events-none opacity-80"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cyber-blue rounded-tr-3xl z-20 pointer-events-none opacity-80"></div>
        
        {/* Top Header Area */}
        <div className="h-16 flex items-center justify-center border-b border-cyber-dim/50 relative shrink-0">
           <div className="absolute left-4 top-2 text-[10px] font-mono text-cyber-dim">
              SYS.VER.2.0.7.7
           </div>
           
           {/* Center Logo */}
           <div className="text-center">
              <h1 className="text-4xl font-black font-sans italic text-cyber-yellow tracking-tighter" style={{textShadow: '0 0 10px #FCEE0A'}}>
                CYBERPUNK
              </h1>
              <div className="text-[10px] font-mono text-cyber-blue tracking-[0.8em] mt-[-5px]">TERMINAL</div>
           </div>

           <div className="absolute right-4 top-2 flex gap-2">
              <div className="w-2 h-2 bg-cyber-pink rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
              <div className="w-2 h-2 bg-cyber-yellow rounded-full"></div>
           </div>
           
           {/* Decorative Lines under header */}
           <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-cyber-blue"></div>
           <div className="absolute bottom-0 right-0 w-1/3 h-[2px] bg-cyber-blue"></div>
        </div>

        {/* Scrolling Ticker integrated into HUD */}
        <div className="shrink-0 border-b border-cyber-dim/30">
           <TickerTape />
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 flex overflow-hidden p-4 gap-4">
           
           {/* Left Column: System & Code */}
           <div className="hidden md:block w-64 shrink-0">
              <LeftPanel />
           </div>

           {/* Center Column: The Feed (Main Focus) */}
           <div className="flex-1 border-x border-cyber-dim/30 px-6 relative bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent">
              {/* Decorative center grid lines */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyber-yellow"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyber-yellow"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyber-yellow"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyber-yellow"></div>
              
              <NewsFeed />
           </div>

           {/* Right Column: Status & Time */}
           <div className="hidden lg:block w-72 shrink-0">
              <RightPanel />
           </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="h-8 bg-cyber-grid border-t border-cyber-blue flex items-center justify-between px-6 text-[10px] font-mono text-cyber-blue shrink-0">
            <div className="flex gap-4">
               <span className="bg-cyber-blue text-black px-1 font-bold">MODE: NETRUNNER</span>
               <span className="animate-pulse">CONNECTING TO SUBNET...</span>
            </div>
            <div className="flex gap-4 opacity-70">
               <span>RAM: 64TB</span>
               <span>BUFFER: 12%</span>
               <span>COORDS: 34.55, -118.2</span>
            </div>
        </div>

      </div>
      
      {/* Outer corner decorations (Floating) */}
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-cyber-yellow pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-cyber-yellow pointer-events-none"></div>
    </div>
  );
};

export default App;