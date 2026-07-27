import React, { useState } from 'react';
import { PageRoute, ThemeMode } from '../types';
import { ReCaptchaWidget } from '../components/ReCaptchaWidget';
import { Lock, Mail, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

interface SignInPageProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onNavigate, theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    if (!captchaVerified) {
      setError('You must complete the reCAPTCHA verification check before signing in.');
      return;
    }

    setError('');
    setSuccessMsg('Authentication Successful! Logged in as EEE Student Session.');

    setTimeout(() => {
      onNavigate('home');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto py-12 pb-20">
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl space-y-6 text-white font-sans">
        <div className="text-center space-y-2">
          <div className="inline-p-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400 mb-2">
            <UserCheck className="w-8 h-8 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold font-mono tracking-wide text-cyan-300">AYMANPORTFOLIO SIGN IN</h1>
          <p className="text-xs font-mono text-slate-400">Access Saved Projects & Downloads</p>
        </div>

        {successMsg ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-mono text-center space-y-2">
            <p className="font-bold">{successMsg}</p>
            <p className="text-[10px] text-slate-400">Redirecting to Portfolio Overview...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="engineer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Mandatory reCAPTCHA */}
            <div className="pt-2">
              <ReCaptchaWidget onVerify={(v) => setCaptchaVerified(v)} />
            </div>

            {error && <p className="text-rose-400 text-xs font-mono text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <span>Authenticate & Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2 text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-cyan-300 hover:underline font-bold"
              >
                Sign Up Here
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
