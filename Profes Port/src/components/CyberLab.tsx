import React, { useState } from 'react';

const commands: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  nmap     - Run simulated network port scan',
    '  vapt     - Trigger automated CYVERION vulnerability check',
    '  whoami   - Display operator credentials & role',
    '  ctf      - Show active CTF rankings and achievements',
    '  clear    - Clear console screen',
  ],
  nmap: [
    'Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-27 11:00 UTC',
    'Nmap scan report for security.lab (192.168.1.105)',
    'Host is up (0.00042s latency).',
    'PORT     STATE SERVICE     VERSION',
    '22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu',
    '80/tcp   open  http        nginx 1.18.0',
    '443/tcp  open  ssl/http    nginx 1.18.0',
    '8080/tcp open  http-proxy  CYVERION VAPT Gateway v1.2',
    'Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds',
  ],
  vapt: [
    '[+] Initializing CYVERION AI VAPT Engine...',
    '[*] Target: https://target.lab/api/v1',
    '[+] [LOW] Missing X-Content-Type-Options header detected.',
    '[+] [MED] CORS policy misconfigured with wildcard origin.',
    '[-] [CRIT] Unauthenticated endpoint /api/v1/admin/export detected.',
    '[+] Generating AI remediation snippet & Jira vulnerability ticket...',
    '[✓] Automated DevSecOps mitigation playbook deployed.',
  ],
  whoami: [
    'Operator: Siva Prasath L',
    'Specialization: Cybersecurity | VAPT | Red Team | Security Research',
    'Institution: Sri Shakthi Institute of Engineering and Technology',
    'Status: SYSTEM OPERATIONAL // DEFENSES ACTIVE',
  ],
  ctf: [
    '[+] TryHackMe: 50+ rooms & challenge boxes completed',
    '[+] picoCTF: 60+ challenges resolved across Forensics, Web, Cryptography',
    '[+] Competition Award: SudoForce CTF — 3rd Place Winner',
  ],
};

export default function CyberLab() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([
    '[*] Cybersecurity Terminal Environment v2.4 initialized.',
    '[*] Type "help" to inspect accessible laboratory diagnostic commands.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const output = commands[cmd] || [
      `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
    ];

    setHistory((prev) => [...prev, `$ ${cmd}`, ...output]);
    setInputVal('');
  };

  return (
    <section id="cyberlab" className="py-24 bg-[#07080e] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#00dfd8] font-semibold text-sm tracking-widest uppercase">
            Hands-on Simulation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Cybersecurity Terminal Lab
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Interact with simulated penetration testing commands and observe security automation feedback live.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#090a14] border border-white/10 shadow-2xl overflow-hidden font-mono">
          
          {/* Top Bar */}
          <div className="px-6 py-4 bg-[#101222] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="text-xs text-gray-400">
              sivaprasath@lab-workstation:~ (bash)
            </div>
            <div className="text-xs text-purple-400 font-bold">
              PORT: 443 [ACTIVE]
            </div>
          </div>

          {/* Terminal Screen */}
          <div className="p-6 h-80 overflow-y-auto space-y-2 text-xs sm:text-sm text-gray-200">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('$')
                    ? 'text-[#00dfd8] font-bold'
                    : line.includes('CRIT')
                    ? 'text-red-400 font-semibold'
                    : line.includes('[+]') || line.includes('[✓]')
                    ? 'text-emerald-400'
                    : 'text-gray-300'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form onSubmit={handleCommand} className="px-6 py-3 bg-[#0d0f1c] border-t border-white/5 flex items-center gap-3">
            <span className="text-[#00dfd8] font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type nmap, vapt, whoami, ctf, or help..."
              className="flex-1 bg-transparent text-white placeholder-gray-600 text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
            >
              Execute
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
