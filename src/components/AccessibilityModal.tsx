import React from 'react';
import { AccessibilitySettings } from '../types';
import { Accessibility, X, Sun, Moon, Type, Volume2, Mic, Eye, Zap } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onAnnounceScreenReader: (text: string) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onAnnounceScreenReader,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl text-white font-mono space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
              <Accessibility className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-cyan-300">INCLUSIVE ACCESSIBILITY & VOICE</h2>
              <p className="text-xs text-slate-400 font-sans">Adaptive Controls for All Impairments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4 text-xs">
          {/* Theme Mode */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-cyan-400" />}
              <span>Appearance Theme</span>
            </div>
            <button
              onClick={() => {
                const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
                onUpdateSettings({ theme: nextTheme });
                onAnnounceScreenReader(`Theme changed to ${nextTheme} mode.`);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold"
            >
              {settings.theme.toUpperCase()} MODE
            </button>
          </div>

          {/* High Contrast */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>High Contrast Mode</span>
            </div>
            <button
              onClick={() => {
                onUpdateSettings({ highContrast: !settings.highContrast });
                onAnnounceScreenReader(`High contrast mode ${!settings.highContrast ? 'enabled' : 'disabled'}.`);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                settings.highContrast
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {settings.highContrast ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Dyslexic Font */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Dyslexia-Friendly Font</span>
            </div>
            <button
              onClick={() => {
                onUpdateSettings({ dyslexicFont: !settings.dyslexicFont });
                onAnnounceScreenReader(`Dyslexic font ${!settings.dyslexicFont ? 'enabled' : 'disabled'}.`);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                settings.dyslexicFont
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {settings.dyslexicFont ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Font Scale */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-slate-300">Text Size Scale</span>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map((scale) => (
                <button
                  key={scale}
                  onClick={() => {
                    onUpdateSettings({ fontScale: scale });
                    onAnnounceScreenReader(`Text scale set to ${scale}.`);
                  }}
                  className={`py-1.5 rounded-xl font-bold border uppercase text-[11px] ${
                    settings.fontScale === scale
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Commands */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-400" />
              <span>Voice Navigation Commands</span>
            </div>
            <button
              onClick={() => {
                onUpdateSettings({ voiceCommandsActive: !settings.voiceCommandsActive });
                onAnnounceScreenReader(`Voice commands ${!settings.voiceCommandsActive ? 'activated' : 'deactivated'}.`);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                settings.voiceCommandsActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {settings.voiceCommandsActive ? 'LISTENING' : 'OFF'}
            </button>
          </div>

          {/* Screen Reader Voice Synthesis Demo */}
          <button
            onClick={() => {
              onAnnounceScreenReader('Screen reader support active on AymanPortfolio EEE platform.');
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-2xl flex items-center justify-center gap-2 font-bold"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" /> Test Voice Synthesis Announcer
          </button>
        </div>

        <p className="text-[10px] text-slate-500 text-center font-sans">
          Voice Speech Commands supported: "Go to home", "Go to about", "Open projects", "Open blogs", "Contact us", "Toggle theme".
        </p>
      </div>
    </div>
  );
};
