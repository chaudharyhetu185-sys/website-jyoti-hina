import React from 'react';
import { X, ExternalLink, Github, Calendar, Layers } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const { title, description, detailedDescription, image, technologies, category, liveUrl, githubUrl, completionDate } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Category & Date */}
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold">
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {completionDate || '2024'}
          </span>
        </div>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold font-display text-slate-900 mb-3 pr-8">
          {title}
        </h2>

        {/* Image Display */}
        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-slate-200 bg-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Descriptions */}
        <div className="space-y-2 mb-4 text-slate-700 text-sm leading-relaxed">
          <p className="font-semibold text-slate-900">{description}</p>
          {detailedDescription && (
            <p className="text-slate-600 text-xs">{detailedDescription}</p>
          )}
        </div>

        {/* Technologies List */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-slate-500 mb-2 flex items-center gap-1.5 font-semibold">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Technologies Used:</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {technologies && technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 border border-slate-200 text-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          {liveUrl && liveUrl !== '#' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Visit Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {githubUrl && githubUrl !== '#' && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
