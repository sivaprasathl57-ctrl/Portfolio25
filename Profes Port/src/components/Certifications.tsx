import React, { useState, useRef, useEffect } from 'react';

interface CertItem {
  id: string;
  title: string;
  issuer: string;
  category: 'VAPT' | 'Networking' | 'CTF' | 'Research' | 'Foundations';
  fileName: string;
  badge: string;
  badgeColor: string;
  description: string;
}

const allCertificates: CertItem[] = [
  {
    id: 'cwl-c3sa',
    title: 'Certified Cyber Security Analyst (C3SA)',
    issuer: 'CyberWarfare Labs (CWL)',
    category: 'VAPT',
    fileName: '/Certi/Certified_Cyber_Security_Analyst_CWL.png',
    badge: '🛡️ Certified Cyber Security Analyst',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/50',
    description: 'Official accreditation from CyberWarfare Labs certifying mastery as a Certified Cyber Security Analyst (C3SA) in threat identification, offensive security, and network vulnerability exploitation (ID: C3SA-6ac63a91058903f534f8d336).',
  },
  {
    id: 'info-croft',
    title: 'Cyber Security Internship Program – Certificate of Completion',
    issuer: 'INFO CROFT (Govt. of India MSME Recognized)',
    category: 'VAPT',
    fileName: '/Certi/Info_Croft_Cyber_Security_Internship_Certificate.pdf',
    badge: '🛡️ Cyber Security Internship',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/50',
    description: 'Specialized completion credential for hands-on real-time cyber security projects, vulnerability assessment, and threat exploration (ID: DS25-008).',
  },
  {
    id: 'csedp',
    title: 'Certified Social Engineering Defense Practitioner (CSEDP)',
    issuer: 'SecOps Defense Certification',
    category: 'VAPT',
    fileName: '/Certi/Siva_Prasath_L_Certified_Social_Engineering_Defense_Practitioner_CSEDP.pdf',
    badge: '🛡️ Social Engineering',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/50',
    description: 'Specialized accreditation verifying defensive tactics against human-vector attacks, phishing triage, and psychological exploitation mitigation.',
  },
  {
    id: 'api-pentest',
    title: 'API Pentesting & Bug Bounty 101 Certification',
    issuer: 'Bug Bounty / VAPT Institute',
    category: 'VAPT',
    fileName: '/Certi/API-Pentesting-Bugbounty-101-Certificate.pdf',
    badge: '⚡ API Pentesting',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/50',
    description: 'Comprehensive assessment of REST/GraphQL API vulnerabilities, broken object level authorization (BOLA), and token manipulation.',
  },
  {
    id: 'ijeted',
    title: 'Research Paper Publication Certification',
    issuer: 'International Journal of Engineering Trends & Emerging Discoveries (IJETED)',
    category: 'Research',
    fileName: '/Certi/IJETED_Certificate__Dhivya__K__Ram_Prasath_D__Sanjay__D___Siva_Prasath_L_1762968639 (1).pdf',
    badge: '📜 Published Research',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/50',
    description: 'Peer-reviewed scholarly contribution focusing on automated security analysis and vulnerability assessment paradigms.',
  },
  {
    id: 'thm-1',
    title: 'TryHackMe Pre-Security Pathways & Penetration Testing',
    issuer: 'TryHackMe Cybersecurity Platform',
    category: 'CTF',
    fileName: '/Certi/THM-YMF35EGFI3.pdf',
    badge: '🎯 TryHackMe Pathway',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-950/50',
    description: 'Practical offensive labs covering web fundamentals, network exploitation, Linux privilege escalation, and reconnaissance.',
  },
  {
    id: 'thm-2',
    title: 'TryHackMe Cyber Defense & Security Fundamentals',
    issuer: 'TryHackMe Cybersecurity Platform',
    category: 'CTF',
    fileName: '/Certi/THM-8MZMNDSZSP.pdf',
    badge: '🔥 TryHackMe Analyst',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-950/50',
    description: 'Hands-on validation of log analysis, threat intelligence correlation, packet inspection with Wireshark, and incident response.',
  },
  {
    id: 'cisco-intro',
    title: 'Introduction to Cybersecurity Certificate',
    issuer: 'Cisco Networking Academy',
    category: 'Foundations',
    fileName: '/Certi/Introduction_to_Cybersecurity_certificate_lsivaprasath25-gmail-com_df8232be-7ae9-4f97-9986-37484ecf7eca.pdf',
    badge: '🔒 Cisco NetAcad',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/50',
    description: 'Global Cisco certification validating foundational principles of data confidentiality, integrity, availability, and threat surfaces.',
  },
  {
    id: 'cisco-net',
    title: 'Networking Basics Certification',
    issuer: 'Cisco Networking Academy',
    category: 'Networking',
    fileName: '/Certi/Networking_Basics_certificate_sivaprasathl57-gmail-com_0c7691ef-c22e-484c-ac94-887664f45061.pdf',
    badge: '🌐 Cisco NetAcad',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/50',
    description: 'In-depth assessment of IPv4/IPv6 addressing, OSI layers, routing protocols, subnetting calculations, and switch configurations.',
  },
  {
    id: 'hired',
    title: 'Professional Internship & Placement Selection Credential',
    issuer: 'Corporate Placement & Technical Hiring Board',
    category: 'Research',
    fileName: '/Certi/SIVA PRASATH. L__Hired_Certificate.pdf',
    badge: '💼 Professional Selection',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/50',
    description: 'Formal recognition and technical selection for cybersecurity internship and professional development roles.',
  },
  {
    id: 'workshop-part',
    title: 'National Cybersecurity Workshop & CTF Participation',
    issuer: 'State Cyber Defense & Collegiate Symposium',
    category: 'CTF',
    fileName: '/Certi/Siva_Prasath_L_Participation_Certificate.pdf',
    badge: '🏆 CTF Participation',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/50',
    description: 'Active participation in competitive capture-the-flag scenarios and hands-on offensive defense masterclasses.',
  },
  {
    id: 'ecr',
    title: 'Cybersecurity Technical Training Verification (ECR-04130)',
    issuer: 'Engineering Competence & Research Council',
    category: 'Foundations',
    fileName: '/Certi/Certificate_ECR-04130.pdf',
    badge: '⚙️ Technical Credential',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/50',
    description: 'Certified verification of advanced practical modules in defensive engineering and secure application design.',
  },
  {
    id: 'gmf',
    title: 'Advanced Cybersecurity Course Completion Certificate',
    issuer: 'Accredited Cyber Education Platform',
    category: 'Foundations',
    fileName: '/Certi/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_6982d48b58e5dbbf3c3ecbae_1770186683839_completion_certificate.pdf',
    badge: '🎓 Course Completion',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/50',
    description: 'Specialized course credential validating proficiency across threat mitigation, vulnerability triage, and secure system maintenance.',
  },
  {
    id: 'rank',
    title: 'Technical Assessment & Security Ranking Milestone',
    issuer: 'Technical Evaluation Portal',
    category: 'Research',
    fileName: '/Certi/Screenshot 2026-09-09 142841.pdf',
    badge: '📊 Rank Milestone',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/50',
    description: 'Documented performance ranking and milestone verification from technical evaluation challenges.',
  },
  {
    id: 'verification',
    title: 'Professional Security Credential & Identity Verification',
    issuer: 'Verified Credential Body',
    category: 'Foundations',
    fileName: '/Certi/1787835607476.pdf',
    badge: '🔑 Authenticated Credential',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/50',
    description: 'Official verified digital credential confirming professional cybersecurity competency standards.',
  },
];

function CyberCardBorder({ index = 0 }: { index: number }) {
  const duration = 6.5 + (index % 3) * 1.2;
  const isReverse = index % 2 === 1;

  const dashPatterns = [
    '14 20 8 24 16 18',
    '18 16 10 22 12 22',
    '12 24 14 18 8 24',
    '16 22 12 20 10 20',
  ];
  const dashArray = dashPatterns[index % dashPatterns.length];

  return (
    <>
      {/* SVG Animated Glowing Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-10"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'contents' }}
      >
        <defs>
          <linearGradient id={`cyberBorderGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00dfd8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#00dfd8" />
          </linearGradient>
        </defs>

        {/* Faint static base track */}
        <rect
          x="1"
          y="1"
          rx="22"
          fill="none"
          stroke="rgba(0, 223, 216, 0.15)"
          strokeWidth="1.5"
          style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
        />

        {/* Primary Animated Traveling Cyan Glow Dash */}
        <rect
          x="1.5"
          y="1.5"
          rx="22"
          fill="none"
          stroke={`url(#cyberBorderGrad-${index})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray={dashArray}
          style={{
            width: 'calc(100% - 3px)',
            height: 'calc(100% - 3px)',
            animation: `${isReverse ? 'cyberBorderTravelReverse' : 'cyberBorderTravel'} ${duration}s linear infinite`,
            filter: 'drop-shadow(0 0 3px rgba(0, 223, 216, 0.7))',
          }}
          className="transition-all duration-300 group-hover:stroke-[3.5px]"
        />

        {/* White accent traveling sparks */}
        <rect
          x="1.5"
          y="1.5"
          rx="22"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="4 46 2 48"
          style={{
            width: 'calc(100% - 3px)',
            height: 'calc(100% - 3px)',
            animation: `${isReverse ? 'cyberBorderTravel' : 'cyberBorderTravelReverse'} ${duration * 0.7}s linear infinite`,
            opacity: 0.85,
          }}
        />
      </svg>

      {/* Cyber Corner HUD Brackets */}
      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00dfd8] rounded-tl-xl pointer-events-none z-20 shadow-[0_0_8px_#00dfd8]" />
      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00dfd8] rounded-tr-xl pointer-events-none z-20 shadow-[0_0_8px_#00dfd8]" />
      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00dfd8] rounded-bl-xl pointer-events-none z-20 shadow-[0_0_8px_#00dfd8]" />
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00dfd8] rounded-br-xl pointer-events-none z-20 shadow-[0_0_8px_#00dfd8]" />

      {/* Cyber Side Notches */}
      <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-3.5 bg-white/80 rounded-r pointer-events-none z-20 shadow-[0_0_6px_#00dfd8]" />
      <span className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1 bg-[#00dfd8] rounded-l pointer-events-none z-20 shadow-[0_0_6px_#00dfd8]" />
    </>
  );
}

function CertificateCard({
  cert,
  index,
  onOpenModal,
}: {
  cert: CertItem;
  index: number;
  onOpenModal: (cert: CertItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;
    const rotateZ = ((x - centerX) / centerX) * 2.2 + (index % 2 === 0 ? 0.8 : -0.8);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`,
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
      onClick={() => onOpenModal(cert)}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className="group p-7 rounded-3xl bg-[#0e101a] border border-cyan-500/20 hover:border-cyan-400/60 shadow-xl flex flex-col justify-between relative overflow-hidden select-none cursor-pointer"
    >
      {/* Animated Cyber Border Effect */}
      <CyberCardBorder index={index} />

      <div className="space-y-4 relative z-10">
        {/* Header row: badge and number */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cert.badgeColor}`}>
            {cert.badge}
          </span>
          <span className="text-xs text-gray-500 font-mono">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title & Issuer */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
            {cert.title}
          </h3>
          <p className="text-sm text-cyan-400/90 font-medium mt-1.5">
            {cert.issuer}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed font-light">
          {cert.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between relative z-10 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(cert);
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          <span>Preview & Zoom</span>
        </button>

        <a
          href={cert.fileName}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-300 hover:text-white transition-colors"
        >
          <span>PDF</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/**
 * High-Resolution Certificate Zoom Lightbox Modal
 */
function CertificateModal({
  cert,
  onClose,
}: {
  cert: CertItem;
  onClose: () => void;
}) {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const isImage =
    cert.fileName.endsWith('.png') ||
    cert.fileName.endsWith('.jpg') ||
    cert.fileName.endsWith('.jpeg') ||
    cert.fileName.endsWith('.webp');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleZoomIn = () => setScale((prev) => Math.min(5, Number((prev + 0.5).toFixed(1))));
  const handleZoomOut = () => setScale((prev) => Math.max(0.5, Number((prev - 0.5).toFixed(1))));
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(5, Number((prev + 0.25).toFixed(2))));
    } else {
      setScale((prev) => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex flex-col justify-between items-center p-3 sm:p-6 overflow-hidden select-none animate-fadeIn"
    >
      {/* Modal Header */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl flex items-center justify-between pb-3 border-b border-white/10 z-20"
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cert.badgeColor}`}>
              {cert.badge}
            </span>
            <span className="text-xs font-mono text-emerald-400">VERIFIED CREDENTIAL</span>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            {cert.title}
          </h2>
          <p className="text-xs text-cyan-400 font-medium">{cert.issuer}</p>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-2">
          <a
            href={cert.fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition-all"
          >
            <span>Open Original</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-all"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full max-w-6xl flex-1 my-3 relative overflow-hidden flex items-center justify-center rounded-2xl bg-[#08090f] border border-cyan-500/30 ${
          scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        {isImage ? (
          <img
            src={cert.fileName}
            alt={cert.title}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
              maxHeight: '75vh',
              maxWidth: '90%',
              objectFit: 'contain',
            }}
            className="rounded-xl shadow-2xl pointer-events-auto"
            draggable={false}
          />
        ) : (
          <div
            style={{
              transform: `scale(${scale})`,
              transition: 'transform 0.25s ease-out',
              transformOrigin: 'center center',
            }}
            className="w-full h-full flex items-center justify-center p-2"
          >
            <iframe
              src={`${cert.fileName}#toolbar=1`}
              title={cert.title}
              className="w-full h-[72vh] rounded-xl border border-white/10 shadow-2xl bg-white"
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Zoom Toolbar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#0f111c]/90 border border-cyan-500/40 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-between z-20 shadow-2xl shadow-cyan-950/50"
      >
        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          disabled={scale <= 0.5}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-cyan-500/20 disabled:opacity-30 text-white font-bold text-lg flex items-center justify-center transition-all"
          title="Zoom Out"
        >
          −
        </button>

        {/* Current Scale Display */}
        <span className="font-mono text-xs font-bold text-cyan-300 px-2">
          {Math.round(scale * 100)}% ZOOM
        </span>

        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          disabled={scale >= 5}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-cyan-500/20 disabled:opacity-30 text-white font-bold text-lg flex items-center justify-center transition-all"
          title="Zoom In"
        >
          +
        </button>

        {/* Preset Scale Buttons */}
        <div className="flex items-center gap-1 border-l border-r border-white/10 px-3">
          {[1, 1.5, 2, 3, 4].map((level) => (
            <button
              key={level}
              onClick={() => {
                setScale(level);
                setPosition({ x: 0, y: 0 });
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                scale === level
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/40'
                  : 'bg-white/5 hover:bg-white/15 text-gray-300'
              }`}
            >
              {level * 100}%
            </button>
          ))}
        </div>

        {/* Reset Zoom */}
        <button
          onClick={handleResetZoom}
          className="px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-300 text-xs font-semibold transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const BATCH_INCREMENT = 3;

export default function Certifications() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalCert, setActiveModalCert] = useState<CertItem | null>(null);

  const filtered =
    selectedCategory === 'ALL'
      ? allCertificates
      : allCertificates.filter((c) => c.category === selectedCategory);

  const displayedCerts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLearnMore = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filtered.length));
    } else {
      setVisibleCount(3);
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#07080d] text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
            Validated Credentials & Accreditations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Licenses & Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Explore my verified collection of {allCertificates.length} certifications covering Cyber Warfare Labs, VAPT, Offensive Security, Cisco Networking, Published Research, and Practical CTF Milestones. Click any credential to inspect with HD Zoom.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {[
            { label: 'All Certificates', val: 'ALL', count: allCertificates.length },
            { label: 'VAPT & Security', val: 'VAPT', count: allCertificates.filter((c) => c.category === 'VAPT').length },
            { label: 'Networking', val: 'Networking', count: allCertificates.filter((c) => c.category === 'Networking').length },
            { label: 'CTF & Labs', val: 'CTF', count: allCertificates.filter((c) => c.category === 'CTF').length },
            { label: 'Research & Honors', val: 'Research', count: allCertificates.filter((c) => c.category === 'Research').length },
            { label: 'Foundations', val: 'Foundations', count: allCertificates.filter((c) => c.category === 'Foundations').length },
          ].map((cat) => (
            <button
              key={cat.val}
              onClick={() => {
                setSelectedCategory(cat.val);
                setVisibleCount(3);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat.val
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#10121d] border-white/5 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-black/40 text-purple-300">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedCerts.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={index}
              onOpenModal={(c) => setActiveModalCert(c)}
            />
          ))}
        </div>

        {/* Learn More Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLearnMore}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            {hasMore ? (
              <>
                <span>Learn More</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            ) : (
              <>
                <span>Show Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Zoom Modal Lightbox */}
      {activeModalCert && (
        <CertificateModal
          cert={activeModalCert}
          onClose={() => setActiveModalCert(null)}
        />
      )}
    </section>
  );
}
