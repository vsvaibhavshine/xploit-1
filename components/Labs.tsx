import React, { useState } from 'react';
import { Button } from './ui/Button';
import { ImageLab } from './ImageLab';

export const Labs: React.FC = () => {
  const [activeLab, setActiveLab] = useState<string | null>(null);

  const renderActiveLab = () => {
    switch (activeLab) {
        case 'forensics':
            return (
                <div className="animate-fade-in">
                    <div className="mb-4">
                        <Button variant="ghost" onClick={() => setActiveLab(null)} className="mb-4">← BACK TO LABS</Button>
                    </div>
                    <ImageLab />
                </div>
            );
        case 'sql-injection':
            return (
                <div className="animate-fade-in text-center py-20 bg-slate-900 rounded-lg border border-slate-700">
                    <Button variant="ghost" onClick={() => setActiveLab(null)} className="mb-8 mx-auto">← BACK TO LABS</Button>
                    <h2 className="text-3xl font-bold text-white mb-4 font-display">SQL INJECTION ARENA</h2>
                    <p className="text-emerald-500 font-mono max-w-xl mx-auto mb-8">
                        [SIMULATION STARTING] This lab would present a vulnerable PHP/MySQL storefront. 
                        Your goal: bypass authentication or dump the 'users' table.
                    </p>
                    <div className="w-64 h-64 mx-auto border-2 border-dashed border-emerald-500/30 flex items-center justify-center rounded">
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Module Loading...</span>
                    </div>
                </div>
            );
        case 'social-eng':
            return (
                <div className="animate-fade-in text-center py-20 bg-slate-900 rounded-lg border border-red-900/30">
                    <Button variant="ghost" onClick={() => setActiveLab(null)} className="mb-8 mx-auto">← BACK TO LABS</Button>
                    <h2 className="text-3xl font-bold text-red-500 mb-4 font-display">PHISHING SIMULATOR</h2>
                    <p className="text-red-300 font-mono max-w-xl mx-auto mb-8">
                        [OFFENSIVE OP STARTING] Craft the perfect phishing email. 
                        Test click-through rates and credential harvesting effectiveness.
                    </p>
                    <div className="w-64 h-64 mx-auto border-2 border-dashed border-red-500/30 flex items-center justify-center rounded">
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Offensive Module Loading...</span>
                    </div>
                </div>
            );
        default:
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg group hover:border-emerald-500/50 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-2 font-display tracking-wide">Forensics Image Lab</h3>
                        <p className="text-slate-400 text-sm mb-4 font-mono">Analyze and manipulate digital evidence using AI-assisted algorithms.</p>
                        <Button variant="primary" className="w-full" onClick={() => setActiveLab('forensics')}>ENTER LAB</Button>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg group hover:border-yellow-500/50 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-2 font-display tracking-wide">SQL Injection Playground</h3>
                        <p className="text-slate-400 text-sm mb-4 font-mono">Practice dumping tables on a simulated vulnerable e-commerce site.</p>
                        <Button variant="primary" className="w-full" onClick={() => setActiveLab('sql-injection')}>ENTER LAB</Button>
                    </div>

                    <div className="bg-slate-900 border border-red-900/30 p-6 rounded-lg group hover:border-red-500/50 transition-all">
                        <h3 className="text-2xl font-bold text-red-500 mb-2 font-display tracking-wide">Offensive: Phishing Lab</h3>
                        <p className="text-slate-400 text-sm mb-4 font-mono">Craft and deploy simulated social engineering campaigns against AI targets.</p>
                        <Button variant="danger" className="w-full" onClick={() => setActiveLab('social-eng')}>INITIALIZE ATTACK</Button>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg group hover:border-cyan-500/50 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-2 font-display tracking-wide">XSS Stored Arena</h3>
                        <p className="text-slate-400 text-sm mb-4 font-mono">Inject persistent scripts into a guestbook application safely.</p>
                        <Button variant="secondary" className="w-full">OPEN RANGE</Button>
                    </div>
                </div>
            );
    }
  };

  return (
    <div className="space-y-6">
       {!activeLab && (
           <div className="border-l-4 border-emerald-500 pl-4 mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 font-display uppercase tracking-widest text-glow">Interactive Ranges</h2>
            <p className="text-slate-400 font-mono">Deploy into sandboxed environments to test your skills safely. All restrictions removed.</p>
          </div>
       )}
       {renderActiveLab()}
    </div>
  );
};