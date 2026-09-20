import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { Sparkles, Menu, X, ArrowUpRight, Home, Users, Layers, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 1, label: 'Intro',    num: '01', icon: Home },
  { id: 2, label: 'Founders', num: '02', icon: Users },
  { id: 3, label: 'Services', num: '03', icon: Layers },
  { id: 4, label: 'Contact',  num: '04', icon: Mail },
];

export const TopNavbar = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo (Left) */}
        <motion.button
          onClick={() => onNavigate(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-black font-display text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              {BRAND_CONFIG.name}
            </span>
          </div>
        </motion.button>

        {/* Desktop Horizontal Navigation Links (Center) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/90 border border-slate-200/80 rounded-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            const Icon = item.icon;

            return (
              <div key={item.id} className="relative">
                {/* Framer motion active indicator pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTopNavPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/60"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <button
                  onClick={() => onNavigate(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-indigo-600 font-bold'
                      : isHovered
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right Actions: Section Indicator & CTA Button (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
            0{activeSection}/04
          </span>

          <motion.button
            onClick={() => onNavigate(4)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shine py-2 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Mobile Navigation Toggle (Mobile & Tablet) */}
        <div className="flex md:hidden items-center gap-2">
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            0{activeSection}/04
          </span>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl"
          >
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium text-left transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    onNavigate(4);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
