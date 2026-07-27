import React from 'react';
import { PROJECTS_DATA, BLOGS_DATA } from '../data/portfolioData';
import { PageRoute, ThemeMode } from '../types';
import { ThreeModelViewer } from '../components/ThreeModelViewer';
import { Cpu, Zap, ArrowRight, BookOpen, ShieldCheck, Download, Code2, Layers, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  theme: ThemeMode;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const featuredBlogs = BLOGS_DATA.filter((b) => b.featured);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>ELECTRICAL & ELECTRONIC ENGINEERING STUDENT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-white leading-tight">
              Architecting High-Speed <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">Power & Silicon</span> Innovations
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              Hello, I am <strong className="text-cyan-300">AYMAN ULLAH</strong>. I specialize in Gallium Nitride (GaN) solar power converters, autonomous STM32 flight controllers, FPGA RISC-V digital cores, and hardware-software co-design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3.5 rounded-2xl font-mono text-sm font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Projects Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 rounded-2xl font-mono text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-slate-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>About & EEE Skills</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 font-mono text-xs">
              <div>
                <span className="text-2xl font-extrabold text-cyan-400">98.8%</span>
                <p className="text-slate-400">GaN Converter Efficiency</p>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-amber-400">4-Layer</span>
                <p className="text-slate-400">Custom High-Density PCBs</p>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-emerald-400">100 MHz</span>
                <p className="text-slate-400">FPGA Softcore Clock</p>
              </div>
            </div>
          </div>

          {/* Right 3D Model Teaser */}
          <div className="lg:col-span-5">
            <ThreeModelViewer modelType="inverter" title="3.5kW GaN Solar Inverter Core" />
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" /> Hardware Hardware Projects
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Featured Engineering Prototypes
            </h2>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="hidden sm:flex items-center gap-1 font-mono text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <span>View All ({PROJECTS_DATA.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((prj) => (
            <div
              key={prj.id}
              onClick={() => onNavigate('project-detail', { id: prj.id })}
              className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl cursor-pointer flex flex-col"
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
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {prj.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 font-sans leading-relaxed">
                    {prj.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <span>{prj.date}</span>
                  <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    3D Model & Specs <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Research Blogs Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Technical Insights
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              EEE Research Publications & Blogs
            </h2>
          </div>

          <button
            onClick={() => onNavigate('blogs')}
            className="hidden sm:flex items-center gap-1 font-mono text-xs text-amber-300 hover:text-amber-200 transition-colors"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => onNavigate('blog-detail', { id: blog.id })}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {blog.category}
                </span>
                <span>{blog.readingTime}</span>
              </div>

              <h3 className="text-lg font-bold text-white hover:text-amber-300 transition-colors">
                {blog.title}
              </h3>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {blog.shortDesc}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
                <span>By {blog.author}</span>
                <span className="text-amber-400 flex items-center gap-1">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Circuit Teaser Card */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold">
            ACADEMIC COLLABORATION & RESEARCH
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need Custom Hardware Design or Embedded Firmware Architecture?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Ayman Ullah is available for research partnerships, PCB layout consulting, and embedded systems software engineering. Submit a message via the automated dispatch contact system.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="mt-2 px-6 py-3 rounded-xl font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors inline-flex items-center gap-2"
          >
            Send Official Inquiry →
          </button>
        </div>
      </section>
    </div>
  );
};
