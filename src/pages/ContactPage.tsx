import React, { useState } from 'react';
import { PageRoute, ThemeMode } from '../types';
import { ReCaptchaWidget } from '../components/ReCaptchaWidget';
import { Mail, Send, CheckCircle2, User, MessageSquare, Tag, RefreshCw } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, theme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Power Electronics & GaN Inverter');
  const [message, setMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseLog, setResponseLog] = useState<{ referenceId: string; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Name, email, and message content are required.');
      return;
    }

    if (!captchaVerified) {
      setError('Please complete the reCAPTCHA challenge before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          captchaToken: 'VERIFIED_CLIENT_RECAPTCHA',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResponseLog({
          referenceId: data.referenceId,
          msg: data.message,
        });
        setName('');
        setEmail('');
        setMessage('');
        setCaptchaVerified(false);
      } else {
        setError(data.message || 'Error processing message dispatch.');
      }
    } catch (err) {
      setError('Server communication failure. Please retry shortly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 pb-16 space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
          <Mail className="w-4 h-4 text-amber-400" />
          <span>AUTOMATED DISPATCH CONTACT SYSTEM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contact <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">AYMAN ULLAH</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto">
          Send technical inquiries, project collaborations, or research feedback directly to Ayman Ullah (aymanportfolio.github.io).
        </p>
      </div>

      {/* Response Notice */}
      {responseLog ? (
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs space-y-3 text-center animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-lg font-bold text-emerald-300">DISPATCH RECEIPT ISSUED</h2>
          <p className="text-slate-300 font-sans leading-relaxed">{responseLog.msg}</p>
          <p className="text-[11px] text-emerald-400 font-bold">Tracking Ref: {responseLog.referenceId}</p>

          <button
            onClick={() => setResponseLog(null)}
            className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-700 font-bold"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-300">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Robert Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Your Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="vance@laboratory.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Inquiry Subject Category</label>
            <div className="relative">
              <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Power Electronics & GaN Inverter">Power Electronics & GaN Inverter</option>
                <option value="Embedded Firmware & STM32 HAL">Embedded Firmware & STM32 HAL</option>
                <option value="FPGA Verilog Softcore Synthesis">FPGA Verilog Softcore Synthesis</option>
                <option value="PCB CAD Routing & Consulting">PCB CAD Routing & Consulting</option>
                <option value="General Academic Collaboration">General Academic Collaboration</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Detailed Message</label>
            <textarea
              rows={5}
              placeholder="Provide specifications or inquiries regarding hardware designs..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Mandatory reCAPTCHA */}
          <div className="pt-2">
            <ReCaptchaWidget onVerify={(v) => setCaptchaVerified(v)} />
          </div>

          {error && <p className="text-rose-400 text-xs font-mono">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Dispatch...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Dispatch Automated Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
