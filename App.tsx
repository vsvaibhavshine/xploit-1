import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ChatBot } from './components/ChatBot';
import { Terminal } from './components/Terminal';
import { Tools } from './components/Tools';
import { Labs } from './components/Labs';
import { Offensive } from './components/Offensive';
import { SettingsPanel } from './components/SettingsPanel';
import { AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const savedView = localStorage.getItem('xploit_current_view');
    return (savedView as AppView) || AppView.DASHBOARD;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('xploit_theme');
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('xploit_current_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('xploit_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case AppView.OFFENSIVE:
        return <Offensive />;
      case AppView.TERMINAL:
        return <Terminal />;
      case AppView.TOOLS:
        return <Tools />;
      case AppView.LABS:
        return <Labs />;
      case AppView.CHAT:
        return <ChatBot />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-200 font-mono transition-colors duration-300 relative">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
        {renderView()}
      </main>

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      {currentView !== AppView.CHAT && (
        <button
          onClick={() => setCurrentView(AppView.CHAT)}
          className="fixed bottom-8 right-8 z-50 group flex items-center justify-center"
          aria-label="Open AI Mentor"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-20 dark:opacity-40 group-hover:opacity-70 animate-pulse transition-opacity"></div>
          <div className="relative w-16 h-16 bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="absolute right-full mr-4 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded border border-emerald-500/30 text-xs font-bold font-display uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 shadow-lg">
            Ask Cipher
          </span>
        </button>
      )}

      <footer className="border-t border-slate-200 dark:border-emerald-900/30 py-8 mt-auto bg-white/80 dark:bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-600 text-xs font-bold">
          <p className="tracking-widest">XPLOIT // ETHICAL HACKING ACADEMY</p>
          <div className="flex justify-center gap-6 mt-4 opacity-50 uppercase tracking-tighter">
            <span>Systems Online</span>
            <span>Operators: 4,102</span>
            <span>Protocol: Secure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;