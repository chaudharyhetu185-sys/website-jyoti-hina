import React, { useState, useEffect } from 'react';
import { ProjectFilter } from '../components/ProjectFilter';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { fetchProjects } from '../services/api';
import { Briefcase, Loader2 } from 'lucide-react';

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const res = await fetchProjects(category);
      setProjects(res.data || []);
      setLoading(false);
    };
    loadProjects();
  }, [category]);

  return (
    <section className="h-full w-full p-6 md:p-10 flex flex-col justify-center overflow-hidden bg-[#f8fafc] relative">
      <div className="max-w-5xl mx-auto w-full my-auto z-10 space-y-4">
        
        {/* Simple Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight text-center sm:text-left">
            Our <span className="text-gradient">Work</span>
          </h2>

          <ProjectFilter
            activeCategory={category}
            onSelectCategory={(cat) => setCategory(cat)}
          />
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="font-mono text-xs">Loading portfolio...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 max-w-sm mx-auto p-6 shadow-sm">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-700 text-xs font-semibold">No projects found in this category.</p>
            <button
              onClick={() => setCategory('All')}
              className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-mono"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.slice(0, 3).map((proj, idx) => (
              <ProjectCard
                key={proj._id || proj.id || idx}
                project={proj}
                onOpenModal={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal Popup */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
