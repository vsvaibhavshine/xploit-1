import React, { useState } from 'react';
import { LearningModule, UserStats } from '../types';
import { Button } from './ui/Button';
import { ModuleModal } from './ModuleModal';

const LEARNING_PATH: LearningModule[] = [
  // Beginner
  { 
    id: 'b1', 
    category: 'Beginner', 
    title: 'Ethical Hacking Foundations', 
    description: 'Master the ethics, legal boundaries, and the White Hat mindset essential for professional security.', 
    tags: ['Ethics', 'Theory'],
    briefing: {
      kaliCommands: ['whois domain.com', 'dig domain.com ANY', 'nslookup domain.com'],
      commonMistakes: ['Typo: Using "who is" instead of "whois".', 'Confusing unauthorized access with ethical testing.', 'Forgetting to sign the Rules of Engagement (ROE) document.'],
      recommendedSoftware: ['Maltego', 'Open-Source intelligence tools']
    }
  },
  { 
    id: 'b2', 
    category: 'Beginner', 
    title: 'Linux Fundamentals', 
    description: 'Navigating the filesystem, managing permissions, and mastering the bash shell environment.', 
    tags: ['Linux', 'OS'],
    briefing: {
      kaliCommands: ['chmod 700 secret.sh', 'grep -r "password" /etc/', 'ls -la /tmp', 'sudo chown root:root file.txt'],
      commonMistakes: ['Running dangerous commands as root without verification.', 'Typo: using "ls -L" instead of "ls -l".', 'Case sensitivity errors (Linux is case-sensitive).'],
      recommendedSoftware: ['Kali Linux', 'Ubuntu Server']
    }
  },
  { 
    id: 'b3', 
    category: 'Beginner', 
    title: 'Cloud Security Fundamentals', 
    description: 'Introduction to securing AWS, Azure, and GCP. Identity management and S3 bucket protection.', 
    tags: ['Cloud', 'AWS'],
    briefing: {
      kaliCommands: ['aws s3 ls', 'aws iam list-users', 'az account show'],
      commonMistakes: ['Publicly exposing access keys in GitHub repositories.', 'Failing to implement MFA on administrative accounts.', 'Over-permissioning IAM roles.'],
      recommendedSoftware: ['AWS CLI', 'Prowler', 'Cloudsploit']
    }
  },
  
  // Intermediate
  { 
    id: 'i1', 
    category: 'Intermediate', 
    title: 'Web Application Auditing', 
    description: 'Identifying OWASP Top 10 vulnerabilities: SQL Injection, XSS, and Broken Access Control.', 
    tags: ['Web', 'OWASP'],
    briefing: {
      kaliCommands: ['sqlmap -u "http://target.com/id=1" --batch --dbs', 'nikto -h http://target.com', 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt'],
      commonMistakes: ['Failing to escape special characters in injection strings.', 'Testing production environments instead of isolated staging labs.', 'Typo: "sqmmap" instead of "sqlmap".'],
      recommendedSoftware: ['Burp Suite', 'OWASP ZAP']
    }
  },
  { 
    id: 'i6', 
    category: 'Intermediate', 
    title: 'Digital Forensics', 
    description: 'The science of collecting, preserving, and analyzing digital evidence from disk images.', 
    tags: ['Forensics', 'Data'],
    briefing: {
      kaliCommands: ['autopsy', 'volatility -f mem.raw imageinfo', 'binwalk firmware.bin'],
      commonMistakes: ['Modifying source evidence without creating a bit-for-bit copy first.', 'Breaking the chain of custody.', 'Ignoring deleted file pointers.'],
      recommendedSoftware: ['Autopsy', 'Volatility', 'FTK Imager']
    }
  },
  { 
    id: 'i7', 
    category: 'Intermediate', 
    title: 'IoT & Hardware Hacking', 
    description: 'Exploiting smart devices, UART/JTAG interfaces, and firmware analysis.', 
    tags: ['IoT', 'Hardware'],
    briefing: {
      kaliCommands: ['screen /dev/ttyUSB0 115200', 'python3 -m pyftdi.shell'],
      commonMistakes: ['Incorrect baud rate during serial connection leads to garbage output.', 'Forgetting to check for hardcoded root credentials in firmware.'],
      recommendedSoftware: ['Bus Pirate', 'Attify Badge', 'Ghidra']
    }
  },
  
  // Advanced
  { 
    id: 'a1', 
    category: 'Advanced', 
    title: 'Privilege Escalation', 
    description: 'Gaining administrative or root access through system misconfigurations and exploits.', 
    tags: ['PrivEsc', 'System'],
    briefing: {
      kaliCommands: ['find / -perm -u=s -type f 2>/dev/null', 'sudo -l', 'getcap -r / 2>/dev/null'],
      commonMistakes: ['Ignoring standard error output (2>/dev/null) which clutters results.', 'Running automated scripts that crash the host system.', 'Typo: "sudo -L" instead of "sudo -l".'],
      recommendedSoftware: ['LinPEAS', 'WinPEAS']
    }
  },
  { 
    id: 'a9', 
    category: 'Advanced', 
    title: 'Incident Response & Threat Hunting', 
    description: 'Identifying and containing active breaches within an enterprise environment.', 
    tags: ['BlueTeam', 'IR'],
    briefing: {
      kaliCommands: ['sigma-cli check rules/', 'velociraptor client'],
      commonMistakes: ['Deleting log files prematurely while trying to "fix" the system.', 'Alerting the attacker before containment is ready.'],
      recommendedSoftware: ['TheHive', 'MISP', 'Velociraptor']
    }
  }
];

const MOCK_STATS: UserStats = {
  streak: 12,
  skillRating: 'Junior Operator',
  completedModules: 11,
  weeklyGoalProgress: 82
};

interface DashboardProps {
  onNavigate: (view: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {selectedModule && (
        <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
      )}

      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center group hover:border-emerald-500/30 transition-all shadow-sm">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest font-display font-bold mb-1">Current Streak</span>
            <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 font-display dark:text-glow">{MOCK_STATS.streak} <span className="text-sm text-slate-400 dark:text-slate-300 font-normal">DAYS</span></span>
        </div>
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center group hover:border-emerald-500/30 transition-all shadow-sm">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest font-display font-bold mb-1">Skill Rating</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-display dark:text-glow uppercase">{MOCK_STATS.skillRating}</span>
        </div>
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center col-span-2 group hover:border-emerald-500/30 transition-all shadow-sm">
            <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest font-display font-bold mb-2">Weekly Goal Progress</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: `${MOCK_STATS.weeklyGoalProgress}%` }}></div>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-300 mt-2 font-mono font-bold">{MOCK_STATS.weeklyGoalProgress}% Completed</span>
        </div>
      </div>

      {/* Curriculum Sections */}
      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
        <div key={level} className="space-y-6">
            <h3 className={`text-2xl font-bold font-display uppercase tracking-wider border-b-2 border-slate-200 dark:border-slate-800 pb-3 mt-8 ${
                level === 'Beginner' ? 'text-emerald-600 dark:text-emerald-400 dark:text-glow-sm' : 
                level === 'Intermediate' ? 'text-yellow-600 dark:text-yellow-400' : 'text-cyan-600 dark:text-cyan-400'
            }`}>
                {level} Protocols
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEARNING_PATH.filter(m => m.category === level).map(mod => (
                    <div 
                      key={mod.id} 
                      onClick={() => setSelectedModule(mod)}
                      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all p-6 rounded-2xl group cursor-pointer relative shadow-sm hover:shadow-md dark:hover:border-emerald-500/60`}
                    >
                         <div className="absolute top-4 right-4 flex gap-1">
                             {mod.tags.map(tag => (
                                 <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono font-bold tracking-wide uppercase">{tag}</span>
                             ))}
                         </div>
                         <h4 className={`text-lg font-bold mb-3 mt-4 font-display tracking-wide text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors`}>{mod.title}</h4>
                         <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed mb-6 font-medium line-clamp-2">{mod.description}</p>
                         <div className="flex justify-between items-center mt-auto border-t border-slate-100 dark:border-slate-800 pt-4">
                            <span className="text-[11px] text-slate-400 dark:text-slate-400 font-mono font-bold uppercase">EST: 60 MIN</span>
                            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold font-display tracking-widest group-hover:translate-x-1 transition-transform">
  &gt;&gt; BRIEFING
</span>

                         </div>
                    </div>
                ))}
            </div>
        </div>
      ))}

      {/* Operational Roadmap */}
      <div className="mt-16 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-10 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 font-display tracking-widest uppercase">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            OPERATIONAL_TRAJECTORY
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 text-center">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-500/40 rounded-2xl w-full flex flex-col justify-center shadow-sm">
                <div className="text-emerald-700 dark:text-emerald-300 font-black font-display uppercase tracking-widest text-xl">Recruit</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-100/60 mt-2 font-mono font-bold uppercase">Foundations</div>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-600 font-display text-2xl font-bold">→</div>
             <div className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl w-full flex flex-col justify-center shadow-sm">
                <div className="text-slate-700 dark:text-slate-100 font-black font-display uppercase tracking-widest text-xl">Pentester</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono font-bold uppercase">Junior Operator</div>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-600 font-display text-2xl font-bold">→</div>
             <div className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl w-full flex flex-col justify-center shadow-sm">
                <div className="text-slate-700 dark:text-slate-100 font-black font-display uppercase tracking-widest text-xl">Blue Team</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono font-bold uppercase">SOC Analyst</div>
            </div>
            <div className="flex items-center justify-center text-slate-300 dark:text-slate-600 font-display text-2xl font-bold">→</div>
             <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-500/30 rounded-2xl w-full flex flex-col justify-center shadow-sm">
                <div className="text-red-700 dark:text-red-400 font-black font-display uppercase tracking-widest text-xl">Red Team</div>
                <div className="text-xs text-red-600 dark:text-red-300/60 mt-2 font-mono font-bold uppercase">Elite Operator</div>
            </div>
        </div>
      </div>
    </div>
  );
};
