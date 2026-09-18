import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const StoryNavigation = ({ activeSection, totalSections = 6, onNext, onPrev }) => {
  return (
    <div className="fixed bottom-6 right-6 md:right-8 z-40 flex items-center gap-3 select-none pointer-events-auto">
      
      {/* Page Counter Indicator */}
      <div className="hidden sm:flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-mono font-medium text-slate-500">
        <span className="text-indigo-600 font-bold">0{activeSection}</span>
        <span className="text-slate-300">/</span>
        <span>0{totalSections}</span>
      </div>

      {/* Control Action Buttons */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-2xl shadow-lg shadow-slate-200/50">
        
        {/* PREVIOUS BUTTON */}
        {activeSection > 1 && (
          <button
            onClick={onPrev}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold font-mono border border-slate-200 transition-all active:scale-95"
            title="Previous Slide (Left Arrow)"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden xs:inline">PREV</span>
          </button>
        )}

        {/* NEXT BUTTON */}
        {activeSection < totalSections && (
          <button
            onClick={onNext}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold font-mono shadow-md shadow-indigo-600/25 transition-all active:scale-95"
            title="Next Slide (Right Arrow)"
          >
            <span>NEXT</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
