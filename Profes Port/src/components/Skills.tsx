import React from 'react';
import { personalData } from '../data/portfolio';
import SkillsMarquee from './SkillsMarquee';

const serviceAreas = [
  {
    title: 'VAPT & Penetration Testing',
    icon: '🎯',
    badge: 'Offensive Security',
    description:
      'Identifying vulnerabilities across web applications, networks, and system services using structured reconnaissance, manual exploitation, and industry-standard security tools.',
    highlights: ['OWASP Top 10 Exploitation', 'Burp Suite Pro Analysis', 'Vulnerability Prioritization', 'Remediation Roadmaps'],
  },
  {
    title: 'Network Defense & Protocol Analysis',
    icon: '🌐',
    badge: 'Infrastructure Security',
    description:
      'Packet inspection, protocol verification, dynamic iptables firewall segmentation, and network reconnaissance to secure critical environments against lateral movement.',
    highlights: ['Nmap Advanced Scripting', 'Wireshark Packet Analysis', 'Dynamic Firewall Isolation', 'Port Security Hardening'],
  },
  {
    title: 'DevSecOps & Security Automation',
    icon: '⚡',
    badge: 'Automation & CI/CD',
    description:
      'Integrating security analysis into continuous deployment pipelines with custom Python scanning daemons, Docker container auditing, and automated compliance gates.',
    highlights: ['CI/CD Pipeline Security', 'Docker & Container Hardening', 'Automated CVE Scanners', 'Bash / Python Security Tooling'],
  },
  {
    title: 'Security Research & OSINT',
    icon: '🔍',
    badge: 'Threat Intelligence',
    description:
      'Conducting open-source intelligence research, tracking digital footprints, social engineering defense, and authoring peer-reviewed security research papers.',
    highlights: ['OSINT Data Correlation', 'Social Engineering Defense', 'Published Academic Research', 'Threat Actor Profiling'],
  },
];

export default function Skills() {
  const { skills } = personalData;

  return (
    <section id="skills" className="py-24 bg-[#080910] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
            Specialized Services & Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            What I Bring To The Field
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Blending offensive testing with defensive automation to safeguard modern enterprise applications.
          </p>
        </div>

        {/* Continuous Infinite Skills Marquee */}
        <div className="mb-16">
          <SkillsMarquee />
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {serviceAreas.map((area) => (
            <div
              key={area.title}
              className="cyber-card p-8 rounded-3xl flex flex-col justify-between group"
            >
              <span className="cyber-corner cyber-corner-tl" />
              <span className="cyber-corner cyber-corner-tr" />
              <span className="cyber-corner cyber-corner-bl" />
              <span className="cyber-corner cyber-corner-br" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{area.icon}</span>
                  <span className="cyber-badge px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/60 border border-purple-500/30 text-purple-300">
                    {area.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {area.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                  {area.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 group/item">
                      <span className="text-[#00dfd8] group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="group-hover/item:text-white transition-colors">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Toolkit Badges Container */}
        <div className="cyber-card p-8 rounded-3xl space-y-6">
          <span className="cyber-corner cyber-corner-tl" />
          <span className="cyber-corner cyber-corner-tr" />
          <span className="cyber-corner cyber-corner-bl" />
          <span className="cyber-corner cyber-corner-br" />

          <h3 className="text-xl font-bold text-white text-center sm:text-left flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00dfd8] shadow-[0_0_8px_#00dfd8]" />
            Hands-on Technical Toolkit
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="cyber-card p-4 rounded-2xl bg-[#0e111d]/80 border border-white/5 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Security Tools</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool) => (
                  <span key={tool} className="cyber-badge px-3 py-1 rounded-lg text-xs font-mono bg-[#161826] border border-white/10 text-gray-200 cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="cyber-card p-4 rounded-2xl bg-[#0e111d]/80 border border-white/5 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Programming</h4>
              <div className="flex flex-wrap gap-2">
                {skills.programming.map((lang) => (
                  <span key={lang} className="cyber-badge px-3 py-1 rounded-lg text-xs font-mono bg-[#161826] border border-white/10 text-cyan-300 cursor-default">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="cyber-card p-4 rounded-2xl bg-[#0e111d]/80 border border-white/5 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">DevOps & Cloud</h4>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map((d) => (
                  <span key={d} className="cyber-badge px-3 py-1 rounded-lg text-xs font-mono bg-[#161826] border border-white/10 text-emerald-300 cursor-default">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="cyber-card p-4 rounded-2xl bg-[#0e111d]/80 border border-white/5 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Methodologies</h4>
              <div className="flex flex-wrap gap-2">
                {skills.concepts.slice(0, 5).map((c) => (
                  <span key={c} className="cyber-badge px-3 py-1 rounded-lg text-xs font-mono bg-[#161826] border border-white/10 text-amber-300 cursor-default">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
