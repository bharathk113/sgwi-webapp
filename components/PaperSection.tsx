import React from 'react';
import { Section } from '../types';

interface Props {
  section: Section;
  index: number;
}

export const PaperSection: React.FC<Props> = ({ section, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`py-16 px-6 ${isEven ? 'bg-slate-950' : 'bg-slate-925'}`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={`${!isEven && 'md:order-2'}`}>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-neon-500 font-mono text-xl">0{index + 1}.</span>
            {section.title}
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {section.content}
          </p>
        </div>
        
        <div className={`${!isEven && 'md:order-1'}`}>
          {section.imagePath ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900 border border-slate-800 aspect-video rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={`images/${section.imagePath}`} 
                    alt={section.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-slate-600 italic">Image: ${section.imagePath} not found</span>`;
                    }}
                  />
              </div>
            </div>
          ) : (
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-600 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-900 border border-slate-800 aspect-video rounded-lg flex items-center justify-center p-8">
                    <div className="w-full h-full border-2 border-dashed border-slate-700 rounded flex items-center justify-center">
                        <span className="text-slate-600 font-mono">Visual Representation</span>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};