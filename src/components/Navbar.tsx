import React, { useState } from 'react';
import { ThreeLogo } from './ThreeLogo';
import { PageRoute, ThemeMode } from '../types';
import {
  Search,
  Sun,
  Moon,
  Accessibility,
  Menu,
  X,
  ChevronDown,
  Layers,
  UserCheck,
  UserPlus,
  Mail,
  ShieldCheck,
  AlertOctagon,
  Mic,
  Share2,
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, params?: any) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenAccessibility: () => void;
  voiceActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenAccessibility,
  voiceActive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Me', route: 'about' },
    { label: 'Projects', route: 'projects' },
    { label: 'Blogs', route: 'blogs' },
    { label: 'Social Cards', route: 'social' },
  ];

  const subPages: { label: string; route: PageRoute; icon: React.ReactNode }[] = [
    { label: 'Social & Bio Links', route: 'social', icon: <Share2 className="w-4 h-4 text-pink-400" /> },
    { label: 'Sign In', route: 'signin', icon: <UserCheck className="w-4 h-4 text-cyan-400" /> },
    { label: 'Sign Up', route: 'signup', icon: <UserPlus className="w-4 h-4 text-emerald-400" /> },
    { label: 'Contact Us', route: 'contact', icon: <Mail className="w-4 h-4 text-amber-400" /> },
    { label: 'Copyright & License', route: 'copyright', icon: <ShieldCheck className="w-4 h-4 text-sky-400" /> },
    { label: 'Demo 404 Error Page', route: '404', icon: <AlertOctagon className="w-4 h-4 text-rose-400" /> },
  ];

  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 backdrop-blur-2xl border-b ${
        isDark
          ? 'bg-[#0c0214]/85 border-pink-500/20 text-white shadow-[0_4px_30px_rgba(255,42,133,0.05)]'
          : 'bg-white/85 border-pink-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <ThreeLogo size={42} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-lg sm:text-xl tracking-wider bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-300% animate-gradient-x bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                Ayman Portfolio
              </span>
              <span
                title="Engineer"
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 border border-pink-400/40 text-pink-300 font-extrabold cursor-help hover:bg-pink-500/40 transition-colors"
              >
                ENG
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Electrical & Electronic Engineer • aymanportfolio.github.io
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                currentRoute === item.route
                  ? isDark
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                    : 'bg-pink-100 text-pink-800 border border-pink-300 font-bold'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-pink-950/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Pages Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
              onBlur={() => setTimeout(() => setPagesDropdownOpen(false), 200)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                subPages.some((sp) => sp.route === currentRoute)
                  ? isDark
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold'
                    : 'bg-pink-100 text-pink-800 border border-pink-300 font-bold'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-pink-950/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-pink-400" />
              <span>Pages</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${pagesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {pagesDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-2xl p-2 shadow-2xl border backdrop-blur-2xl z-50 animate-fade-in ${
                  isDark
                    ? 'bg-slate-950/95 border-pink-500/30 text-white'
                    : 'bg-white/95 border-pink-200 text-slate-800'
                }`}
              >
                {subPages.map((sp) => (
                  <button
                    key={sp.route}
                    onClick={() => {
                      onNavigate(sp.route);
                      setPagesDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-colors text-left cursor-pointer ${
                      currentRoute === sp.route
                        ? isDark
                          ? 'bg-pink-500/20 text-pink-300 font-bold'
                          : 'bg-pink-100 text-pink-800 font-bold'
                        : isDark
                        ? 'hover:bg-slate-900 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {sp.icon}
                    <span>{sp.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/40'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="Search Portfolio"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-amber-400'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-pink-600'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Accessibility & Voice Control Trigger */}
          <button
            onClick={onOpenAccessibility}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
              voiceActive
                ? 'bg-pink-500/20 border-pink-400 text-pink-300 animate-pulse'
                : isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-pink-400'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
            title="Accessibility & Voice Command Settings"
          >
            <Accessibility className="w-4 h-4" />
            {voiceActive && <Mic className="w-3 h-3 text-emerald-400" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden p-4 border-b backdrop-blur-2xl animate-fade-in ${
            isDark ? 'bg-[#0c0214]/95 border-pink-500/20' : 'bg-white/95 border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-mono text-sm transition-colors ${
                  currentRoute === item.route
                    ? 'bg-pink-500/20 text-pink-400 font-bold border border-pink-500/30'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-slate-800/60 my-2 pt-2">
              <p className="px-4 py-1 text-xs font-mono uppercase text-slate-500 tracking-wider">
                Pages & Resources
              </p>
              {subPages.map((sp) => (
                <button
                  key={sp.route}
                  onClick={() => {
                    onNavigate(sp.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-mono text-xs transition-colors ${
                    currentRoute === sp.route
                      ? 'bg-pink-500/20 text-pink-400 font-bold'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-900'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {sp.icon}
                  <span>{sp.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
