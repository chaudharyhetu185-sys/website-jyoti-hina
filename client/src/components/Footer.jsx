import React from 'react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { Heart, Github, Linkedin, Instagram, Twitter, Mail } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-700">{BRAND_CONFIG.name}</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center gap-3">
        <a href={BRAND_CONFIG.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
          <Github className="w-3.5 h-3.5" />
        </a>
        <a href={BRAND_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a href={BRAND_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
          <Instagram className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex items-center gap-1 text-[11px]">
        <span>Crafted by 2 Friends</span>
        <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
      </div>
    </div>
  );
};
