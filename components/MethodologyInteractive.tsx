import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../constants';

// Simple Math Renderer Component
const MathDisplay: React.FC<{ template: string }> = ({ template }) => {
  // Regex to identify \frac{numerator}{denominator}
  const parts = template.split(/(\\frac\{[^}]+\}\{[^}]+\}|,)/g);

  return (
    <div className="font-mono text-lg flex flex-wrap items-center gap-2 justify-center text-neon-300">
      {parts.map((part, i) => {
        if (part.startsWith('\\frac')) {
          const match = part.match(/\\frac\{([^}]+)\}\{([^}]+)\}/);
          if (match) {
            return (
              <div key={i} className="inline-flex flex-col items-center mx-1 align-middle">
                <span className="border-b border-neon-400 px-1 pb-0.5 mb-0.5 text-center block w-full">
                  {parseSubSup(match[1])}
                </span>
                <span className="text-center block w-full px-1">
                  {parseSubSup(match[2])}
                </span>
              </div>
            );
          }
        }
        return <span key={i} className="mx-1">{parseSubSup(part)}</span>;
      })}
    </div>
  );
};

// Helper to handle simple subscripts _ and superscripts ^
const parseSubSup = (text: string) => {
  if (!text) return null;
  // This is a basic parser for _ and ^
  // Split by _ or ^ but keep delimiters
  const tokens = text.split(/([_^]\{[^}]+\}|[_^]\w)/g);
  
  return tokens.map((token, i) => {
    if (token.startsWith('_{')) {
      return <sub key={i} className="text-[0.7em] align-baseline relative top-[0.3em]">{token.slice(2, -1)}</sub>;
    }
    if (token.startsWith('_')) {
      return <sub key={i} className="text-[0.7em] align-baseline relative top-[0.3em]">{token.slice(1)}</sub>;
    }
    if (token.startsWith('^{')) {
      return <sup key={i} className="text-[0.7em] align-baseline relative -top-[0.4em]">{token.slice(2, -1)}</sup>;
    }
    if (token.startsWith('^')) {
      return <sup key={i} className="text-[0.7em] align-baseline relative -top-[0.4em]">{token.slice(1)}</sup>;
    }
    // Remove slash commands like \quad, \sum if simple display
    if (token.includes('\\sum')) return <span key={i} className="text-xl mx-1">∑</span>;
    if (token.includes('\\quad')) return <span key={i} className="w-4 inline-block"></span>;
    if (token.includes('max')) return <span key={i} className="font-sans">max</span>;
    
    return <span key={i}>{token}</span>;
  });
};

export const MethodologyInteractive: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    if (window.innerWidth < 768) {
      setActiveStep(activeStep === index ? null : index);
    } else {
      setActiveStep(index);
    }
  };

  return (
    <div className="py-20 bg-slate-925 border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            <span className="text-neon-500 font-mono">02.</span> Multi-Model Framework
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            The core innovation of this study is the mathematical handling of <strong>data scarcity</strong>. 
            By utilizing the <span className="text-neon-400">Corrected Akaike Information Criterion (AICc)</span>, 
            we avoid the overfitting pitfalls common in traditional methods when applied to short-term datasets.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {METHODOLOGY_STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div 
                  className="group relative"
                  onMouseEnter={() => window.innerWidth >= 768 && setActiveStep(index)}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`
                    w-full min-h-[140px] rounded-xl border-2 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 gap-3
                    ${activeStep === index 
                      ? 'bg-slate-900 border-neon-500 shadow-[0_0_30px_rgba(74,222,128,0.2)] transform -translate-y-2' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-500'}
                  `}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors
                      ${activeStep === index ? 'bg-neon-500 text-slate-950' : 'bg-slate-800 text-slate-500'}
                    `}>
                      {index + 1}
                    </div>
                    <h3 className={`text-center font-bold text-base ${activeStep === index ? 'text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Mobile Accordion */}
                {activeStep === index && (
                  <div className="md:hidden bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6 animate-fade-in shadow-inner">
                     <p className="text-neon-500 font-mono text-xs mb-3 uppercase tracking-widest border-b border-slate-800 pb-2">
                      {step.desc}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {step.details}
                    </p>
                    {step.math && (
                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto whitespace-nowrap flex justify-center">
                        <MathDisplay template={step.math.template} />
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop Detail Panel */}
          <div className="hidden md:block mt-16 min-h-[220px]">
            {activeStep !== null ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl flex gap-12 items-center animate-fade-in-up">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {METHODOLOGY_STEPS[activeStep].title}
                  </h3>
                  <p className="text-neon-500 font-mono text-sm mb-4 uppercase tracking-widest">
                    {METHODOLOGY_STEPS[activeStep].desc}
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {METHODOLOGY_STEPS[activeStep].details}
                  </p>
                </div>
                {METHODOLOGY_STEPS[activeStep].math && (
                  <div className="shrink-0 bg-slate-950 p-8 rounded-xl border border-slate-700 shadow-inner min-w-[300px] flex items-center justify-center">
                    <MathDisplay template={METHODOLOGY_STEPS[activeStep].math.template} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-2">
                <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Select a step above to view the mathematical formulation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};