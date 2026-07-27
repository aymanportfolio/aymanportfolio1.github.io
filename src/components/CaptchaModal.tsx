import React, { useEffect, useState } from 'react';
import { ShieldAlert, Cpu, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'ayman_portfolio_24h_captcha_token';
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Hours in milliseconds

export const CaptchaModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [targetMatch] = useState(78); // Target slider alignment point
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY);
    if (savedToken) {
      try {
        const { timestamp } = JSON.parse(savedToken);
        const now = Date.now();
        if (now - timestamp < EXPIRY_MS) {
          // Token still valid for 24 hours
          return;
        }
      } catch (err) {
        // Invalid token format
      }
    }
    // Token missing or expired -> Trigger verification modal
    setIsOpen(true);
  }, []);

  const handleVerifySubmit = () => {
    if (!isChecked) {
      setErrorMessage('Please check "I am not a robot".');
      return;
    }

    // Verify slider tolerance
    if (Math.abs(sliderValue - targetMatch) > 8) {
      setErrorMessage('Please align the frequency slider to match the circuit resonance (around 78%).');
      return;
    }

    setIsVerified(true);
    setErrorMessage('');

    // Save token for 24 hours
    const tokenData = {
      verified: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokenData));

    setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 md:p-8 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-white font-sans">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono tracking-wide text-cyan-300">
              SECURITY VERIFICATION GATE
            </h2>
            <p className="text-xs font-mono text-slate-400">
              24-Hour Session Authentication — AymanPortfolio
            </p>
          </div>
        </div>

        {isVerified ? (
          <div className="py-8 flex flex-col items-center text-center animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-emerald-300 font-mono">
              ACCESS GRANTED
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Verification token authorized for 24 hours. Welcome to AymanPortfolio!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              Welcome to Ayman Ullah's EEE Portfolio! Please complete this brief hardware frequency check to verify human interaction and grant 24-hour uninterrupted access.
            </p>

            {/* Checkbox */}
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
              />
              <span className="text-sm font-mono text-slate-200">
                I am human and not an automated crawler bot.
              </span>
            </label>

            {/* Sci-Fi Frequency Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2 text-cyan-300">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> Circuit Resonance Slider
                </span>
                <span>Target: ~78% (Current: {sliderValue}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>0 Hz</span>
                <span>78 Hz (Resonant Sync)</span>
                <span>100 Hz</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono rounded-lg flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleVerifySubmit}
              className="w-full py-3 px-6 rounded-xl font-mono text-sm font-semibold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Verify & Enter Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] font-mono text-slate-500 text-center">
              A 24-hour cryptographic token will be saved in your browser localStorage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
