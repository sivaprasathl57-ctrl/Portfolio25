import React, { useRef, useState } from 'react';
import { personalData } from '../data/portfolio';
import GlowingDotsBackground from './GlowingDotsBackground';

interface Milestone {
  period: string;
  tag: string;
  tagColor: string;
  pinColor: string;
  pinIcon: string;
  title: string;
  institution: string;
  location: string;
  score: string;
  description: string;
  accentBorder: string;
  cornerColor: string;
  topGrad: string;
}

function EducationCard({
  item,
  isEven,
}: {
  item: Milestone;
  isEven: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease',
  });

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

    // Distinct timeline 3D tilt & dynamic anchor rotation:
    // Left-column cards tilt with a subtle anchor lean towards the center timeline
    const rotateX = ratioY * -5.2;
    const rotateY = ratioX * 5.8;
    const rotateZ = (isEven ? -1.8 : 1.8) + ratioX * 1.4;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.08s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`cyber-card p-6 rounded-2xl bg-[#0c0e18]/90 backdrop-blur-md border border-white/10 ${item.accentBorder} shadow-xl space-y-2 select-none cursor-pointer relative overflow-hidden group/card`}
    >
      {/* Top glowing laser line accent */}
      <span
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.topGrad} opacity-50 group-hover/card:opacity-100 transition-opacity`}
      />

      {/* Cyber Corner HUD Brackets */}
      <span className={`absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 ${item.cornerColor} rounded-tl opacity-0 group-hover/card:opacity-100 transition-opacity`} />
      <span className={`absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 ${item.cornerColor} rounded-tr opacity-0 group-hover/card:opacity-100 transition-opacity`} />
      <span className={`absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 ${item.cornerColor} rounded-bl opacity-0 group-hover/card:opacity-100 transition-opacity`} />
      <span className={`absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 ${item.cornerColor} rounded-br opacity-0 group-hover/card:opacity-100 transition-opacity`} />

      <div className="relative z-10 space-y-2">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border ${item.tagColor}`}>
          {item.period}
        </span>
        <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">{item.tag}</div>
        <h3 className="text-xl font-bold text-white group-hover/card:text-[#00dfd8] transition-colors">
          {item.title}
        </h3>
        <p className="text-cyan-300 font-medium text-sm">
          {item.institution}
        </p>
        <p className="text-xs text-amber-300 font-mono font-semibold">
          {item.score}
        </p>
        <p className="text-xs text-gray-400">
          📍 {item.location}
        </p>
        <p className="text-xs text-gray-300 pt-1 font-light leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Education() {
  const { education } = personalData;

  const milestones: Milestone[] = [
    {
      period: `${education.years} • CURRENT`,
      tag: 'BACHELOR OF ENGINEERING',
      tagColor: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
      pinColor: 'border-purple-500 shadow-purple-500/40',
      pinIcon: '🎓',
      title: education.degree,
      institution: education.institution,
      location: education.location,
      score: 'Specializing in Cyber Security & Defensive Architecture',
      description: 'Hands-on focus on VAPT, network security analysis, exploit research, defensive cloud configurations, and DevSecOps pipelines.',
      accentBorder: 'hover:border-purple-500/60',
      cornerColor: 'border-purple-400',
      topGrad: 'from-purple-500 via-indigo-500 to-purple-400',
    },
    {
      period: '2022–2024 • COMPLETED',
      tag: 'HIGHER SECONDARY CERTIFICATE (12TH / HSC)',
      tagColor: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
      pinColor: 'border-cyan-500 shadow-cyan-500/40',
      pinIcon: '🏫',
      title: 'Higher Secondary School Certificate (HSC)',
      institution: education.hsc.school,
      location: education.hsc.location,
      score: `Aggregate Score: ${education.hsc.aggregate} (${education.hsc.year})`,
      description: 'Core focus in Mathematics, Physics, and Computer Science, establishing strong analytical foundations for software engineering and algorithms.',
      accentBorder: 'hover:border-cyan-400/60',
      cornerColor: 'border-cyan-400',
      topGrad: 'from-cyan-400 via-sky-500 to-blue-500',
    },
    {
      period: '2021–2022 • COMPLETED',
      tag: 'SECONDARY SCHOOL CERTIFICATE (10TH / SSLC)',
      tagColor: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
      pinColor: 'border-emerald-500 shadow-emerald-500/40',
      pinIcon: '📜',
      title: 'Secondary School Leaving Certificate (SSLC)',
      institution: education.sslc.school,
      location: education.sslc.location,
      score: `Score: ${education.sslc.aggregate} (${education.sslc.year})`,
      description: 'Secondary school education completed with distinction in sciences and mathematics in Manapparai, Tiruchirappalli.',
      accentBorder: 'hover:border-emerald-400/60',
      cornerColor: 'border-emerald-400',
      topGrad: 'from-emerald-400 via-teal-500 to-emerald-300',
    },
  ];

  return (
    <section id="education" className="py-24 bg-[#070810] text-white border-t border-white/5 relative overflow-hidden">
      {/* Dark Dot Matrix Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
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

      {/* Ambient Dynamic Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#00dfd8] font-semibold text-sm tracking-widest uppercase">
            Academic Foundations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Structured educational milestones spanning foundational schooling through advanced cybersecurity engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-purple-500 before:via-cyan-400 before:to-emerald-500">
          
          <div className="space-y-12">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.tag} className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
                  
                  {/* Left Column */}
                  {isEven ? (
                    <div className="w-full md:w-1/2 order-2 md:order-1 md:text-right pl-16 md:pl-0">
                      <EducationCard item={item} isEven={true} />
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-1/2 md:order-1" />
                  )}

                  {/* Central Timeline Pin */}
                  <div className={`absolute left-8 md:relative md:left-auto z-10 w-12 h-12 -translate-x-1/2 md:translate-x-0 rounded-full bg-[#121422] border-2 flex items-center justify-center text-lg shadow-lg order-1 md:order-2 shrink-0 group-hover:scale-125 transition-transform duration-300 ${item.pinColor}`}>
                    {item.pinIcon}
                  </div>

                  {/* Right Column */}
                  {!isEven ? (
                    <div className="w-full md:w-1/2 order-2 md:order-3 pl-16 md:pl-0">
                      <EducationCard item={item} isEven={false} />
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-1/2 md:order-3" />
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
