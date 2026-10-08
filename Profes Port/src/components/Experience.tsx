import React, { useState, useRef } from 'react';
import { personalData, type Experience as ExperienceType } from '../data/portfolio';
import GlowingDotsBackground from './GlowingDotsBackground';

function ExperienceCard({
  exp,
  onOpenCertModal,
}: {
  exp: ExperienceType;
  onOpenCertModal: (imgUrl: string) => void;
}) {
  const isInfoCroft = exp.id === 'info-croft';
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y, isHovered: true });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const ratioX = (x - centerX) / centerX;
    const ratioY = (y - centerY) / centerY;

    // Subtle 3D tilt micro-effect
    const rotateX = ratioY * -3.5;
    const rotateY = ratioX * 3.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`,
      transition: 'transform 0.08s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  };

  const accentColorClass = isInfoCroft ? 'border-cyan-400' : 'border-purple-400';
  const glowGradient = isInfoCroft
    ? 'rgba(6, 182, 212, 0.15)'
    : 'rgba(168, 85, 247, 0.15)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className="rounded-2xl bg-[#0c0e18]/90 border border-white/10 hover:border-cyan-500/40 p-7 sm:p-8 flex flex-col justify-between relative shadow-xl group transition-colors duration-300 overflow-hidden"
    >
      {/* Dynamic Interactive Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: mousePos.isHovered ? 1 : 0,
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${glowGradient}, transparent 70%)`,
        }}
      />

      {/* Cyber Corner HUD Brackets */}
      <span className={`absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 ${accentColorClass} rounded-tl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 pointer-events-none`} />
      <span className={`absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 ${accentColorClass} rounded-tr opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 pointer-events-none`} />
      <span className={`absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 ${accentColorClass} rounded-bl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 pointer-events-none`} />
      <span className={`absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 ${accentColorClass} rounded-br opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 pointer-events-none`} />

      {/* Top Laser Accent Line with Traveling Shimmer on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden rounded-t-2xl pointer-events-none">
        <span
          className={`block w-full h-full bg-gradient-to-r ${
            isInfoCroft
              ? 'from-cyan-400 via-sky-400 to-indigo-500'
              : 'from-purple-500 via-indigo-500 to-pink-500'
          } opacity-50 group-hover:opacity-100 transition-opacity`}
        />
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-laser-sweep opacity-0 group-hover:opacity-100" />
      </div>

      <div className="space-y-4 relative z-10">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] ${exp.badgeColor || 'border-cyan-500/40 text-cyan-300 bg-cyan-950/50'}`}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mr-1.5" />
            {exp.type} • {exp.period}
          </span>
          {exp.credentialId && (
            <span className="text-[11px] font-mono text-gray-400 bg-black/50 px-2.5 py-1 rounded border border-white/10 shadow-sm flex items-center gap-1.5 group-hover:border-cyan-500/30 transition-colors">
              <span className="text-gray-500">ID:</span>
              <span className="text-emerald-400 font-semibold">{exp.credentialId}</span>
            </span>
          )}
        </div>

        {/* Role & Company Header */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-[25px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {exp.role}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm pt-0.5">
            <span className="text-cyan-400 font-bold group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all">
              {exp.company}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300 text-xs font-mono">{exp.domain}</span>
            {isInfoCroft && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold">
                ✓ MSME Recognized
              </span>
            )}
          </div>
          {exp.dates && (
            <p className="text-xs text-gray-400 font-mono pt-1">
              🗓️ {exp.dates} {exp.location && `| 📍 ${exp.location}`}
            </p>
          )}
        </div>

        {/* Summary Description */}
        <p className="text-sm text-gray-300 font-light leading-relaxed">
          {exp.description}
        </p>

        {/* Key Contributions & Real-Time Projects */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <span className="group-hover:animate-bounce">⚡</span> Key Deliverables & Practical Execution:
          </h4>
          <ul className="space-y-1.5">
            {exp.responsibilities.map((resp: string, idx: number) => (
              <li
                key={idx}
                className="group/item text-xs text-gray-300 flex items-start gap-2.5 font-light leading-relaxed p-1.5 -mx-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                <span className="text-cyan-400 mt-0.5 shrink-0 transition-transform duration-200 group-hover/item:translate-x-1 group-hover/item:text-cyan-200 group-hover/item:drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                  ▹
                </span>
                <span className="group-hover/item:text-white transition-colors">{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills / Tech Badges with Micro-interactions */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {exp.skills.map((skill: string) => (
            <span
              key={skill}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#141829] border border-white/10 text-cyan-200/90 hover:text-white hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(6,182,212,0.25)] transition-all duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="pt-5 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
        {isInfoCroft ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenCertModal('/Certi/Info_Croft_Cyber_Security_Internship_Certificate.png')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500 hover:to-blue-600 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] group/btn"
            >
              <span>👁️ View Certificate</span>
            </button>
            <a
              href="/Certi/Info_Croft_Cyber_Security_Internship_Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-300 font-mono transition-colors hover:translate-x-0.5"
            >
              <span>Download PDF ↗</span>
            </a>
          </div>
        ) : (
          <a
            href={exp.certificateUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-600 hover:to-indigo-600 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] group/btn"
          >
            <span>📜 View Credential</span>
            <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}

        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/60 text-emerald-400 border border-emerald-500/30 shadow-sm flex items-center gap-1.5 group-hover:border-emerald-500/50 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          VERIFIED CREDENTIAL
        </span>
      </div>
    </div>
  );
}

export default function Experience() {
  const experiences = personalData.experiences || [];
  const [selectedCertModal, setSelectedCertModal] = useState<string | null>(null);

  // Mouse move handler for spotlight on the Info Croft spotlight banner
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerMouse, setBannerMouse] = useState({ x: 0, y: 0, isHovered: false });

  const handleBannerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const banner = bannerRef.current;
    if (!banner) return;
    const rect = banner.getBoundingClientRect();
    setBannerMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleBannerMouseLeave = () => {
    setBannerMouse((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <section id="experience" className="py-24 bg-[#080911] text-white border-t border-white/5 relative overflow-hidden">
      {/* Dark Dot Matrix Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Interactive Glowing Cyber Dots & Constellations Canvas */}
      <GlowingDotsBackground
        variant="contained"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        interactive={true}
        density={12000}
        showConstellations={true}
        maxLinkDistance={135}
        cursorReachDistance={200}
      />

      {/* Ambient Dynamic Cyber Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-2 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Field & Industry Exposure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Work Experience & Internships
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Practical industry track records, verified cybersecurity internship roles, and hands-on production engineering.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {experiences.map((exp: ExperienceType) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              onOpenCertModal={(imgUrl) => setSelectedCertModal(imgUrl)}
            />
          ))}
        </div>

        {/* Info Croft Featured Spotlight Banner with Interactive Effects */}
        <div
          ref={bannerRef}
          onMouseMove={handleBannerMouseMove}
          onMouseLeave={handleBannerMouseLeave}
          className="rounded-2xl bg-gradient-to-r from-[#0c1020] via-[#0f142b] to-[#0c1020] border border-cyan-500/30 hover:border-cyan-400/60 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between overflow-hidden shadow-2xl relative group transition-all duration-300"
        >
          {/* Dynamic Interactive Spotlight Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: bannerMouse.isHovered ? 1 : 0,
              background: `radial-gradient(450px circle at ${bannerMouse.x}px ${bannerMouse.y}px, rgba(6, 182, 212, 0.12), transparent 70%)`,
            }}
          />

          {/* Cyber Corner HUD Brackets */}
          <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 rounded-tr opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <span className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <span className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 rounded-br opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Subtle Laser Accent & Traveling Shimmer */}
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
            <span className="block w-full h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-laser-sweep opacity-0 group-hover:opacity-100" />
          </div>

          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 shadow-sm group-hover:border-cyan-400/60 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                OFFICIAL INTERNSHIP VERIFICATION
              </span>
              <span className="text-xs text-gray-400 font-mono bg-black/40 px-2.5 py-0.5 rounded border border-white/5">
                Credential ID: DS25-008
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              Cyber Security Internship Program at INFO CROFT
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl font-light leading-relaxed">
              Successfully executed real-time security assessments and learned defense-in-depth methodologies under recognized MSME accreditation with distinction.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => setSelectedCertModal('/Certi/Info_Croft_Cyber_Security_Internship_Certificate.png')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer hover:shadow-cyan-400/40"
            >
              <span>View Certificate</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <a
              href="/Certi/Info_Croft_Cyber_Security_Internship_Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-cyan-400/50 text-gray-300 hover:text-white font-semibold text-xs transition-all hover:bg-white/5 active:scale-95"
            >
              PDF ↗
            </a>
          </div>
        </div>

      </div>

      {/* Certificate Modal Lightbox */}
      {selectedCertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-fadeIn"
          onClick={() => setSelectedCertModal(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0d0f19] border border-cyan-500/40 rounded-2xl p-4 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="text-sm font-bold text-white font-mono">
                  INFO CROFT • Certificate of Completion (DS25-008)
                </h4>
              </div>
              <button
                onClick={() => setSelectedCertModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Certificate Image Frame */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60 max-h-[75vh] flex items-center justify-center">
              <img
                src={selectedCertModal}
                alt="Info Croft Cyber Security Internship Certificate"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 mt-2 text-xs font-mono text-gray-400">
              <span>Domain: Cyber Security</span>
              <a
                href="/Certi/Info_Croft_Cyber_Security_Internship_Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open full-resolution PDF</span> ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
