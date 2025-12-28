import React, { useState } from 'react';
import { ToolDefinition } from '../types';

const TOOLS: ToolDefinition[] = [
  {
    id: 'nmap',
    name: 'Nmap',
    category: 'Reconnaissance',
    description: 'Network Mapper. Used to discover hosts and services on a computer network by sending packets and analyzing the responses.',
    legalUsage: 'Scanning networks you own or have explicit written permission to test.',
    illegalUsage: 'Scanning random IP addresses, corporate networks, or government systems without authorization.',
    commandExample: 'nmap -sV -p- 192.168.1.1'
  },
  {
    id: 'burp',
    name: 'Burp Suite',
    category: 'Web Analysis',
    description: 'An integrated platform for performing security testing of web applications. It acts as a proxy, allowing you to inspect and modify traffic.',
    legalUsage: 'Debugging your own applications or performing authorized bug bounty hunting.',
    illegalUsage: 'Intercepting and modifying banking traffic, stealing session cookies, or testing sites without scope.',
    commandExample: '(GUI Tool - No CLI command)'
  },
  {
    id: 'metasploit',
    name: 'Metasploit',
    category: 'Exploitation',
    description: 'A penetration testing framework that makes hacking simple. It contains a suite of tools that you can use to test security vulnerabilities.',
    legalUsage: 'Simulating attacks on a test environment to verify patches and security configurations.',
    illegalUsage: 'Using exploits to gain unauthorized access to remote systems.',
    commandExample: 'msfconsole'
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Sniffing',
    description: 'A network protocol analyzer. It lets you capture and browse the traffic running on a computer network.',
    legalUsage: 'Troubleshooting network issues and analyzing traffic on your own network.',
    illegalUsage: 'Capturing passwords or sensitive data on public Wi-Fi or networks you do not administer.',
    commandExample: 'wireshark'
  }
];

export const Tools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolDefinition | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Tool List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-emerald-500 pl-4 font-display uppercase tracking-widest">Arsenal</h2>
        {TOOLS.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => setSelectedTool(tool)}
            className={`p-5 rounded-xl cursor-pointer border-2 transition-all ${
              selectedTool?.id === tool.id 
                ? 'bg-emerald-900/30 border-emerald-500 shadow-lg scale-[1.02]' 
                : 'bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-100 font-display text-xl tracking-wider uppercase">{tool.name}</h3>
              <span className="text-[11px] font-black uppercase bg-slate-800 border border-slate-700 px-2 py-1 rounded text-emerald-400 font-mono tracking-tighter">{tool.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View */}
      <div className="lg:col-span-2 bg-slate-900/60 border border-slate-700 rounded-2xl p-10 shadow-2xl overflow-hidden relative">
        {selectedTool ? (
          <div className="animate-fade-in space-y-10">
             <div>
                <h2 className="text-5xl font-bold text-white mb-4 font-display uppercase tracking-widest text-glow-sm">{selectedTool.name}</h2>
                <div className="h-1.5 w-24 bg-emerald-500 mb-8 shadow-[0_0_20px_rgba(16,185,129,0.7)] rounded-full"></div>
                <p className="text-slate-100 leading-relaxed text-xl font-mono font-medium">{selectedTool.description}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-emerald-900/20 border-2 border-emerald-900/60 p-6 rounded-xl shadow-inner">
                    <h4 className="text-emerald-400 font-black mb-3 flex items-center gap-2 font-display tracking-[0.15em] text-lg uppercase">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        LEGAL USAGE
                    </h4>
                    <p className="text-sm text-slate-200 font-mono font-bold leading-relaxed">{selectedTool.legalUsage}</p>
                </div>
                <div className="bg-red-900/20 border-2 border-red-900/60 p-6 rounded-xl shadow-inner">
                    <h4 className="text-red-400 font-black mb-3 flex items-center gap-2 font-display tracking-[0.15em] text-lg uppercase">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        ILLEGAL USAGE
                    </h4>
                    <p className="text-sm text-slate-200 font-mono font-bold leading-relaxed">{selectedTool.illegalUsage}</p>
                </div>
             </div>

             <div>
                <h4 className="text-slate-400 text-xs font-black font-display uppercase tracking-[0.3em] mb-4">Command Syntax Example</h4>
                <div className="bg-black p-6 rounded-xl border-2 border-slate-800 font-mono text-emerald-400 text-lg shadow-2xl overflow-x-auto whitespace-nowrap">
                    <span className="text-slate-600 mr-3 select-none">$</span> {selectedTool.commandExample}
                </div>
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
            <div className="p-8 border-4 border-dashed border-slate-800 rounded-full mb-8">
                <svg className="w-24 h-24 opacity-30 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
            </div>
            <p className="font-display tracking-[0.2em] uppercase text-xl font-bold max-w-sm">Select a tool from the arsenal to view classified details.</p>
          </div>
        )}
      </div>
    </div>
  );
};