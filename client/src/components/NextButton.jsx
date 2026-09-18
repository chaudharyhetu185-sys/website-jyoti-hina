import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export const NextButton = ({ onClick, nextTitle, pageNumber }) => {
  return (
    <div className="pt-12 pb-6 flex justify-center">
      <button
        onClick={onClick}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600/90 via-indigo-600 to-cyan-600 text-white font-medium text-sm shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/10"
      >
        <span className="font-mono text-xs text-indigo-200 uppercase tracking-widest border-r border-indigo-400/30 pr-3">
          Page 0{pageNumber}
        </span>
        <span className="font-display font-semibold text-white">
          NEXT: {nextTitle}
        </span>
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-white/20 transition-all">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </button>
    </div>
  );
};
