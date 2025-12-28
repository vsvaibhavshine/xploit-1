import React, { useState } from 'react';
import { LearningModule } from '../types';
import { ModuleModal } from './ModuleModal';

const OFFENSIVE_MODULES: LearningModule[] = [
  { 
    id: 'o1', 
    category: 'Offensive', 
    title: 'Phishing Operations', 
    description: 'Master large-scale social engineering. Learn to craft convincing templates and set up credential harvesting proxies.', 
    tags: ['SocEng', 'Web'],
    briefing: {
      kaliCommands: ['sudo gophish', 'zphisher', 'social-engineer-toolkit'],
      commonMistakes: ['Using obvious lookalike domains (e.g., g00gle.com) which are easily flagged.', 'Failing to implement HTTPS on the landing page.', 'Typo: "zphish" instead of "zphisher".'],
      recommendedSoftware: ['Gophish', 'Evilginx2', 'SET']
    }
  },
  { 
    id: 'o2', 
    category: 'Offensive', 
    title: 'Advanced Brute Forcing', 
    description: 'Attack login portals and encrypted archives using optimized wordlists and multi-threaded tools.', 
    tags: ['Passwords', 'Compute'],
    briefing: {
      kaliCommands: ['hydra -l admin -P wordlist.txt 192.168.1.10 http-post-form "/login.php:user=^USER^&pass=^PASS^:F=Login failed"', 'medusa -h target -u root -P wordlist.txt -M ssh'],
      commonMistakes: ['Typo: wrong service protocol flag (medusa uses -M, hydra uses protocol prefix).', 'Triggering account lockout policies by setting the delay too low.', 'Forgetting to specify the failure string in Hydra.'],
      recommendedSoftware: ['Hydra', 'Medusa', 'Ncrack']
    }
  },
  { 
    id: 'o4', 
    category: 'Offensive', 
    title: 'Physical Security Bypass', 
    description: 'Hardware hacking, RFID cloning, and bypassing physical entry points with tactical tools.', 
    tags: ['Physical', 'Hardware'],
    briefing: {
      kaliCommands: ['proxmark3 /dev/ttyACM0', 'hf 14a reader', 'lf hid clone --raw 12345'],
      commonMistakes: ['Improper antenna placement during cloning leads to corruption.', 'Damaging RFID chips with excessive voltage during reading.', 'Typo: incorrect serial port path (e.g., ACM1 instead of ACM0).'],
      recommendedSoftware: ['Proxmark3 Client', 'Chameleon Mini', 'Flipper Zero App']
    }
  },
  { 
    id: 'o5', 
    category: 'Offensive', 
    title: 'Wireless Network Pwnage', 
    description: 'Cracking WPA2/WPA3 networks, deauthentication attacks, and evil twin deployments.', 
    tags: ['WiFi', 'Radio'],
    briefing: {
      kaliCommands: ['airmon-ng start wlan0', 'airodump-ng wlan0mon', 'aireplay-ng --deauth 0 -a [BSSID] wlan0mon'],
      commonMistakes: ['Typo: "airmon ng" instead of "airmon-ng".', 'Failing to kill conflicting processes (airmon-ng check kill).', 'Trying to crack complex WPA3 passwords without a GPU-accelerated environment.'],
      recommendedSoftware: ['Aircrack-ng Suite', 'Wifite2', 'Fern WiFi Cracker']
    }
  },
  { 
    id: 'o7', 
    category: 'Offensive', 
    title: 'Active Directory Takeover', 
    description: 'Exploiting AD environments: Kerberoasting, BloodHound analysis, and Domain Admin escalation.', 
    tags: ['RedTeam', 'AD'],
    briefing: {
      kaliCommands: ['python3 GetUserSPNs.py -dc-ip 10.10.10.1 domain/user -request', 'bloodhound-python -u user -p pass -d domain.local -dc dc.domain.local -c All'],
      commonMistakes: ['Failing to synchronize system time with the Domain Controller.', 'Ignoring stealth flags in BloodHound which alerts defenders.', 'Typo: misnaming the domain name in the connection string.'],
      recommendedSoftware: ['Impacket', 'BloodHound', 'PowerView']
    }
  },
  { 
    id: 'o11', 
    category: 'Offensive', 
    title: 'Post-Exploitation Persistence', 
    description: 'Ensuring access remains even after system reboots. Shadow accounts, WMI persistence, and scheduled tasks.', 
    tags: ['PostExploit', 'System'],
    briefing: {
      kaliCommands: ['schtasks /create /tn "Update" /tr "C:\\temp\\shell.exe" /sc onlogon', 'reg add "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"'],
      commonMistakes: ['Naming tasks something suspicious like "HACK_TASK" or "BACKDOOR".', 'Overwriting existing system registry keys instead of creating new ones.', 'Typo: Incorrect registry path (e.g., "CurrentVersoin" instead of "CurrentVersion").'],
      recommendedSoftware: ['Metasploit', 'PowerSploit', 'Covenant']
    }
  },
  { 
    id: 'o12', 
    category: 'Offensive', 
    title: 'Malware Development', 
    description: 'Writing custom shellcode, obfuscators, and droppers to bypass security controls.', 
    tags: ['Dev', 'LowLevel'],
    briefing: {
      kaliCommands: ['msfvenom -p windows/x64/exec CMD=calc.exe -f c', 'gcc malware.c -o malware.exe'],
      commonMistakes: ['Hardcoding IP addresses that might change.', 'Forgetting to include error handling in the C code, leading to crashes.', 'Typo: "msfvenum" instead of "msfvenom".'],
      recommendedSoftware: ['Mingw-w64', 'Metasploit', 'Visual Studio']
    }
  }
];

export const Offensive: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {selectedModule && (
        <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
      )}

      <div className="border-l-4 border-red-600 pl-4 mb-8">
        <h2 className="text-4xl font-bold text-red-500 mb-2 font-display uppercase tracking-widest text-glow-sm">OFFENSIVE OPERATIONS</h2>
        <p className="text-slate-300 font-mono text-sm font-bold uppercase tracking-wider">Authorized Red Team protocols only. Master the art of the attack.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFENSIVE_MODULES.map(mod => (
          <div 
            key={mod.id} 
            onClick={() => setSelectedModule(mod)}
            className="bg-slate-950 border border-red-900/50 hover:border-red-500/70 transition-all p-6 rounded-xl group cursor-pointer relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="absolute top-4 right-4 flex gap-1 z-10">
              {mod.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-red-950/80 text-red-200 px-2 py-0.5 rounded border border-red-800/50 font-mono font-bold tracking-wide uppercase">{tag}</span>
              ))}
            </div>
            
            <div className="relative z-10">
                <div className="w-12 h-12 mb-5 rounded-lg bg-red-900/30 border border-red-500/40 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:text-red-400 transition-all">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                
                <h4 className="text-xl font-bold mb-3 font-display tracking-widest text-white group-hover:text-red-400 transition-colors uppercase">
                    {mod.title}
                </h4>
                
                <p className="text-sm text-slate-200 leading-relaxed mb-8 h-12 overflow-hidden group-hover:h-auto transition-all font-medium">
                    {mod.description}
                </p>
                
                <div className="flex justify-between items-center pt-5 border-t border-red-900/40">
                    <span className="text-[11px] text-red-400 font-mono font-black tracking-tighter uppercase group-hover:text-red-300 transition-colors">LVL_CLEARANCE: RED</span>
                    <span className="text-red-500 text-xs font-bold font-display tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        {'BRIEFING >>'}

                    </span>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning Banner */}
      <div className="mt-12 p-8 bg-red-950/20 border-2 border-red-900/60 rounded-xl flex items-start gap-6 shadow-2xl">
          <svg className="w-10 h-10 text-red-500 flex-shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
              <h4 className="text-red-400 font-black font-display tracking-[0.2em] text-xl uppercase mb-2">ROE_WARNING (Rules of Engagement)</h4>
              <p className="text-sm text-slate-300 font-mono font-bold leading-relaxed">
                  Offensive skills are shared for educational and ethical testing purposes only. Unauthorized use against systems without explicit permission is a criminal offense. XPLOIT Academy logs all simulation activity. Proceed with professional integrity. Failure to comply results in immediate termination of clearance.
              </p>
          </div>
      </div>
    </div>
  );
};
