import React from 'react';
import { PageRoute, ThemeMode } from '../types';
import { AlertOctagon, Activity, ArrowLeft, RefreshCw, Home, Cpu } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, theme }) => {
  return (
    <div className="max-w-xl mx-auto py-12 pb-20 text-center font-mono">
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-rose-500/40 backdrop-blur-xl shadow-2xl space-y-6 text-white">
        {/* Error Icon */}
        <div className="relative inline-block">
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-3xl text-rose-400">
            <AlertOctagon className="w-16 h-16 animate-bounce" />
          </div>
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full">
            404
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-rose-300">
            ERROR 404 — PAGE NOT FOUND
          </h1>
          <p className="text-xs text-amber-300 font-mono uppercase tracking-wider">
            We are working on this page / Under Quantum Construction
          </p>
        </div>

        {/* Oscilloscope Waveform Animation Box */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-left">
          <div className="flex items-center justify-between text-[11px] text-cyan-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Diagnostic Oscilloscope Trace
            </span>
            <span>Signal Loss Detected</span>
          </div>

          <div className="h-16 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden relative">
            <div className="w-full h-0.5 bg-rose-500/60 relative animate-pulse">
              <div className="absolute inset-0 bg-cyan-400 blur-sm animate-ping" />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Notice: This redirected URL or hyperlinked demo route has not been deployed yet. You have been seamlessly routed to this error diagnostic screen.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Overview</span>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>View Hardware Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
};
