import React from 'react';

export default function Research() {
  return (
    <section id="research" className="py-24 bg-[#06070a] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
            Scholarly Contributions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Publications & Security Research
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Research Paper Card */}
        <div className="cyber-card max-w-4xl mx-auto p-8 lg:p-10 rounded-3xl shadow-2xl relative">
          <span className="cyber-corner cyber-corner-tl" />
          <span className="cyber-corner cyber-corner-tr" />
          <span className="cyber-corner cyber-corner-bl" />
          <span className="cyber-corner cyber-corner-br" />
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="cyber-badge px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/60 border border-purple-500/30 text-purple-300">
              Peer-Reviewed Journal Publication
            </span>
            <span className="text-xs text-gray-400 font-mono border border-white/10 px-2.5 py-0.5 rounded-full bg-[#121422]">IJETED CERTIFIED</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Automated Vulnerability Assessment and Security Optimization in Emerging Computing Environments
          </h3>

          <p className="text-cyan-400 text-sm font-medium mb-4">
            Published in: International Journal of Engineering Trends and Emerging Discoveries (IJETED)
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-6">
            Investigating dynamic vulnerability discovery models, mitigating attack surfaces in distributed web systems, and establishing automated verification strategies that bridge academic research with real-world defensive engineering.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
            <div className="text-xs text-gray-400">
              <span className="text-gray-300 font-semibold">Contributing Researchers:</span> Siva Prasath L., Dhivya K., Ram Prasath D., Sanjay D.
            </div>
            <a
              href="/Certi/IJETED_Certificate__Dhivya__K__Ram_Prasath_D__Sanjay__D___Siva_Prasath_L_1762968639 (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-600 transition-all text-xs font-semibold flex items-center gap-2"
            >
              <span>View Publication Certificate</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
