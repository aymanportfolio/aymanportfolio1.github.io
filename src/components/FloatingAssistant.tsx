import React, { useState } from 'react';
import { HelpCircle, X, Send, Bot, Sparkles, MessageSquare, ChevronRight, RefreshCw } from 'lucide-react';
import { FAQS_DATA } from '../data/portfolioData';

interface FloatingAssistantProps {
  onNavigateContact: () => void;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ onNavigateContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'faq'>('ai');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Hello! I am AymanAI, your EEE assistant. Ask me anything about Ayman Ullah's projects, GaN inverters, FPGA RISC-V cores, or navigation!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply || 'No response.' }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Notice: Could not reach assistant server. Ayman Ullah specializes in Embedded Systems, Power Electronics, and Hardware Engineering!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Permanent Fixed Glowing Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold font-mono text-sm shadow-2xl shadow-cyan-500/40 border border-cyan-300 flex items-center gap-2 group cursor-pointer transition-all transform hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <HelpCircle className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline">Need Help?</span>
      </button>

      {/* Floating Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full sm:max-w-md h-[550px] flex flex-col rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-white font-sans overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono text-cyan-300 flex items-center gap-1">
                    AymanAI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">EEE Knowledge & FAQ Bot</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 font-mono text-xs">
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'ai'
                    ? 'text-cyan-300 border-b-2 border-cyan-400 font-bold bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> AI Chat
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'faq'
                    ? 'text-cyan-300 border-b-2 border-cyan-400 font-bold bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> EEE FAQs
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'ai' ? (
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                {/* Chat Stream */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-mono">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          m.sender === 'user'
                            ? 'bg-cyan-600 text-white rounded-br-none'
                            : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Computing response...</span>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about Ayman's projects or EEE topics..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-colors font-bold disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-mono">
                {FAQS_DATA.map((faq, i) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {faq.question}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-sans pl-5">{faq.answer}</p>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateContact();
                  }}
                  className="w-full mt-4 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold text-center transition-colors"
                >
                  Direct Inquiry Contact Form →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
