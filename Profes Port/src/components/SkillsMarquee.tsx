import React from 'react';

/**
 * =========================================================================
 * 1. SKILLS DATA LIST
 * To add, remove, or modify skills, edit this array.
 * =========================================================================
 */
export const SKILLS_LIST = [
  {
    name: 'Python',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 6.5 4.38 6.5 4.38v2.32H12v.75H4.25S2 7.37 2 12c0 4.62 1.97 4.54 1.97 4.54h1.17v-1.6s-.06-1.9 1.88-1.9h5.18s1.8.03 1.8-1.74V6.16S14.28 2 12 2zm-1.84 1.55c.43 0 .78.35.78.78s-.35.78-.78.78-.78-.35-.78-.78.35-.78.78-.78zM12 22c5.52 0 5.5-2.38 5.5-2.38v-2.32H12v-.75h7.75S22 16.63 22 12c0-4.62-1.97-4.54-1.97-4.54h-1.17v1.6s.06 1.9-1.88 1.9h-5.18s-1.8-.03-1.8 1.74v5.14s-.28 4.16 2 4.16zm1.84-1.55c-.43 0-.78-.35-.78-.78s.35-.78.78-.78.78.35.78.78-.35.78-.78.78z" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'Burp Suite',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    accent: 'gold',
  },
  {
    name: 'Nmap',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'Metasploit',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'Wireshark',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12h20M2 12l5-5m-5 5 5 5M22 12l-5-5m5 5-5 5" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'Kali Linux',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    accent: 'gold',
  },
  {
    name: 'OWASP Top 10',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    accent: 'gold',
  },
  {
    name: 'VAPT',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'Penetration Testing',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zM9 7a3 3 0 0 1 6 0v3H9V7z" />
      </svg>
    ),
    accent: 'gold',
  },
  {
    name: 'React',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'Node.js',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.5 3.5 7.4v9.2L12 21.5l8.5-4.9V7.4L12 2.5z" />
        <path d="M12 2.5v19" />
      </svg>
    ),
    accent: 'gold',
  },
  {
    name: 'Ollama',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
      </svg>
    ),
    accent: 'blue',
  },
  {
    name: 'AWS Security',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="M12 12v3" />
      </svg>
    ),
    accent: 'gold',
  },
];

export default function SkillsMarquee() {
  return (
    <>
      {/**
       * =========================================================================
       * 2. STYLES (SPEED, DIRECTION, GLOW, AND MASK CONFIGURATION)
       * =========================================================================
       */}
      <style>{`
        /* --- ANIMATION CONFIGURATION --- */
        :root {
          /* SPEED: Change the duration here (e.g., 20s = faster, 35s = slower) */
          --marquee-duration: 25s;

          /* DIRECTION:
             Normal: right-to-left (translateX(0) to translateX(-50%))
             Reverse (left-to-right): change animation-direction to 'reverse'
          */
          --marquee-direction: normal;
        }

        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Exactly -50% ensures a seamless infinite loop because the list is duplicated once */
            transform: translateX(-50%);
          }
        }

        .skills-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: infiniteScroll var(--marquee-duration) linear infinite var(--marquee-direction);
        }

        /* PAUSE ON HOVER */
        .skills-marquee-container:hover .skills-marquee-track {
          animation-play-state: paused;
        }

        /* PREFERS-REDUCED-MOTION ACCESSIBILITY */
        @media (prefers-reduced-motion: reduce) {
          .skills-marquee-track {
            animation: none;
            overflow-x: auto;
            width: auto;
          }
        }

        /* EDGE GRADIENT FADING MASK */
        .skills-marquee-mask {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
        }

        /* GLASS CHIP HOVER GLOWS */
        .skill-chip {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Soft Blue Glow on Hover */
        .skill-chip.chip-blue:hover {
          background: rgba(0, 223, 216, 0.08);
          border-color: rgba(0, 223, 216, 0.45);
          color: #ffffff;
          box-shadow: 0 0 20px rgba(0, 223, 216, 0.25), inset 0 0 10px rgba(0, 223, 216, 0.15);
          transform: translateY(-2px);
        }

        /* Soft Gold Glow on Hover */
        .skill-chip.chip-gold:hover {
          background: rgba(255, 180, 50, 0.08);
          border-color: rgba(255, 180, 50, 0.45);
          color: #ffffff;
          box-shadow: 0 0 20px rgba(255, 180, 50, 0.25), inset 0 0 10px rgba(255, 180, 50, 0.15);
          transform: translateY(-2px);
        }
      `}</style>

      {/**
       * =========================================================================
       * 3. COMPONENT LAYOUT (WITHOUT ENCLOSING BOX)
       * Floating seamless ticker with edge gradient fade masks
       * =========================================================================
       */}
      <div className="w-full py-3 overflow-hidden relative">
        <div className="skills-marquee-container relative w-full overflow-hidden">
          {/* Masked viewport with left and right gradient fades */}
          <div className="skills-marquee-mask overflow-hidden w-full py-2">
            {/* Animated Track with duplicated list for seamless looping */}
            <div className="skills-marquee-track flex items-center gap-3 sm:gap-4.5">
              {/* First original copy of skills */}
              {SKILLS_LIST.map((skill, index) => (
                <div
                  key={`skill-orig-${index}`}
                  className={`skill-chip ${skill.accent === 'gold' ? 'chip-gold' : 'chip-blue'} flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full select-none cursor-pointer flex-shrink-0 text-gray-200`}
                >
                  <span className={`${skill.accent === 'gold' ? 'text-amber-400' : 'text-[#00dfd8]'} opacity-90 transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                    {skill.icon}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-sans whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}

              {/* Duplicate copy for perfectly seamless, infinite marquee loop */}
              {SKILLS_LIST.map((skill, index) => (
                <div
                  key={`skill-dupe-${index}`}
                  aria-hidden="true"
                  className={`skill-chip ${skill.accent === 'gold' ? 'chip-gold' : 'chip-blue'} flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full select-none cursor-pointer flex-shrink-0 text-gray-200`}
                >
                  <span className={`${skill.accent === 'gold' ? 'text-amber-400' : 'text-[#00dfd8]'} opacity-90 transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                    {skill.icon}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-sans whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
