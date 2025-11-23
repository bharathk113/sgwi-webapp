import React, { useState } from 'react';
import { RESULTS_GALLERY } from '../constants';

export const ResultsAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof RESULTS_GALLERY[0] | null>(null);

  return (
    <div className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              <span className="text-neon-500 font-mono">03.</span> Scientific Validation
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              The reliability of the Multi-Model SGWI was rigorously validated against established long-term indices. 
              Despite using a shorter dataset (16 years), the SGWI demonstrated a remarkable alignment with indices 
              derived from &gt;30 years of data.
            </p>
            <div className="flex gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">Correlation with SRI</div>
                <div className="text-2xl font-bold text-blue-400">R² = 0.745</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-500 mb-1">Correlation with GRACE</div>
                <div className="text-2xl font-bold text-neon-400">R² = 0.748</div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-slate-400 italic border-l-4 border-neon-900 pl-4 py-2 bg-slate-900/30 rounded-r">
              "The high correlation with long-term runoff-based indices emphasizes the effectiveness of using a multi-model approach in generating standardized indices in data-scarce environments."
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESULTS_GALLERY.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer perspective-1000"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] group-hover:border-neon-500/50">
                
                {/* Image Placeholder */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-925">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-700 bg-slate-800">
                    <div className="text-center p-6">
                       <img 
                          src={`images/${item.image}`} 
                          alt={item.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.querySelector('.fallback-text')!.classList.remove('hidden');
                          }}
                        />
                        <span className="fallback-text hidden text-sm font-mono">Image Asset: {item.image}</span>
                    </div>
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-neon-400 border border-neon-400 px-4 py-2 rounded-full text-sm font-bold tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      VIEW FULL SIZE
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-5 border-t border-slate-800 bg-slate-900">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-neon-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
                      {item.stat}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col">
            <button 
              className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex-1 overflow-hidden flex items-center justify-center rounded-lg bg-slate-900/50 border border-slate-800 p-2">
               <img 
                  src={`images/${selectedImage.image}`} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/1e293b/475569?text=Scientific+Figure+Not+Found';
                  }}
               />
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-slate-400 max-w-3xl mx-auto">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};