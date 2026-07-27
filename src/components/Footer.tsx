import React from 'react';
import { ThreeLogo } from './ThreeLogo';
import { PageRoute, ThemeMode } from '../types';
import { Cpu, ShieldCheck, Github, Linkedin, Mail, ExternalLink, Heart, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`relative z-10 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-slate-950/90 border-cyan-500/20 text-slate-300'
          : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ThreeLogo size={36} />
              <div>
                <span className="font-mono font-bold text-lg text-white">AYMAN ULLAH</span>
                <p className="text-xs font-mono text-cyan-400">Electrical & Electronic Engineer</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              High-performance EEE research portfolio featuring 3D circuit visualizations, GaN power converters, autonomous robotics, FPGA digital architecture, and AI-assisted engineering tools.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/aymanportfolio"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/aymanullah"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 transition-all"
                title="Contact Ayman"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-300 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-300 transition-colors">
                  About & EEE Skills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-cyan-300 transition-colors">
                  Hardware Projects Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blogs')} className="hover:text-cyan-300 transition-colors">
                  Research Blogs & Papers
                </button>
              </li>
            </ul>
          </div>

          {/* System Pages & Legal */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 mb-4">
              System Pages
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li>
                <button onClick={() => onNavigate('signin')} className="hover:text-cyan-300 transition-colors">
                  Account Sign In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signup')} className="hover:text-cyan-300 transition-colors">
                  Account Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-300 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('copyright')} className="hover:text-cyan-300 transition-colors">
                  Copyright & IP License
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('404')} className="hover:text-cyan-300 transition-colors">
                  Demo 404 Error Page
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Live System Diagnostics Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              WebGL 3D Engine: Online
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              24H CAPTCHA Guard: Active
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <Cpu className="w-3.5 h-3.5" />
              Gemini AI: Operational
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <Globe className="w-3.5 h-3.5" />
            <span>Host: aymanportfolio.github.io</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AymanPortfolio by AYMAN ULLAH. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Electrical & Electronic Engineering Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
