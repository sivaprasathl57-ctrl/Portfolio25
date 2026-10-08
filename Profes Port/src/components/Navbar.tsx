import React, { useState } from 'react';
import { personalData } from '../data/portfolio';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#020204]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand Identity & Shield Logo */}
        <a href="#hero" className="flex items-center gap-3 text-white font-bold text-base sm:text-lg tracking-wide group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-900/60 to-indigo-950/80 border border-purple-500/40 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 group-hover:border-cyan-400/70 group-hover:shadow-cyan-400/25 transition-all duration-300 overflow-hidden">
            <img
              src="/hero_shield_perfect.png"
              alt={personalData.name}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(168,85,247,0.5)]"
            />
          </div>
          <span className="font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors">
            {personalData.name}
          </span>
        </a>

        {/* Center: Navigation Links in Proper Logical Order */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-gray-300">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-cyan-300 text-cyan-400/90 transition-colors flex items-center gap-1.5">
            <span>Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#certifications" className="hover:text-cyan-400 transition-colors">Certifications</a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
          <a href="#bugbounty" className="hover:text-cyan-400 transition-colors">Bug Bounties</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>

        {/* Right Action Area: Resume / CV Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/60 bg-purple-950/20 hover:bg-purple-600 hover:border-purple-600 text-purple-200 hover:text-white font-medium text-sm transition-all shadow-lg shadow-purple-900/20 group cursor-pointer"
          >
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            <span>Resume | CV</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0d14] border-b border-white/10 px-6 py-6 space-y-3">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-300 font-medium hover:text-cyan-200 py-1 flex items-center justify-between"
          >
            <span>Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Projects
          </a>
          <a
            href="#certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Certifications
          </a>
          <a
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Education
          </a>
          <a
            href="#bugbounty"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Bug Bounties
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 py-1"
          >
            Contact
          </a>

          <div className="pt-2 border-t border-white/10">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors"
            >
              → Download Resume / CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
