import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '../data/portfolio';

const HERO_ROLES = [
  'Cybersecurity Researcher',
  'VAPT & Penetration Tester',
  'Red Teamer & Bug Bounty Hunter',
  'DevSecOps & AI Security Scholar',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRoleText, setDisplayedRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLElement | null>(null);

  // Typewriter effect for roles
  useEffect(() => {
    const currentFullRole = HERO_ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedRoleText !== currentFullRole) {
      timer = setTimeout(() => {
        setDisplayedRoleText(currentFullRole.slice(0, displayedRoleText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedRoleText === currentFullRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayedRoleText !== '') {
      timer = setTimeout(() => {
        setDisplayedRoleText(currentFullRole.slice(0, displayedRoleText.length - 1));
      }, 40);
    } else if (isDeleting && displayedRoleText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRoleText, isDeleting, roleIndex]);

  // 3D Tilt calculation on mouse move across Hero section
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTilt({
      x: -(y / rect.height) * 16,
      y: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 bg-[#020204] text-white flex items-center overflow-hidden"
    >
      {/* Deep Dark Base Layer with Subtle Radial Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_25%,#070810_0%,#020204_70%,#000000_100%)] pointer-events-none z-0" />

      {/* Dynamic Cyber Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 223, 216, 0.2) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Controlled Subtle Ambient Glows - Deep and non-intrusive */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-950/25 rounded-full blur-[110px] pointer-events-none z-0 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${tilt.y * 1.5}px, ${tilt.x * 1.5}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-950/20 rounded-full blur-[110px] pointer-events-none z-0 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${-tilt.y * 1.5}px, ${-tilt.x * 1.5}px)` }}
      />

      {/* Edge Vignette for maximum peripheral darkness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#020204_95%)] pointer-events-none z-0" />

      {/* Smooth Dark Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020204] via-[#020204]/80 to-transparent pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10"
      >
        {/* LEFT COLUMN: Greeting, Title, Dynamic Typewriter, Bio, Socials, CTA */}
        <div className="lg:col-span-6 space-y-6">
          {/* Greeting */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 text-xl lg:text-2xl font-medium text-white/90">
            <span className="inline-block animate-bounce">👋</span>
            <span>Hi, I'm</span>
            <span className="text-[#00dfd8] font-bold tracking-wide shadow-cyan-500/50">
              {personalData.name}
            </span>
          </motion.div>

          {/* Main Title - Dynamic Typewriter Role with Cyber Cursor */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-semibold tracking-tight text-white leading-normal min-h-[110px] sm:min-h-[130px]">
              <span className="block text-[#00dfd8] font-bold pb-1 drop-shadow-[0_0_15px_rgba(0,223,216,0.3)] font-mono">
                {displayedRoleText}
                <span className="inline-block w-2.5 h-8 sm:h-9 bg-[#00dfd8] ml-1.5 animate-pulse align-middle" />
              </span>
              <span className="block font-medium text-white/90 text-2xl sm:text-3xl lg:text-4xl pt-1">
                and Ethical Hacker
              </span>
            </h1>
            {/* Teal curved brush underline accent */}
            <div className="w-56 sm:w-64 pt-1">
              <svg viewBox="0 0 250 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-[0_0_8px_rgba(0,223,216,0.6)]">
                <path
                  d="M3 14C50 4 180 -2 247 11C200 13 80 18 3 14Z"
                  fill="url(#tealGradient)"
                />
                <defs>
                  <linearGradient id="tealGradient" x1="3" y1="10" x2="247" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00dfd8" />
                    <stop offset="1" stopColor="#007adf" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            Cybersecurity Scholar specializing in <span className="text-white font-medium">B.E. CSE (Cyber Security)</span> at Sri Shakthi Institute. Focused on <span className="text-purple-300 font-medium">VAPT</span>, <span className="text-[#00dfd8] font-medium">Red Teaming</span>, AI-driven security automation, DevSecOps pipelines, and defending systems from complex real-world attack vectors.
          </motion.p>

          {/* Follow Me Section */}
          <motion.div variants={itemVariants} className="pt-2 flex items-center flex-wrap gap-4">
            <span className="text-sm font-semibold tracking-wide text-gray-300">Follow me</span>
            <div className="flex items-center gap-2.5">
              {/* Medium */}
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#14151e] border border-white/10 hover:border-purple-500 flex items-center justify-center text-white font-bold text-sm hover:scale-110 hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all"
                title="Medium Write-ups"
              >
                M
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#14151e] border border-white/10 hover:border-purple-500 flex items-center justify-center text-white font-bold text-xs hover:scale-110 hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all"
                title="Twitter / X"
              >
                𝕏
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-xs hover:scale-110 hover:shadow-[0_0_12px_rgba(244,63,94,0.5)] transition-all"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/siva-prasath-l-b80843344"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:shadow-[0_0_12px_rgba(0,119,181,0.6)] transition-all"
                title="LinkedIn Profile"
              >
                in
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sivaprasathl57-ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181717] border border-white/20 flex items-center justify-center text-white text-xs hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* TryHackMe */}
              <a
                href="https://tryhackme.com/p/lsivaprasath25"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#a20000] flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:shadow-[0_0_12px_rgba(162,0,0,0.6)] transition-all"
                title="TryHackMe Profile"
              >
                THM
              </a>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-semibold text-base shadow-xl shadow-purple-600/35 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
            >
              Roadmaps & Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-purple-500/50 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 font-semibold text-base transition-all hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,223,216,0.3)]"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive 3D Tilted Real Siva Prasath Portrait & Orbital Badges */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-6 flex items-center justify-center select-none py-4"
        >
          <div
            className="relative w-full max-w-[480px] sm:max-w-[520px] h-[520px] flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Holographic Glowing Orbit Rings */}
            <div className="absolute w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] rounded-full border border-cyan-500/20 border-t-cyan-400 animate-spin pointer-events-none" style={{ animationDuration: '12s' }} />
            <div className="absolute w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-purple-500/20 border-b-purple-400 animate-spin pointer-events-none" style={{ animationDuration: '9s', animationDirection: 'reverse' }} />

            {/* Real Portrait with Purple Shield Backing */}
            <div className="relative w-68 sm:w-80 h-76 sm:h-92 flex items-center justify-center z-10 pointer-events-none">
              <img
                src="/hero_shield_perfect.png"
                alt={personalData.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(139,92,246,0.55)]"
              />
            </div>

            {/* 1. BURP SUITE */}
            <div
              className="absolute top-[85px] left-6 sm:left-10 z-20 animate-float-1 group cursor-pointer"
              title="Burp Suite - Web Vulnerability Scanner & Proxy"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1b1c26] border border-orange-500/50 shadow-lg shadow-orange-500/20 flex items-center justify-center group-hover:scale-120 group-hover:border-orange-400 group-hover:shadow-orange-500/40 transition-all duration-300">
                <span className="w-8 h-8 rounded-xl bg-[#e55934] flex items-center justify-center text-white font-serif font-black text-xl shadow-inner">
                  b
                </span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-orange-500/40 text-orange-300 px-2 py-0.5 rounded shadow z-30">
                Burp Suite
              </span>
            </div>

            {/* 2. KALI LINUX */}
            <div
              className="absolute top-[60px] left-[25%] sm:left-[27%] z-20 animate-float-3 group cursor-pointer"
              title="Kali Linux - Penetration Testing OS"
            >
              <div className="px-3 py-1.5 rounded-2xl bg-[#0b1424] border border-cyan-400/50 shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-cyan-300 group-hover:shadow-cyan-400/40 transition-all duration-300">
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-[11px] font-bold font-mono tracking-wider text-cyan-300">KALI</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded shadow z-30">
                Kali Linux
              </span>
            </div>

            {/* 3. METASPLOIT */}
            <div
              className="absolute top-[60px] right-[25%] sm:right-[27%] z-20 animate-float-2 group cursor-pointer"
              title="Metasploit Framework - Exploit Engine"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#0b1730] border border-blue-500/50 shadow-lg shadow-blue-500/25 flex items-center justify-center group-hover:scale-120 group-hover:border-blue-400 group-hover:shadow-blue-500/40 transition-all duration-300">
                <span className="text-blue-400 font-extrabold text-base font-mono">
                  M<span className="text-cyan-300 text-xs">F</span>
                </span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded shadow z-30">
                Metasploit
              </span>
            </div>

            {/* 4. NMAP */}
            <div
              className="absolute top-[85px] right-6 sm:right-10 z-20 animate-float-5 group cursor-pointer"
              title="Nmap - Network Mapper & Port Auditing"
            >
              <div className="px-3 py-1.5 rounded-2xl bg-[#0d1e18] border border-emerald-400/50 shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-emerald-300 group-hover:shadow-emerald-400/40 transition-all duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-black font-mono tracking-wider text-emerald-300">NMAP</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded shadow z-30">
                Nmap Scanner
              </span>
            </div>

            {/* 5. PYTHON */}
            <div
              className="absolute top-[165px] left-1 sm:left-3 z-20 animate-float-4 group cursor-pointer"
              title="Python - Exploit Scripting & Automation"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#141826] border border-blue-400/40 shadow-lg shadow-blue-500/20 flex items-center justify-center p-2 group-hover:scale-120 group-hover:border-blue-300 group-hover:shadow-blue-400/40 transition-all duration-300">
                <svg className="w-6 h-6" viewBox="0 0 128 128">
                  <path fill="#387eb8" d="M63.7 1.5c-30.8 0-28.9 13.4-28.9 13.4l.1 13.9h29.5v4.2H23.9S2 30.5 2 63.8c0 33.5 19.1 32.3 19.1 32.3h11.4V80.5s-.6-19.1 18.8-19.1h28.9s18.2.3 18.2-17.6V19.1s2.5-17.6-34.7-17.6zm-16 10.3c3.5 0 6.3 2.8 6.3 6.3s-2.8 6.3-6.3 6.3-6.3-2.8-6.3-6.3 2.8-6.3 6.3-6.3z" />
                  <path fill="#ffe052" d="M64.3 126.5c30.8 0 28.9-13.4 28.9-13.4l-.1-13.9H63.6V95h40.5s21.9 2.5 21.9-30.8c0-33.5-19.1-32.3-19.1-32.3h-11.4v15.6s.6 19.1-18.8 19.1H47.8s-18.2-.3-18.2 17.6v24.7s-2.5 17.6 34.7 17.6zm16-10.3c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z" />
                </svg>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded shadow z-30">
                Python
              </span>
            </div>

            {/* 6. JOHN THE RIPPER */}
            <div
              className="absolute top-[165px] right-1 sm:right-3 z-20 animate-float-6 group cursor-pointer"
              title="John the Ripper - Password Hash Cracker"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#210e14] border border-red-500/50 shadow-lg shadow-red-600/30 flex flex-col items-center justify-center p-1 group-hover:scale-120 group-hover:border-red-400 group-hover:shadow-red-500/40 transition-all duration-300">
                <span className="text-[11px] font-black text-red-500 tracking-tighter leading-none">JOHN</span>
                <span className="text-[7.5px] font-bold text-gray-300 tracking-widest leading-none mt-0.5">RIPPER</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-red-500/40 text-red-300 px-2 py-0.5 rounded shadow z-30">
                John the Ripper
              </span>
            </div>

            {/* 7. HYDRA */}
            <div
              className="absolute top-[250px] -left-2 sm:left-0 z-20 animate-float-2 group cursor-pointer"
              title="THC Hydra - Network Login Cracker"
            >
              <div className="px-2.5 py-1.5 rounded-2xl bg-[#1b1229] border border-purple-500/50 shadow-lg shadow-purple-600/25 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-purple-400 group-hover:shadow-purple-500/40 transition-all duration-300">
                <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 0-4 4c0 2 1.5 3 2.5 4.5S11 13 11 15v5" />
                  <path d="M16 4a3 3 0 0 0-3 3c0 1.5 1 2.5 1.5 3.5S15 13 15 15" />
                  <path d="M8 5a3 3 0 0 1 3 3c0 1.5-1 2.5-1.5 3.5S9 14 9 16" />
                </svg>
                <span className="text-[11px] font-extrabold font-mono tracking-wider text-purple-300">HYDRA</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded shadow z-30">
                THC Hydra
              </span>
            </div>

            {/* 8. SQL INJECTION */}
            <div
              className="absolute top-[250px] -right-2 sm:right-0 z-20 animate-float-3 group cursor-pointer"
              title="SQL Injection - Web Application Exploitation"
            >
              <div className="px-2.5 py-1.5 rounded-2xl bg-[#20150e] border border-amber-500/50 shadow-lg shadow-amber-500/20 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-amber-400 group-hover:shadow-amber-500/40 transition-all duration-300">
                <span className="text-amber-400 font-mono text-xs font-black">1=1</span>
                <span className="text-[11px] font-bold font-mono tracking-tight text-amber-300">SQLi</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded shadow z-30">
                SQL Injection
              </span>
            </div>

            {/* 9. WIRESHARK */}
            <div
              className="absolute top-[335px] left-1 sm:left-3 z-20 animate-float-1 group cursor-pointer"
              title="Wireshark - Network Protocol Analyzer"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#0c182a] border border-sky-400/50 shadow-lg shadow-sky-500/20 flex items-center justify-center p-2 group-hover:scale-120 group-hover:border-sky-300 group-hover:shadow-sky-400/40 transition-all duration-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M2 17C6 17 9 14.5 11 11C13 7.5 15.5 3 20 2C19 6 18 10 15 13C12.5 15.5 8 17 2 17Z" fill="#167ac6" />
                  <path d="M2 19C7 19 12 17.5 16 15C19 13 21 10.5 22 8C22 13 18 18 13 20C8 22 4 21 2 19Z" fill="#0b4870" />
                </svg>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-sky-500/40 text-sky-300 px-2 py-0.5 rounded shadow z-30">
                Wireshark
              </span>
            </div>

            {/* 10. MYSQL */}
            <div
              className="absolute top-[335px] right-1 sm:right-3 z-20 animate-float-5 group cursor-pointer"
              title="MySQL - Relational Database Security"
            >
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#0f1d26] border border-sky-500/50 shadow-lg shadow-sky-500/20 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-sky-300 group-hover:shadow-sky-400/40 transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M19.5 9.5C18 7.5 15.5 6.5 13 7C10.5 7.5 8.5 9.5 7.5 12C6.5 14.5 7 17.5 9 19.5C11 21.5 14 22 16.5 21C15 20 14 18.5 14 17C14 15 15.5 13.5 17.5 13.5C18.5 13.5 19.5 14 20 15C20.5 13 20.5 11 19.5 9.5Z" fill="#00758f" />
                  <path d="M8.5 6C9.5 5 11 4.5 12.5 4.5C11.5 5.5 11 7 11.5 8.5C10 7.5 9 6.5 8.5 6Z" fill="#f29111" />
                </svg>
                <span className="text-[11px] font-bold font-mono text-sky-300">MySQL</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-sky-500/40 text-sky-300 px-2 py-0.5 rounded shadow z-30">
                MySQL DB
              </span>
            </div>

            {/* 11. RED HAT */}
            <div
              className="absolute bottom-12 left-8 sm:left-12 z-20 animate-float-6 group cursor-pointer"
              title="Red Hat Enterprise Linux"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#260f13] border border-red-500/50 shadow-xl shadow-red-600/30 flex items-center justify-center p-2 group-hover:scale-120 group-hover:border-red-400 group-hover:shadow-red-500/40 transition-all duration-300">
                <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 15.5c-1.5 0-3-.5-4.5-1.5-1-.7-2-1.5-3-2.5-1 1-2 1.8-3 2.5-1.5 1-3 1.5-4.5 1.5-1.5 0-2.5-.5-3-1.5-.5-1 0-2.5 1.5-3.5 1.5-1 3.5-1.5 5.5-1.5 1 0 2 .2 3 .5V8c0-1.5.5-3 1.5-4s2.5-1.5 4-1.5c1.5 0 2.5.5 3 1.5.5 1 0 2.5-1.5 3.5-1 .7-2 1.2-3.5 1.5v.5c1.5 0 3 .5 4.5 1.5 1.5 1 2 2.5 1.5 3.5-.5 1-1.5 1.5-3 1.5z" />
                </svg>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-red-500/40 text-red-300 px-2 py-0.5 rounded shadow z-30">
                Red Hat
              </span>
            </div>

            {/* 12. NEO4J */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-float-2 group cursor-pointer"
              title="Neo4j - Graph Database & Threat Intel"
            >
              <div className="px-3 py-1.5 rounded-2xl bg-[#091b26] border border-emerald-400/50 shadow-xl shadow-emerald-500/25 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-emerald-300 group-hover:shadow-emerald-400/40 transition-all duration-300">
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="6" cy="12" r="3" fill="#008cc1" />
                  <circle cx="18" cy="6" r="3" fill="#00e5ff" />
                  <circle cx="18" cy="18" r="3" fill="#22c55e" />
                  <line x1="9" y1="12" x2="15" y2="7" stroke="#38bdf8" />
                  <line x1="9" y1="12" x2="15" y2="17" stroke="#38bdf8" />
                </svg>
                <span className="text-[11px] font-extrabold font-mono tracking-wider text-emerald-300">NEO4J</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded shadow z-30">
                Neo4j Graph
              </span>
            </div>

            {/* 13. POSTGRESQL */}
            <div
              className="absolute bottom-12 right-8 sm:right-12 z-20 animate-float-4 group cursor-pointer"
              title="PostgreSQL - Enterprise Relational Database"
            >
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#0c1828] border border-blue-400/50 shadow-xl shadow-blue-500/20 flex items-center gap-1.5 group-hover:scale-120 group-hover:border-blue-300 group-hover:shadow-blue-400/40 transition-all duration-300">
                <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-5h-2V9c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2.5H7V9c0-2.76 2.24-5 5-5s5 2.24 5 5v2.5z" />
                </svg>
                <span className="text-[11px] font-bold font-mono text-blue-200">Postgre</span>
              </div>
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/95 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded shadow z-30">
                PostgreSQL
              </span>
            </div>

            {/* Floating WhatsApp Contact Button */}
            <a
              href="https://wa.me/918667845880"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-1 sm:right-3 z-30 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-green-500/40 hover:scale-110 transition-all cursor-pointer"
              title="Chat on WhatsApp"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
