import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { Sparkles, Menu, X, ArrowUpRight, Compass } from 'lucide-react';

export const Navbar = ({ activeSection, onNavigate, storyMode, setStoryMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 1, label: 'Intro', key: 'hero' },
    { id: 2, label: 'Founders', key: 'founders' },
    { id: 3, label: 'Services', key: 'services' },
    { id: 4, label: 'Work', key: 'projects' },
    { id: 5, label: 'Reviews', key: 'reviews' },
    { id: 6, label: 'Contact', key: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090b10]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate(1)}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold font-display tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {BRAND_CONFIG.name}
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-wider text-gray-400">
                Studio by 2 Friends
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-indigo-600/80 shadow-md shadow-indigo-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono opacity-60">0{item.id}.</span>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA & Mode Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setStoryMode(!storyMode)}
              title={storyMode ? "Switch to Free Scroll" : "Switch to Guided Story Mode"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
                storyMode
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              {storyMode ? 'Story Mode' : 'Scroll Mode'}
            </button>

            <button
              onClick={() => onNavigate(6)}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0f18]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">0{item.id}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
            <button
              onClick={() => {
                setStoryMode(!storyMode);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              {storyMode ? 'Story Mode' : 'Scroll Mode'}
            </button>

            <button
              onClick={() => {
                onNavigate(6);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
