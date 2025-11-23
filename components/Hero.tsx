import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { PAPER_CONFIG } from '../constants';

const generateData = () => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    const x = i / 10;
    // Create curves representing the distributions used in the paper
    data.push({
      x,
      // Gamma-like (skewed left)
      yGamma: Math.pow(x, 2) * Math.exp(-x / 1.5) * 0.5,
      // Normal (Bell curve)
      yNormal: Math.exp(-0.5 * Math.pow(x - 5, 2)) * 0.8,
      // Pearson-like (skewed right/sharp)
      yPearson: Math.pow(x, 1.5) * Math.exp(-x / 2) * 0.6, 
    });
  }
  return data;
};

const data = generateData();

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Animation Layer */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradGamma" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gradPearson" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gradNormal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#15803d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#15803d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="yGamma" 
              stroke="#4ade80" 
              fillOpacity={1} 
              fill="url(#gradGamma)" 
              isAnimationActive={true}
              animationDuration={3000}
            />
            <Area 
              type="monotone" 
              dataKey="yPearson" 
              stroke="#22c55e" 
              fillOpacity={1} 
              fill="url(#gradPearson)" 
              isAnimationActive={true}
              animationDuration={4000}
              animationBegin={500}
            />
             <Area 
              type="monotone" 
              dataKey="yNormal" 
              stroke="#15803d" 
              fillOpacity={1} 
              fill="url(#gradNormal)" 
              isAnimationActive={true}
              animationDuration={5000}
              animationBegin={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <div className="mb-4 inline-block px-4 py-1 rounded-full border border-neon-500/50 bg-neon-900/20 text-neon-400 text-sm font-mono animate-pulse">
          Published in Groundwater for Sustainable Development
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          SGWI
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-300 to-neon-500 neon-text block text-2xl md:text-4xl mt-2 font-light">
            Multi-Model Framework
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Standardized Groundwater Index Computation using AICc-based Multi-Model Approach
        </p>
        <p className="text-md text-slate-500 mb-12 max-w-3xl mx-auto italic">
          "{PAPER_CONFIG.abstract.slice(0, 150)}..."
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#game"
            className="px-8 py-3 rounded-lg bg-neon-600 text-white font-semibold hover:bg-neon-500 transition-all shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]"
          >
            Launch Simulation
          </a>
          <a 
            href={PAPER_CONFIG.doiUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-neon-500 transition-all bg-slate-900/50 backdrop-blur-sm"
          >
            Download Paper (DOI)
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce text-slate-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};
