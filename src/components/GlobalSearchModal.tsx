import React, { useState } from 'react';
import { PROJECTS_DATA, BLOGS_DATA } from '../data/portfolioData';
import { PageRoute, SearchResult } from '../types';
import { Search, X, Layers, Cpu, BookOpen, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute, params?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'project' | 'blog'>('all');

  if (!isOpen) return null;

  // Build combined search index
  const allResults: SearchResult[] = [
    ...PROJECTS_DATA.map((p) => ({
      type: 'project' as const,
      id: p.id,
      title: p.title,
      description: p.shortDesc,
      route: 'project-detail' as PageRoute,
      params: { id: p.id },
      category: p.category,
    })),
    ...BLOGS_DATA.map((b) => ({
      type: 'blog' as const,
      id: b.id,
      title: b.title,
      description: b.shortDesc,
      route: 'blog-detail' as PageRoute,
      params: { id: b.id },
      category: b.category,
    })),
    {
      type: 'page' as const,
      id: 'page-about',
      title: 'About Ayman Ullah (EEE Profile & Lab Journey)',
      description: 'Educational background, laboratory hardware experience, VLSI and power systems skill matrix.',
      route: 'about' as PageRoute,
    },
    {
      type: 'page' as const,
      id: 'page-contact',
      title: 'Contact Us & Support',
      description: 'Dynamic contact form with automated email dispatch and direct inquiry routing.',
      route: 'contact' as PageRoute,
    },
    {
      type: 'page' as const,
      id: 'page-copyright',
      title: 'Copyright & License Policy',
      description: 'Intellectual property notice for aymanportfolio.github.io and hardware schematics.',
      route: 'copyright' as PageRoute,
    },
  ];

  const filteredResults = allResults.filter((item) => {
    const matchesFilter = filterType === 'all' || item.type === filterType;
    const matchesQuery =
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl text-white font-sans overflow-hidden">
        {/* Search Bar Input */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, blogs, GaN, FPGA, Cortex-M, pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-mono text-white focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 p-3 bg-slate-950/60 border-b border-slate-800 font-mono text-xs">
          {(['all', 'project', 'blog'] as const).map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-3 py-1.5 rounded-xl border uppercase transition-colors ${
                filterType === ft
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {ft}s
            </button>
          ))}
          <span className="ml-auto text-[10px] text-slate-500">{filteredResults.length} Results</span>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[420px] overflow-y-auto space-y-2.5">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No matching EEE records found for "{query}".
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.route, item.params);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400 mt-0.5">
                    {item.type === 'project' ? (
                      <Cpu className="w-4 h-4 text-cyan-400" />
                    ) : item.type === 'blog' ? (
                      <BookOpen className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Layers className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </span>
                      {item.category && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
