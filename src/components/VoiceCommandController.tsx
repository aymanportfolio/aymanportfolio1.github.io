import React, { useEffect, useState } from 'react';
import { PageRoute } from '../types';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceCommandControllerProps {
  active: boolean;
  onNavigate: (route: PageRoute) => void;
  onToggleTheme: () => void;
  onAnnounce: (msg: string) => void;
}

export const VoiceCommandController: React.FC<VoiceCommandControllerProps> = ({
  active,
  onNavigate,
  onToggleTheme,
  onAnnounce,
}) => {
  const [transcript, setTranscript] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    if (!active) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      onAnnounce('Speech recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const speechText = event.results[current][0].transcript.toLowerCase().trim();
      setTranscript(speechText);

      onAnnounce(`Heard command: ${speechText}`);

      if (speechText.includes('home')) {
        onNavigate('home');
      } else if (speechText.includes('about')) {
        onNavigate('about');
      } else if (speechText.includes('project')) {
        onNavigate('projects');
      } else if (speechText.includes('blog')) {
        onNavigate('blogs');
      } else if (speechText.includes('contact')) {
        onNavigate('contact');
      } else if (speechText.includes('theme') || speechText.includes('dark') || speechText.includes('light')) {
        onToggleTheme();
      }
    };

    recognition.onerror = () => {
      // Ignore transient mic errors
    };

    try {
      recognition.start();
    } catch (e) {
      // Already running
    }

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
  }, [active, onNavigate, onToggleTheme, onAnnounce]);

  if (!active) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl text-white font-mono text-xs flex items-center gap-3 animate-fade-in">
      <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl animate-pulse">
        <Mic className="w-4 h-4" />
      </div>
      <div>
        <p className="font-bold text-cyan-300">Voice Navigation Active</p>
        <p className="text-[10px] text-slate-400">
          {transcript ? `"${transcript}"` : 'Say "Go to Projects", "About", "Theme"...'}
        </p>
      </div>
    </div>
  );
};
