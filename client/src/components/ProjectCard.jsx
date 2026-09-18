import React from 'react';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';

export const ProjectCard = ({ project, onOpenModal }) => {
  const { title, description, image, technologies, category, liveUrl, githubUrl, featured } = project;

  return (
    <div className="group relative rounded-2xl glass-panel overflow-hidden transition-all duration-300 hover:border-indigo-300 hover:shadow-md flex flex-col justify-between bg-white border border-slate-200">
      
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Featured</span>
        </div>
      )}

      {/* Category Tag */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 font-mono text-[10px] font-semibold">
        {category}
      </div>

      <div>
        {/* Project Thumbnail Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000";
            }}
          />
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" />

          {/* Quick Details Hover Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/30 backdrop-blur-xs">
            <button
              onClick={() => onOpenModal(project)}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Case Study</span>
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4">
          <h3 className="text-base font-bold font-display text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-slate-600 text-xs line-clamp-2 mb-3 font-sans leading-relaxed">
            {description}
          </p>

          {/* Technologies Stack Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {technologies && technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* External Action Links */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        {liveUrl && liveUrl !== '#' ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-mono font-medium flex items-center justify-center gap-1 transition-all"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <button
            onClick={() => onOpenModal(project)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-mono font-medium flex items-center justify-center gap-1 transition-all"
          >
            <span>Preview</span>
          </button>
        )}

        {githubUrl && githubUrl !== '#' && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Github Repository"
            className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
