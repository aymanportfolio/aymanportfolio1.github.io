import React from 'react';
import { PageRoute, ThemeMode } from '../types';
import { ShieldCheck, Lock, BookOpen, Code2, FileText } from 'lucide-react';

interface CopyrightPageProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const CopyrightPage: React.FC<CopyrightPageProps> = ({ onNavigate, theme }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 pb-16 space-y-8 font-sans">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-sky-500/30 backdrop-blur-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>INTELLECTUAL PROPERTY & LEGAL POLICY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Copyright & Open Hardware <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">License</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-mono">
          AymanPortfolio • aymanportfolio.github.io
        </p>
      </div>

      {/* Main Legal Content */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-sky-400" /> 1. Copyright Ownership
          </h2>
          <p>
            All content, 3D interactive visualizations, research blog articles, hardware schematics, firmware source codes, and visual layout on <strong>aymanportfolio.github.io</strong> are protected by copyright laws © 2026 AYMAN ULLAH.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" /> 2. Open Hardware & Source Code Guidelines
          </h2>
          <p>
            Downloadable Gerber files, PCB schematics, and embedded C/Verilog source code available on this portfolio are provided under the MIT License and CERN Open Hardware License v2. You are permitted to inspect, modify, and build derivative hardware prototypes for educational and non-commercial research purposes with proper attribution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" /> 3. Academic Citation Requirements
          </h2>
          <p>
            If referencing research papers, benchmark data (e.g. 98.8% GaN inverter efficiency), or processor architectures published on AymanPortfolio in academic papers, please utilize the provided APA 7th Edition citations generated on each project and blog detail page.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>Official Domain: aymanportfolio.github.io</span>
          <button
            onClick={() => onNavigate('contact')}
            className="text-cyan-300 hover:underline font-bold"
          >
            Legal Inquiry Contact →
          </button>
        </div>
      </div>
    </div>
  );
};
