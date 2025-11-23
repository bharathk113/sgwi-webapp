import React from 'react';
import { Hero } from './components/Hero';
import { Game } from './components/Game';
import { Chat } from './components/Chat';
import { PaperSection } from './components/PaperSection';
import { MethodologyInteractive } from './components/MethodologyInteractive';
import { ResultsAnalysis } from './components/ResultsAnalysis';
import { SECTIONS, PAPER_CONFIG } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-neon-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold font-mono text-white tracking-tighter">
            SGWI <span className="text-neon-500">Explorer</span>
          </span>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-neon-400 transition-colors">Home</a>
            <a href="#game" className="hover:text-neon-400 transition-colors">Simulation</a>
            <a href={PAPER_CONFIG.doiUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neon-400 transition-colors">Paper</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        
        {/* 01. Introduction (Static with Visual) */}
        <PaperSection section={SECTIONS[0]} index={0} />

        {/* 02. Interactive Methodology */}
        <MethodologyInteractive />

        {/* 03. Interactive Results Chart */}
        <ResultsAnalysis />

        {/* 04. Simulation Game */}
        <Game />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500 mb-4">
          Based on the research: <a href={PAPER_CONFIG.doiUrl} className="text-neon-600 hover:underline">{PAPER_CONFIG.title}</a>
        </p>
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} {PAPER_CONFIG.authors}.
        </p>
      </footer>

      {/* Floating Chat Widget */}
      <Chat />
    </div>
  );
};

export default App;