import React, { useState, useEffect } from 'react';
import { PageRoute, ThemeMode, AccessibilitySettings } from './types';
import { ThreeCanvas } from './components/ThreeCanvas';
import { EntryLoader } from './components/EntryLoader';
import { CaptchaModal } from './components/CaptchaModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingAssistant } from './components/FloatingAssistant';
import { AccessibilityModal } from './components/AccessibilityModal';
import { VoiceCommandController } from './components/VoiceCommandController';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { SocialPage } from './pages/SocialPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ContactPage } from './pages/ContactPage';
import { CopyrightPage } from './pages/CopyrightPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { setupSourceCodeProtection } from './utils/sourceProtection';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParams, setRouteParams] = useState<{ id?: string }>({});
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [sourceNotice, setSourceNotice] = useState('');
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    theme: 'dark',
    highContrast: false,
    dyslexicFont: false,
    fontScale: 'normal',
    reducedMotion: false,
    screenReaderActive: false,
    voiceCommandsActive: false,
  });

  // Source Code Protection listener
  useEffect(() => {
    const cleanup = setupSourceCodeProtection((reason) => {
      setSourceNotice(reason);
      setTimeout(() => setSourceNotice(''), 3500);
    });
    return cleanup;
  }, []);

  // Sync theme with accessibility state
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setAccessibility((prev) => ({ ...prev, theme: nextTheme }));
  };

  const handleNavigate = (route: PageRoute, params?: { id?: string }) => {
    setCurrentRoute(route);
    if (params) setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const announceScreenReader = (text: string) => {
    setScreenReaderAnnouncement(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Font Scale styling
  const getFontScaleClass = () => {
    switch (accessibility.fontScale) {
      case 'large':
        return 'text-[17px]';
      case 'xlarge':
        return 'text-[19px]';
      default:
        return 'text-[15px]';
    }
  };

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-300 ${getFontScaleClass()} ${
        accessibility.dyslexicFont ? 'font-serif' : ''
      } ${
        accessibility.highContrast
          ? 'bg-black text-yellow-300 contrast-200'
          : theme === 'dark'
          ? 'bg-[#0c0214] text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Three.js Interactive Background Canvas */}
      <ThreeCanvas theme={theme} />

      {/* Entry Loading Screen */}
      {!hasLoaded && <EntryLoader onComplete={() => setHasLoaded(true)} />}

      {/* 24-Hour CAPTCHA Gate Modal */}
      {hasLoaded && <CaptchaModal />}

      {/* Source Code Protection Toast Alert */}
      {sourceNotice && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-rose-500/50 text-rose-300 font-mono text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{sourceNotice}</span>
        </div>
      )}

      {/* Screen Reader Live ARIA Announcer */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {screenReaderAnnouncement}
      </div>

      {/* Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        voiceActive={accessibility.voiceCommandsActive}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentRoute === 'home' && <HomePage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'about' && <AboutPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'projects' && <ProjectsPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'project-detail' && (
          <ProjectDetailPage
            projectId={routeParams.id || 'prj-01'}
            onNavigate={handleNavigate}
            theme={theme}
          />
        )}
        {currentRoute === 'blogs' && <BlogsPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'blog-detail' && (
          <BlogDetailPage
            blogId={routeParams.id || 'blog-01'}
            onNavigate={handleNavigate}
            theme={theme}
          />
        )}
        {currentRoute === 'social' && <SocialPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'signin' && <SignInPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'signup' && <SignUpPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'contact' && <ContactPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === 'copyright' && <CopyrightPage onNavigate={handleNavigate} theme={theme} />}
        {currentRoute === '404' && <NotFoundPage onNavigate={handleNavigate} theme={theme} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} theme={theme} />

      {/* Fixed 'Need Help' Assistant Widget */}
      <FloatingAssistant onNavigateContact={() => handleNavigate('contact')} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Accessibility Controls Modal */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibility}
        onUpdateSettings={(newSettings) => {
          setAccessibility((prev) => ({ ...prev, ...newSettings }));
          if (newSettings.theme) setTheme(newSettings.theme);
        }}
        onAnnounceScreenReader={announceScreenReader}
      />

      {/* Voice Commands Controller */}
      <VoiceCommandController
        active={accessibility.voiceCommandsActive}
        onNavigate={handleNavigate}
        onToggleTheme={handleToggleTheme}
        onAnnounce={announceScreenReader}
      />
    </div>
  );
}
