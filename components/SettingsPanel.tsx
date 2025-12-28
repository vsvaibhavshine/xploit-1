import React from 'react';
import { Button } from './ui/Button';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, theme, onThemeToggle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl animate-slide-in flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <h2 className="text-xl font-black font-display tracking-widest uppercase dark:text-white">OPERATOR_PREFS</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 p-6 space-y-8">
          <section>
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Display Mode</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onThemeToggle}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  theme === 'light' 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-500'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                <span className="text-xs font-bold uppercase tracking-widest">Light</span>
              </button>
              <button 
                onClick={onThemeToggle}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  theme === 'dark' 
                    ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-500'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                <span className="text-xs font-bold uppercase tracking-widest">Dark</span>
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Accessibility</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-slate-300">Terminal Glow</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full flex items-center px-1">
                    <div className="w-3.5 h-3.5 bg-white rounded-full ml-auto"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                  <span className="text-sm font-medium dark:text-slate-300">Text-to-Speech</span>
                  <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full flex items-center px-1">
                    <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto">
          <Button variant="secondary" className="w-full" onClick={onClose}>SAVE_CHANGES</Button>
        </div>
      </div>
    </div>
  );
};