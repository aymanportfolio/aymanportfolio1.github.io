import React, { useState } from 'react';
import { PageRoute, ThemeMode } from '../types';
import {
  Linkedin,
  Mail,
  Phone,
  MessageSquare,
  Facebook,
  Github,
  Youtube,
  Instagram,
  Copy,
  Check,
  Share2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  Lock,
} from 'lucide-react';

interface SocialPageProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const SocialPage: React.FC<SocialPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'linkedin.com/in/aymanullah',
      url: 'https://linkedin.com/in/aymanullah',
      icon: <Linkedin className="w-5 h-5 text-sky-400" />,
      color: 'from-blue-600/30 to-sky-500/20 border-sky-400/40 hover:border-sky-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]',
      textColor: 'text-sky-300',
      valueToCopy: 'https://linkedin.com/in/aymanullah',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Direct Chat',
      handle: '+880 1911-882764',
      url: 'https://wa.me/8801911882764',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-600/30 to-green-500/20 border-emerald-400/40 hover:border-emerald-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]',
      textColor: 'text-emerald-300',
      valueToCopy: '+8801911882764',
    },
    {
      id: 'facebook',
      name: 'Facebook Profile',
      handle: 'facebook.com/aymanullah',
      url: 'https://facebook.com',
      icon: <Facebook className="w-5 h-5 text-blue-400" />,
      color: 'from-blue-700/30 to-indigo-600/20 border-blue-400/40 hover:border-blue-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(96,165,250,0.5)]',
      textColor: 'text-blue-300',
      valueToCopy: 'https://facebook.com',
    },
    {
      id: 'email',
      name: 'Email Me Direct',
      handle: 'aymanullah.eng@gmail.com',
      url: 'mailto:aymanullah.eng@gmail.com',
      icon: <Mail className="w-5 h-5 text-pink-400" />,
      color: 'from-pink-600/30 to-rose-500/20 border-pink-400/40 hover:border-pink-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]',
      textColor: 'text-pink-300',
      valueToCopy: 'aymanullah.eng@gmail.com',
    },
    {
      id: 'phone',
      name: 'Phone Call / Cellular',
      handle: '+880 1911-882764',
      url: 'tel:+8801911882764',
      icon: <Phone className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-600/30 to-yellow-500/20 border-amber-400/40 hover:border-amber-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]',
      textColor: 'text-amber-300',
      valueToCopy: '+8801911882764',
    },
    {
      id: 'github',
      name: 'GitHub Repository',
      handle: 'github.com/aymanportfolio',
      url: 'https://github.com/aymanportfolio',
      icon: <Github className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-600/30 to-indigo-500/20 border-purple-400/40 hover:border-purple-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(192,132,252,0.5)]',
      textColor: 'text-purple-300',
      valueToCopy: 'https://github.com/aymanportfolio',
    },
    {
      id: 'youtube',
      name: 'YouTube Tech Channel',
      handle: '@aymanullah_eee',
      url: 'https://youtube.com',
      icon: <Youtube className="w-5 h-5 text-red-400" />,
      color: 'from-red-600/30 to-rose-600/20 border-red-400/40 hover:border-red-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(248,113,113,0.5)]',
      textColor: 'text-red-300',
      valueToCopy: 'https://youtube.com',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@aymanullah_eng',
      url: 'https://instagram.com',
      icon: <Instagram className="w-5 h-5 text-fuchsia-400" />,
      color: 'from-fuchsia-600/30 to-pink-600/20 border-fuchsia-400/40 hover:border-fuchsia-400',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(232,121,249,0.5)]',
      textColor: 'text-fuchsia-300',
      valueToCopy: 'https://instagram.com',
    },
  ];

  return (
    <div className="py-8 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Bio Linktree Card Container */}
      <div
        className={`w-full max-w-md p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl relative overflow-hidden transition-all duration-300 shadow-2xl space-y-8 ${
          isDark
            ? 'bg-slate-950/85 border-pink-500/30 shadow-[0_0_60px_rgba(255,42,133,0.15)] text-slate-100'
            : 'bg-white/95 border-pink-200 shadow-xl text-slate-900'
        }`}
      >
        {/* Futuristic Pink-Cyan Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/15 blur-3xl rounded-full pointer-events-none" />

        {/* Profile Avatar Header */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10">
          <div className="relative group">
            {/* Animated Pulsing Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 opacity-80 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

            {/* Avatar Circle */}
            <div
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-pink-400/80 bg-slate-900 flex items-center justify-center select-none shadow-xl cursor-not-allowed"
              style={{ userSelect: 'none' }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Ayman Ullah"
                className="w-full h-full object-cover filter brightness-95 pointer-events-none"
                draggable={false}
              />
              <div
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 bg-slate-950/20 flex items-center justify-center pointer-events-auto"
              >
                <Lock className="w-5 h-5 text-pink-300 opacity-60" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold font-mono tracking-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Ayman Ullah
              </span>
            </h1>
            <p className="text-xs font-mono text-pink-400 font-semibold mt-1 flex items-center justify-center gap-1">
              <span>Electrical & Electronic Engineer</span>
              <span className="px-1.5 py-0.2 rounded bg-pink-500/20 border border-pink-400/30 text-[10px] text-pink-300">
                ENG
              </span>
            </p>
          </div>

          <p className="text-xs text-slate-300 italic max-w-xs font-sans">
            “Circuit precision. Firmware deterministic logic. Futuristic innovation.”
          </p>
        </div>

        {/* Copy Toast Alert */}
        {copiedLink && (
          <div className="p-3 rounded-xl bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono font-bold flex items-center justify-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Copied {copiedLink} to clipboard!</span>
          </div>
        )}

        {/* HIGHLY ANIMATED SOCIAL BUTTONS */}
        <div className="space-y-3 relative z-10">
          {socialLinks.map((item) => (
            <div key={item.id} className="relative group">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 px-4 rounded-2xl border bg-gradient-to-r ${item.color} ${item.hoverGlow} backdrop-blur-xl flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 group-hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className={`font-mono font-bold text-xs sm:text-sm ${item.textColor}`}>
                      {item.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{item.handle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(item.valueToCopy, item.name);
                    }}
                    className="p-2 rounded-lg bg-slate-950/40 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Footer info line */}
        <div className="pt-4 border-t border-slate-800/80 text-center font-mono text-[10px] text-slate-400 space-y-1">
          <p>© 2026 Ayman Ullah Portfolio • All Rights Reserved</p>
          <button
            onClick={() => onNavigate('home')}
            className="text-pink-400 hover:underline cursor-pointer font-bold"
          >
            ← Return to Main Portfolio Website
          </button>
        </div>
      </div>
    </div>
  );
};
