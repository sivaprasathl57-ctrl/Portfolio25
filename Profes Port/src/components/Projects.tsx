import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  status: string;
  tagline: string;
  overview: string;
  architecture: string[];
  features: string[];
  techStack: string[];
  github: string;
  securityNotes: string;
}

const projects: ProjectData[] = [
  {
    number: '01',
    name: 'CYVERION',
    category: 'AI × VAPT × DevSecOps × Security Automation',
    status: 'Active Development / Academic VAPT Project',
    tagline: 'AI-Powered VAPT & Automated Remediation Platform',
    overview:
      'CYVERION is an AI-assisted Vulnerability Assessment and Penetration Testing framework designed to streamline reconnaissance, automate scanning pipelines, detect critical misconfigurations, and deliver context-aware remediation playbooks for DevSecOps workflows.',
    architecture: [
      'Reconnaissance Engine (Subdomain enum, Port scanning, Technology profiling)',
      'Vulnerability Correlation Pipeline with CVE/CWE lookup',
      'AI Analysis Engine generating remediation code snippets & priority risk matrix',
      'CI/CD Integration Hooks for automated security gates before deployment',
    ],
    features: [
      'Automated dynamic and static security checks',
      'AI-driven vulnerability contextualization and remediation playbooks',
      'Real-time executive security scoring & compliance dashboard',
      'Extensible modular plugin architecture for custom exploit scripts',
    ],
    techStack: ['Python', 'Docker', 'FastAPI', 'Nmap', 'Burp Suite API', 'Bash', 'PostgreSQL'],
    github: 'https://github.com/sivaprasathl57-ctrl/Automated-DevSecOps.git',
    securityNotes: 'Employs strictly controlled sandbox boundaries with non-destructive verification.',
  },
  {
    number: '02',
    name: 'Voice-Triggered Dynamic Firewall Control System',
    category: 'Network Defense × Biometrics × Security Automation',
    status: 'Functional Prototype',
    tagline: 'Instant Automated Voice-Authenticated Network Isolation',
    overview:
      'A defensive cybersecurity automation mechanism that enables rapid incident response through secure biometric voice commands. Under ransomware or exfiltration conditions, an authorized administrator can trigger emergency port shutdown and subnet isolation within seconds.',
    architecture: [
      'Voice Biometric Authentication & Keyword Verification Module',
      'Crypto-Token Signing Service to prevent replay and spoofing attacks',
      'Firewall Control Daemon (iptables / UFW / nftables automation)',
      'Audit Logging & Incident Broadcast Notification Webhook',
    ],
    features: [
      'Emergency network segmentation under 2 seconds',
      'Voiceprint verification + cryptographic challenge-response token',
      'Automated fail-safe rules ensuring essential management connectivity',
      'Detailed forensic audit log with tamper-evident hashing',
    ],
    techStack: ['Python', 'Linux iptables', 'SpeechRecognition', 'PyAudio', 'Socket API', 'Cryptography'],
    github: 'https://github.com/sivaprasathl57-ctrl',
    securityNotes: 'Protects against acoustic replay attacks through dynamic nonce verification.',
  },
  {
    number: '03',
    name: 'NEUROVEIL',
    category: 'Cyber Threat Intelligence × OSINT × Investigation',
    status: 'Research & Implementation Phase',
    tagline: 'AI & OSINT Cyber Threat Investigation Platform',
    overview:
      'NEUROVEIL correlates multi-source threat intelligence, dark web indicators, and OSINT data to assist security analysts in tracing digital attack footprints, threat actor attribution, and proactive credential leakage monitoring.',
    architecture: [
      'OSINT Scraper & Public Data Ingestion Pipelines',
      'Graph-Based Threat Actor Relationship Mapping Engine',
      'Breach & Credential Leakage Verification Engine',
      'Analyst Investigation Workbench with exportable PDF case dossiers',
    ],
    features: [
      'Automated dark web mention extraction and domain fingerprinting',
      'Entity correlation across IP addresses, emails, and crypto wallets',
      'Threat level scoring based on MITRE ATT&CK alignment',
      'Exportable forensic investigation timeline and case management',
    ],
    techStack: ['Python', 'Neo4j / NetworkX', 'OSINT Tools', 'FastAPI', 'React', 'Elasticsearch'],
    github: 'https://github.com/sivaprasathl57-ctrl',
    securityNotes: 'Compliant with privacy boundaries and passive data collection standards.',
  },
];

// 3D Card Rotate Transitions
const cardVariants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 28 : -28,
    rotateX: 6,
    scale: 0.94,
    opacity: 0,
    y: 18,
    filter: 'blur(6px)',
  }),
  center: {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -28 : 28,
    rotateX: -6,
    scale: 0.94,
    opacity: 0,
    y: -18,
    filter: 'blur(6px)',
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

// Cascading staggered elements
const cascadeItemVariants = {
  initial: { opacity: 0, y: 20, rotateX: 8 },
  center: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const cascadeListContainer = {
  initial: {},
  center: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const cascadeListItemVariants = {
  initial: { opacity: 0, x: -16 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const cascadePillVariants = {
  initial: { opacity: 0, scale: 0.75, y: 10 },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

export default function Projects() {
  const [[selectedIdx, direction], setPage] = useState<[number, number]>([0, 0]);
  const activeProj = projects[selectedIdx];

  const handleSelect = (newIdx: number) => {
    if (newIdx === selectedIdx) return;
    setPage([newIdx, newIdx > selectedIdx ? 1 : -1]);
  };

  return (
    <section id="projects" className="py-24 bg-[#06070a] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#00dfd8] font-semibold text-sm tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00dfd8] animate-ping" />
            Security Lab & Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            In-depth security platforms, automation utilities, and defensive engineering systems built from scratch.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-14">
          {projects.map((proj, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <motion.button
                key={proj.number}
                onClick={() => handleSelect(idx)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-3 border transition-colors duration-300 outline-none select-none cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-purple-500/80 text-white shadow-[0_0_24px_rgba(168,85,247,0.35)]'
                    : 'bg-[#0c0e17]/80 border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/40 hover:bg-[#121626]'
                }`}
              >
                {/* Active Sliding Glowing Background */}
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/35 via-indigo-600/30 to-cyan-500/25 border-b-2 border-[#00dfd8]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Number Badge with micro-rotate */}
                <motion.span
                  animate={isSelected ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`relative z-10 font-mono text-xs px-2.5 py-1 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-purple-500/30 text-cyan-300 border border-purple-400/50 shadow-[0_0_10px_rgba(0,223,216,0.3)]'
                      : 'bg-black/50 text-purple-300 border border-white/5'
                  }`}
                >
                  {proj.number}
                </motion.span>

                <span className="relative z-10 tracking-wide font-medium">{proj.name}</span>

                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 w-2 h-2 rounded-full bg-[#00dfd8] shadow-[0_0_8px_#00dfd8]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* 3D Perspective Card Container with Cascading Content */}
        <div className="relative min-h-[520px]" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProj.number}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: 'preserve-3d' }}
              className="cyber-card rounded-3xl p-8 lg:p-12 shadow-2xl relative w-full border border-purple-500/20 bg-[#0d101a]/90 backdrop-blur-xl"
            >
              {/* Cyber Corner HUD Accents */}
              <span className="cyber-corner cyber-corner-tl" />
              <span className="cyber-corner cyber-corner-tr" />
              <span className="cyber-corner cyber-corner-bl" />
              <span className="cyber-corner cyber-corner-br" />

              {/* Holographic Glowing Atmosphere Background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Laser Sweep Scanline on Change */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-laser-sweep" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* Left Column: Cascading Details */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Cascade Item 1: Badges */}
                  <motion.div variants={cascadeItemVariants} className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-purple-400 text-sm font-bold tracking-wider px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30">
                      PROJECT {activeProj.number}
                    </span>
                    <span className="cyber-badge px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {activeProj.category}
                    </span>
                    <span className="cyber-badge px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      ● {activeProj.status}
                    </span>
                  </motion.div>

                  {/* Cascade Item 2: Title & Tagline */}
                  <motion.div variants={cascadeItemVariants}>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {activeProj.name}
                    </h3>
                    <p className="text-purple-300 text-base font-medium mt-1">
                      {activeProj.tagline}
                    </p>
                  </motion.div>

                  {/* Cascade Item 3: Overview */}
                  <motion.p variants={cascadeItemVariants} className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                    {activeProj.overview}
                  </motion.p>

                  {/* Cascade Item 4: Architecture & Workflow Info Box */}
                  <motion.div
                    variants={cascadeItemVariants}
                    className="cyber-card p-5 rounded-2xl bg-[#0f111f]/90 border border-white/10 space-y-2 relative"
                  >
                    <span className="cyber-corner cyber-corner-tl" />
                    <span className="cyber-corner cyber-corner-br" />
                    <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                      <span>⚙️</span>
                      <span>Architecture & Workflow</span>
                    </h4>
                    <motion.ul variants={cascadeListContainer} className="space-y-1.5 text-sm text-gray-300 pt-1">
                      {activeProj.architecture.map((item, i) => (
                        <motion.li
                          key={i}
                          variants={cascadeListItemVariants}
                          className="flex items-start gap-2 hover:text-white transition-colors"
                        >
                          <span className="text-[#00dfd8] mt-0.5">▹</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  {/* Cascade Item 5: Security Considerations Info Box */}
                  <motion.div
                    variants={cascadeItemVariants}
                    className="cyber-card p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 shadow-sm flex items-start gap-2.5"
                  >
                    <span className="text-base leading-none">🛡️</span>
                    <div>
                      <strong className="text-purple-300 font-semibold">Security Consideration:</strong>{' '}
                      <span className="text-purple-200/90">{activeProj.securityNotes}</span>
                    </div>
                  </motion.div>

                  {/* Cascade Item 6: Action Buttons */}
                  <motion.div variants={cascadeItemVariants} className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={activeProj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>Explore Repository</span>
                    </a>
                  </motion.div>
                </div>

                {/* Right Column: Cascading Features & Tech Stack Pill Box */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Features List Box */}
                  <motion.div
                    variants={cascadeItemVariants}
                    className="cyber-card p-6 rounded-2xl space-y-4 relative"
                  >
                    <span className="cyber-corner cyber-corner-tl" />
                    <span className="cyber-corner cyber-corner-tr" />
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00dfd8] shadow-[0_0_8px_#00dfd8]" />
                      Core Capabilities
                    </h4>
                    <motion.ul variants={cascadeListContainer} className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                      {activeProj.features.map((feat, i) => (
                        <motion.li
                          key={i}
                          variants={cascadeListItemVariants}
                          className="flex items-start gap-2.5 group/item"
                        >
                          <span className="text-emerald-400 font-bold group-hover/item:scale-125 transition-transform">✓</span>
                          <span className="group-hover/item:text-white transition-colors">{feat}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  {/* Technologies Used Box */}
                  <motion.div
                    variants={cascadeItemVariants}
                    className="cyber-card p-6 rounded-2xl space-y-3 relative"
                  >
                    <span className="cyber-corner cyber-corner-bl" />
                    <span className="cyber-corner cyber-corner-br" />
                    <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center justify-between">
                      <span>Technologies & Frameworks</span>
                      <span className="text-[10px] text-gray-500 font-mono">STACK</span>
                    </h4>
                    <motion.div variants={cascadeListContainer} className="flex flex-wrap gap-2 pt-1">
                      {activeProj.techStack.map((tech) => (
                        <motion.span
                          key={tech}
                          variants={cascadePillVariants}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className="cyber-badge px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#131626] border border-white/10 text-cyan-300 cursor-default shadow-sm hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(0,223,216,0.3)] transition-all"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
