import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { PageRoute, ProjectCategory, ThemeMode } from '../types';
import { Cpu, Search, Filter, ArrowRight, ArrowUpDown } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  theme: ThemeMode;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, theme }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest');

  const categories: ProjectCategory[] = [
    'All',
    'Embedded & IoT',
    'Power Electronics',
    'Robotics & AI',
    'VLSI & Microchips',
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>HARDWARE & EMBEDDED CATALOG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Electrical Engineering <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Projects Showcase</span>
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-2xl">
          Browse hardware prototypes, 4-layer PCBs, GaN power converters, and FPGA softcore microprocessors complete with interactive 3D model viewers and downloadable technical schematics.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-glow'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none"
              >
                <option value="newest" className="bg-slate-900">Newest First</option>
                <option value="title" className="bg-slate-900">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No projects found matching category "{selectedCategory}" or search query.
          </div>
        ) : (
          filteredProjects.map((prj) => (
            <div
              key={prj.id}
              onClick={() => onNavigate('project-detail', { id: prj.id })}
              className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={prj.image}
                  alt={prj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
                  {prj.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {prj.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 font-sans leading-relaxed">
                    {prj.shortDesc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {prj.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <span>{prj.date}</span>
                  <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                    Interactive 3D Model <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
