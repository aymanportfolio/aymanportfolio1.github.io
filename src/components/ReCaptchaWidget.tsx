import React, { useState } from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

interface ReCaptchaWidgetProps {
  onVerify: (isVerified: boolean) => void;
  className?: string;
}

export const ReCaptchaWidget: React.FC<ReCaptchaWidgetProps> = ({ onVerify, className = '' }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 9) + 2);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 8) + 1);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');

  const refreshMath = () => {
    setNum1(Math.floor(Math.random() * 9) + 2);
    setNum2(Math.floor(Math.random() * 8) + 1);
    setUserAnswer('');
    setError('');
  };

  const handleVerify = () => {
    if (parseInt(userAnswer.trim(), 10) === num1 + num2) {
      setIsPassed(true);
      setError('');
      onVerify(true);
    } else {
      setError('Incorrect answer. Please retry.');
      onVerify(false);
    }
  };

  return (
    <div className={`p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-5 h-5 ${isPassed ? 'text-emerald-400' : 'text-cyan-400'}`} />
          <span className="text-xs font-mono font-bold uppercase text-cyan-300">
            AymanSecurity reCAPTCHA
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">v2.4-EEE</span>
      </div>

      {isPassed ? (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-mono flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>reCAPTCHA Verified Successfully!</span>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="flex items-center gap-2.5 text-xs font-mono text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                if (!e.target.checked) onVerify(false);
              }}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-700"
            />
            <span>I am human (Solve math prompt below)</span>
          </label>

          {isChecked && (
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-mono text-slate-200">
                <span>
                  Solve: <strong className="text-amber-400">{num1} + {num2} = ?</strong>
                </span>
                <button
                  type="button"
                  onClick={refreshMath}
                  className="p-1 hover:text-cyan-400 transition-colors"
                  title="New Challenge"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Result"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-24 px-2.5 py-1.5 text-xs font-mono rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  className="px-3 py-1.5 text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded transition-colors"
                >
                  Verify
                </button>
              </div>

              {error && <p className="text-[11px] font-mono text-rose-400">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
