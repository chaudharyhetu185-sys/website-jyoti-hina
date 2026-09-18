import React from 'react';

export const ProjectFilter = ({ activeCategory, onSelectCategory }) => {
  const categories = ['All', 'Websites', 'UI/UX', 'Creative', 'Custom Solutions'];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
      {categories.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm border border-indigo-600'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
