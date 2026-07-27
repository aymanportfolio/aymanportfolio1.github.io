import React from 'react';
import { ThemeMode } from '../types';

interface CompanyLogoTickerProps {
  theme: ThemeMode;
}

export const CompanyLogoTicker: React.FC<CompanyLogoTickerProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const companies = [
    {
      name: 'Microsoft',
      badge: 'Microsoft Certified',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 23 23" fill="none">
          <path fill="#F25022" d="M1 1h10v10H1z" />
          <path fill="#7FBA00" d="M12 1h10v10H12z" />
          <path fill="#00A4EF" d="M1 12h10v10H1z" />
          <path fill="#FFB900" d="M12 12h10v10H12z" />
        </svg>
      ),
    },
    {
      name: 'Google',
      badge: 'Google Career Certs',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.2 1.05-.8 1.95-1.7 2.56v2.13h2.76c1.61-1.49 2.585-3.68 2.585-7.13z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v2.22C3.26 20.48 7.34 24 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V7.49H1.29C.47 9.04 0 10.96 0 12s.47 2.96 1.29 4.51l3.98-2.22z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 3.52 1.29 7.49l3.98 2.22c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
      ),
    },
    {
      name: 'IBM',
      badge: 'IBM Skills Network',
      icon: (
        <div className="font-extrabold font-mono text-lg tracking-tighter text-pink-500 flex items-center gap-0.5">
          <span className="border-b-2 border-pink-500">I</span>
          <span className="border-b-2 border-pink-500">B</span>
          <span className="border-b-2 border-pink-500">M</span>
        </div>
      ),
    },
    {
      name: 'Meta',
      badge: 'Meta Professional',
      icon: (
        <svg className="w-7 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.82 2.25c-2.3 0-4.16 1.18-5.32 2.82C10.34 3.43 8.48 2.25 6.18 2.25 2.76 2.25 0 5.01 0 8.43c0 4.67 4.7 8.35 10.42 13.06.6.5 1.56.5 2.16 0C18.3 16.78 23 13.1 23 8.43c0-3.42-2.76-6.18-6.18-6.18zM11.5 18.2C6.46 13.98 2 10.74 2 8.43c0-2.31 1.87-4.18 4.18-4.18 1.83 0 3.38 1.18 4.18 2.84h2.28c.8-1.66 2.35-2.84 4.18-4.18 2.31 0 4.18 1.87 4.18 4.18 0 2.31-4.46 5.55-9.5 9.77z" />
        </svg>
      ),
    },
    {
      name: 'Coursera',
      badge: 'Coursera Authorized',
      icon: (
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs font-mono">
          C
        </div>
      ),
    },
    {
      name: 'Udemy',
      badge: 'Udemy Academic',
      icon: (
        <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white text-xs font-mono">
          U
        </div>
      ),
    },
    {
      name: 'University of Edinburgh',
      badge: 'University Verified',
      icon: (
        <div className="w-6 h-6 rounded-full bg-rose-700 flex items-center justify-center font-bold text-white text-[10px] font-serif">
          Ed
        </div>
      ),
    },
  ];

  // Repeat twice for continuous infinite scroll
  const items = [...companies, ...companies, ...companies];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 rounded-2xl border backdrop-blur-md ${
        isDark
          ? 'bg-purple-950/20 border-pink-500/20 text-slate-200'
          : 'bg-white/80 border-pink-200 text-slate-800 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 px-6 pb-2 text-xs font-mono font-bold tracking-widest text-pink-400 uppercase">
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
        <span>Verified Credential Issuers & Organizational Partners</span>
      </div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6">
        {items.map((comp, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-transform hover:scale-105 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-pink-500/40 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-pink-400 text-slate-800'
            }`}
          >
            <div className="flex-shrink-0">{comp.icon}</div>
            <div>
              <div className="font-mono font-bold text-xs whitespace-nowrap text-white">
                {comp.name}
              </div>
              <div className="text-[10px] text-pink-400 font-mono whitespace-nowrap">
                {comp.badge}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
