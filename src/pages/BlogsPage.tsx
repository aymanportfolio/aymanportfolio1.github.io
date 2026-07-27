import React, { useState } from 'react';
import { BLOGS_DATA } from '../data/portfolioData';
import { PageRoute, BlogCategory, ThemeMode } from '../types';
import { BookOpen, Search, ArrowRight, ArrowUpDown, Calendar, Clock } from 'lucide-react';

interface BlogsPageProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  theme: ThemeMode;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onNavigate, theme }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest');

  const categories: BlogCategory[] = [
    'All',
    'Embedded C',
    'Circuit Design',
    'Quantum Electronics',
    'Renewable Energy',
  ];

  const filteredBlogs = BLOGS_DATA.filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>RESEARCH PUBLICATIONS & PAPERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Electrical Engineering <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">Insights & Blogs</span>
        </h1>
        <p className="text-sm text-slate-300 font-sans max-w-2xl">
          Deep dives into wide-bandgap GaN power electronics, bare-metal ARM Cortex firmware engineering, and quantum semiconductor hardware architecture.
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
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold shadow-glow'
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
                placeholder="Filter articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No research blogs found matching category "{selectedCategory}" or search query.
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => onNavigate('blog-detail', { id: blog.id })}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {blog.readingTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white hover:text-amber-300 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                  {blog.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {blog.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> {blog.date}
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1 hover:translate-x-1 transition-transform">
                  Read Full Paper <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
