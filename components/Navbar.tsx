import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSettings }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'CAREER_PATH', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: AppView.OFFENSIVE, label: 'OFFENSIVE_OPS', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: AppView.TERMINAL, label: 'TERMINAL', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: AppView.TOOLS, label: 'ARSENAL', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: AppView.LABS, label: 'LABS', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { id: AppView.CHAT, label: 'MENTOR', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
  ];

  return (
    <nav className="border-b border-slate-200 dark:border-emerald-900/50 bg-white dark:bg-black sticky top-0 z-50 shadow-md dark:shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-5 cursor-pointer group" onClick={() => onNavigate(AppView.DASHBOARD)}>
            <div className="relative w-14 h-14 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/30 blur-xl rounded-full group-hover:bg-emerald-500/40 transition-all duration-300"></div>
                <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400 drop-shadow-lg dark:drop-shadow-[0_0_12px_rgba(16,185,129,0.9)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7 2 3 6.47 3 11c0 2.25 1.07 4.25 2.7 5.61V19c0 .55.45 1 1 1h2v-2h6v2h2c.55 0 1-.45 1-1v-2.39c1.63-1.36 2.7-3.36 2.7-5.61 0-4.53-4-9-9-9zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4-5c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.1-.9 2-2 2s-2-.9-2-2z"/>
                    <path d="M10 10c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm4 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z" fill="#000"/>
                </svg>
            </div>
            
            <div className="flex flex-col">
                <span className="text-3xl font-black tracking-[0.2em] text-slate-900 dark:text-white font-display leading-none group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors uppercase">
                XPLOIT
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-black tracking-[0.3em] uppercase leading-none mt-2">
                    {'>'}_ ACADEMY
                </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-2 overflow-x-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2.5 rounded-lg text-xs lg:text-sm font-black font-display transition-all flex items-center gap-2.5 uppercase tracking-[0.1em] whitespace-nowrap border-2 ${
                      currentView === item.id
                        ? 'bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/60 shadow-lg dark:shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : item.id === AppView.OFFENSIVE
                          ? 'text-red-600 dark:text-red-400 border-red-900/20 dark:border-red-900/40 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-500/50'
                          : 'text-slate-600 dark:text-slate-200 border-transparent hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onOpenSettings}
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
