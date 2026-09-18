import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Layers,
  Mail,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

const SECTIONS = [
  { id: 1, label: 'Intro', icon: Home },
  { id: 2, label: 'Founders', icon: Users },
  { id: 3, label: 'Services', icon: Layers },
  { id: 4, label: 'Contact', icon: Mail },
];

export const TopRightNavigation = ({ activeSection, onNavigate, onNext, onPrev }) => {
  const nextSection = activeSection < 4 ? SECTIONS.find((s) => s.id === activeSection + 1) : null;

  return (
    <div className="fixed top-3 right-3 md:top-5 md:right-6 z-50 flex items-center gap-1.5 sm:gap-2 select-none pointer-events-auto">
      {/* Glassmorphism Control Bar with All Icons */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 p-1.5 rounded-2xl shadow-lg shadow-slate-200/40">
        
        {/* PREVIOUS BUTTON ICON */}
        <button
          onClick={onPrev}
          disabled={activeSection === 1}
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
            activeSection === 1
              ? 'text-slate-300 cursor-not-allowed opacity-40'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95'
          }`}
          title="Previous Section (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* SECTION ICONS (01 Intro, 02 Founders, 03 Services, 04 Contact) */}
        <div className="flex items-center gap-1 px-1 border-x border-slate-100">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className={`relative p-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-indigo-600 font-bold'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/80'
                }`}
                title={`Go to 0${sec.id}. ${sec.label}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="topNavActivePill"
                    className="absolute inset-0 bg-indigo-50 rounded-xl border border-indigo-200/80"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : ''}`} />
                  <span className={`hidden lg:inline text-[11px] ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {sec.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* PAGE INDICATOR */}
        <div className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 font-mono text-[11px]">
          <span className="text-indigo-600 font-bold">0{activeSection}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400">04</span>
        </div>

        {/* NEXT BUTTON ICON & LABEL */}
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all duration-200 group"
          title={nextSection ? `Next: ${nextSection.label}` : 'Back to Intro'}
        >
          <span>{nextSection ? nextSection.label : 'Top'}</span>
          {nextSection ? (
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-[-45deg] transition-transform" />
          )}
        </button>

      </div>
    </div>
  );
};
