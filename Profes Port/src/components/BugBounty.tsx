import React, { useRef, useState } from 'react';

interface Hunt {
  id: string;
  severity: 'CRIT' | 'HIGH';
  category: string;
  subCategory: string;
  title: string;
  description: string;
  status: string;
  cvss: string;
}

const hunts: Hunt[] = [
  {
    id: 'sql-injection',
    severity: 'CRIT',
    category: 'Injection',
    subCategory: 'SQL Injection',
    title: 'Critical SQL Injection in Database Layer',
    description: 'Unsanitized user input in backend queries allowed unauthorized database manipulation and full data exposure.',
    cvss: '9.8',
  },
 
];

function BugBountyParallaxCard({ hunt }: { hunt: Hunt }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease',
  });
  const [isHovered, setIsHovered] = useState(false);

  const isCrit = hunt.severity === 'CRIT';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const ratioX = (x - centerX) / centerX;
    const ratioY = (y - centerY) / centerY;

    // Smooth 3D tilt responding to cursor position
    const rotateX = ratioY * -4.5;
    const rotateY = ratioX * 5.0;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.08s ease-out',
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`cyber-card p-6 sm:p-7 rounded-2xl flex flex-col sm:flex-row items-start gap-5 sm:gap-6 relative overflow-hidden select-none cursor-pointer transition-all duration-300 ${
        isCrit
          ? 'border-l-4 border-l-rose-500 hover:border-rose-500/60'
          : 'border-l-4 border-l-amber-500 hover:border-amber-500/60'
      }`}
    >
      {/* Top Subtle Gradient Accent */}
      <span
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
          isCrit
            ? 'from-transparent via-rose-500 to-transparent'
            : 'from-transparent via-amber-500 to-transparent'
        } opacity-40 group-hover:opacity-100 transition-opacity`}
      />

      {/* Cyber Corner HUD Brackets */}
      <span
        className={`cyber-corner cyber-corner-tl !border-l-2 !border-t-2 ${
          isCrit ? '!border-rose-400' : '!border-amber-400'
        }`}
        style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)', transition: 'transform 0.2s ease' }}
      />
      <span
        className={`cyber-corner cyber-corner-br !border-r-2 !border-b-2 ${
          isCrit ? '!border-rose-400' : '!border-amber-400'
        }`}
        style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)', transition: 'transform 0.2s ease' }}
      />

      {/* 3D PARALLAX LAYER 1: Circular Severity Badge floating above card surface */}
      <div
        className="relative flex-shrink-0 transition-transform duration-200 ease-out"
        style={{
          transform: isHovered ? 'translateZ(35px) scale(1.12)' : 'translateZ(0px) scale(1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isCrit
              ? 'border-2 border-rose-500/60 bg-[#1e0e12] shadow-[0_8px_22px_rgba(244,63,94,0.35)]'
              : 'border-2 border-amber-500/60 bg-[#1c1409] shadow-[0_8px_22px_rgba(245,158,11,0.3)]'
          }`}
        >
          <span
            className={`font-mono font-black text-xs tracking-wider ${
              isCrit ? 'text-rose-400' : 'text-amber-400'
            }`}
          >
            {hunt.severity}
          </span>
        </div>
      </div>

      {/* 3D PARALLAX LAYER 2: Text content floating at mid-depth layer */}
      <div
        className="flex-1 space-y-1.5 w-full transition-transform duration-200 ease-out"
        style={{
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Category Breadcrumb & CVSS Badge */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
            <span className="text-gray-300 font-medium">{hunt.category}</span>
            <span className="text-gray-600">›</span>
            <span className="text-[#00dfd8] font-semibold">{hunt.subCategory}</span>
          </div>
          <span
            className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
              isCrit
                ? 'border-rose-500/40 bg-rose-950/40 text-rose-300'
                : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
            }`}
          >
            CVSS {hunt.cvss}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-lg sm:text-xl font-bold text-white tracking-tight transition-colors duration-200 ${
            isCrit ? 'hover:text-rose-200' : 'hover:text-amber-200'
          }`}
        >
          {hunt.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 font-light leading-relaxed pb-1">
          {hunt.description}
        </p>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-400 pt-0.5">
          <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>{hunt.status}</span>
        </div>
      </div>
    </div>
  );
}

export default function BugBounty() {
  return (
    <section id="bugbounty" className="py-24 bg-[#080910] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[#00dfd8] font-semibold text-sm tracking-widest uppercase">
            Responsible Vulnerability Disclosures
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            BugBounty Hunts
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Real-world security findings discovered, responsibly reported, and remediated in production environments.
          </p>
        </div>

        {/* 3 Bug Bounty 3D Parallax Depth Cards */}
        <div className="space-y-4 sm:space-y-5">
          {hunts.map((hunt) => (
            <BugBountyParallaxCard key={hunt.id} hunt={hunt} />
          ))}
        </div>

      </div>
    </section>
  );
}
