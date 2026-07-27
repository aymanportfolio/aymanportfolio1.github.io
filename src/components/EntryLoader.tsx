import React, { useEffect, useState } from 'react';
import { ThreeLogo } from './ThreeLogo';
import { Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

interface EntryLoaderProps {
  onComplete: () => void;
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('Initializing Quantum Core...');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const logs = [
      'Booting ARM Cortex & DSP Engine...',
      'Calibrating Oscilloscope Waveforms...',
      'Loading GaN Inverter & FPGA Netlists...',
      'Synchronizing 3D Circuit Canvas...',
      'AymanPortfolio System Ready!',
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 8;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusLog(logs[logs.length - 1]);
        clearInterval(interval);

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 400);
      } else {
        setProgress(currentProgress);
        const logIndex = Math.min(Math.floor((currentProgress / 100) * logs.length), logs.length - 1);
        setStatusLog(logs[logIndex]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-600 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-md p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 text-center">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* 3D Animated Logo */}
        <div className="mb-6 relative">
          <ThreeLogo size={72} />
          <div className="absolute -inset-2 rounded-full border border-cyan-400/40 animate-ping" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-wider font-mono text-cyan-300 mb-1">
          AYMAN ULLAH
        </h1>
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">
          EEE Engineer & Hardware Architect
        </p>

        {/* Diagnostic Status Box */}
        <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-6 text-left font-mono text-xs text-cyan-400 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Activity className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
            <span className="truncate">{statusLog}</span>
          </div>
          <span className="text-cyan-300 font-bold ml-2">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 rounded-full transition-all duration-150 shadow-glow"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sub-system Icons */}
        <div className="flex items-center justify-center gap-6 mt-6 text-slate-500 text-[11px] font-mono">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> STM32 HAL
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> GaN SPWM
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WebGL 3D
          </span>
        </div>
      </div>
    </div>
  );
};
