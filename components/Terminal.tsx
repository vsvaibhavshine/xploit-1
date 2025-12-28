import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export const Terminal: React.FC = () => {
  // Initialize history from localStorage
  const [history, setHistory] = useState<TerminalLine[]>(() => {
    const savedHistory = localStorage.getItem('xploit_terminal_history');
    return savedHistory ? JSON.parse(savedHistory) : [
      { type: 'output', content: 'XPLOIT OS [Version 1.0.4]' },
      { type: 'output', content: '(c) CyberForge Academy. All rights reserved.' },
      { type: 'output', content: 'Type "help" to see available commands.' },
      { type: 'output', content: '' }
    ];
  });

  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileSystem: Record<string, string> = {
    'notes.txt': 'Remember to check port 8080 on the target.',
    'passwords.list': 'admin:admin\nroot:toor\nuser:123456',
    'todo': '- Scan network\n- Analyze pcap file\n- Write report'
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Save to localStorage on every history update
    localStorage.setItem('xploit_terminal_history', JSON.stringify(history));
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const [command, ...args] = trimmed.split(' ');
    
    let output = '';
    let type: 'output' | 'error' = 'output';

    switch (command.toLowerCase()) {
      case 'help':
        output = `Available Commands:
  help          Show this help message
  clear         Clear terminal screen
  ls            List directory contents
  cat <file>    Read file content
  whoami        Display current user
  nmap <ip>     (Simulated) Network exploration and security auditing
  scan          (Simulated) Quick vulnerability scan`;
        break;
      case 'clear':
        setHistory([]);
        localStorage.removeItem('xploit_terminal_history');
        return;
      case 'ls':
        output = Object.keys(fileSystem).join('    ');
        break;
      case 'whoami':
        output = 'root';
        break;
      case 'cat':
        if (args.length === 0) {
          output = 'cat: missing file operand';
          type = 'error';
        } else if (fileSystem[args[0]]) {
          output = fileSystem[args[0]];
        } else {
          output = `cat: ${args[0]}: No such file or directory`;
          type = 'error';
        }
        break;
      case 'nmap':
        if (args.length === 0) {
          output = 'nmap: missing target IP';
          type = 'error';
        } else {
            // Simulated delay would be nice, but keeping it simple for now
          output = `Starting Nmap 7.92 ( https://nmap.org )
Nmap scan report for ${args[0]}
Host is up (0.0023s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 0.45 seconds`;
        }
        break;
      case '':
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for options.`;
        type = 'error';
    }

    setHistory(prev => [
      ...prev, 
      { type: 'input', content: trimmed },
      ...(output ? [{ type, content: output }] : [])
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] bg-slate-950 border-2 border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl transition-all" onClick={() => inputRef.current?.focus()}>
      <div className="bg-slate-900 px-5 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
            <span className="ml-3 text-slate-100 font-bold font-mono tracking-wider">root@xploit_academy:~</span>
        </div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SSH-AES256</div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-2 bg-[rgba(2,6,23,0.8)] backdrop-blur-sm">
        {history.map((line, i) => (
          <div key={i} className={`${
            line.type === 'input' ? 'text-white mt-3 font-black text-base' : 
            line.type === 'error' ? 'text-red-400 font-bold' : 'text-emerald-400 font-medium leading-relaxed'
          }`}>
            {line.type === 'input' && <span className="text-emerald-500 mr-2 font-black">root@xploit_academy:~#</span>}
            <span className="whitespace-pre-wrap">{line.content}</span>
          </div>
        ))}
        
        <div className="flex items-center mt-3">
          <span className="text-emerald-500 mr-2 font-black">root@xploit_academy:~#</span>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white w-full terminal-cursor font-black text-base"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
      
      <div className="bg-slate-900 border-t border-slate-800 p-3 text-[11px] text-slate-300 flex justify-between px-6 font-display font-black tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            CONNECTION: STABLE
        </div>
        <div className="flex gap-4">
            <span>MEM: 12%</span>
            <span>CPU: 0.2%</span>
            <span>LAT: 12MS</span>
        </div>
      </div>
    </div>
  );
};