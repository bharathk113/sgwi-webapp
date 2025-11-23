import React, { useState, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, Tooltip } from 'recharts';

type Mode = 'SINGLE' | 'MULTI';

export const Game: React.FC = () => {
  const [mode, setMode] = useState<Mode>('SINGLE');
  const [wGamma, setWGamma] = useState<number>(33);
  const [wPearson, setWPearson] = useState<number>(33);
  const [wNormal, setWNormal] = useState<number>(34);

  // Generate synthetic groundwater histogram data (skewed)
  const data = useMemo(() => {
    const points = [];
    const tGamma = 0.6;
    const tPearson = 0.3;
    const tNormal = 0.1;

    let errorSingle = 0;
    let errorMulti = 0;

    // Normalize user weights
    const totalW = wGamma + wPearson + wNormal || 1;
    const nG = wGamma / totalW;
    const nP = wPearson / totalW;
    const nN = wNormal / totalW;

    for (let i = 0; i <= 20; i++) {
      const x = i;
      // Components
      const valGamma = Math.pow(x, 2) * Math.exp(-x / 2.5) * 15; // Skewed
      const valPearson = Math.pow(x, 1.5) * Math.exp(-x / 1.5) * 25; // Peaky
      const valNormal = 40 * Math.exp(-0.5 * Math.pow((x - 8) / 3, 2)); // Bell

      // Truth
      const observed = (valGamma * tGamma) + (valPearson * tPearson) + (valNormal * tNormal) + (Math.random() * 2);

      // Single Model (Assuming standard SPI uses Gamma only or Normal only)
      const singleModel = 45 * Math.exp(-0.5 * Math.pow((x - 6) / 4, 2)); // Poor fit for skewed data

      // Multi Model
      const multiModel = (valGamma * nG) + (valPearson * nP) + (valNormal * nN);

      errorSingle += Math.abs(observed - singleModel);
      errorMulti += Math.abs(observed - multiModel);

      points.push({
        x,
        observed,
        singleModel,
        multiModel,
      });
    }
    
    // Invert error to get a score out of 100
    const scoreSingle = Math.max(0, 100 - (errorSingle * 0.8));
    const scoreMulti = Math.max(0, 100 - (errorMulti * 0.4)); 

    return { points, scoreSingle: Math.round(scoreSingle), scoreMulti: Math.round(scoreMulti) };
  }, [wGamma, wPearson, wNormal]);

  return (
    <div id="game" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono mb-4 tracking-wider">
            INTERACTIVE DEMO
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience the Logic
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
            Why does a Multi-Model approach work better? 
            Use this simulation to fit distributions to hypothetical groundwater data.
          </p>
          <div className="bg-amber-900/20 border border-amber-800/50 p-4 rounded-lg inline-block max-w-3xl">
            <p className="text-amber-500 text-xs text-left font-mono">
              <span className="font-bold">⚠️ DISCLAIMER:</span> This is a conceptual infographic. 
              The actual study employs <span className="text-amber-300">Maximum Likelihood Estimation (MLE)</span> to fit distributions 
              and <span className="text-amber-300">AICc</span> to determine weights mathematically. This game simplifies the weighting concept for visualization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Mode Switcher */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative shadow-xl">
              <h3 className="text-white font-bold mb-4">Select Methodology</h3>
              
              {/* Nudge Animation for Multi-Model */}
              {mode === 'SINGLE' && (
                <div className="absolute -right-2 top-10 flex items-center animate-bounce z-10">
                  <span className="text-neon-500 text-xs font-bold mr-2 bg-slate-900 px-2 py-1 rounded border border-neon-500 shadow-neon">Try Multi-Model</span>
                  <svg className="w-6 h-6 text-neon-500 transform rotate-180 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
              )}

              <div className="flex gap-2 p-1 bg-slate-950 rounded-lg relative z-0 border border-slate-800">
                <button 
                  onClick={() => setMode('SINGLE')}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${mode === 'SINGLE' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  Single Model
                </button>
                <button 
                  onClick={() => setMode('MULTI')}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${mode === 'MULTI' ? 'bg-neon-600 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  Multi-Model
                </button>
              </div>
              <div className="mt-4 text-sm text-slate-400 italic">
                {mode === 'SINGLE' 
                  ? "Standard indices (SPI) force-fit data to a single distribution (e.g. Gamma). Notice the poor fit on the tail extremes."
                  : "The SGWI approach weights multiple distributions based on relative likelihood, capturing the complex shape of the data."}
              </div>
            </div>

            {/* Multi-Model Sliders */}
            {mode === 'MULTI' && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 animate-fade-in-up shadow-xl">
                <h3 className="text-neon-400 font-bold mb-4 font-mono text-sm uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-500 rounded-full animate-pulse"></span>
                  Weight Adjustment
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Gamma (Skewed)</span>
                      <span>{Math.round((wGamma / (wGamma + wPearson + wNormal)) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={wGamma} onChange={(e) => setWGamma(Number(e.target.value))} className="w-full accent-neon-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Pearson III (Peaked)</span>
                      <span>{Math.round((wPearson / (wGamma + wPearson + wNormal)) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={wPearson} onChange={(e) => setWPearson(Number(e.target.value))} className="w-full accent-purple-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Normal (Bell)</span>
                      <span>{Math.round((wNormal / (wGamma + wPearson + wNormal)) * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={wNormal} onChange={(e) => setWNormal(Number(e.target.value))} className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className={`p-6 rounded-2xl border transition-all shadow-xl ${mode === 'MULTI' && data.scoreMulti > 90 ? 'bg-neon-900/10 border-neon-500/50' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-xs font-mono text-slate-500 uppercase">Goodness of Fit Score</div>
              <div className={`text-5xl font-bold mt-2 ${mode === 'MULTI' ? 'text-neon-400' : 'text-blue-400'}`}>
                {mode === 'SINGLE' ? data.scoreSingle : data.scoreMulti}%
              </div>
              <div className="mt-2 text-sm text-slate-400">
                {mode === 'SINGLE' ? 'Single distribution fails to capture data complexity.' : (data.scoreMulti > 90 ? 'Excellent fit! Multi-model framework valid.' : 'Adjust weights to match the gray area.')}
              </div>
            </div>

          </div>

          {/* Visualization */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-2xl overflow-hidden relative">
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={data.points} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorObserved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMulti" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="x" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                  labelFormatter={() => ''}
                />
                
                {/* The "Truth" - Observed Data */}
                <Area 
                  type="step" 
                  dataKey="observed" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorObserved)" 
                  name="Observed Data"
                />

                {/* The Model Line */}
                <Area 
                  type="monotone" 
                  dataKey={mode === 'SINGLE' ? 'singleModel' : 'multiModel'} 
                  stroke={mode === 'SINGLE' ? '#3b82f6' : '#4ade80'} 
                  strokeWidth={4}
                  fillOpacity={1}
                  fill={mode === 'SINGLE' ? 'transparent' : 'url(#colorMulti)'}
                  name={mode === 'SINGLE' ? 'Single Model Fit' : 'Multi-Model Fit'}
                  animationDuration={500}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">
              Visualizing Probability Density Function (PDF) Fit
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};