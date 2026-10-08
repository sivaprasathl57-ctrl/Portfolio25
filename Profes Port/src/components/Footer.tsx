import React from 'react';
import { personalData } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050608] border-t border-white/5 py-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-900/60 to-indigo-950/80 border border-purple-500/40 p-0.5 flex items-center justify-center overflow-hidden shadow-md shadow-purple-500/20">
            <img
              src="/hero_shield_perfect.png"
              alt={personalData.name}
              className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(168,85,247,0.5)]"
            />
          </div>
          <div>
            <div className="text-white font-bold text-sm">{personalData.name}</div>
            <div className="text-xs text-gray-500">{personalData.role}</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="#hero" className="hover:text-purple-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-purple-400 transition-colors">Services</a>
          <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
          <a href="#certifications" className="hover:text-purple-400 transition-colors">Certifications</a>
          <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
