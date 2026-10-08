import React from 'react';
import { personalData } from '../data/portfolio';

export default function About() {
  const { role, positions, education, location, ctfStats } = personalData;

  return (
    <section id="about" className="py-24 bg-[#090a10] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
            Discovery & Background
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Portrait Card with Cyber Specs */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <div className="relative w-72 sm:w-80 h-96 rounded-2xl overflow-hidden border border-white/10 bg-[#12131e] shadow-2xl">
                <img
                  src="/profile_cropped.png"
                  alt={personalData.name}
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Active Security Researcher</span>
                  <p className="text-lg font-bold text-white">{personalData.name}</p>
                  <p className="text-xs text-gray-300">{education.degree}</p>
                </div>
              </div>
            </div>

            {/* Quick Stat Pill */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                📍 {location}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                🟢 Available for Projects
              </span>
            </div>
          </div>

          {/* Right Column: Narrative, Academic Path & Focus Areas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg font-light">
              <p>
                I am a dedicated <strong className="text-white font-medium">{education.degree}</strong> student at <strong className="text-purple-300 font-medium">{education.institution}</strong>. My path in cybersecurity is fueled by an investigative mindset—understanding systems from the inside out to uncover weaknesses before adversaries do.
              </p>
              <p>
                My hands-on experience bridges <strong className="text-cyan-300 font-medium">Vulnerability Assessment & Penetration Testing (VAPT)</strong>, automated DevSecOps workflows, network packet inspection, web security exploitation, and reverse engineering.
              </p>
              <p>
                I continuously refine my offensive and defensive acumen across TryHackMe, picoCTF, live university CTF competitions, and building custom security utilities in Python and Bash.
              </p>
            </div>

            {/* Core Competencies Badges */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-3 flex items-center gap-1.5">
                <span>🛡️</span>
                <span>Focus Disciplines</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="cyber-badge bg-purple-600/30 border border-purple-500/40 text-purple-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-default">
                  {role}
                </span>
                {positions.map((pos) => (
                  <span
                    key={pos}
                    className="cyber-badge bg-[#141624] border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium cursor-default"
                  >
                    {pos}
                  </span>
                ))}
              </div>
            </div>

            {/* Key CTF & Practical Highlights Boxes */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="cyber-card p-4 rounded-xl bg-[#0f111c] border border-white/5 space-y-1 group">
                <span className="cyber-corner cyber-corner-tl" />
                <span className="cyber-corner cyber-corner-br" />
                <div className="text-2xl font-extrabold text-cyan-400 group-hover:scale-105 transition-transform tracking-tight">{ctfStats.tryHackMe}</div>
                <div className="text-xs text-gray-400 font-medium group-hover:text-gray-200 transition-colors">TryHackMe Challenges</div>
              </div>
              <div className="cyber-card p-4 rounded-xl bg-[#0f111c] border border-white/5 space-y-1 group">
                <span className="cyber-corner cyber-corner-tl" />
                <span className="cyber-corner cyber-corner-br" />
                <div className="text-2xl font-extrabold text-purple-400 group-hover:scale-105 transition-transform tracking-tight">{ctfStats.picoCTF}</div>
                <div className="text-xs text-gray-400 font-medium group-hover:text-gray-200 transition-colors">picoCTF Solved</div>
              </div>
              <div className="cyber-card p-4 rounded-xl bg-[#0f111c] border border-white/5 space-y-1 col-span-2 sm:col-span-1 group">
                <span className="cyber-corner cyber-corner-tl" />
                <span className="cyber-corner cyber-corner-br" />
                <div className="text-2xl font-extrabold text-emerald-400 group-hover:scale-105 transition-transform tracking-tight">3rd Place</div>
                <div className="text-xs text-gray-400 font-medium group-hover:text-gray-200 transition-colors">SudoForce CTF Award</div>
              </div>
            </div>

            {/* Quick Contact & Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all"
              >
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white text-gray-200 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
              >
                <span>Download Resume</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
